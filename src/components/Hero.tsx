import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Download } from 'lucide-react';
import { PhoneMockup } from './PhoneMockup';
import { useToast } from '../context/ToastContext';

interface HeroProps {
  onLaunchApp: () => void;
  onDownload?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onLaunchApp, onDownload }) => {
  const { showComingSoon } = useToast();

  const handleDownloadClick = () => {
    if (onDownload) {
      onDownload();
    } else {
      showComingSoon('Hybit Mobile App');
    }
  };
  return (
    <section className="relative pt-28 pb-16 sm:pt-36 sm:pb-24 lg:pt-40 lg:pb-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Typography & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
            
            {/* Subtle Brand Kicker - Clean unboxed metadata */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2 text-xs font-medium text-neutral-400 mb-6 tracking-wide"
            >
              <span className="text-neutral-200">A clearer way to use crypto</span>
              <span className="text-neutral-600">·</span>
              <span>Self-Custody Interface</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-[68px] font-extrabold tracking-tight text-white leading-[1.08] max-w-2xl text-balance"
            >
              Crypto, clear at a{' '}
              <span className="text-[#0095FF]">
                glance.
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.2 }}
              className="mt-6 text-lg sm:text-xl text-neutral-300 leading-relaxed max-w-xl text-balance"
            >
              Your assets, in one place. Send, receive, and swap crypto without the usual clutter.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.3 }}
              className="mt-8 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
            >
              <button
                onClick={onLaunchApp}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-[#0095FF] hover:bg-[#0080E0] text-white text-base font-semibold shadow-md shadow-black/20 active:scale-[0.98] transition-all cursor-pointer group"
              >
                <span>Open Hybit</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>

              <button
                onClick={handleDownloadClick}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/[0.06] hover:bg-white/[0.1] border border-white/10 text-white text-base font-medium active:scale-[0.98] transition-all cursor-pointer"
              >
                <Download className="w-4 h-4 text-neutral-400" />
                <span>Download</span>
                <span className="text-xs font-mono text-neutral-400 ml-1">
                  · Coming soon
                </span>
              </button>
            </motion.div>

            {/* Honest Product Principles (Adjacent to CTA) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-10 pt-8 border-t border-white/[0.07] grid grid-cols-3 gap-6 sm:gap-8 w-full max-w-lg"
            >
              <div>
                <div className="text-sm font-semibold text-white">Self-Custody</div>
                <div className="text-xs text-neutral-400 mt-1">Your keys remain in your control</div>
              </div>
              <div>
                <div className="text-sm font-semibold text-white">Multi-Chain</div>
                <div className="text-xs text-neutral-400 mt-1">Ethereum, Base, Solana & Arbitrum</div>
              </div>
              <div>
                <div className="text-sm font-semibold text-white">Clutter-Free</div>
                <div className="text-xs text-neutral-400 mt-1">Clean numbers, clear actions</div>
              </div>
            </motion.div>

          </div>

          {/* Right Column: Phone Mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, type: 'spring', damping: 25 }}
            className="lg:col-span-5 flex justify-center items-center relative"
          >
            <PhoneMockup />
          </motion.div>

        </div>
      </div>
    </section>
  );
};
