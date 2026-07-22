import React, { useState } from 'react';
import {
  Droplet,
  Sparkles,
  TrendingUp,
  ShieldCheck,
  ArrowRight,
  Play,
  Utensils,
  CheckCircle2,
  User as UserIcon,
  Sun,
  Moon,
  ChevronRight,
} from 'lucide-react';

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

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-main)', color: 'var(--text-primary)' }}>
      {/* Top Translucent Navigation Bar */}
      <nav
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 90,
          background: 'rgba(0, 0, 0, 0.8)',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
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
          {/* Apple Logo Style Header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div
              style={{
                width: '34px',
                height: '34px',
                borderRadius: '9px',
                background: 'linear-gradient(180deg, #30D158 0%, #28B84C 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(48, 209, 88, 0.35)',
              }}
            >
              <Droplet color="#FFFFFF" size={18} />
            </div>
            <div>
              <span style={{ fontSize: '1.15rem', fontWeight: 700, letterSpacing: '-0.02em' }}>
                Glucose<span style={{ color: 'var(--before-color)' }}>Pulse</span>
              </span>
            </div>
          </div>

          {/* Nav Links & Apple Capsule Actions */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            <button
              onClick={() => scrollToSection('features')}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-secondary)',
                fontSize: '0.85rem',
                fontWeight: 500,
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
                fontSize: '0.85rem',
                fontWeight: 500,
                cursor: 'pointer',
              }}
            >
              How It Works
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="btn btn-secondary btn-icon"
              title="Toggle Theme"
              style={{ width: '36px', height: '36px', minHeight: '36px' }}
            >
              {theme === 'dark' ? <Sun size={15} color="#FF9F0A" /> : <Moon size={15} color="#0A84FF" />}
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
        </div>
      </nav>

      {/* Main Apple Landing Container */}
      <main style={{ maxWidth: '960px', margin: '0 auto', padding: '40px 20px 90px 20px' }}>
        {/* APPLE HERO SECTION */}
        <section style={{ textAlign: 'center', marginBottom: '60px' }}>
          {/* Apple Style Floating Pill Badge */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 16px',
              borderRadius: 'var(--radius-full)',
              background: 'rgba(48, 209, 88, 0.12)',
              color: 'var(--before-color)',
              border: '1px solid rgba(48, 209, 88, 0.3)',
              fontSize: '0.82rem',
              fontWeight: 600,
              letterSpacing: '-0.01em',
              marginBottom: '24px',
            }}
          >
            <Sparkles size={14} />
            <span>Apple Health Inspired • Private Cloud Sync</span>
          </div>

          {/* Apple Gradient Typography Headline */}
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
            Smart Blood Sugar Tracking,{' '}
            <span
              style={{
                color: 'var(--before-color)',
                textShadow: '0 0 30px rgba(48, 209, 88, 0.45)',
              }}
            >
              Elevated.
            </span>
          </h1>

          {/* Subtitle */}
          <p
            style={{
              fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
              color: 'var(--text-muted)',
              maxWidth: '680px',
              margin: '0 auto 32px auto',
              lineHeight: 1.47,
              letterSpacing: '-0.015em',
            }}
          >
            Log glucose (mg/dL) in 1 tap, analyze pre vs post meal impacts, and sync seamlessly across your iPhone, Mac, and iPad.
          </p>

          {/* Apple Capsule CTAs */}
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
                fontSize: '1.02rem',
                borderRadius: 'var(--radius-full)',
                boxShadow: '0 6px 20px rgba(48, 209, 88, 0.4)',
              }}
            >
              <Play size={18} />
              Try Interactive Demo App
            </button>

            <button
              onClick={onOpenAuthModal}
              className="btn btn-secondary"
              style={{
                padding: '14px 26px',
                fontSize: '1.02rem',
                borderRadius: 'var(--radius-full)',
              }}
            >
              Sign In / Create Account
              <ArrowRight size={18} />
            </button>
          </div>

          {/* Apple Checklist Pills */}
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
              <span>Instant Username Login (`reza`)</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <CheckCircle2 size={15} color="var(--before-color)" />
              <span>Pre/Post Meal Baseline Subtraction</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <CheckCircle2 size={15} color="var(--before-color)" />
              <span>Export CSV Data Anytime</span>
            </div>
          </div>
        </section>

        {/* APPLE INTERACTIVE MINI PREVIEW WIDGET */}
        <section style={{ marginBottom: '70px' }}>
          <div
            className="glass-card"
            style={{
              padding: '26px',
              borderRadius: '24px',
              background: 'linear-gradient(145deg, rgba(48, 209, 88, 0.12) 0%, rgba(28, 28, 30, 0.95) 100%)',
              border: '1px solid rgba(48, 209, 88, 0.3)',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '16px',
              }}
            >
              <div>
                <span style={{ fontSize: '0.76rem', fontWeight: 700, color: 'var(--before-color)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Interactive Live App Preview
                </span>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginTop: '2px', letterSpacing: '-0.02em' }}>
                  Tap segments to test pre vs post meal calculations
                </h3>
              </div>

              <button
                onClick={onLaunchDemo}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--primary)',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                Full Demo <ChevronRight size={16} />
              </button>
            </div>

            {/* iOS Segmented Control Bar */}
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
                background: 'rgba(0, 0, 0, 0.4)',
                border:
                  activeTab === 'pre'
                    ? '1px solid rgba(48, 209, 88, 0.4)'
                    : activeTab === 'post'
                    ? '1px solid rgba(255, 159, 10, 0.4)'
                    : '1px solid rgba(10, 132, 255, 0.4)',
                borderRadius: '16px',
                padding: '18px 20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                transition: 'all 0.25s var(--ease-apple)',
              }}
            >
              {activeTab === 'pre' && (
                <>
                  <div>
                    <div style={{ fontSize: '0.82rem', color: 'var(--before-color)', fontWeight: 700 }}>
                      🟢 BEFORE EAT (FASTING / PRE-MEAL)
                    </div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                      Breakfast • Oatmeal & Black Coffee
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
                      🟠 AFTER EAT (POST-MEAL SPIKE)
                    </div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                      2 Hours Post Breakfast Reading
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
                    <div style={{ fontSize: '0.82rem', color: '#64D2FF', fontWeight: 700 }}>
                      📊 MEAL IMPACT DELTA
                    </div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                      Post-Meal Average - Pre-Meal Average
                    </div>
                  </div>
                  <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#64D2FF' }}>
                    +37 <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>mg/dL</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </section>

        {/* APPLE BENTO GRID FEATURE HIGHLIGHTS */}
        <section id="features" style={{ marginBottom: '70px' }}>
          <div style={{ textAlign: 'center', marginBottom: '36px' }}>
            <h2 style={{ fontSize: '1.7rem', fontWeight: 800, letterSpacing: '-0.02em' }}>
              Designed for Complete Clarity.
            </h2>
            <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', marginTop: '6px' }}>
              Everything you need to understand your blood sugar patterns with zero clutter.
            </p>
          </div>

          <div className="bento-grid">
            {/* Bento Card 1 */}
            <div className="bento-card">
              <div
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '12px',
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
                Pre vs Post Meal Delta
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.47 }}>
                Automatically subtract pre-meal baselines from post-meal readings to measure exact glucose spikes after meals.
              </p>
            </div>

            {/* Bento Card 2 */}
            <div className="bento-card">
              <div
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '12px',
                  background: 'rgba(100, 210, 255, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '16px',
                }}
              >
                <TrendingUp size={20} color="#64D2FF" />
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '6px', letterSpacing: '-0.01em' }}>
                24h & 30-Day Spline Trends
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.47 }}>
                Switch effortlessly between 24-hour chronological daily timelines, 7-day averages, and 30-day monthly trend graphics.
              </p>
            </div>

            {/* Bento Card 3 */}
            <div className="bento-card">
              <div
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '12px',
                  background: 'rgba(191, 90, 242, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '16px',
                }}
              >
                <ShieldCheck size={20} color="#BF5AF2" />
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '6px', letterSpacing: '-0.01em' }}>
                Private Cloud Database
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.47 }}>
                Secured by PostgreSQL Row-Level Security (RLS). Your records belong strictly to you and sync across all your devices.
              </p>
            </div>
          </div>
        </section>

        {/* APPLE HOW IT WORKS SECTION */}
        <section id="how-it-works" style={{ marginBottom: '70px' }}>
          <div style={{ textAlign: 'center', marginBottom: '36px' }}>
            <h2 style={{ fontSize: '1.7rem', fontWeight: 800, letterSpacing: '-0.02em' }}>How It Works.</h2>
            <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', marginTop: '6px' }}>
              Track your glucose in 3 simple steps
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
                  borderRadius: '50%',
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
              <h4 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '6px' }}>Enter Single Number</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.45 }}>
                Type your glucose number (e.g. 123) and select Before or After Eat pill.
              </p>
            </div>

            <div className="bento-card" style={{ textAlign: 'center' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: 'rgba(100, 210, 255, 0.15)',
                  color: '#64D2FF',
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
              <h4 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '6px' }}>Analyze Meal Delta</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.45 }}>
                View immediate pre vs post meal average differences and 24h timelines.
              </p>
            </div>

            <div className="bento-card" style={{ textAlign: 'center' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: 'rgba(191, 90, 242, 0.15)',
                  color: '#BF5AF2',
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
              <h4 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '6px' }}>Sync & Export</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.45 }}>
                Log in on any phone or laptop to access your history or export CSV files.
              </p>
            </div>
          </div>
        </section>

        {/* APPLE BOTTOM CTA FOOTER BANNER */}
        <section>
          <div
            className="bento-card"
            style={{
              padding: '42px 28px',
              textAlign: 'center',
              background: 'linear-gradient(145deg, rgba(48, 209, 88, 0.15) 0%, rgba(28, 28, 30, 0.98) 100%)',
              border: '1px solid rgba(48, 209, 88, 0.35)',
            }}
          >
            <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '10px', letterSpacing: '-0.02em' }}>
              Ready to Track Your Blood Sugar with Ease?
            </h2>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', maxWidth: '520px', margin: '0 auto 28px auto', lineHeight: 1.47 }}>
              Try the interactive demo app with sample data or sign in to start saving your own personal records!
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center' }}>
              <button
                onClick={onLaunchDemo}
                className="btn btn-primary"
                style={{ padding: '14px 28px', fontSize: '1rem' }}
              >
                <Play size={18} />
                Launch Demo App
              </button>

              <button
                onClick={onOpenAuthModal}
                className="btn btn-secondary"
                style={{ padding: '14px 28px', fontSize: '1rem' }}
              >
                Sign In / Create Account
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Apple Footer */}
      <footer style={{ borderTop: '1px solid var(--border-card)', padding: '24px 20px', textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
        GlucosePulse Blood Sugar Tracker • Apple HIG Inspired Design System
      </footer>
    </div>
  );
};
