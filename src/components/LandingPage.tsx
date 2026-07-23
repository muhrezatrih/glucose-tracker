import React, { useState } from 'react';
import {
  ShieldCheck,
  ArrowRight,
  Play,
  Utensils,
  CheckCircle2,
  User as UserIcon,
  Sun,
  Moon,
  ChevronRight,
  Menu,
  X,
  BarChart2,
} from 'lucide-react';
import { LogoIcon } from './Logo';

interface LandingPageProps {
  onLaunchDemo: () => void;
  onOpenAuthModal: () => void;
  theme: 'dark' | 'light';
  toggleTheme: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onLaunchDemo,
  onOpenAuthModal,
  theme,
  toggleTheme,
}) => {
  const [activeTab, setActiveTab] = useState<'pre' | 'post' | 'delta'>('pre');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-main)', color: 'var(--text-primary)' }}>
      {/* Top Translucent Pro Navigation Bar */}
      <nav
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 95,
          background: theme === 'dark' ? 'rgba(11, 15, 25, 0.9)' : 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderBottom: '1px solid var(--border-card)',
          padding: '12px 20px',
        }}
      >
        <div
          style={{
            maxWidth: '1000px',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Logo & Brand Name */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
            <LogoIcon size={34} />
            <div>
              <span style={{ fontSize: '1.2rem', fontWeight: 800, letterSpacing: '-0.02em', whiteSpace: 'nowrap' }}>
                Glucose<span style={{ color: 'var(--before-color)' }}>Pulse</span>
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links & Actions */}
          <div
            className="desktop-only"
            style={{
              alignItems: 'center',
              gap: '16px',
            }}
          >
            <button
              onClick={() => scrollToSection('features')}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-secondary)',
                fontSize: '0.88rem',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Features
            </button>

            <button
              onClick={() => scrollToSection('how-it-works')}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-secondary)',
                fontSize: '0.88rem',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Workflow
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="btn btn-secondary btn-icon"
              title="Toggle Theme"
              style={{ width: '36px', height: '36px', minHeight: '36px' }}
            >
              {theme === 'dark' ? <Sun size={15} color="#F59E0B" /> : <Moon size={15} color="#3B82F6" />}
            </button>

            {/* Launch Demo App Capsule */}
            <button
              onClick={onLaunchDemo}
              className="btn btn-secondary"
              style={{ padding: '6px 14px', fontSize: '0.82rem', height: '36px', minHeight: '36px' }}
            >
              <Play size={13} color="var(--before-color)" />
              Try Demo
            </button>

            {/* Sign In Capsule */}
            <button
              onClick={onOpenAuthModal}
              className="btn btn-primary"
              style={{ padding: '6px 16px', fontSize: '0.82rem', height: '36px', minHeight: '36px' }}
            >
              <UserIcon size={14} />
              Sign In
            </button>
          </div>

          {/* Mobile Right Action Bar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }} className="mobile-only">
            <button
              onClick={onLaunchDemo}
              className="btn btn-primary"
              style={{ padding: '6px 12px', fontSize: '0.78rem', height: '34px', minHeight: '34px' }}
            >
              <Play size={12} />
              Try Demo
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="btn btn-secondary btn-icon"
              style={{ width: '34px', height: '34px', minHeight: '34px' }}
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        {isMobileMenuOpen && (
          <div
            style={{
              paddingTop: '16px',
              paddingBottom: '12px',
              borderTop: '1px solid var(--border-card)',
              marginTop: '12px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              animation: 'fadeIn 0.2s ease forwards',
            }}
          >
            <button
              onClick={() => scrollToSection('features')}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-primary)',
                fontSize: '1rem',
                fontWeight: 600,
                textAlign: 'left',
                padding: '8px 4px',
                cursor: 'pointer',
              }}
            >
              Features
            </button>

            <button
              onClick={() => scrollToSection('how-it-works')}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-primary)',
                fontSize: '1rem',
                fontWeight: 600,
                textAlign: 'left',
                padding: '8px 4px',
                cursor: 'pointer',
              }}
            >
              Workflow
            </button>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '8px', borderTop: '1px solid var(--border-card)' }}>
              <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Switch Theme</span>
              <button
                onClick={toggleTheme}
                className="btn btn-secondary"
                style={{ padding: '6px 14px', fontSize: '0.82rem', height: '36px' }}
              >
                {theme === 'dark' ? <Sun size={15} color="#F59E0B" /> : <Moon size={15} color="#3B82F6" />}
                {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
              </button>
            </div>

            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenAuthModal();
              }}
              className="btn btn-secondary"
              style={{ width: '100%', padding: '12px', fontSize: '0.92rem', marginTop: '4px' }}
            >
              <UserIcon size={16} />
              Sign In / Create Account
            </button>
          </div>
        )}
      </nav>

      {/* Main SaaS Landing Container */}
      <main style={{ maxWidth: '960px', margin: '0 auto', padding: '30px 20px 90px 20px' }}>
        {/* HERO SECTION */}
        <section style={{ textAlign: 'center', marginBottom: '50px' }}>
          {/* Headline */}
          <h1
            style={{
              fontSize: 'clamp(2.2rem, 5.5vw, 3.4rem)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              lineHeight: 1.12,
              marginBottom: '18px',
              color: 'var(--text-primary)',
            }}
          >
            Precision Blood Glucose Intelligence for{' '}
            <span style={{ color: 'var(--before-color)' }}>
              Modern Health Management.
            </span>
          </h1>

          {/* Subtitle */}
          <p
            style={{
              fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
              color: 'var(--text-muted)',
              maxWidth: '700px',
              margin: '0 auto 32px auto',
              lineHeight: 1.5,
              letterSpacing: '-0.011em',
            }}
          >
            Track pre- and post-meal glucose metrics, analyze glycemic variability across 24-hour timelines, and export clinical CSV reports seamlessly across all your devices.
          </p>

          {/* SaaS Capsule CTAs */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '12px',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: '40px',
            }}
          >
            <button
              onClick={onLaunchDemo}
              className="btn btn-primary"
              style={{
                padding: '14px 28px',
                fontSize: '1rem',
                fontWeight: 700,
              }}
            >
              <Play size={18} />
              Launch Live Demo App
            </button>

            <button
              onClick={onOpenAuthModal}
              className="btn btn-secondary"
              style={{
                padding: '14px 26px',
                fontSize: '1rem',
                fontWeight: 600,
              }}
            >
              Sign In to Your Workspace
              <ArrowRight size={18} />
            </button>
          </div>

          {/* Enterprise Value Checklist */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '18px',
              fontSize: '0.82rem',
              color: 'var(--text-muted)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <CheckCircle2 size={15} color="var(--before-color)" />
              <span>Instant Single Sign-On (`reza`)</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <CheckCircle2 size={15} color="var(--before-color)" />
              <span>Pre vs Post Meal Delta Engine</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <CheckCircle2 size={15} color="var(--before-color)" />
              <span>Automated Clinical CSV Exports</span>
            </div>
          </div>
        </section>

        {/* NEAT INTERACTIVE LIVE PREVIEW WIDGET */}
        <section style={{ marginBottom: '70px' }}>
          <div
            className="glass-card"
            style={{
              padding: '24px',
              borderRadius: '16px',
              background: 'var(--bg-card)',
              border: '1px solid var(--border-card)',
            }}
          >
            {/* Header with clean flex wrap */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '12px',
                marginBottom: '16px',
              }}
            >
              <div>
                <span style={{ fontSize: '0.76rem', fontWeight: 700, color: 'var(--before-color)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Interactive Live App Demo
                </span>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginTop: '2px', letterSpacing: '-0.02em' }}>
                  Evaluate pre- and post-meal glucose spikes in real-time
                </h3>
              </div>

              <button
                onClick={onLaunchDemo}
                className="btn btn-secondary"
                style={{
                  padding: '6px 14px',
                  fontSize: '0.82rem',
                  height: '34px',
                  whiteSpace: 'nowrap',
                }}
              >
                Launch Full App <ChevronRight size={15} />
              </button>
            </div>

            {/* Segmented Control Selector */}
            <div className="segmented-control" style={{ marginBottom: '16px' }}>
              <button
                onClick={() => setActiveTab('pre')}
                className={`segmented-control-item ${activeTab === 'pre' ? 'active' : ''}`}
              >
                🟢 Pre-Meal (108)
              </button>
              <button
                onClick={() => setActiveTab('post')}
                className={`segmented-control-item ${activeTab === 'post' ? 'active' : ''}`}
              >
                🟠 Post-Meal (145)
              </button>
              <button
                onClick={() => setActiveTab('delta')}
                className={`segmented-control-item ${activeTab === 'delta' ? 'active' : ''}`}
              >
                📊 Meal Delta (+37)
              </button>
            </div>

            {/* Active Segment Output Card */}
            <div
              style={{
                background: theme === 'dark' ? 'rgba(0, 0, 0, 0.4)' : '#F1F5F9',
                border:
                  activeTab === 'pre'
                    ? '1px solid var(--before-border)'
                    : activeTab === 'post'
                    ? '1px solid var(--after-border)'
                    : '1px solid var(--border-card)',
                borderRadius: '12px',
                padding: '18px 20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                transition: 'all 0.2s ease',
              }}
            >
              {activeTab === 'pre' && (
                <>
                  <div>
                    <div style={{ fontSize: '0.82rem', color: 'var(--before-color)', fontWeight: 700 }}>
                      🟢 PRE-MEAL BASELINE (FASTING)
                    </div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                      Breakfast Baseline Entry
                    </div>
                  </div>
                  <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--before-color)' }}>
                    108 <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>mg/dL</span>
                  </div>
                </>
              )}

              {activeTab === 'post' && (
                <>
                  <div>
                    <div style={{ fontSize: '0.82rem', color: 'var(--after-color)', fontWeight: 700 }}>
                      🟠 POST-MEAL GLUCOSE SPIKE
                    </div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                      2 Hours Post-Meal Measurement
                    </div>
                  </div>
                  <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--after-color)' }}>
                    145 <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>mg/dL</span>
                  </div>
                </>
              )}

              {activeTab === 'delta' && (
                <>
                  <div>
                    <div style={{ fontSize: '0.82rem', color: 'var(--none-color)', fontWeight: 700 }}>
                      📊 MEAL IMPACT DELTA
                    </div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                      Post-Meal Average - Pre-Meal Average
                    </div>
                  </div>
                  <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--none-color)' }}>
                    +37 <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>mg/dL</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </section>

        {/* B2B SAAS FEATURE GRID */}
        <section id="features" style={{ marginBottom: '70px' }}>
          <div style={{ textAlign: 'center', marginBottom: '36px' }}>
            <h2 style={{ fontSize: '1.7rem', fontWeight: 800, letterSpacing: '-0.02em' }}>
              Engineered for Clinical Precision.
            </h2>
            <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', marginTop: '6px' }}>
              Enterprise-grade tools to track, analyze, and manage blood sugar records.
            </p>
          </div>

          <div className="bento-grid">
            {/* SaaS Feature 1 */}
            <div className="bento-card">
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '8px',
                  background: 'var(--before-bg)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '16px',
                }}
              >
                <Utensils size={20} color="var(--before-color)" />
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '6px', letterSpacing: '-0.01em' }}>
                Automated Meal Delta Engine
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.47 }}>
                Instantly calculate exact glucose deltas between pre-meal baselines and post-meal readings to identify dietary triggers.
              </p>
            </div>

            {/* SaaS Feature 2 */}
            <div className="bento-card">
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '8px',
                  background: 'var(--none-bg)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '16px',
                }}
              >
                <BarChart2 size={20} color="var(--none-color)" />
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '6px', letterSpacing: '-0.01em' }}>
                24h & 30-Day Longitudinal Analytics
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.47 }}>
                Visualize glycemic variability across 24-hour daily timelines, 7-day moving averages, and 30-day trend analytics.
              </p>
            </div>

            {/* SaaS Feature 3 */}
            <div className="bento-card">
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '8px',
                  background: 'rgba(139, 92, 246, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '16px',
                }}
              >
                <ShieldCheck size={20} color="#8B5CF6" />
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '6px', letterSpacing: '-0.01em' }}>
                Isolated Multi-Tenant Database
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.47 }}>
                Engineered with PostgreSQL Row-Level Security (RLS) guaranteeing absolute tenant data isolation and real-time sync.
              </p>
            </div>
          </div>
        </section>

        {/* PRO SAAS WORKFLOW SECTION */}
        <section id="how-it-works" style={{ marginBottom: '70px' }}>
          <div style={{ textAlign: 'center', marginBottom: '36px' }}>
            <h2 style={{ fontSize: '1.7rem', fontWeight: 800, letterSpacing: '-0.02em' }}>Simplified 3-Step Workflow.</h2>
            <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', marginTop: '6px' }}>
              Streamlined data entry and reporting
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '16px',
            }}
          >
            <div className="bento-card" style={{ textAlign: 'center' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '8px',
                  background: 'var(--before-bg)',
                  color: 'var(--before-color)',
                  fontWeight: 800,
                  fontSize: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 14px auto',
                }}
              >
                1
              </div>
              <h4 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '6px' }}>Record Reading</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.45 }}>
                Enter single blood sugar number (mg/dL) and tag meal timing with 1 tap.
              </p>
            </div>

            <div className="bento-card" style={{ textAlign: 'center' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '8px',
                  background: 'var(--none-bg)',
                  color: 'var(--none-color)',
                  fontWeight: 800,
                  fontSize: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 14px auto',
                }}
              >
                2
              </div>
              <h4 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '6px' }}>Analyze Trends</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.45 }}>
                Evaluate pre vs post meal glycemic spikes and 24-hour timeline trends.
              </p>
            </div>

            <div className="bento-card" style={{ textAlign: 'center' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '8px',
                  background: 'rgba(139, 92, 246, 0.15)',
                  color: '#8B5CF6',
                  fontWeight: 800,
                  fontSize: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 14px auto',
                }}
              >
                3
              </div>
              <h4 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '6px' }}>Sync & Export CSV</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.45 }}>
                Sync records across all devices and export formatted CSV logs anytime.
              </p>
            </div>
          </div>
        </section>

        {/* BOTTOM CTA BANNER */}
        <section>
          <div
            className="bento-card"
            style={{
              padding: '42px 28px',
              textAlign: 'center',
              background: 'var(--bg-card)',
              border: '1px solid var(--before-border)',
            }}
          >
            <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '10px', letterSpacing: '-0.02em' }}>
              Ready to Upgrade Your Glucose Management?
            </h2>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', maxWidth: '520px', margin: '0 auto 28px auto', lineHeight: 1.47 }}>
              Test the interactive demo app with sample data or sign in to start saving your real personal records!
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center' }}>
              <button
                onClick={onLaunchDemo}
                className="btn btn-primary"
                style={{ padding: '14px 28px', fontSize: '1rem', fontWeight: 700 }}
              >
                <Play size={18} />
                Launch Live Demo App
              </button>

              <button
                onClick={onOpenAuthModal}
                className="btn btn-secondary"
                style={{ padding: '14px 28px', fontSize: '1rem', fontWeight: 600 }}
              >
                Sign In to Workspace
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Pro SaaS Footer */}
      <footer style={{ borderTop: '1px solid var(--border-card)', padding: '24px 20px', textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
        GlucosePulse Health Platform • Enterprise-Grade Encryption & Data Privacy
      </footer>
    </div>
  );
};
