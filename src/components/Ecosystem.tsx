import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  EthereumIcon,
  BaseIcon,
  PolygonIcon,
  OptimismIcon,
  ArbitrumIcon,
  BNBIcon,
  SolanaIcon,
  SuiIcon,
  AptosIcon,
} from './icons/NetworkIcons';
import { SupportedNetwork } from '../types';

export const Ecosystem: React.FC = () => {
  const [filter, setFilter] = useState<'ALL' | 'L2' | 'EVM' | 'Non-EVM'>('ALL');

  const networks: SupportedNetwork[] = [
    {
      id: 'ethereum',
      name: 'Ethereum',
      type: 'EVM',
      architecture: 'L1 Base Layer',
      tokenStandard: 'ERC-20 / ERC-721',
      token: 'ETH',
      description: 'The foundation of decentralized security and core high-value settlement.',
    },
    {
      id: 'base',
      name: 'Base',
      type: 'L2',
      architecture: 'Optimistic Rollup',
      tokenStandard: 'ERC-20 (L2)',
      token: 'ETH',
      description: 'Ethereum layer 2 incubated by Coinbase, built for everyday consumer applications.',
    },
    {
      id: 'arbitrum',
      name: 'Arbitrum One',
      type: 'L2',
      architecture: 'Nitro Rollup',
      tokenStandard: 'ERC-20 (Arbitrum)',
      token: 'ETH',
      description: 'Leading Ethereum rollup with deep liquidity across decentralized applications.',
    },
    {
      id: 'optimism',
      name: 'Optimism',
      type: 'L2',
      architecture: 'OP Stack Rollup',
      tokenStandard: 'ERC-20 (OP)',
      token: 'ETH',
      description: 'Layer 2 rollup scaling Ethereum as part of the interconnected Superchain ecosystem.',
    },
    {
      id: 'polygon',
      name: 'Polygon PoS',
      type: 'EVM',
      architecture: 'Proof-of-Stake',
      tokenStandard: 'ERC-20 (POL)',
      token: 'POL',
      description: 'High-throughput EVM chain widely used for payments, gaming, and digital assets.',
    },
    {
      id: 'bnb',
      name: 'BNB Chain',
      type: 'EVM',
      architecture: 'Proof of Staked Authority',
      tokenStandard: 'BEP-20',
      token: 'BNB',
      description: 'EVM-compatible network supported by global retail and ecosystem liquidity.',
    },
    {
      id: 'solana',
      name: 'Solana',
      type: 'Non-EVM',
      architecture: 'Parallel SVM',
      tokenStandard: 'SPL Token',
      token: 'SOL',
      description: 'Parallelized high-throughput blockchain designed for fast transfer execution.',
    },
    {
      id: 'sui',
      name: 'Sui Network',
      type: 'Non-EVM',
      architecture: 'Object-Centric Move',
      tokenStandard: 'Sui Move Coin',
      token: 'SUI',
      description: 'Object-oriented smart contract network utilizing parallel execution architecture.',
    },
    {
      id: 'aptos',
      name: 'Aptos',
      type: 'Non-EVM',
      architecture: 'Parallel Block-STM',
      tokenStandard: 'Aptos Fungible Asset',
      token: 'APT',
      description: 'Move-based blockchain built for scalability and developer-friendly safety.',
    },
  ];

  const getNetworkIcon = (id: string, className = 'w-9 h-9 sm:w-10 sm:h-10') => {
    switch (id) {
      case 'ethereum':
        return <EthereumIcon className={className} />;
      case 'base':
        return <BaseIcon className={className} />;
      case 'arbitrum':
        return <ArbitrumIcon className={className} />;
      case 'optimism':
        return <OptimismIcon className={className} />;
      case 'polygon':
        return <PolygonIcon className={className} />;
      case 'bnb':
        return <BNBIcon className={className} />;
      case 'solana':
        return <SolanaIcon className={className} />;
      case 'sui':
        return <SuiIcon className={className} />;
      case 'aptos':
        return <AptosIcon className={className} />;
      default:
        return <EthereumIcon className={className} />;
    }
  };

  const filteredNetworks = networks.filter((net) => {
    if (filter === 'ALL') return true;
    return net.type === filter;
  });

  return (
    <section id="ecosystem" className="py-24 sm:py-32 relative border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-xs font-semibold text-[#0095FF] uppercase tracking-wider mb-3">
              Multi-Chain Ecosystem
            </p>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
              Supported networks.
            </h2>
            
            <p className="mt-3 text-base text-neutral-300 max-w-xl">
              View balances and prepare transactions across Ethereum, Base, Solana, Arbitrum, and other networks without switching apps.
            </p>
          </div>

          {/* Interactive filter tabs */}
          <div className="flex items-center p-1 rounded-xl bg-white/[0.05] border border-white/[0.08] w-fit">
            {(['ALL', 'L2', 'EVM', 'Non-EVM'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setFilter(t)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                  filter === t
                    ? 'bg-[#0095FF] text-white shadow-sm font-semibold'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Network Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredNetworks.map((net) => (
            <motion.div
              key={net.id}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.2 }}
              className="p-6 rounded-2xl bg-[#141418] hover:bg-[#18181D] border border-white/[0.08] hover:border-white/[0.16] transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center shrink-0">
                      {getNetworkIcon(net.id, 'w-9 h-9 sm:w-10 sm:h-10')}
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white">{net.name}</h3>
                      <span className="text-[10px] text-neutral-400 font-mono">
                        Native Token: {net.token}
                      </span>
                    </div>
                  </div>

                  <span className="text-[11px] font-mono text-neutral-400 px-2 py-0.5 rounded bg-white/[0.04] border border-white/[0.06]">
                    {net.type}
                  </span>
                </div>

                <p className="text-xs text-neutral-400 leading-relaxed mb-6">
                  {net.description}
                </p>
              </div>

              {/* Technical Specifications Row */}
              <div className="grid grid-cols-2 gap-2 pt-4 border-t border-white/[0.06]">
                <div className="p-2 rounded-lg bg-white/[0.02]">
                  <div className="text-[10px] text-neutral-500 font-mono">Architecture</div>
                  <div className="text-xs font-mono font-medium text-neutral-200 mt-0.5 truncate">{net.architecture}</div>
                </div>
                <div className="p-2 rounded-lg bg-white/[0.02]">
                  <div className="text-[10px] text-neutral-500 font-mono">Standard</div>
                  <div className="text-xs font-mono font-medium text-neutral-200 mt-0.5 truncate">{net.tokenStandard}</div>
                </div>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
