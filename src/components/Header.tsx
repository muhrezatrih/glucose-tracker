import React from 'react';
import { Droplet, Download, Sun, Moon, Calendar, User as UserIcon } from 'lucide-react';
import type { ViewPeriod } from '../types/bp';
import type { User } from '@supabase/supabase-js';

interface HeaderProps {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  selectedDate: string;
  setSelectedDate: (date: string) => void;
  period: ViewPeriod;
  setPeriod: (period: ViewPeriod) => void;
  customStartDate: string;
  setCustomStartDate: (date: string) => void;
  customEndDate: string;
  setCustomEndDate: (date: string) => void;
  onExportCSV: () => void;
  user: User | null;
  onOpenAuthModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  theme,
  toggleTheme,
  selectedDate,
  setSelectedDate,
  period,
  setPeriod,
  customStartDate,
  setCustomStartDate,
  customEndDate,
  setCustomEndDate,
  onExportCSV,
  user,
  onOpenAuthModal,
}) => {
  return (
    <header style={{ marginBottom: '20px' }}>
      {/* Top Bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '16px',
          gap: '8px',
        }}
      >
        {/* Logo & Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
          <div
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(16, 185, 129, 0.35)',
              flexShrink: 0,
            }}
          >
            <Droplet color="#FFFFFF" size={20} />
          </div>
          <div>
            <h1 style={{ fontSize: '1.25rem', fontWeight: 800, letterSpacing: '-0.5px', lineHeight: 1.1 }}>
              Glucose<span style={{ color: 'var(--before-color)' }}>Pulse</span>
            </h1>
            <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
              Blood Sugar Tracker
            </p>
          </div>
        </div>

        {/* Tidy Action Controls Row (Account, Download, Theme Toggle) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
          {/* Account Button */}
          <button
            onClick={onOpenAuthModal}
            className="btn btn-secondary"
            title={user ? `Logged in as ${user.email}` : 'Sign In / Account Sync'}
            style={{
              padding: '6px 10px',
              fontSize: '0.8rem',
              height: '36px',
              minHeight: '36px',
              borderColor: user ? 'var(--before-border)' : undefined,
              borderRadius: 'var(--radius-sm)',
            }}
          >
            <UserIcon size={15} color={user ? 'var(--before-color)' : 'var(--text-secondary)'} />
            <span style={{ maxWidth: '80px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {user ? user.email?.split('@')[0] : 'Sign In'}
            </span>
          </button>

          {/* Export CSV */}
          <button
            onClick={onExportCSV}
            className="btn btn-secondary btn-icon"
            title="Export CSV Logs"
            style={{ width: '36px', height: '36px', minHeight: '36px', borderRadius: 'var(--radius-sm)' }}
          >
            <Download size={16} />
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="btn btn-secondary btn-icon"
            title="Toggle Light/Dark Theme"
            style={{ width: '36px', height: '36px', minHeight: '36px', borderRadius: 'var(--radius-sm)' }}
          >
            {theme === 'dark' ? <Sun size={17} color="#F59E0B" /> : <Moon size={17} color="#6366F1" />}
          </button>
        </div>
      </div>

      {/* Date & Period Filter Controls */}
      <div className="glass-card" style={{ padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center', justifyContent: 'space-between' }}>
          <div className="pill-group" style={{ margin: 0 }}>
            <button
              onClick={() => setPeriod('today')}
              className={`pill-btn ${period === 'today' ? 'active-primary' : ''}`}
              style={{ minWidth: '65px', padding: '5px 10px', fontSize: '0.8rem' }}
            >
              Today
            </button>
            <button
              onClick={() => setPeriod('thisMonth')}
              className={`pill-btn ${period === 'thisMonth' ? 'active-primary' : ''}`}
              style={{ minWidth: '85px', padding: '5px 10px', fontSize: '0.8rem' }}
            >
              This Month
            </button>
            <button
              onClick={() => setPeriod('lastMonth')}
              className={`pill-btn ${period === 'lastMonth' ? 'active-primary' : ''}`}
              style={{ minWidth: '85px', padding: '5px 10px', fontSize: '0.8rem' }}
            >
              Last Month
            </button>
            <button
              onClick={() => setPeriod('custom')}
              className={`pill-btn ${period === 'custom' ? 'active-primary' : ''}`}
              style={{ minWidth: '90px', padding: '5px 10px', fontSize: '0.8rem' }}
            >
              Custom
            </button>
          </div>

          {period === 'today' && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Calendar size={15} color="var(--text-muted)" />
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                style={{
                  background: 'rgba(0,0,0,0.2)',
                  border: '1px solid var(--border-card)',
                  color: 'var(--text-primary)',
                  padding: '4px 8px',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.82rem',
                  outline: 'none',
                  fontFamily: 'inherit',
                }}
              />
            </div>
          )}
        </div>

        {period === 'custom' && (
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: '10px',
              paddingTop: '8px',
              borderTop: '1px solid var(--border-card)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
              <span>From:</span>
              <input
                type="date"
                value={customStartDate}
                onChange={(e) => setCustomStartDate(e.target.value)}
                style={{
                  background: 'rgba(0,0,0,0.2)',
                  border: '1px solid var(--border-card)',
                  color: 'var(--text-primary)',
                  padding: '4px 8px',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.82rem',
                  outline: 'none',
                  fontFamily: 'inherit',
                }}
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
              <span>To:</span>
              <input
                type="date"
                value={customEndDate}
                onChange={(e) => setCustomEndDate(e.target.value)}
                style={{
                  background: 'rgba(0,0,0,0.2)',
                  border: '1px solid var(--border-card)',
                  color: 'var(--text-primary)',
                  padding: '4px 8px',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.82rem',
                  outline: 'none',
                  fontFamily: 'inherit',
                }}
              />
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
