import React, { useState } from 'react';
import type { BPReading, MealState, MealType } from '../types/bp';
import { Clock, Edit2, Trash2, SunMedium, Utensils, Moon, Apple, Zap } from 'lucide-react';

interface HistoryListProps {
  readings: BPReading[];
  onEdit: (reading: BPReading) => void;
  onDelete: (id: string) => void;
}

export const HistoryList: React.FC<HistoryListProps> = ({ readings, onEdit, onDelete }) => {
  const [filterState, setFilterState] = useState<MealState | 'all'>('all');
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const filtered = readings.filter((r) => {
    if (filterState === 'all') return true;
    return r.mealState === filterState;
  });

  // Helper for meal category distinct icon and color config
  const getMealCategoryConfig = (type: MealType) => {
    switch (type) {
      case 'breakfast':
        return {
          icon: <SunMedium size={12} />,
          label: 'Breakfast',
          color: '#FF9F0A',
          bg: 'rgba(255, 159, 10, 0.15)',
          border: 'rgba(255, 159, 10, 0.3)',
        };
      case 'lunch':
        return {
          icon: <Utensils size={12} />,
          label: 'Lunch',
          color: '#64D2FF',
          bg: 'rgba(100, 210, 255, 0.15)',
          border: 'rgba(100, 210, 255, 0.3)',
        };
      case 'dinner':
        return {
          icon: <Moon size={12} />,
          label: 'Dinner',
          color: '#BF5AF2',
          bg: 'rgba(191, 90, 242, 0.15)',
          border: 'rgba(191, 90, 242, 0.3)',
        };
      case 'snack':
        return {
          icon: <Apple size={12} />,
          label: 'Snack',
          color: '#FF453A',
          bg: 'rgba(255, 69, 58, 0.15)',
          border: 'rgba(255, 69, 58, 0.3)',
        };
      case 'fasting':
      default:
        return {
          icon: <Zap size={12} />,
          label: 'Fasting',
          color: '#0A84FF',
          bg: 'rgba(10, 132, 255, 0.15)',
          border: 'rgba(10, 132, 255, 0.3)',
        };
    }
  };

  return (
    <div className="glass-card" style={{ padding: '18px' }}>
      {/* Header Bar */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '10px',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '14px',
        }}
      >
        <h3 style={{ fontSize: '1.05rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px', letterSpacing: '-0.01em' }}>
          <Clock size={18} color="var(--primary)" />
          Log History ({filtered.length})
        </h3>

        {/* Filter Pills */}
        <div style={{ display: 'flex', gap: '6px' }}>
          <button
            onClick={() => setFilterState('all')}
            className={`pill-btn ${filterState === 'all' ? 'active-primary' : ''}`}
            style={{ padding: '4px 10px', minWidth: 'auto', fontSize: '0.78rem' }}
          >
            All
          </button>
          <button
            onClick={() => setFilterState('before')}
            className={`pill-btn ${filterState === 'before' ? 'active-before' : ''}`}
            style={{ padding: '4px 10px', minWidth: 'auto', fontSize: '0.78rem', gap: '4px' }}
          >
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--before-color)' }} />
            Before
          </button>
          <button
            onClick={() => setFilterState('after')}
            className={`pill-btn ${filterState === 'after' ? 'active-after' : ''}`}
            style={{ padding: '4px 10px', minWidth: 'auto', fontSize: '0.78rem', gap: '4px' }}
          >
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--after-color)' }} />
            After
          </button>
        </div>
      </div>

      {filtered.length === 0 ? (
        <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', textAlign: 'center', padding: '24px 0' }}>
          No log entries match your filter.
        </p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {filtered.map((item) => {
            const dateObj = new Date(item.timestamp);
            const timeStr = dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            const dateStr = dateObj.toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' });

            const mealCat = getMealCategoryConfig(item.mealType);
            const isDeleting = deletingId === item.id;

            return (
              <div
                key={item.id}
                style={{
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid var(--border-card)',
                  borderRadius: '14px',
                  padding: '12px 14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '10px',
                  transition: 'background 0.2s ease',
                }}
              >
                {/* Left side: Value, Indicator Dot, Meal Category */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  {/* Glucose Number */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', minWidth: '64px' }}>
                    <span
                      style={{
                        fontSize: '1.5rem',
                        fontWeight: 800,
                        lineHeight: 1.1,
                        color:
                          item.mealState === 'before'
                            ? 'var(--before-color)'
                            : item.mealState === 'after'
                            ? 'var(--after-color)'
                            : 'var(--text-primary)',
                        fontVariantNumeric: 'tabular-nums',
                      }}
                    >
                      {item.value}
                    </span>
                    <span style={{ fontSize: '0.68rem', fontWeight: 600, color: 'var(--text-muted)' }}>mg/dL</span>
                  </div>

                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '3px' }}>
                      {/* Clean Timing Indicator Dot */}
                      <span
                        style={{
                          width: '9px',
                          height: '9px',
                          borderRadius: '50%',
                          background:
                            item.mealState === 'before'
                              ? 'var(--before-color)'
                              : item.mealState === 'after'
                              ? 'var(--after-color)'
                              : 'var(--none-color)',
                          boxShadow:
                            item.mealState === 'before'
                              ? '0 0 8px rgba(48, 209, 88, 0.5)'
                              : item.mealState === 'after'
                              ? '0 0 8px rgba(255, 159, 10, 0.5)'
                              : 'none',
                          flexShrink: 0,
                        }}
                      />

                      {/* Meal Category Badge */}
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                          padding: '2px 7px',
                          borderRadius: 'var(--radius-full)',
                          fontSize: '0.74rem',
                          fontWeight: 600,
                          background: mealCat.bg,
                          color: mealCat.color,
                          border: `1px solid ${mealCat.border}`,
                          textTransform: 'capitalize',
                        }}
                      >
                        {mealCat.icon}
                        {mealCat.label}
                      </span>
                    </div>

                    {/* Date and Time */}
                    <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>
                      {dateStr} at {timeStr}
                    </div>

                    {item.notes && (
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '2px', fontStyle: 'italic' }}>
                        "{item.notes}"
                      </div>
                    )}
                  </div>
                </div>

                {/* Right side: Edit / Delete */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '2px', flexShrink: 0 }}>
                  {isDeleting ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <button
                        onClick={() => onDelete(item.id)}
                        className="btn btn-primary"
                        style={{
                          background: 'var(--danger)',
                          padding: '3px 8px',
                          fontSize: '0.72rem',
                          minHeight: '28px',
                        }}
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => setDeletingId(null)}
                        className="btn btn-secondary"
                        style={{ padding: '3px 8px', fontSize: '0.72rem', minHeight: '28px' }}
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <>
                      <button
                        onClick={() => onEdit(item)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: 'var(--text-muted)',
                          padding: '6px',
                          cursor: 'pointer',
                          borderRadius: '6px',
                        }}
                        title="Edit reading"
                      >
                        <Edit2 size={15} />
                      </button>
                      <button
                        onClick={() => setDeletingId(item.id)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: 'var(--text-muted)',
                          padding: '6px',
                          cursor: 'pointer',
                          borderRadius: '6px',
                        }}
                        title="Delete reading"
                      >
                        <Trash2 size={15} />
                      </button>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
