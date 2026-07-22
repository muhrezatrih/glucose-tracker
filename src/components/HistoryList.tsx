import React, { useState } from 'react';
import type { BPReading, MealState } from '../types/bp';
import { Clock, Edit2, Trash2, Utensils } from 'lucide-react';

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

  return (
    <div className="glass-card" style={{ padding: '20px' }}>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '12px',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '16px',
        }}
      >
        <h3 style={{ fontSize: '1.05rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Clock size={18} color="var(--primary)" />
          Log History ({filtered.length})
        </h3>

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
            style={{ padding: '4px 10px', minWidth: 'auto', fontSize: '0.78rem' }}
          >
            🟢 Before
          </button>
          <button
            onClick={() => setFilterState('after')}
            className={`pill-btn ${filterState === 'after' ? 'active-after' : ''}`}
            style={{ padding: '4px 10px', minWidth: 'auto', fontSize: '0.78rem' }}
          >
            🟠 After
          </button>
        </div>
      </div>

      {filtered.length === 0 ? (
        <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', textAlign: 'center', padding: '20px 0' }}>
          No log entries match your filter.
        </p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {filtered.map((item) => {
            const dateObj = new Date(item.timestamp);
            const timeStr = dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            const dateStr = dateObj.toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' });

            const isDeleting = deletingId === item.id;

            return (
              <div
                key={item.id}
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid var(--border-card)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '12px',
                  transition: 'background 0.2s ease',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', minWidth: '70px' }}>
                    <span
                      style={{
                        fontSize: '1.6rem',
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
                    <span style={{ fontSize: '0.7rem', fontWeight: 600, color: 'var(--text-muted)' }}>mg/dL</span>
                  </div>

                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '3px' }}>
                      <span className={`badge badge-${item.mealState}`}>
                        {item.mealState === 'before'
                          ? '🟢 Before Eat'
                          : item.mealState === 'after'
                          ? '🟠 After Eat'
                          : '⚪ General'}
                      </span>
                      <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'capitalize', display: 'flex', alignItems: 'center', gap: '3px' }}>
                        <Utensils size={12} />
                        {item.mealType}
                      </span>
                    </div>

                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                      {dateStr} at {timeStr}
                    </div>

                    {item.notes && (
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '4px', fontStyle: 'italic' }}>
                        "{item.notes}"
                      </div>
                    )}
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  {isDeleting ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <button
                        onClick={() => onDelete(item.id)}
                        className="btn btn-primary"
                        style={{
                          background: 'var(--danger)',
                          padding: '4px 8px',
                          fontSize: '0.75rem',
                          minHeight: '32px',
                        }}
                      >
                        Confirm Delete
                      </button>
                      <button
                        onClick={() => setDeletingId(null)}
                        className="btn btn-secondary"
                        style={{ padding: '4px 8px', fontSize: '0.75rem', minHeight: '32px' }}
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
                          padding: '8px',
                          cursor: 'pointer',
                          borderRadius: '6px',
                        }}
                        title="Edit reading"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => setDeletingId(item.id)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: 'var(--text-muted)',
                          padding: '8px',
                          cursor: 'pointer',
                          borderRadius: '6px',
                        }}
                        title="Delete reading"
                      >
                        <Trash2 size={16} />
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
