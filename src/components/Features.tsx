import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Wallet,
  Repeat,
  Layers,
  LineChart,
  ShieldCheck,
  Zap,
  ArrowRight,
  CheckCircle2,
  Cpu,
} from 'lucide-react';

export const Features: React.FC<{ onExploreFeature?: (id: string) => void }> = ({
  onExploreFeature,
}) => {
  const [activeFeature, setActiveFeature] = useState<string | null>(null);

  const features = [
    {
      id: 'unified-balances',
      title: 'Unified Balances',
      subtitle: 'Multi-Chain Overview',
      description:
        'See your total portfolio across Ethereum, Base, Solana, and Arbitrum in one clear view. No manual network toggling just to check your holdings.',
      icon: Wallet,
      details: [
        'Multi-network balance aggregation',
        'Transparent asset values by token',
        'Consolidated portfolio totals',
      ],
    },
    {
      id: 'direct-transfers',
      title: 'Direct Transfers',
      subtitle: 'Send & Receive',
      description:
        'Transfer crypto with clear destination verification. Review the recipient, network, and estimated fees before authorizing any transaction.',
      icon: Zap,
      details: [
        'Explicit destination address checks',
        'Network and fee breakdown before signing',
        'Real-time transaction status feedback',
      ],
    },
    {
      id: 'straightforward-swaps',
      title: 'Straightforward Swaps',
      subtitle: 'Token Exchange',
      description:
        'Trade tokens directly from your wallet interface. Inspect exchange rates, minimum received amounts, and network gas without hidden markups.',
      icon: Repeat,
      details: [
        'Transparent quote and price impacts',
        'Customizable slippage parameters',
        'Direct on-chain swap routing',
      ],
    },
    {
      id: 'cross-chain-movement',
      title: 'Cross-Network Movement',
      subtitle: 'Asset Bridging',
      description:
        'Move supported assets between networks with step-by-step progress tracking, so you always know where your transfer stands.',
      icon: Layers,
      details: [
        'Supported routes across major ecosystems',
        'Step-by-step transfer progress',
        'Direct deposit to your destination address',
      ],
    },
    {
      id: 'clear-history',
      title: 'Clear Transaction History',
      subtitle: 'Activity & Receipts',
      description:
        'Understand what happened with a clean, timestamped record of every incoming and outgoing transfer, complete with block explorer links.',
      icon: LineChart,
      details: [
        'Detailed transaction timestamps and values',
        'Network and counterparty details',
        'Direct verification on block explorers',
      ],
    },
    {
      id: 'self-custody',
      title: 'Self-Custodial Control',
      subtitle: 'Your Keys, Your Authority',
      description:
        'You maintain authority over your assets. Hybit never acts as a custodial broker, cannot freeze your funds, and requires your consent to sign.',
      icon: ShieldCheck,
      details: [
        'Client-side transaction authorization',
        'No custodial intermediary holding your assets',
        'Designed for embedded self-custody',
      ],
    },
  ];

  return (
    <section id="features" className="py-24 sm:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 sm:mb-20">
          <p className="text-xs font-semibold text-[#0095FF] uppercase tracking-wider mb-3">
            Product Overview
          </p>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
            Everything you need.
            <span className="block text-neutral-400 mt-1">Nothing to figure out.</span>
          </h2>
          
          <p className="mt-4 text-base sm:text-lg text-neutral-300 max-w-2xl mx-auto leading-relaxed text-balance">
            Check your balance, find an asset, or make a transfer from a single, familiar interface. Hybit puts the important details first, so you can act with confidence.
          </p>
        </div>

        {/* 6 Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            const isHovered = activeFeature === feature.id;

            return (
              <motion.div
                key={feature.id}
                onMouseEnter={() => setActiveFeature(feature.id)}
                onMouseLeave={() => setActiveFeature(null)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="group relative rounded-3xl bg-[#141418] hover:bg-[#18181D] border border-white/[0.08] hover:border-white/[0.18] p-7 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-lg shadow-black/40"
              >
                <div>
                  {/* Icon & Index */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-13 h-13 rounded-2xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center group-hover:border-[#0095FF]/50 group-hover:bg-[#0095FF]/10 transition-colors">
                      <Icon className="w-6 h-6 text-[#0095FF] transition-colors" />
                    </div>
                    <span className="text-xs font-mono text-neutral-500 tracking-wider">
                      0{idx + 1}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <div className="mb-3">
                    <span className="text-xs font-semibold text-[#0095FF] uppercase tracking-wider">
                      {feature.subtitle}
                    </span>
                    <h3 className="text-xl font-bold text-white mt-1 group-hover:text-white transition-colors">
                      {feature.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-neutral-400 leading-relaxed mb-6">
                    {feature.description}
                  </p>
                </div>

                {/* Highlights List */}
                <div className="pt-4 border-t border-white/[0.06] space-y-2">
                  {feature.details.map((item) => (
                    <div key={item} className="flex items-center gap-2 text-xs text-neutral-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
