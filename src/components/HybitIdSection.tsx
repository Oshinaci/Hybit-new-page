import React, { useState } from 'react';
import { motion } from 'motion/react';
import { AtSign, Check, Copy, Shield, AlertCircle, ArrowRight, UserCheck } from 'lucide-react';
import { BaseIcon, EthereumIcon, SolanaIcon } from './icons/NetworkIcons';

export const HybitIdSection: React.FC = () => {
  const [selectedNetwork, setSelectedNetwork] = useState<'base' | 'ethereum' | 'solana'>('base');
  const [copied, setCopied] = useState(false);

  const sampleIdentities = {
    base: {
      name: 'Galang Pratama',
      handle: '@galang',
      address: '0x7F2a8934C31952eB101569421A4B0224b8b1e',
      shortAddress: '0x7F2a...8b1e',
      network: 'Base L2',
      icon: BaseIcon,
      status: 'Recipient Verified',
    },
    ethereum: {
      name: 'Galang Pratama',
      handle: '@galang',
      address: '0x7F2a8934C31952eB101569421A4B0224b8b1e',
      shortAddress: '0x7F2a...8b1e',
      network: 'Ethereum Mainnet',
      icon: EthereumIcon,
      status: 'Recipient Verified',
    },
    solana: {
      name: 'Galang Pratama',
      handle: '@galang',
      address: '8b1e9421A4B0224b7F2a8934C31952eB10156SOL',
      shortAddress: '8b1e...2SOL',
      network: 'Solana Network',
      icon: SolanaIcon,
      status: 'Recipient Verified',
    },
  };

  const activeIdentity = sampleIdentities[selectedNetwork];
  const ActiveIcon = activeIdentity.icon;

  const handleCopy = () => {
    navigator.clipboard?.writeText(activeIdentity.handle);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="hybit-id" className="py-24 sm:py-32 relative border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-xs font-semibold text-[#0095FF] uppercase tracking-wider mb-3">
            Product Concept
          </p>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
            An ID instead of a long address.
          </h2>

          <p className="mt-4 text-base sm:text-lg text-neutral-300 max-w-2xl mx-auto leading-relaxed text-balance">
            Use your Hybit ID to help others find you and prepare a crypto transfer. Check the network and destination before you send.
          </p>

          {/* Transparent Product Scope Notice */}
          <div className="mt-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs text-neutral-400">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400/80" />
            <span>Design prototype & emerging concept · Not a live cross-chain name service</span>
          </div>
        </div>

        {/* 2-Column Presentation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Conceptual Breakdown */}
          <div className="lg:col-span-6 space-y-6">
            <div className="p-6 rounded-2xl bg-[#141418] border border-white/[0.08]">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center shrink-0 text-[#0095FF]">
                  <AtSign className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white">Familiar handles, verified destinations</h3>
                  <p className="text-sm text-neutral-400 mt-1 leading-relaxed">
                    Long hex strings like <span className="font-mono text-neutral-300 text-xs">0x7F2a...8b1e</span> are easy to misread. A Hybit ID like <span className="text-white font-medium">@galang</span> helps users recognize who they are preparing a transfer for.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#141418] border border-white/[0.08]">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center shrink-0 text-emerald-400">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white">Always verify the network before sending</h3>
                  <p className="text-sm text-neutral-400 mt-1 leading-relaxed">
                    Hybit ID does not hide blockchain realities. Before any transaction is signed, the wallet clearly displays the destination chain, token, and underlying address for explicit confirmation.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#141418] border border-white/[0.08]">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center shrink-0 text-sky-400">
                  <UserCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white">Clear design boundaries</h3>
                  <p className="text-sm text-neutral-400 mt-1 leading-relaxed">
                    Hybit does not claim instant phone-number routing or off-chain settlement. Hybit ID is conceived as an intuitive frontend identifier to prevent costly copy-paste mistakes.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Design Prototype Card */}
          <div className="lg:col-span-6">
            <div className="rounded-3xl bg-[#141418] border border-white/10 p-6 sm:p-8 shadow-2xl shadow-black/60 relative overflow-hidden">
              
              {/* Card Header & Prototype Badge */}
              <div className="flex items-center justify-between pb-6 border-b border-white/[0.08]">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider">
                    Interactive Concept Preview
                  </span>
                </div>
                <span className="text-[11px] font-mono text-neutral-500">
                  Sample: @galang
                </span>
              </div>

              {/* Sample Profile Identity View */}
              <div className="py-6">
                <div className="flex items-center justify-between gap-4 p-4 rounded-2xl bg-[#0F0F13] border border-white/[0.06]">
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#0095FF] to-sky-400 flex items-center justify-center text-white font-bold text-lg shadow-md">
                      G
                    </div>
                    <div>
                      <div className="text-base font-bold text-white flex items-center gap-2">
                        <span>{activeIdentity.name}</span>
                      </div>
                      <div className="text-xs font-mono text-[#0095FF]">
                        {activeIdentity.handle}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] border border-white/10 text-xs font-medium text-neutral-200 transition-colors cursor-pointer"
                    title="Copy handle"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-neutral-400" />}
                    <span>{copied ? 'Copied' : 'Share ID'}</span>
                  </button>
                </div>
              </div>

              {/* Network Selector Tabs */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-neutral-400">
                  <span>Destination Network Check</span>
                  <span className="text-neutral-500">Select network to test resolution</span>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {(['base', 'ethereum', 'solana'] as const).map((net) => {
                    const isSelected = selectedNetwork === net;
                    const item = sampleIdentities[net];
                    const Icon = item.icon;

                    return (
                      <button
                        key={net}
                        onClick={() => setSelectedNetwork(net)}
                        className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-white/[0.08] border-[#0095FF] text-white shadow-sm'
                            : 'bg-white/[0.02] border-white/[0.06] text-neutral-400 hover:text-white hover:bg-white/[0.04]'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <span className="text-xs font-medium">{net === 'base' ? 'Base' : net === 'ethereum' ? 'Ethereum' : 'Solana'}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Resolved Destination Preview */}
              <div className="mt-5 p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-neutral-400">Resolved Destination Address:</span>
                  <span className="text-emerald-400 font-mono text-[11px] flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    {activeIdentity.status}
                  </span>
                </div>

                <div className="p-2.5 rounded-xl bg-black/40 border border-white/[0.05] font-mono text-xs text-neutral-200 break-all select-all">
                  {activeIdentity.address}
                </div>

                <div className="flex items-center justify-between pt-1 text-[11px] text-neutral-500">
                  <span className="flex items-center gap-1">
                    <ActiveIcon className="w-3.5 h-3.5" />
                    <span>Target: {activeIdentity.network}</span>
                  </span>
                  <span>Confirmation required before signing</span>
                </div>
              </div>

              {/* Design Prototype Watermark Note */}
              <p className="mt-4 text-[11px] text-neutral-500 text-center">
                Design visualization only · Actual transfers require full network validation and user signature
              </p>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
