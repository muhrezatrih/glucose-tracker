import React from 'react';
import { Droplet, Download, Sun, Moon, Calendar, User as UserIcon, Trash2, Sparkles } from 'lucide-react';
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
  onLoadSample: () => void;
  onClearAllData: () => void;
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
  onLoadSample,
  onClearAllData,
  user,
  onOpenAuthModal,
}) => {
  return (
    <header style={{ marginBottom: '24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 14px rgba(16, 185, 129, 0.4)',
            }}
          >
            <Droplet color="#FFFFFF" size={24} />
          </div>
          <div>
            <h1 style={{ fontSize: '1.4rem', fontWeight: 800, letterSpacing: '-0.5px' }}>
              Glucose<span style={{ color: 'var(--before-color)' }}>Pulse</span>
            </h1>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Blood Sugar & Pre/Post Meal Tracker (mg/dL)
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          {/* User Account / Sync Button */}
          <button
            onClick={onOpenAuthModal}
            className="btn btn-secondary"
            title={user ? `Logged in as ${user.email}` : 'Sign In / Account Sync'}
            style={{ padding: '8px 10px', fontSize: '0.85rem', borderColor: user ? 'var(--before-border)' : undefined }}
          >
            <UserIcon size={16} color={user ? 'var(--before-color)' : 'var(--text-secondary)'} />
            <span style={{ maxWidth: '100px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {user ? user.email?.split('@')[0] : 'Sign In'}
            </span>
          </button>

          <button
            onClick={onClearAllData}
            className="btn btn-secondary"
            title="Clear All Data (Start Fresh)"
            style={{ padding: '8px 10px', fontSize: '0.85rem', color: 'var(--danger)' }}
          >
            <Trash2 size={16} />
          </button>

          <button
            onClick={onLoadSample}
            className="btn btn-secondary"
            title="Load Sample Demo Data"
            style={{ padding: '8px 10px', fontSize: '0.85rem' }}
          >
            <Sparkles size={16} color="var(--before-color)" />
          </button>

          <button
            onClick={onExportCSV}
            className="btn btn-secondary btn-icon"
            title="Export Logs to CSV"
            style={{ width: '38px', height: '38px' }}
          >
            <Download size={16} />
          </button>

          <button
            onClick={toggleTheme}
            className="btn btn-secondary btn-icon"
            title="Toggle Light/Dark Theme"
            style={{ width: '38px', height: '38px' }}
          >
            {theme === 'dark' ? <Sun size={18} color="#F59E0B" /> : <Moon size={18} color="#6366F1" />}
          </button>
        </div>
      </div>

      {/* Date & Period Filter Bar */}
      <div className="glass-card" style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center', justifyContent: 'space-between' }}>
          <div className="pill-group" style={{ margin: 0 }}>
            <button
              onClick={() => setPeriod('today')}
              className={`pill-btn ${period === 'today' ? 'active-primary' : ''}`}
              style={{ minWidth: '75px', padding: '6px 12px', fontSize: '0.85rem' }}
            >
              Today
            </button>
            <button
              onClick={() => setPeriod('thisMonth')}
              className={`pill-btn ${period === 'thisMonth' ? 'active-primary' : ''}`}
              style={{ minWidth: '95px', padding: '6px 12px', fontSize: '0.85rem' }}
            >
              This Month
            </button>
            <button
              onClick={() => setPeriod('lastMonth')}
              className={`pill-btn ${period === 'lastMonth' ? 'active-primary' : ''}`}
              style={{ minWidth: '95px', padding: '6px 12px', fontSize: '0.85rem' }}
            >
              Last Month
            </button>
            <button
              onClick={() => setPeriod('custom')}
              className={`pill-btn ${period === 'custom' ? 'active-primary' : ''}`}
              style={{ minWidth: '100px', padding: '6px 12px', fontSize: '0.85rem' }}
            >
              Custom Range
            </button>
          </div>

          {period === 'today' && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Calendar size={16} color="var(--text-muted)" />
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                style={{
                  background: 'rgba(0,0,0,0.2)',
                  border: '1px solid var(--border-card)',
                  color: 'var(--text-primary)',
                  padding: '6px 10px',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.88rem',
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
              gap: '12px',
              paddingTop: '8px',
              borderTop: '1px solid var(--border-card)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              <span>From:</span>
              <input
                type="date"
                value={customStartDate}
                onChange={(e) => setCustomStartDate(e.target.value)}
                style={{
                  background: 'rgba(0,0,0,0.2)',
                  border: '1px solid var(--border-card)',
                  color: 'var(--text-primary)',
                  padding: '6px 10px',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.88rem',
                  outline: 'none',
                  fontFamily: 'inherit',
                }}
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              <span>To:</span>
              <input
                type="date"
                value={customEndDate}
                onChange={(e) => setCustomEndDate(e.target.value)}
                style={{
                  background: 'rgba(0,0,0,0.2)',
                  border: '1px solid var(--border-card)',
                  color: 'var(--text-primary)',
                  padding: '6px 10px',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.88rem',
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
