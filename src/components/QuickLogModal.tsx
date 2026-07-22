import React, { useState, useEffect } from 'react';
import { X, Check, Utensils, Clock, MessageSquare, AlertCircle } from 'lucide-react';
import type { MealState, MealType, BPReading } from '../types/bp';
import { getLocalDatetimeInputValue } from '../utils/dateUtils';

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

    const isoDate = timestamp ? new Date(timestamp).toISOString() : new Date().toISOString();

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
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>
              {editingReading ? 'Edit Blood Sugar' : 'Record Blood Sugar'}
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
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
            <X size={22} />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="bp-input-wrapper">
            <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
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
            <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '8px' }}>
              Meal Timing
            </label>
            <div className="pill-group">
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
                ⚪ General / Fasting
              </button>
            </div>
          </div>

          <div>
            <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
              <Utensils size={15} />
              Meal Category
            </label>
            <div className="pill-group">
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
            <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
              <Clock size={15} />
              Date & Time
            </label>
            <input
              type="datetime-local"
              value={timestamp}
              onChange={(e) => setTimestamp(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 14px',
                fontSize: '0.95rem',
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
            <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
              <MessageSquare size={15} />
              Notes (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g. Took insulin, high carb meal..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
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
            className="btn btn-primary"
            style={{ width: '100%', padding: '14px', fontSize: '1.05rem', marginTop: '10px' }}
          >
            <Check size={20} />
            Save Blood Sugar
          </button>
        </form>
      </div>
    </div>
  );
};
