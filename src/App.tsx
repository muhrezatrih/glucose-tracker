import { useState, useEffect, useRef } from 'react';
import { Header } from './components/Header';
import { LandingHero } from './components/LandingHero';
import { DailyGraphicChart } from './components/DailyGraphicChart';
import { MealImpactCard } from './components/MealImpactCard';
import { HistoryList } from './components/HistoryList';
import { QuickLogModal } from './components/QuickLogModal';
import { AuthModal } from './components/AuthModal';
import { BottomNav } from './components/BottomNav';
import { useBPStore } from './hooks/useBPStore';
import { getLocalDateString } from './utils/dateUtils';
import { generateSampleData } from './utils/sampleData';
import type { ViewPeriod, BPReading } from './types/bp';
import { Plus, Info, Sparkles } from 'lucide-react';

export function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [selectedDate, setSelectedDate] = useState<string>(
    getLocalDateString(new Date())
  );
  
  const [period, setPeriod] = useState<ViewPeriod>('today');
  
  const nowStr = getLocalDateString(new Date());
  const firstDayOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1)
    .toISOString()
    .split('T')[0];
  const [customStartDate, setCustomStartDate] = useState<string>(firstDayOfMonth);
  const [customEndDate, setCustomEndDate] = useState<string>(nowStr);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [editingReading, setEditingReading] = useState<BPReading | null>(null);

  const demoSectionRef = useRef<HTMLDivElement>(null);

  const {
    user,
    readings,
    addReading,
    updateReading,
    deleteReading,
    exportToCSV,
    filterByPeriod,
    calculateMealStats,
    refetch,
  } = useBPStore();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // If user is guest (null), load dynamic sample data for demo preview
  const displayReadings = user ? readings : generateSampleData();

  const filteredReadings = filterByPeriod(
    displayReadings,
    period,
    selectedDate,
    customStartDate,
    customEndDate
  );

  const dailyReadings = filterByPeriod(displayReadings, 'today', selectedDate);
  const mealStats = calculateMealStats(filteredReadings);

  // Intercept write actions for non-logged-in visitors
  const handleRecordClick = () => {
    if (!user) {
      setIsAuthModalOpen(true);
    } else {
      setEditingReading(null);
      setIsModalOpen(true);
    }
  };

  const handleOpenEdit = (reading: BPReading) => {
    if (!user) {
      setIsAuthModalOpen(true);
    } else {
      setEditingReading(reading);
      setIsModalOpen(true);
    }
  };

  const handleDelete = (id: string) => {
    if (!user) {
      setIsAuthModalOpen(true);
    } else {
      deleteReading(id);
    }
  };

  const handleSaveReading = (readingData: Omit<BPReading, 'id'>) => {
    if (editingReading) {
      updateReading(editingReading.id, readingData);
      setEditingReading(null);
    } else {
      addReading(readingData);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingReading(null);
  };

  const handleScrollToDemo = () => {
    demoSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const todayStr = getLocalDateString(new Date());
  const periodLabelMap: Record<ViewPeriod, string> = {
    today: selectedDate === todayStr ? 'Today' : selectedDate,
    thisMonth: 'This Month',
    lastMonth: 'Last Month',
    custom: `${customStartDate} to ${customEndDate}`,
    '7days': 'Last 7 Days',
    '30days': 'Last 30 Days',
    all: 'All Time',
  };

  return (
    <div className="app-container">
      <Header
        theme={theme}
        toggleTheme={toggleTheme}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        period={period}
        setPeriod={setPeriod}
        customStartDate={customStartDate}
        setCustomStartDate={setCustomStartDate}
        customEndDate={customEndDate}
        setCustomEndDate={setCustomEndDate}
        onExportCSV={exportToCSV}
        user={user}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
      />

      {/* Landing Hero for Non-Logged-In Visitors */}
      {!user && (
        <LandingHero
          onOpenAuthModal={() => setIsAuthModalOpen(true)}
          onScrollToDemo={handleScrollToDemo}
        />
      )}

      {/* Guest Mode Info Banner */}
      {!user && (
        <div
          ref={demoSectionRef}
          style={{
            background: 'rgba(59, 130, 246, 0.12)',
            border: '1px solid rgba(59, 130, 246, 0.3)',
            borderRadius: 'var(--radius-sm)',
            padding: '12px 14px',
            fontSize: '0.82rem',
            color: '#60A5FA',
            marginBottom: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '10px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Info size={16} style={{ flexShrink: 0 }} />
            <span>
              <strong>Interactive Demo Mode:</strong> Exploring dynamically generated sample data. Sign in to save your personal records!
            </span>
          </div>
          <button
            onClick={() => setIsAuthModalOpen(true)}
            style={{
              background: 'rgba(59, 130, 246, 0.2)',
              border: '1px solid rgba(59, 130, 246, 0.4)',
              color: '#93C5FD',
              padding: '4px 10px',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '0.78rem',
              fontWeight: 600,
              whiteSpace: 'nowrap',
              flexShrink: 0,
            }}
          >
            Sign In
          </button>
        </div>
      )}

      {/* Record Blood Sugar Primary CTA */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '16px',
        }}
      >
        <button
          onClick={handleRecordClick}
          className="btn btn-primary"
          style={{
            width: '100%',
            padding: '14px',
            fontSize: '1rem',
            background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
            boxShadow: '0 4px 14px rgba(16, 185, 129, 0.4)',
          }}
        >
          {user ? <Plus size={20} /> : <Sparkles size={18} />}
          {user ? 'Record Blood Sugar' : 'Sign In to Record Blood Sugar'}
        </button>
      </div>

      <DailyGraphicChart readings={dailyReadings} allReadings={displayReadings} selectedDate={selectedDate} />

      <MealImpactCard stats={mealStats} periodName={periodLabelMap[period]} />

      <HistoryList
        readings={filteredReadings}
        onEdit={handleOpenEdit}
        onDelete={handleDelete}
      />

      <QuickLogModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveReading}
        editingReading={editingReading}
      />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        user={user}
        onAuthChange={refetch}
      />

      <BottomNav
        onOpenModal={handleRecordClick}
      />
    </div>
  );
}

export default App;
