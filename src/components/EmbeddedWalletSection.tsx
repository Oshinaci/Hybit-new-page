import React from 'react';
import { motion } from 'motion/react';
import { KeyRound, Shield, Smartphone, Layers, CheckCircle2, Lock, Cpu } from 'lucide-react';

export const EmbeddedWalletSection: React.FC = () => {
  return (
    <section id="embedded-wallet" className="py-24 sm:py-32 relative border-t border-white/[0.06] bg-[#0A0A0D]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-xs font-semibold text-[#0095FF] uppercase tracking-wider mb-3">
            Account Architecture
          </p>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
            Your wallet starts with you.
          </h2>

          <p className="mt-4 text-base sm:text-lg text-neutral-300 max-w-2xl mx-auto leading-relaxed text-balance">
            Create an embedded wallet and access it through the sign-in methods Hybit supports. Your wallet stays part of the experience, not a separate app you have to manage.
          </p>
        </div>

        {/* 3 Step Architecture Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          
          <div className="p-7 rounded-3xl bg-[#141418] border border-white/[0.08] flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-[#0095FF] mb-6">
                <Smartphone className="w-6 h-6" />
              </div>
              <span className="text-xs font-mono text-neutral-500 uppercase tracking-wider">Step 01 · Access</span>
              <h3 className="text-lg font-bold text-white mt-1 mb-2">Sign in your way</h3>
              <p className="text-sm text-neutral-400 leading-relaxed">
                Connect using supported login methods like email. No browser extensions, separate app installs, or external popups required to view your account.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-white/[0.06] text-xs text-neutral-500 font-mono">
              Familiar sign-in · Zero extension clutter
            </div>
          </div>

          <div className="p-7 rounded-3xl bg-[#141418] border border-white/[0.08] flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-emerald-400 mb-6">
                <KeyRound className="w-6 h-6" />
              </div>
              <span className="text-xs font-mono text-neutral-500 uppercase tracking-wider">Step 02 · Custody</span>
              <h3 className="text-lg font-bold text-white mt-1 mb-2">Auth is not custody</h3>
              <p className="text-sm text-neutral-400 leading-relaxed">
                Signing in verifies who you are, but signing authority stays with you. Hybit cannot execute transfers or access private signing credentials without your direct consent.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-white/[0.06] text-xs text-neutral-500 font-mono">
              Self-custody signing · User consent required
            </div>
          </div>

          <div className="p-7 rounded-3xl bg-[#141418] border border-white/[0.08] flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-sky-400 mb-6">
                <Cpu className="w-6 h-6" />
              </div>
              <span className="text-xs font-mono text-neutral-500 uppercase tracking-wider">Step 03 · Infrastructure</span>
              <h3 className="text-lg font-bold text-white mt-1 mb-2">Turnkey-powered roadmap</h3>
              <p className="text-sm text-neutral-400 leading-relaxed">
                Designed for Turnkey embedded wallet infrastructure, combining secure enclaves and policy engines to protect keys while keeping the user experience intuitive and direct.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-white/[0.06] text-xs text-neutral-500 font-mono">
              Turnkey embedded architecture
            </div>
          </div>

        </div>

        {/* Comparison Table / Clarification Card */}
        <div className="rounded-3xl bg-[#141418] border border-white/10 p-6 sm:p-8">
          <div className="max-w-3xl">
            <h3 className="text-lg font-bold text-white">
              Why embedded self-custody matters
            </h3>
            <p className="text-sm text-neutral-400 mt-1 leading-relaxed">
              Traditional crypto workflows force users through multiple disparate tools: separate extension windows, manual network RPC setups, and seed-phrase management. An embedded wallet brings self-custody directly into the app you are using.
            </p>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
              <div className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">
                Traditional Extension Wallets
              </div>
              <ul className="space-y-2 text-xs text-neutral-400">
                <li className="flex items-center gap-2">
                  <span className="text-rose-400/80">✕</span>
                  <span>Requires external browser extensions and popups</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-rose-400/80">✕</span>
                  <span>Manual network RPC configuration for each L2</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-rose-400/80">✕</span>
                  <span>Seed phrases vulnerable to loss or phishing</span>
                </li>
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-white/[0.04] border border-[#0095FF]/30">
              <div className="text-xs font-semibold text-[#0095FF] uppercase tracking-wider mb-2">
                Hybit Embedded Experience
              </div>
              <ul className="space-y-2 text-xs text-neutral-200">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Wallet is an integral part of the interface</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Multi-network support without manual RPC switching</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Clear transaction review before every signature</span>
                </li>
              </ul>
            </div>
          </div>

          <p className="mt-4 text-[11px] text-neutral-500 font-mono">
            * Note: Hybit is currently in frontend development. The embedded wallet architecture is being engineered for Turnkey infrastructure.
          </p>
        </div>

      </div>
    </section>
  );
};
