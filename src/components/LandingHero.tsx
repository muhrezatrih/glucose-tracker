import React, { useState } from 'react';
import { Sparkles, TrendingUp, ShieldCheck, ArrowRight, Play, Utensils, CheckCircle2, Zap } from 'lucide-react';

interface LandingHeroProps {
  onOpenAuthModal: () => void;
  onScrollToDemo: () => void;
}

export const LandingHero: React.FC<LandingHeroProps> = ({
  onOpenAuthModal,
  onScrollToDemo,
}) => {
  const [activeTab, setActiveTab] = useState<'pre' | 'post' | 'delta'>('pre');

  return (
    <div
      className="glass-card"
      style={{
        padding: '28px 22px',
        marginBottom: '20px',
        background: 'linear-gradient(145deg, rgba(16, 185, 129, 0.14) 0%, rgba(17, 24, 39, 0.92) 100%)',
        border: '1px solid rgba(16, 185, 129, 0.3)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background Ambient Glow */}
      <div
        style={{
          position: 'absolute',
          top: '-60px',
          right: '-60px',
          width: '220px',
          height: '220px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.25) 0%, rgba(0,0,0,0) 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Security & Speed Badges */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '8px',
          alignItems: 'center',
          marginBottom: '16px',
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '4px 12px',
            borderRadius: 'var(--radius-full)',
            background: 'rgba(16, 185, 129, 0.15)',
            color: 'var(--before-color)',
            border: '1px solid rgba(16, 185, 129, 0.35)',
            fontSize: '0.78rem',
            fontWeight: 600,
          }}
        >
          <Sparkles size={14} />
          <span>Privacy-First & Cloud Sync</span>
        </div>

        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            fontSize: '0.76rem',
            color: 'var(--text-muted)',
          }}
        >
          <Zap size={13} color="#F59E0B" />
          <span>1-Tap Entry • Zero Ads</span>
        </div>
      </div>

      {/* Main Title & Subtitle */}
      <h2
        style={{
          fontSize: '1.65rem',
          fontWeight: 800,
          letterSpacing: '-0.5px',
          lineHeight: 1.2,
          marginBottom: '12px',
          color: 'var(--text-primary)',
        }}
      >
        Smart Blood Sugar Tracking,{' '}
        <span style={{ color: 'var(--before-color)', textShadow: '0 0 20px rgba(16, 185, 129, 0.4)' }}>
          Elevated.
        </span>
      </h2>

      <p
        style={{
          fontSize: '0.9rem',
          color: 'var(--text-secondary)',
          lineHeight: 1.5,
          marginBottom: '22px',
          maxWidth: '620px',
        }}
      >
        Effortlessly log glucose numbers (mg/dL), analyze pre vs post meal impacts, and sync seamlessly across all your devices with private cloud database isolation.
      </p>

      {/* Interactive Mini Preview Box (Lets guests try the core UX in 1 tap!) */}
      <div
        style={{
          background: 'rgba(0, 0, 0, 0.35)',
          border: '1px solid var(--border-card)',
          borderRadius: 'var(--radius-md)',
          padding: '14px',
          marginBottom: '24px',
        }}
      >
        <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          Interactive Live Preview (Tap to Test)
        </div>

        {/* Tab Selector */}
        <div className="segmented-control" style={{ marginBottom: '12px' }}>
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

        {/* Active Tab Preview Output */}
        <div
          style={{
            background: 'rgba(255, 255, 255, 0.03)',
            borderRadius: 'var(--radius-sm)',
            padding: '12px 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            border:
              activeTab === 'pre'
                ? '1px solid rgba(16, 185, 129, 0.4)'
                : activeTab === 'post'
                ? '1px solid rgba(245, 158, 11, 0.4)'
                : '1px solid rgba(59, 130, 246, 0.4)',
            transition: 'all 0.25s ease',
          }}
        >
          {activeTab === 'pre' && (
            <>
              <div>
                <div style={{ fontSize: '0.78rem', color: 'var(--before-color)', fontWeight: 700 }}>
                  🟢 BEFORE EAT (FASTING / PRE-MEAL)
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Breakfast • Oatmeal & Coffee</div>
              </div>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--before-color)' }}>
                108 <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>mg/dL</span>
              </div>
            </>
          )}

          {activeTab === 'post' && (
            <>
              <div>
                <div style={{ fontSize: '0.78rem', color: 'var(--after-color)', fontWeight: 700 }}>
                  🟠 AFTER EAT (POST-MEAL SPIKE)
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>2 Hours Post Breakfast Check</div>
              </div>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--after-color)' }}>
                145 <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>mg/dL</span>
              </div>
            </>
          )}

          {activeTab === 'delta' && (
            <>
              <div>
                <div style={{ fontSize: '0.78rem', color: '#60A5FA', fontWeight: 700 }}>
                  📊 MEAL IMPACT DELTA
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Post-Meal Avg - Pre-Meal Avg</div>
              </div>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#60A5FA' }}>
                +37 <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>mg/dL</span>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Structured 3-Card Feature Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))',
          gap: '12px',
          marginBottom: '24px',
        }}
      >
        <div
          style={{
            background: 'rgba(0, 0, 0, 0.25)',
            border: '1px solid var(--border-card)',
            padding: '12px 14px',
            borderRadius: 'var(--radius-sm)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <Utensils size={16} color="var(--before-color)" />
            <span style={{ fontSize: '0.85rem', fontWeight: 700 }}>Meal Impact Delta</span>
          </div>
          <p style={{ fontSize: '0.76rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
            Automatic glucose rise/fall calculation comparing before vs after eating.
          </p>
        </div>

        <div
          style={{
            background: 'rgba(0, 0, 0, 0.25)',
            border: '1px solid var(--border-card)',
            padding: '12px 14px',
            borderRadius: 'var(--radius-sm)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <TrendingUp size={16} color="#06B6D4" />
            <span style={{ fontSize: '0.85rem', fontWeight: 700 }}>24h & 30-Day Trends</span>
          </div>
          <p style={{ fontSize: '0.76rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
            Interactive line charts for daily timelines, weekly trends, and 30-day averages.
          </p>
        </div>

        <div
          style={{
            background: 'rgba(0, 0, 0, 0.25)',
            border: '1px solid var(--border-card)',
            padding: '12px 14px',
            borderRadius: 'var(--radius-sm)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <ShieldCheck size={16} color="#8B5CF6" />
            <span style={{ fontSize: '0.85rem', fontWeight: 700 }}>Private Cloud Sync</span>
          </div>
          <p style={{ fontSize: '0.76rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
            Secured by Row-Level Security (RLS) PostgreSQL database isolation.
          </p>
        </div>
      </div>

      {/* Feature Bullet Points */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '12px',
          marginBottom: '24px',
          fontSize: '0.8rem',
          color: 'var(--text-secondary)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <CheckCircle2 size={15} color="var(--before-color)" />
          <span>No credit card required</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <CheckCircle2 size={15} color="var(--before-color)" />
          <span>Instant username login (`reza`)</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <CheckCircle2 size={15} color="var(--before-color)" />
          <span>Export CSV data anytime</span>
        </div>
      </div>

      {/* Primary & Secondary Action CTAs */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center' }}>
        <button
          onClick={onOpenAuthModal}
          className="btn btn-primary"
          style={{
            flex: '1 1 200px',
            padding: '14px 20px',
            fontSize: '0.95rem',
          }}
        >
          Get Started Free
          <ArrowRight size={18} />
        </button>

        <button
          onClick={onScrollToDemo}
          className="btn btn-secondary"
          style={{
            flex: '1 1 180px',
            padding: '14px 20px',
            fontSize: '0.9rem',
            background: 'rgba(255, 255, 255, 0.06)',
          }}
        >
          <Play size={16} color="var(--before-color)" />
          Explore Full Demo Below
        </button>
      </div>
    </div>
  );
};
