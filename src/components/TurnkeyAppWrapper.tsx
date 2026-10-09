import React from 'react';
import { TurnkeyProvider, type TurnkeyProviderConfig } from '@turnkey/react-wallet-kit';
import { getTurnkeyConfig } from '../config/turnkey';
import { TurnkeyAuthProvider } from '../context/TurnkeyAuthContext';

export const TurnkeyAppWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const turnkeyConfig = getTurnkeyConfig();

  // Supply official TurnkeyProvider configuration with organizationId and authProxyConfigId
  const config: TurnkeyProviderConfig = {
    organizationId: turnkeyConfig.organizationId || '00000000-0000-0000-0000-000000000000',
    authProxyConfigId: turnkeyConfig.authProxyConfigId || undefined,
    ...(turnkeyConfig.apiBaseUrl ? { apiBaseUrl: turnkeyConfig.apiBaseUrl } : {}),
    ...(turnkeyConfig.authProxyUrl ? { authProxyUrl: turnkeyConfig.authProxyUrl } : {}),
    auth: {
      createSuborgParams: {
        emailOtpAuth: {
          customWallet: {
            walletName: 'Hybit Embedded Wallet',
            walletAccounts: [
              {
                curve: 'CURVE_SECP256K1',
                pathFormat: 'PATH_FORMAT_BIP32',
                path: "m/44'/60'/0'/0/0",
                addressFormat: 'ADDRESS_FORMAT_ETHEREUM',
              },
            ],
          },
        },
        passkeyAuth: {
          customWallet: {
            walletName: 'Hybit Embedded Wallet',
            walletAccounts: [
              {
                curve: 'CURVE_SECP256K1',
                pathFormat: 'PATH_FORMAT_BIP32',
                path: "m/44'/60'/0'/0/0",
                addressFormat: 'ADDRESS_FORMAT_ETHEREUM',
              },
            ],
          },
        },
      },
    },
    ui: {
      darkMode: true,
      authModal: {
        methods: {
          emailOtpAuthEnabled: true,
          passkeyAuthEnabled: true,
          walletAuthEnabled: false,
        },
        methodOrder: ['email', 'passkey'],
      },
    },
  };

  return (
    <TurnkeyProvider
      config={config}
      callbacks={{
        onError: (error) => {
          console.error('[Turnkey SDK Error]:', error?.message || error);
        },
      }}
    >
      <TurnkeyAuthProvider>{children}</TurnkeyAuthProvider>
    </TurnkeyProvider>
  );
};
