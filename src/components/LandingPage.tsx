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
      {/* Top Navigation Bar */}
      <nav
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 90,
          background: 'var(--bg-card)',
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
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(16, 185, 129, 0.35)',
              }}
            >
              <Droplet color="#FFFFFF" size={19} />
            </div>
            <div>
              <span style={{ fontSize: '1.2rem', fontWeight: 800, letterSpacing: '-0.5px' }}>
                Glucose<span style={{ color: 'var(--before-color)' }}>Pulse</span>
              </span>
            </div>
          </div>

          {/* Nav Links & Actions */}
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
                fontSize: '0.88rem',
                fontWeight: 600,
                cursor: 'pointer',
              }}
              className="desktop-only"
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
              className="desktop-only"
            >
              How It Works
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="btn btn-secondary btn-icon"
              title="Toggle Theme"
              style={{ width: '36px', height: '36px', minHeight: '36px', borderRadius: 'var(--radius-sm)' }}
            >
              {theme === 'dark' ? <Sun size={16} color="#F59E0B" /> : <Moon size={16} color="#6366F1" />}
            </button>

            {/* Launch Demo App */}
            <button
              onClick={onLaunchDemo}
              className="btn btn-secondary"
              style={{ padding: '6px 14px', fontSize: '0.85rem', height: '36px', minHeight: '36px' }}
            >
              <Play size={14} color="var(--before-color)" />
              Try Demo
            </button>

            {/* Sign In */}
            <button
              onClick={onOpenAuthModal}
              className="btn btn-primary"
              style={{ padding: '6px 16px', fontSize: '0.85rem', height: '36px', minHeight: '36px' }}
            >
              <UserIcon size={14} />
              Sign In
            </button>
          </div>
        </div>
      </nav>

      {/* Main Landing Container */}
      <main style={{ maxWidth: '900px', margin: '0 auto', padding: '30px 16px 80px 16px' }}>
        {/* HERO SECTION */}
        <section style={{ textAlign: 'center', marginBottom: '50px' }}>
          {/* Security Badge */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 16px',
              borderRadius: 'var(--radius-full)',
              background: 'rgba(16, 185, 129, 0.12)',
              color: 'var(--before-color)',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              fontSize: '0.82rem',
              fontWeight: 600,
              marginBottom: '20px',
            }}
          >
            <Sparkles size={15} />
            <span>Privacy-First • Zero Ads • Multi-Device Sync</span>
          </div>

          {/* Headline */}
          <h1
            style={{
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: 800,
              letterSpacing: '-1px',
              lineHeight: 1.15,
              marginBottom: '16px',
              color: 'var(--text-primary)',
            }}
          >
            Smart Blood Sugar Tracking,{' '}
            <span
              style={{
                color: 'var(--before-color)',
                textShadow: '0 0 25px rgba(16, 185, 129, 0.4)',
              }}
            >
              Elevated.
            </span>
          </h1>

          {/* Subtitle */}
          <p
            style={{
              fontSize: 'clamp(0.95rem, 2.5vw, 1.15rem)',
              color: 'var(--text-secondary)',
              maxWidth: '650px',
              margin: '0 auto 30px auto',
              lineHeight: 1.5,
            }}
          >
            Log blood sugar (mg/dL) in seconds, analyze pre vs post meal impacts, and sync seamlessly across your phone, tablet, and laptop.
          </p>

          {/* Primary & Secondary Hero CTAs */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '12px',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: '36px',
            }}
          >
            <button
              onClick={onLaunchDemo}
              className="btn btn-primary"
              style={{
                padding: '14px 28px',
                fontSize: '1rem',
                borderRadius: 'var(--radius-sm)',
                boxShadow: '0 6px 20px rgba(16, 185, 129, 0.4)',
              }}
            >
              <Play size={18} />
              Try Interactive Demo App
            </button>

            <button
              onClick={onOpenAuthModal}
              className="btn btn-secondary"
              style={{
                padding: '14px 24px',
                fontSize: '1rem',
                borderRadius: 'var(--radius-sm)',
                background: 'rgba(255, 255, 255, 0.06)',
              }}
            >
              Sign In / Create Account
              <ArrowRight size={18} />
            </button>
          </div>

          {/* Hero Feature Checklist */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '16px',
              fontSize: '0.82rem',
              color: 'var(--text-muted)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <CheckCircle2 size={16} color="var(--before-color)" />
              <span>Instant Username Login (`reza`)</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <CheckCircle2 size={16} color="var(--before-color)" />
              <span>Pre vs Post Meal Subtraction</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <CheckCircle2 size={16} color="var(--before-color)" />
              <span>Export CSV Logs Anytime</span>
            </div>
          </div>
        </section>

        {/* INTERACTIVE MINI PREVIEW WIDGET */}
        <section style={{ marginBottom: '60px' }}>
          <div
            className="glass-card"
            style={{
              padding: '24px',
              background: 'linear-gradient(145deg, rgba(16, 185, 129, 0.1) 0%, rgba(17, 24, 39, 0.95) 100%)',
              border: '1px solid rgba(16, 185, 129, 0.25)',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '14px',
              }}
            >
              <div>
                <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--before-color)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Interactive Live App Preview
                </span>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginTop: '2px' }}>
                  Tap below to test pre vs post meal calculations
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

            {/* Segmented Control Selector */}
            <div className="segmented-control" style={{ marginBottom: '14px' }}>
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

            {/* Interactive Output Card */}
            <div
              style={{
                background: 'rgba(0, 0, 0, 0.35)',
                border:
                  activeTab === 'pre'
                    ? '1px solid rgba(16, 185, 129, 0.4)'
                    : activeTab === 'post'
                    ? '1px solid rgba(245, 158, 11, 0.4)'
                    : '1px solid rgba(59, 130, 246, 0.4)',
                borderRadius: 'var(--radius-sm)',
                padding: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                transition: 'all 0.25s ease',
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
                  <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--before-color)' }}>
                    108 <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>mg/dL</span>
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
                  <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--after-color)' }}>
                    145 <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>mg/dL</span>
                  </div>
                </>
              )}

              {activeTab === 'delta' && (
                <>
                  <div>
                    <div style={{ fontSize: '0.82rem', color: '#60A5FA', fontWeight: 700 }}>
                      📊 MEAL IMPACT DELTA
                    </div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                      Post-Meal Average - Pre-Meal Average
                    </div>
                  </div>
                  <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#60A5FA' }}>
                    +37 <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>mg/dL</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </section>

        {/* 3-CARD FEATURE HIGHLIGHTS */}
        <section id="features" style={{ marginBottom: '60px' }}>
          <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Designed for Complete Clarity</h2>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginTop: '4px' }}>
              Everything you need to understand your blood sugar patterns without the clutter.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '16px',
            }}
          >
            {/* Feature 1 */}
            <div className="glass-card" style={{ padding: '22px' }}>
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  background: 'var(--before-bg)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '14px',
                }}
              >
                <Utensils size={20} color="var(--before-color)" />
              </div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '6px' }}>
                Pre vs Post Meal Delta
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                Automatically subtract pre-meal baseline from post-meal readings to measure exact glucose spikes after breakfast, lunch, or dinner.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="glass-card" style={{ padding: '22px' }}>
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  background: 'rgba(6, 182, 212, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '14px',
                }}
              >
                <TrendingUp size={20} color="#06B6D4" />
              </div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '6px' }}>
                24h & 30-Day Trends
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                Switch effortlessly between 24-hour chronological daily timelines, 7-day averages, and 30-day monthly trend graphics.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="glass-card" style={{ padding: '22px' }}>
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  background: 'rgba(139, 92, 246, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '14px',
                }}
              >
                <ShieldCheck size={20} color="#8B5CF6" />
              </div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '6px' }}>
                Private Cloud Database
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                Secured by PostgreSQL Row-Level Security (RLS). Your records belong strictly to you and sync across all your devices.
              </p>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS SECTION */}
        <section id="how-it-works" style={{ marginBottom: '60px' }}>
          <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>How It Works</h2>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginTop: '4px' }}>
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
            <div className="glass-card" style={{ padding: '20px', textAlign: 'center' }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: 'var(--before-bg)',
                  color: 'var(--before-color)',
                  fontWeight: 800,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 12px auto',
                }}
              >
                1
              </div>
              <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '4px' }}>Enter Single Number</h4>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                Type your glucose number (e.g. 123) and select Before or After Eat pill.
              </p>
            </div>

            <div className="glass-card" style={{ padding: '20px', textAlign: 'center' }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: 'rgba(6, 182, 212, 0.15)',
                  color: '#06B6D4',
                  fontWeight: 800,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 12px auto',
                }}
              >
                2
              </div>
              <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '4px' }}>Analyze Meal Delta</h4>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                View immediate pre vs post meal average differences and 24h timelines.
              </p>
            </div>

            <div className="glass-card" style={{ padding: '20px', textAlign: 'center' }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: 'rgba(139, 92, 246, 0.15)',
                  color: '#8B5CF6',
                  fontWeight: 800,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 12px auto',
                }}
              >
                3
              </div>
              <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '4px' }}>Sync & Export</h4>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                Log in on any phone or laptop to access your history or export CSV files.
              </p>
            </div>
          </div>
        </section>

        {/* BOTTOM CTA FOOTER BANNER */}
        <section>
          <div
            className="glass-card"
            style={{
              padding: '36px 24px',
              textAlign: 'center',
              background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(17, 24, 39, 0.95) 100%)',
              border: '1px solid rgba(16, 185, 129, 0.3)',
            }}
          >
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '8px' }}>
              Ready to Track Your Blood Sugar with Ease?
            </h2>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', maxWidth: '500px', margin: '0 auto 24px auto' }}>
              Try the interactive demo app with sample data or sign in to start saving your own records!
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center' }}>
              <button
                onClick={onLaunchDemo}
                className="btn btn-primary"
                style={{ padding: '14px 24px', fontSize: '1rem' }}
              >
                <Play size={18} />
                Launch Demo App
              </button>

              <button
                onClick={onOpenAuthModal}
                className="btn btn-secondary"
                style={{ padding: '14px 24px', fontSize: '1rem', background: 'rgba(255, 255, 255, 0.08)' }}
              >
                Sign In / Create Account
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid var(--border-card)', padding: '20px', textAlign: 'center', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
        GlucosePulse Blood Sugar Tracker • Privacy-First Data Isolation
      </footer>
    </div>
  );
};
