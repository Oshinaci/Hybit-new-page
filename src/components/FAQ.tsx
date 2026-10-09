import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { FAQItem } from '../types';

export const FAQ: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>('faq-1');

  const faqs: FAQItem[] = [
    {
      id: 'faq-1',
      question: 'What is Hybit?',
      answer:
        'Hybit is a self-custody crypto wallet built around the principle of clarity. It brings your assets across multiple blockchains into one clean, unified view so you can understand your balances, transfer crypto, and swap tokens without getting bogged down by blockchain clutter.',
      category: 'general',
    },
    {
      id: 'faq-2',
      question: 'Is Hybit an exchange or a bank?',
      answer:
        'No. Hybit is not an exchange, a bank, or a custodial financial institution. You maintain sovereign self-custody over your assets. Hybit provides a streamlined interface to interact directly with decentralized networks; we never hold, freeze, or take possession of your funds.',
      category: 'security',
    },
    {
      id: 'faq-3',
      question: 'How does the embedded wallet work?',
      answer:
        'An embedded wallet allows you to create and access your crypto account through familiar sign-in methods like email, keeping your wallet an integrated part of the experience rather than a separate extension or third-party app. We are engineering this infrastructure on Turnkey, separating authentication from signing authority so you retain cryptographic control.',
      category: 'general',
    },
    {
      id: 'faq-4',
      question: 'What is Hybit ID?',
      answer:
        'Hybit ID is an emerging product concept designed to replace long, error-prone hex addresses with recognizable handles (such as @galang). During transfer preparation, your Hybit ID helps verify the recipient and shows the exact destination network and address before you authorize the transaction.',
      category: 'transfers',
    },
    {
      id: 'faq-5',
      question: 'Which networks and assets does Hybit support?',
      answer:
        'Hybit connects with leading layer-1 and layer-2 blockchains including Ethereum, Base, Solana, Arbitrum, Optimism, Polygon, and BNB Chain. You can hold, track, and transact native assets, standard tokens, and digital currencies like USDC in one place.',
      category: 'transfers',
    },
    {
      id: 'faq-6',
      question: 'How are fees and transaction approvals handled?',
      answer:
        'Before any transaction is submitted, Hybit displays an explicit summary showing the asset, amount, destination address, selected network, and estimated network gas fee. You review and authorize every action directly with complete transparency.',
      category: 'fees',
    },
  ];

  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="py-24 sm:py-32 relative border-t border-white/[0.06]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-xs font-semibold text-[#0095FF] uppercase tracking-wider mb-3">
            Questions & Answers
          </p>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
            Clear answers.
            <span className="block text-neutral-400 mt-1">Direct explanations.</span>
          </h2>

          <p className="mt-4 text-base text-neutral-300 max-w-xl mx-auto leading-relaxed text-balance">
            Understand how Hybit handles custody, accounts, networks, and daily crypto interactions.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3.5">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="rounded-2xl bg-[#141418] border border-white/[0.08] hover:border-white/[0.14] transition-all overflow-hidden"
              >
                <button
                  onClick={() => toggle(faq.id)}
                  aria-expanded={isOpen}
                  className="w-full px-6 py-5 flex items-center justify-between text-left text-white font-semibold text-base sm:text-lg cursor-pointer focus:outline-none"
                >
                  <span className="pr-4">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-neutral-400 shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-[#0095FF]' : ''
                    }`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-1 text-sm text-neutral-400 leading-relaxed border-t border-white/[0.04]">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
