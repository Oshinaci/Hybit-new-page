import React, { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TrustedBy } from './components/TrustedBy';
import { Features } from './components/Features';
import { HybitIdSection } from './components/HybitIdSection';
import { EmbeddedWalletSection } from './components/EmbeddedWalletSection';
import { WalletPreview } from './components/WalletPreview';
import { Security } from './components/Security';
import { Ecosystem } from './components/Ecosystem';
import { FAQ } from './components/FAQ';
import { CTA } from './components/CTA';
import { Footer } from './components/Footer';
import { LaunchLoadingScreen } from './components/LaunchLoadingScreen';
import { PullToRefresh } from './components/PullToRefresh';
import { useToast } from './context/ToastContext';
import { useAppSettings } from './context/AppSettingsContext';

// Dashboard Components
import { DashboardLayout } from './components/dashboard/DashboardLayout';
import { DashboardHome } from './components/dashboard/DashboardHome';
import { PortfolioView } from './components/dashboard/PortfolioView';
import { ActivityView } from './components/dashboard/ActivityView';
import { SettingsView } from './components/dashboard/SettingsView';
import { QuickActionModals } from './components/dashboard/QuickActionModals';
import { TurnkeyConfigModal } from './components/TurnkeyConfigModal';
import { DashboardPage } from './types/dashboard';

export default function App() {
  const { showComingSoon, showToast } = useToast();
  const { t } = useAppSettings();
  // Navigation view: 'landing' or 'dashboard'
  const [currentView, setCurrentView] = useState<'landing' | 'dashboard'>('landing');
  const [dashboardPage, setDashboardPage] = useState<DashboardPage>('dashboard');

  // Loading screen state: strictly appears only when user clicks "Launch App"
  const [isAppLaunching, setIsAppLaunching] = useState(false);

  // Quick action modal state (Send, Receive, Swap, Buy, Bridge)
  const [activeQuickAction, setActiveQuickAction] = useState<
    'send' | 'receive' | 'swap' | 'buy' | 'bridge' | null
  >(null);

  // "Launch App" triggers the modern professional loading screen
  const handleLaunchApp = () => {
    setIsAppLaunching(true);
  };

  // Called when the realistic cryptographic loading sequence completes
  const handleLoadingComplete = () => {
    setIsAppLaunching(false);
    setCurrentView('dashboard');
    setDashboardPage('dashboard');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleBackToLanding = () => {
    setIsAppLaunching(false);
    setCurrentView('landing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Only trigger coming soon notification, no download page shown
  const handleDownload = () => {
    showComingSoon('Hybit Mobile App (iOS & Android)');
  };

  // Pull-to-refresh handler: lightweight update of entire dashboard state without changing current page
  const [refreshKey, setRefreshKey] = useState(0);

  const handleRefresh = async () => {
    await new Promise((resolve) => setTimeout(resolve, 350));
    // Trigger re-mount / re-sync of all dashboard state & live telemetry
    setRefreshKey((prev) => prev + 1);
    // Provide clean, natural feedback matching active language without mixed terminology
    showToast(
      t.pullToRefreshTitle,
      t.pullToRefreshMessage,
      'success'
    );
  };

  // Render Dashboard View
  if (currentView === 'dashboard') {
    return (
      <PullToRefresh onRefresh={handleRefresh} disabled={isAppLaunching}>
        <div className="min-h-screen bg-[#09090B] text-[#FAFAFA] font-sans antialiased overflow-x-hidden selection:bg-[#0095FF]/30 selection:text-white">
          <DashboardLayout
            currentPage={dashboardPage}
            onPageChange={(page) => {
              setDashboardPage(page);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onBackToLanding={handleBackToLanding}
            onQuickAction={(action) => setActiveQuickAction(action)}
          >
            <React.Fragment key={refreshKey}>
              {dashboardPage === 'dashboard' && (
                <DashboardHome
                  onQuickAction={(action) => setActiveQuickAction(action)}
                  onNavigateToPortfolio={() => setDashboardPage('portfolio')}
                  onNavigateToActivity={() => setDashboardPage('activity')}
                />
              )}

              {dashboardPage === 'portfolio' && (
                <PortfolioView
                  onQuickAction={(action) => setActiveQuickAction(action)}
                />
              )}

              {dashboardPage === 'activity' && <ActivityView />}

              {(dashboardPage === 'wallet' || dashboardPage === 'settings') && (
                <SettingsView onNavigateToDashboard={() => setDashboardPage('dashboard')} />
              )}
            </React.Fragment>
          </DashboardLayout>

          {/* Turnkey Embedded Wallet Setup Info Modal */}
          <TurnkeyConfigModal />

          {/* Interactive Quick Action Modals */}
          <QuickActionModals
            type={activeQuickAction}
            onClose={() => setActiveQuickAction(null)}
          />

          {/* Modern Professional Loading Screen (Strictly triggered ONLY when user clicks Launch App) */}
          <AnimatePresence>
            {isAppLaunching && (
              <LaunchLoadingScreen onComplete={handleLoadingComplete} />
            )}
          </AnimatePresence>
        </div>
      </PullToRefresh>
    );
  }

  // Render Landing Page View (Pure landing page, NO pull to refresh as requested)
  return (
    <div className="min-h-screen bg-[#09090B] text-[#FAFAFA] font-sans antialiased overflow-x-hidden selection:bg-[#0095FF]/30 selection:text-white">
      {/* Sticky Navigation Bar */}
      <Navbar onLaunchApp={handleLaunchApp} onDownload={handleDownload} />

      {/* Main Content Sections */}
      <main>
        {/* Hero Section */}
        <Hero onLaunchApp={handleLaunchApp} onDownload={handleDownload} />

        {/* Supported Networks & Standards */}
        <TrustedBy />

        {/* Product Overview & Core Tasks */}
        <Features onExploreFeature={(_id) => handleLaunchApp()} />

        {/* Hybit ID Emerging Concept */}
        <HybitIdSection />

        {/* Embedded Wallet Architecture (Turnkey Roadmap) */}
        <EmbeddedWalletSection />

        {/* Portfolio and Activity Preview */}
        <WalletPreview onLaunchApp={handleLaunchApp} />

        {/* Security Principles: Clear Actions, Clear Consent */}
        <Security />

        {/* Multi-Chain Ecosystem Grid */}
        <Ecosystem />

        {/* FAQ Accordion */}
        <FAQ />

        {/* Conversion CTA Banner */}
        <CTA onLaunchApp={handleLaunchApp} onDownload={handleDownload} />
      </main>

      {/* Footer with Legal, Company, and Operational status */}
      <Footer onDownload={handleDownload} />

      {/* Modern Professional Loading Screen (Strictly triggered ONLY when user clicks Launch App) */}
      <AnimatePresence>
        {isAppLaunching && (
          <LaunchLoadingScreen onComplete={handleLoadingComplete} />
        )}
      </AnimatePresence>
    </div>
  );
}
