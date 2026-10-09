import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldAlert, X, Copy, ExternalLink, Check, KeyRound } from 'lucide-react';
import { useTurnkeyAuth } from '../context/TurnkeyAuthContext';
import { useToast } from '../context/ToastContext';

export const TurnkeyConfigModal: React.FC = () => {
  const { showConfigModal, setShowConfigModal, isConfigured } = useTurnkeyAuth();
  const { showToast } = useToast();
  const [copiedKey, setCopiedKey] = React.useState<string | null>(null);

  if (!showConfigModal) return null;

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedKey(id);
    showToast('Copied to Clipboard', text, 'copy');
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
          onClick={() => setShowConfigModal(false)}
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-lg rounded-2xl bg-[#141419] border border-white/10 shadow-2xl p-6 text-white z-10 space-y-5"
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-4 border-b border-white/[0.08] pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/20">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white tracking-tight">
                  Turnkey Embedded Wallet Configuration
                </h3>
                <p className="text-xs text-neutral-400 mt-0.5">
                  {isConfigured ? 'Connected to Turnkey Provider' : 'Credentials required for live wallet creation'}
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowConfigModal(false)}
              className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/[0.06] transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Content */}
          <div className="space-y-4 text-xs text-neutral-300 leading-relaxed">
            <p>
              Hybit uses <span className="font-semibold text-white">@turnkey/react-wallet-kit</span> to
              provide real, embedded EVM self-custody wallets powered by Turnkey sub-organizations.
            </p>

            <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.08] space-y-2 font-mono text-[11px]">
              <div className="text-neutral-400 font-semibold uppercase tracking-wider text-[10px]">
                Required Environment Variables
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center justify-between gap-2 p-2 rounded-lg bg-black/40 border border-white/5">
                  <span className="text-amber-300">VITE_TURNKEY_ORGANIZATION_ID</span>
                  <button
                    onClick={() => handleCopy('VITE_TURNKEY_ORGANIZATION_ID', 'org')}
                    className="text-neutral-400 hover:text-white transition-colors cursor-pointer p-1"
                    title="Copy variable name"
                  >
                    {copiedKey === 'org' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
                <div className="flex items-center justify-between gap-2 p-2 rounded-lg bg-black/40 border border-white/5">
                  <span className="text-amber-300">VITE_TURNKEY_AUTH_PROXY_CONFIG_ID</span>
                  <button
                    onClick={() => handleCopy('VITE_TURNKEY_AUTH_PROXY_CONFIG_ID', 'proxy')}
                    className="text-neutral-400 hover:text-white transition-colors cursor-pointer p-1"
                    title="Copy variable name"
                  >
                    {copiedKey === 'proxy' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <div className="text-neutral-400 font-semibold uppercase tracking-wider text-[10px] pt-1">
                Optional Environment Variable
              </div>
              <div className="flex items-center justify-between gap-2 p-2 rounded-lg bg-black/40 border border-white/5">
                <span className="text-neutral-300">VITE_TURNKEY_API_BASE_URL</span>
                <span className="text-neutral-500 text-[10px]">default: https://api.turnkey.com</span>
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="font-semibold text-white flex items-center gap-1.5">
                <KeyRound className="w-3.5 h-3.5 text-[#0095FF]" />
                How to set up Turnkey Auth Proxy:
              </div>
              <ol className="list-decimal list-inside space-y-1 text-neutral-400 pl-1">
                <li>Create an account at <a href="https://turnkey.com" target="_blank" rel="noreferrer" className="text-[#0095FF] hover:underline inline-flex items-center gap-0.5">Turnkey Dashboard <ExternalLink className="w-2.5 h-2.5" /></a></li>
                <li>Go to <strong>Organization Settings</strong> and copy your <strong>Organization ID</strong> (UUID format).</li>
                <li>Go to <strong>Auth Proxy</strong> in the Turnkey dashboard and enable it.</li>
                <li>Add your app domain / preview URL to the <strong>Allowed Domains / Origins</strong> list.</li>
                <li>Copy the generated <strong>Auth Proxy Config ID</strong>.</li>
                <li>Set both in your environment file (.env):
                  <pre className="mt-1 p-2 bg-black/60 rounded text-[10px] text-neutral-200">
VITE_TURNKEY_ORGANIZATION_ID=&lt;organization-id&gt;&#10;VITE_TURNKEY_AUTH_PROXY_CONFIG_ID=&lt;auth-proxy-config-id&gt;
                  </pre>
                </li>
              </ol>
            </div>
          </div>

          {/* Footer Action */}
          <div className="pt-2 flex items-center justify-end gap-3 border-t border-white/[0.08]">
            <button
              onClick={() => setShowConfigModal(false)}
              className="px-4 py-2 rounded-xl bg-white/[0.08] hover:bg-white/[0.12] text-white text-xs font-semibold transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
