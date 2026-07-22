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
  const userDisplayName = user?.email ? user.email.split('@')[0] : null;

  return (
    <header style={{ marginBottom: '16px' }}>
      {/* Top Header Row */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '12px',
          gap: '8px',
        }}
      >
        {/* Logo & Subtitle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              background: 'linear-gradient(180deg, #30D158 0%, #28B84C 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 14px rgba(48, 209, 88, 0.35)',
              flexShrink: 0,
            }}
          >
            <Droplet color="#FFFFFF" size={20} />
          </div>
          <div>
            <h1 style={{ fontSize: '1.25rem', fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1.1 }}>
              Glucose<span style={{ color: 'var(--before-color)' }}>Pulse</span>
            </h1>
            <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
              Blood Sugar Tracker
            </p>
          </div>
        </div>

        {/* Action Controls (Profile, Export CSV, Theme Toggle) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          {/* User Profile Button */}
          <button
            onClick={onOpenAuthModal}
            className="btn btn-secondary"
            title={user ? `Logged in as ${user.email}` : 'Sign In / Account'}
            style={{
              padding: '6px 12px',
              height: '36px',
              minHeight: '36px',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.8rem',
              fontWeight: 600,
              gap: '6px',
              borderColor: user ? 'var(--before-border)' : undefined,
              background: user ? 'var(--before-bg)' : undefined,
            }}
          >
            <UserIcon size={15} color={user ? 'var(--before-color)' : 'var(--text-secondary)'} />
            {userDisplayName ? (
              <span style={{ textTransform: 'capitalize', maxWidth: '80px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {userDisplayName}
              </span>
            ) : (
              <span>Sign In</span>
            )}
          </button>

          {/* Export CSV */}
          <button
            onClick={onExportCSV}
            className="btn btn-secondary btn-icon"
            title="Export CSV Logs"
            style={{ width: '36px', height: '36px', minHeight: '36px' }}
          >
            <Download size={15} />
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="btn btn-secondary btn-icon"
            title="Toggle Light/Dark Theme"
            style={{ width: '36px', height: '36px', minHeight: '36px' }}
          >
            {theme === 'dark' ? <Sun size={15} color="#FF9F0A" /> : <Moon size={15} color="#0A84FF" />}
          </button>
        </div>
      </div>

      {/* Sleek Integrated Timeframe Filter Control Bar */}
      <div className="glass-card" style={{ padding: '10px 12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
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
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Selected Date:</span>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              style={{
                background: 'rgba(0,0,0,0.3)',
                border: '1px solid var(--border-card)',
                color: 'var(--text-primary)',
                padding: '3px 8px',
                borderRadius: '8px',
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
                  background: 'rgba(0,0,0,0.3)',
                  border: '1px solid var(--border-card)',
                  color: 'var(--text-primary)',
                  padding: '3px 6px',
                  borderRadius: '8px',
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
                  background: 'rgba(0,0,0,0.3)',
                  border: '1px solid var(--border-card)',
                  color: 'var(--text-primary)',
                  padding: '3px 6px',
                  borderRadius: '8px',
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
