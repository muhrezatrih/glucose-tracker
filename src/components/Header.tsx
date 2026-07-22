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
    <header style={{ marginBottom: '16px' }}>
      {/* Top Header Bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '12px',
          gap: '8px',
        }}
      >
        {/* Logo & Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
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
              flexShrink: 0,
            }}
          >
            <Droplet color="#FFFFFF" size={19} />
          </div>
          <div>
            <h1 style={{ fontSize: '1.2rem', fontWeight: 800, letterSpacing: '-0.5px', lineHeight: 1.1 }}>
              Glucose<span style={{ color: 'var(--before-color)' }}>Pulse</span>
            </h1>
            <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
              Blood Sugar Tracker
            </p>
          </div>
        </div>

        {/* Action Buttons (Avatar Icon, Export, Theme Toggle) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
          <button
            onClick={onOpenAuthModal}
            className="btn btn-secondary btn-icon"
            title={user ? `Account (${user.email})` : 'Sign In / Account'}
            style={{
              width: '36px',
              height: '36px',
              minHeight: '36px',
              borderRadius: 'var(--radius-sm)',
              position: 'relative',
              borderColor: user ? 'var(--before-border)' : undefined,
              background: user ? 'var(--before-bg)' : undefined,
            }}
          >
            <UserIcon size={16} color={user ? 'var(--before-color)' : 'var(--text-secondary)'} />
            {user && (
              <span
                style={{
                  position: 'absolute',
                  top: '4px',
                  right: '4px',
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: 'var(--before-color)',
                }}
              />
            )}
          </button>

          <button
            onClick={onExportCSV}
            className="btn btn-secondary btn-icon"
            title="Export CSV Logs"
            style={{ width: '36px', height: '36px', minHeight: '36px', borderRadius: 'var(--radius-sm)' }}
          >
            <Download size={15} />
          </button>

          <button
            onClick={toggleTheme}
            className="btn btn-secondary btn-icon"
            title="Toggle Light/Dark Theme"
            style={{ width: '36px', height: '36px', minHeight: '36px', borderRadius: 'var(--radius-sm)' }}
          >
            {theme === 'dark' ? <Sun size={16} color="#F59E0B" /> : <Moon size={16} color="#6366F1" />}
          </button>
        </div>
      </div>

      {/* Sleek Timeframe Filter Control Card (Saves 150px Vertical Space) */}
      <div className="glass-card" style={{ padding: '10px 12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {/* Horizontal 1-Row Segmented Control Bar */}
        <div className="segmented-control">
          <button
            onClick={() => setPeriod('today')}
            className={`segmented-control-item ${period === 'today' ? 'active' : ''}`}
          >
            Today
          </button>
          <button
            onClick={() => setPeriod('thisMonth')}
            className={`segmented-control-item ${period === 'thisMonth' ? 'active' : ''}`}
          >
            This Month
          </button>
          <button
            onClick={() => setPeriod('lastMonth')}
            className={`segmented-control-item ${period === 'lastMonth' ? 'active' : ''}`}
          >
            Last Month
          </button>
          <button
            onClick={() => setPeriod('custom')}
            className={`segmented-control-item ${period === 'custom' ? 'active' : ''}`}
          >
            Custom
          </button>
        </div>

        {/* Date Selector Row */}
        {period === 'today' && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '6px', paddingTop: '2px' }}>
            <Calendar size={14} color="var(--text-muted)" />
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Date:</span>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              style={{
                background: 'rgba(0,0,0,0.2)',
                border: '1px solid var(--border-card)',
                color: 'var(--text-primary)',
                padding: '3px 8px',
                borderRadius: '6px',
                fontSize: '0.8rem',
                outline: 'none',
                fontFamily: 'inherit',
              }}
            />
          </div>
        )}

        {period === 'custom' && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '8px',
              paddingTop: '6px',
              borderTop: '1px solid var(--border-card)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
              <span>From:</span>
              <input
                type="date"
                value={customStartDate}
                onChange={(e) => setCustomStartDate(e.target.value)}
                style={{
                  background: 'rgba(0,0,0,0.2)',
                  border: '1px solid var(--border-card)',
                  color: 'var(--text-primary)',
                  padding: '3px 6px',
                  borderRadius: '6px',
                  fontSize: '0.78rem',
                  outline: 'none',
                  fontFamily: 'inherit',
                }}
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
              <span>To:</span>
              <input
                type="date"
                value={customEndDate}
                onChange={(e) => setCustomEndDate(e.target.value)}
                style={{
                  background: 'rgba(0,0,0,0.2)',
                  border: '1px solid var(--border-card)',
                  color: 'var(--text-primary)',
                  padding: '3px 6px',
                  borderRadius: '6px',
                  fontSize: '0.78rem',
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
