// Turnkey configuration and EVM network definitions for Hybit Phase 2

export interface TurnkeyConfig {
  organizationId: string;
  authProxyConfigId: string;
  apiBaseUrl?: string;
  authProxyUrl?: string;
  isConfigured: boolean;
  missingConfigFields: string[];
}

export const getTurnkeyConfig = (): TurnkeyConfig => {
  const organizationId =
    ((import.meta.env.VITE_TURNKEY_ORGANIZATION_ID as string) || '').trim();
  const authProxyConfigId =
    ((import.meta.env.VITE_TURNKEY_AUTH_PROXY_CONFIG_ID as string) || '').trim();
  const apiBaseUrl =
    (import.meta.env.VITE_TURNKEY_API_BASE_URL as string) || undefined;
  const authProxyUrl =
    (import.meta.env.VITE_TURNKEY_AUTH_PROXY_URL as string) || undefined;

  const missingConfigFields: string[] = [];
  if (!organizationId || organizationId === 'YOUR_TURNKEY_ORGANIZATION_ID') {
    missingConfigFields.push('VITE_TURNKEY_ORGANIZATION_ID');
  }
  if (!authProxyConfigId || authProxyConfigId === 'YOUR_AUTH_PROXY_CONFIG_ID') {
    missingConfigFields.push('VITE_TURNKEY_AUTH_PROXY_CONFIG_ID');
  }

  const isConfigured = missingConfigFields.length === 0;

  return {
    organizationId,
    authProxyConfigId,
    apiBaseUrl,
    authProxyUrl,
    isConfigured,
    missingConfigFields,
  };
};

export interface EvmNetwork {
  id: string;
  chainId: number;
  name: string;
  displayName: string;
  symbol: string;
  rpcUrl: string;
  explorerUrl: string;
  isTestnet: boolean;
  badge: string;
}

// Initial testing networks for Hybit EVM: Ethereum Sepolia (11155111) and Base Sepolia (84532)
export const SUPPORTED_EVM_NETWORKS: Record<string, EvmNetwork> = {
  'ethereum-sepolia': {
    id: 'ethereum-sepolia',
    chainId: 11155111,
    name: 'Ethereum Sepolia',
    displayName: 'Ethereum Sepolia (Testnet)',
    symbol: 'SepoliaETH',
    rpcUrl: 'https://rpc.sepolia.org',
    explorerUrl: 'https://sepolia.etherscan.io',
    isTestnet: true,
    badge: 'Sepolia 11155111',
  },
  'base-sepolia': {
    id: 'base-sepolia',
    chainId: 84532,
    name: 'Base Sepolia',
    displayName: 'Base Sepolia (Testnet)',
    symbol: 'ETH',
    rpcUrl: 'https://sepolia.base.org',
    explorerUrl: 'https://sepolia.basescan.org',
    isTestnet: true,
    badge: 'Base Sepolia 84532',
  },
  'base': {
    id: 'base',
    chainId: 8453,
    name: 'Base',
    displayName: 'Base L2',
    symbol: 'ETH',
    rpcUrl: 'https://mainnet.base.org',
    explorerUrl: 'https://basescan.org',
    isTestnet: false,
    badge: 'Base 8453',
  },
  'ethereum': {
    id: 'ethereum',
    chainId: 1,
    name: 'Ethereum',
    displayName: 'Ethereum Mainnet',
    symbol: 'ETH',
    rpcUrl: 'https://eth.llamarpc.com',
    explorerUrl: 'https://etherscan.io',
    isTestnet: false,
    badge: 'Mainnet 1',
  },
};
