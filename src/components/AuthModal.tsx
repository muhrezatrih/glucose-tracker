import React, { useState, useEffect } from 'react';
import { X, LogIn, UserPlus, LogOut, User as UserIcon, Lock, ShieldCheck, AlertCircle } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import type { User } from '@supabase/supabase-js';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
  onAuthChange: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  user,
  onAuthChange,
}) => {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [usernameInput, setUsernameInput] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  // Global Escape key listener to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Helper to normalize username (e.g. 'reza' -> 'reza@glucosepulse.app')
  const getAuthEmail = (input: string): string => {
    const trimmed = input.trim().toLowerCase();
    if (trimmed.includes('@')) {
      return trimmed;
    }
    return `${trimmed}@glucosepulse.app`;
  };

  const getUserDisplayName = (emailStr?: string): string => {
    if (!emailStr) return 'User';
    const name = emailStr.split('@')[0];
    return name;
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!usernameInput || !password) {
      setError('Please enter username and password.');
      return;
    }

    if (!isSupabaseConfigured()) {
      setError('Supabase is not configured yet. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your .env file.');
      return;
    }

    const email = getAuthEmail(usernameInput);
    setLoading(true);
    setError('');
    setMessage('');

    try {
      if (mode === 'login') {
        const { error: loginError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (loginError) throw loginError;
        setMessage(`Logged in as ${getUserDisplayName(email)}!`);
        onAuthChange();
        setTimeout(() => onClose(), 800);
      } else {
        const redirectUrl = window.location.origin;
        const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: redirectUrl,
          },
        });
        if (signUpError) throw signUpError;

        if (signUpData.session) {
          setMessage(`Account created! Welcome, ${getUserDisplayName(email)}.`);
          onAuthChange();
          setTimeout(() => onClose(), 800);
        } else {
          // Attempt automatic sign-in if email confirmation is turned off
          const { error: autoSignInErr } = await supabase.auth.signInWithPassword({
            email,
            password,
          });
          if (!autoSignInErr) {
            setMessage(`Account created! Welcome, ${getUserDisplayName(email)}.`);
            onAuthChange();
            setTimeout(() => onClose(), 800);
          } else {
            setMessage('Account created! You can sign in now.');
            setMode('login');
            onAuthChange();
          }
        }
      }
    } catch (err: any) {
      if (err.message && err.message.toLowerCase().includes('rate limit')) {
        setError('Supabase Email Rate Limit Exceeded. Turn off "Confirm Email" in Supabase Auth settings to log in instantly without rate limits!');
      } else {
        setError(err.message || 'An authentication error occurred.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    setLoading(true);
    try {
      await supabase.auth.signOut();
      setMessage('Logged out successfully.');
      onAuthChange();
      setTimeout(() => onClose(), 800);
    } catch (err: any) {
      setError(err.message || 'Error signing out.');
    } finally {
      setLoading(false);
    }
  };

  const displayName = getUserDisplayName(user?.email);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShieldCheck color="var(--primary)" size={22} />
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>
              {user ? 'Account & Cloud Sync' : mode === 'login' ? 'Sign In' : 'Create Account'}
            </h2>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              padding: '6px',
            }}
          >
            <X size={22} />
          </button>
        </div>

        {!isSupabaseConfigured() && (
          <div
            style={{
              background: 'rgba(245, 158, 11, 0.12)',
              border: '1px solid rgba(245, 158, 11, 0.3)',
              borderRadius: 'var(--radius-sm)',
              padding: '12px',
              fontSize: '0.82rem',
              color: 'var(--after-color)',
              marginBottom: '16px',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '8px',
            }}
          >
            <AlertCircle size={18} style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <strong>Supabase Setup Required:</strong> Add your keys to <code>.env</code> file.
            </div>
          </div>
        )}

        {user ? (
          <div style={{ textAlign: 'center', padding: '10px 0' }}>
            <div
              style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                background: 'var(--before-bg)',
                color: 'var(--before-color)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 12px',
                fontSize: '1.5rem',
                fontWeight: 700,
                textTransform: 'uppercase',
              }}
            >
              {displayName.charAt(0)}
            </div>
            <div style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '4px', textTransform: 'capitalize' }}>
              {displayName}
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '24px' }}>
              Your blood sugar records are safely synced to your private cloud database.
            </p>

            <button
              onClick={handleSignOut}
              disabled={loading}
              className="btn btn-secondary"
              style={{ width: '100%', padding: '12px' }}
            >
              <LogOut size={18} />
              Sign Out
            </button>
          </div>
        ) : (
          <form onSubmit={handleAuth} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {error && (
              <div
                style={{
                  background: 'var(--danger-bg)',
                  color: 'var(--danger)',
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.85rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <AlertCircle size={16} style={{ flexShrink: 0 }} />
                <span>{error}</span>
              </div>
            )}

            {message && (
              <div
                style={{
                  background: 'var(--before-bg)',
                  color: 'var(--before-color)',
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.85rem',
                }}
              >
                {message}
              </div>
            )}

            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                <UserIcon size={15} />
                Username (or Email)
              </label>
              <input
                type="text"
                required
                placeholder="e.g. reza"
                value={usernameInput}
                onChange={(e) => setUsernameInput(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  fontSize: '0.95rem',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-card)',
                  background: 'rgba(0,0,0,0.2)',
                  color: 'var(--text-primary)',
                  outline: 'none',
                }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                <Lock size={15} />
                Password
              </label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  fontSize: '0.95rem',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-card)',
                  background: 'rgba(0,0,0,0.2)',
                  color: 'var(--text-primary)',
                  outline: 'none',
                }}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary"
              style={{ width: '100%', padding: '14px', fontSize: '1rem', marginTop: '6px' }}
            >
              {mode === 'login' ? <LogIn size={18} /> : <UserPlus size={18} />}
              {loading ? 'Processing...' : mode === 'login' ? 'Sign In' : 'Create Account'}
            </button>

            <div style={{ textAlign: 'center', marginTop: '10px' }}>
              <button
                type="button"
                onClick={() => {
                  setMode(mode === 'login' ? 'signup' : 'login');
                  setError('');
                  setMessage('');
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--primary)',
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  fontWeight: 600,
                }}
              >
                {mode === 'login' ? "Don't have an account? Sign Up" : 'Already have an account? Sign In'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
