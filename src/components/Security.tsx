import React from 'react';
import { motion } from 'motion/react';
import {
  KeyRound,
  Lock,
  ShieldCheck,
  CheckCircle2,
  Eye,
  Cpu,
} from 'lucide-react';

export const Security: React.FC = () => {
  const securityPillars = [
    {
      id: 'explicit-confirmation',
      title: 'Explicit Transaction Confirmation',
      subtitle: 'Clear Consent',
      description:
        'Review the asset, amount, destination, network, and fees before authorizing a transaction. No hidden approvals or blind signatures.',
      icon: Eye,
      badge: 'Transparent Review',
      points: [
        'Detailed recipient and address preview',
        'Visible network fee and execution breakdown',
        'Human-readable transaction summaries',
      ],
    },
    {
      id: 'self-custody',
      title: 'Self-Custody Ownership',
      subtitle: 'User Authority',
      description:
        'You maintain authority over your assets. Hybit does not hold your private keys, cannot freeze your funds, and cannot access your assets.',
      icon: KeyRound,
      badge: 'Non-Custodial',
      points: [
        'Client-side transaction authorization',
        'No custodial broker holding your funds',
        'Direct user signature required',
      ],
    },
    {
      id: 'scoped-signing',
      title: 'Scoped Signing Requests',
      subtitle: 'Action Isolation',
      description:
        'Every transaction request is isolated to the specific network and action selected. You always know which blockchain you are interacting with.',
      icon: Lock,
      badge: 'Network Scoped',
      points: [
        'Target chain clearly identified',
        'Contract and transfer details displayed',
        'Strict confirmation prompts',
      ],
    },
    {
      id: 'turnkey-architecture',
      title: 'Turnkey Infrastructure Roadmap',
      subtitle: 'Embedded Key Security',
      description:
        'Preparing integration with Turnkey embedded wallet infrastructure, combining secure enclaves with granular policies to protect private credentials.',
      icon: Cpu,
      badge: 'Infrastructure Target',
      points: [
        'Hardware security module (HSM) backing',
        'Separation of authentication from key signing',
        'Designed for embedded self-custody',
      ],
    },
  ];

  return (
    <section id="security" className="py-24 sm:py-32 relative bg-[#09090B] border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-xs font-semibold text-[#0095FF] uppercase tracking-wider mb-3">
            Security Principles
          </p>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
            Clear actions.
            <span className="block text-neutral-400 mt-1">Clear consent.</span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-neutral-300 max-w-2xl mx-auto leading-relaxed text-balance">
            Review the asset, amount, destination, network, and fees before authorizing a transaction.
          </p>
        </div>

        {/* Security Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {securityPillars.map((pillar, idx) => {
            const Icon = pillar.icon;

            return (
              <motion.div
                key={pillar.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="relative rounded-3xl bg-[#141418] border border-white/[0.08] hover:border-white/[0.16] p-7 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center text-[#0095FF]">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-[11px] font-mono font-medium text-emerald-400">
                      {pillar.badge}
                    </span>
                  </div>

                  <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                    {pillar.subtitle}
                  </span>
                  
                  <h3 className="text-xl font-bold text-white mt-1 mb-3">
                    {pillar.title}
                  </h3>

                  <p className="text-sm text-neutral-400 leading-relaxed mb-6">
                    {pillar.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/[0.06] space-y-2">
                  {pillar.points.map((pt) => (
                    <div key={pt} className="flex items-center gap-2 text-xs text-neutral-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{pt}</span>
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
