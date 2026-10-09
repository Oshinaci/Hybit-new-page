import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { useTurnkey, AuthState, ClientState } from '@turnkey/react-wallet-kit';
import { getTurnkeyConfig, SUPPORTED_EVM_NETWORKS, EvmNetwork } from '../config/turnkey';
import { useToast } from './ToastContext';

export interface TurnkeyAuthContextValue {
  // Authentication state
  isAuthenticated: boolean;
  isLoading: boolean;
  isAuthenticating: boolean;
  isConfigured: boolean;
  missingConfigFields: string[];
  authError: string | null;

  // Identity & Wallet
  walletAddress: string;
  hasWallet: boolean;
  userEmail: string | null;
  userName: string | null;
  turnkeyUserId: string | null;
  walletId: string | null;

  // EVM Network & Chain
  selectedNetworkId: string;
  selectedNetwork: EvmNetwork;
  setSelectedNetworkId: (networkId: string) => void;

  // Actions
  login: () => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
  openConfigInfo: () => void;
  showConfigModal: boolean;
  setShowConfigModal: (show: boolean) => void;
}

const TurnkeyAuthContext = createContext<TurnkeyAuthContextValue | undefined>(undefined);

export const TurnkeyAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { showToast } = useToast();
  const config = useMemo(() => getTurnkeyConfig(), []);

  // Safe consume of useTurnkey hook from @turnkey/react-wallet-kit
  const turnkey = useTurnkey();
  const {
    authState,
    clientState,
    handleLogin,
    clearAllSessions,
    user,
    wallets,
    refreshWallets,
  } = turnkey;

  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [selectedNetworkId, setSelectedNetworkIdState] = useState<string>(() => {
    try {
      return localStorage.getItem('hybit_evm_network') || 'base-sepolia';
    } catch {
      return 'base-sepolia';
    }
  });

  const setSelectedNetworkId = useCallback((id: string) => {
    setSelectedNetworkIdState(id);
    try {
      localStorage.setItem('hybit_evm_network', id);
    } catch {
      // ignore
    }
  }, []);

  const selectedNetwork = useMemo(() => {
    return SUPPORTED_EVM_NETWORKS[selectedNetworkId] || SUPPORTED_EVM_NETWORKS['base-sepolia'];
  }, [selectedNetworkId]);

  // Derive EVM wallet address from Turnkey embedded wallet accounts
  const embeddedAccount = useMemo(() => {
    if (!wallets || wallets.length === 0) return null;
    for (const w of wallets) {
      if (w.accounts && w.accounts.length > 0) {
        // Return first EVM address or first account address
        const evmAcc = w.accounts.find(
          (acc) =>
            acc.addressFormat === 'ADDRESS_FORMAT_ETHEREUM' ||
            (acc.address && acc.address.startsWith('0x'))
        );
        if (evmAcc) return { wallet: w, account: evmAcc };
        return { wallet: w, account: w.accounts[0] };
      }
    }
    return null;
  }, [wallets]);

  const walletAddress = embeddedAccount?.account?.address || '';
  const walletId = embeddedAccount?.wallet?.walletId || null;
  const hasWallet = Boolean(walletAddress);

  // Authenticated state derived from Turnkey SDK
  const isAuthenticated = authState === AuthState.Authenticated;
  const isLoading = clientState === ClientState.Loading;

  // Extract user details
  const userEmail = user?.userEmail || null;
  const userName = user?.userName || null;
  const turnkeyUserId = user?.userId || null;

  // Refresh wallets whenever user authenticates
  useEffect(() => {
    if (isAuthenticated && refreshWallets) {
      refreshWallets().catch((err) => {
        console.warn('Failed to refresh Turnkey wallets:', err);
      });
    }
  }, [isAuthenticated, refreshWallets]);

  // Login handler with protection against duplicate submissions
  const login = useCallback(async () => {
    if (isAuthenticating) return;

    if (!config.isConfigured) {
      const missingList = config.missingConfigFields || [];
      const missingText = missingList.length > 0 ? missingList.join(' and ') : 'Organization ID & Auth Proxy Config ID';
      const detailMsg = `Turnkey configuration incomplete: ${missingText} required.`;
      setAuthError(detailMsg);
      setShowConfigModal(true);
      showToast(
        'Turnkey Setup Required',
        `Please configure ${missingText} in your environment variables.`,
        'warning'
      );
      return;
    }

    setIsAuthenticating(true);
    setAuthError(null);

    try {
      await handleLogin({
        title: 'Hybit — Embedded Wallet',
      });
      showToast('Welcome to Hybit', 'Turnkey embedded wallet session active', 'success');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      console.warn('[Turnkey Login Notice]:', msg);
      // Ignore user closing the modal or canceling
      if (!msg.toLowerCase().includes('cancel') && !msg.toLowerCase().includes('closed')) {
        setAuthError(msg);
        showToast('Authentication Error', msg, 'error');
      }
    } finally {
      setIsAuthenticating(false);
    }
  }, [isAuthenticating, config.isConfigured, config.missingConfigFields, handleLogin, showToast]);

  // Logout handler using supported Turnkey clearAllSessions
  const logout = useCallback(async () => {
    try {
      if (clearAllSessions) {
        await clearAllSessions();
      }
      showToast('Logged Out', 'Your Turnkey session was securely cleared.', 'info');
    } catch (err) {
      console.warn('Error during Turnkey logout:', err);
    }
  }, [clearAllSessions, showToast]);

  const clearError = useCallback(() => {
    setAuthError(null);
  }, []);

  const openConfigInfo = useCallback(() => {
    setShowConfigModal(true);
  }, []);

  return (
    <TurnkeyAuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        isAuthenticating,
        isConfigured: config.isConfigured,
        missingConfigFields: config.missingConfigFields,
        authError,
        walletAddress,
        hasWallet,
        userEmail,
        userName,
        turnkeyUserId,
        walletId,
        selectedNetworkId,
        selectedNetwork,
        setSelectedNetworkId,
        login,
        logout,
        clearError,
        openConfigInfo,
        showConfigModal,
        setShowConfigModal,
      }}
    >
      {children}
    </TurnkeyAuthContext.Provider>
  );
};

export const useTurnkeyAuth = (): TurnkeyAuthContextValue => {
  const context = useContext(TurnkeyAuthContext);
  if (!context) {
    throw new Error('useTurnkeyAuth must be used within a TurnkeyAuthProvider');
  }
  return context;
};
