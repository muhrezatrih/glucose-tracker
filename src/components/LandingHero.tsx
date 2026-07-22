import React from 'react';
import { Sparkles, TrendingUp, ShieldCheck, ArrowRight, Play } from 'lucide-react';

interface LandingHeroProps {
  onOpenAuthModal: () => void;
  onScrollToDemo: () => void;
}

export const LandingHero: React.FC<LandingHeroProps> = ({
  onOpenAuthModal,
  onScrollToDemo,
}) => {
  return (
    <div
      className="glass-card"
      style={{
        padding: '24px 20px',
        marginBottom: '20px',
        background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.12) 0%, rgba(17, 24, 39, 0.85) 100%)',
        border: '1px solid rgba(16, 185, 129, 0.25)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Top Badge */}
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          padding: '4px 12px',
          borderRadius: 'var(--radius-full)',
          background: 'rgba(16, 185, 129, 0.15)',
          color: 'var(--before-color)',
          border: '1px solid rgba(16, 185, 129, 0.3)',
          fontSize: '0.78rem',
          fontWeight: 600,
          marginBottom: '14px',
        }}
      >
        <Sparkles size={14} />
        <span>Privacy-First & Cloud Sync</span>
      </div>

      {/* Main Title & Subtitle */}
      <h2
        style={{
          fontSize: '1.5rem',
          fontWeight: 800,
          letterSpacing: '-0.5px',
          lineHeight: 1.25,
          marginBottom: '10px',
          color: 'var(--text-primary)',
        }}
      >
        Smart Blood Sugar Tracking,{' '}
        <span style={{ color: 'var(--before-color)' }}>Simplified.</span>
      </h2>

      <p
        style={{
          fontSize: '0.88rem',
          color: 'var(--text-secondary)',
          lineHeight: 1.5,
          marginBottom: '20px',
          maxWidth: '600px',
        }}
      >
        Record single-number glucose levels (mg/dL), track pre & post meal impacts, and sync seamlessly across all your devices.
      </p>

      {/* Feature Pills */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '10px',
          marginBottom: '22px',
        }}
      >
        <div
          style={{
            background: 'rgba(0, 0, 0, 0.25)',
            border: '1px solid var(--border-card)',
            padding: '10px 12px',
            borderRadius: 'var(--radius-sm)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <div
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: 'var(--before-color)',
              boxShadow: '0 0 8px rgba(16, 185, 129, 0.6)',
              flexShrink: 0,
            }}
          />
          <div>
            <div style={{ fontSize: '0.82rem', fontWeight: 700 }}>Pre/Post Meal Impact</div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Auto glucose delta calculation</div>
          </div>
        </div>

        <div
          style={{
            background: 'rgba(0, 0, 0, 0.25)',
            border: '1px solid var(--border-card)',
            padding: '10px 12px',
            borderRadius: 'var(--radius-sm)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <TrendingUp size={16} color="#06B6D4" style={{ flexShrink: 0 }} />
          <div>
            <div style={{ fontSize: '0.82rem', fontWeight: 700 }}>24h & 30-Day Trends</div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Daily, weekly & monthly graphics</div>
          </div>
        </div>

        <div
          style={{
            background: 'rgba(0, 0, 0, 0.25)',
            border: '1px solid var(--border-card)',
            padding: '10px 12px',
            borderRadius: 'var(--radius-sm)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <ShieldCheck size={16} color="#8B5CF6" style={{ flexShrink: 0 }} />
          <div>
            <div style={{ fontSize: '0.82rem', fontWeight: 700 }}>Instant Cloud Sync</div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Private PostgreSQL database</div>
          </div>
        </div>
      </div>

      {/* CTA Buttons */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center' }}>
        <button
          onClick={onScrollToDemo}
          className="btn btn-secondary"
          style={{
            flex: '1 1 180px',
            padding: '12px 18px',
            fontSize: '0.9rem',
            background: 'rgba(255, 255, 255, 0.08)',
          }}
        >
          <Play size={16} color="var(--before-color)" />
          Try Interactive Demo
        </button>

        <button
          onClick={onOpenAuthModal}
          className="btn btn-primary"
          style={{
            flex: '1 1 180px',
            padding: '12px 18px',
            fontSize: '0.9rem',
          }}
        >
          Create Free Account
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};
