import React, { useState, useEffect } from 'react';
import { X, Check, Utensils, Clock, MessageSquare, AlertCircle } from 'lucide-react';
import type { MealState, MealType, BPReading } from '../types/bp';
import { getLocalDatetimeInputValue, parseLocalDatetimeInput } from '../utils/dateUtils';

interface QuickLogModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (reading: Omit<BPReading, 'id'>) => void;
  editingReading?: BPReading | null;
}

export const QuickLogModal: React.FC<QuickLogModalProps> = ({
  isOpen,
  onClose,
  onSave,
  editingReading,
}) => {
  const [value, setValue] = useState<string>('');
  const [mealState, setMealState] = useState<MealState>('before');
  const [mealType, setMealType] = useState<MealType>('breakfast');
  const [timestamp, setTimestamp] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (editingReading) {
      setValue(editingReading.value.toString());
      setMealState(editingReading.mealState);
      setMealType(editingReading.mealType);
      setTimestamp(getLocalDatetimeInputValue(editingReading.timestamp));
      setNotes(editingReading.notes || '');
    } else {
      setValue('');
      setMealState('before');
      setMealType('breakfast');
      setTimestamp(getLocalDatetimeInputValue());
      setNotes('');
    }
    setError('');
  }, [editingReading, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numValue = parseInt(value.trim(), 10);
    
    if (!value || isNaN(numValue) || numValue <= 0 || numValue > 800) {
      setError('Please enter a valid blood sugar level (e.g. 123, 180, 349).');
      return;
    }

    // Cross-browser safe local timezone parsing (Safari/Chrome/iOS)
    const dateObj = timestamp ? parseLocalDatetimeInput(timestamp) : new Date();
    const isoDate = dateObj.toISOString();

    onSave({
      value: numValue,
      mealState,
      mealType,
      timestamp: isoDate,
      notes: notes.trim() || undefined,
    });

    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Mobile iOS Sheet Top Handle */}
        <div
          style={{
            width: '36px',
            height: '4px',
            borderRadius: '2px',
            background: 'rgba(255, 255, 255, 0.2)',
            margin: '0 auto 12px auto',
          }}
        />

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 700 }}>
              {editingReading ? 'Edit Blood Sugar' : 'Record Blood Sugar'}
            </h2>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Enter glucose number (mg/dL) & meal timing
            </p>
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
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="bp-input-wrapper">
            <label style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
              Blood Sugar Number (mg/dL)
            </label>
            <input
              type="number"
              inputMode="numeric"
              pattern="[0-9]*"
              placeholder="e.g. 123"
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
                setError('');
              }}
              className="bp-number-input"
              autoFocus
            />
            {error && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--danger)', fontSize: '0.82rem', marginTop: '4px' }}>
                <AlertCircle size={14} />
                <span>{error}</span>
              </div>
            )}
          </div>

          <div>
            <label style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
              Meal Timing
            </label>
            <div className="pill-grid-3">
              <button
                type="button"
                className={`pill-btn ${mealState === 'before' ? 'active-before' : ''}`}
                onClick={() => setMealState('before')}
              >
                🟢 Before Eat
              </button>
              <button
                type="button"
                className={`pill-btn ${mealState === 'after' ? 'active-after' : ''}`}
                onClick={() => setMealState('after')}
              >
                🟠 After Eat
              </button>
              <button
                type="button"
                className={`pill-btn ${mealState === 'none' ? 'active-primary' : ''}`}
                onClick={() => setMealState('none')}
              >
                ⚪ General
              </button>
            </div>
          </div>

          <div>
            <label style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
              <Utensils size={14} />
              Meal Category
            </label>
            <div className="pill-grid-4">
              {(['breakfast', 'lunch', 'dinner', 'snack'] as MealType[]).map((type) => (
                <button
                  key={type}
                  type="button"
                  className={`pill-btn ${mealType === type ? 'active-primary' : ''}`}
                  onClick={() => setMealType(type)}
                  style={{ textTransform: 'capitalize' }}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
              <Clock size={14} />
              Date & Time
            </label>
            <input
              type="datetime-local"
              value={timestamp}
              onChange={(e) => setTimestamp(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 12px',
                fontSize: '0.9rem',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-card)',
                background: 'rgba(0,0,0,0.2)',
                color: 'var(--text-primary)',
                outline: 'none',
                fontFamily: 'inherit',
              }}
            />
          </div>

          <div>
            <label style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
              <MessageSquare size={14} />
              Notes (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g. Took insulin, high carb meal..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 12px',
                fontSize: '0.9rem',
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
            className="btn btn-primary"
            style={{ width: '100%', padding: '13px', fontSize: '1rem', marginTop: '6px' }}
          >
            <Check size={18} />
            Save Blood Sugar
          </button>
        </form>
      </div>
    </div>
  );
};
