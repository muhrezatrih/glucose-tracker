import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { LandingPage } from './components/LandingPage';
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
import { Plus, Info, ArrowLeft, User as UserIcon } from 'lucide-react';

export function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [currentView, setCurrentView] = useState<'landing' | 'app'>('landing');
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

  // If user logs in, automatically show real App Dashboard
  useEffect(() => {
    if (user) {
      setCurrentView('app');
    }
  }, [user]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // If user is guest (null), load dynamic sample data for demo mode
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

  // Render Dedicated Landing Page for non-logged-in visitors when currentView === 'landing'
  if (!user && currentView === 'landing') {
    return (
      <>
        <LandingPage
          onLaunchDemo={() => setCurrentView('app')}
          onOpenAuthModal={() => setIsAuthModalOpen(true)}
          theme={theme}
          toggleTheme={toggleTheme}
        />
        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
          user={user}
          onAuthChange={refetch}
        />
      </>
    );
  }

  // App Dashboard View (Logged-in users or Guest Demo mode)
  return (
    <div className="app-container">
      {/* Clean Demo Mode Header Indicator (No redundant sign in button) */}
      {!user && (
        <div
          style={{
            background: 'var(--none-bg)',
            border: '1px solid rgba(59, 130, 246, 0.3)',
            borderRadius: 'var(--radius-sm)',
            padding: '10px 14px',
            fontSize: '0.82rem',
            color: 'var(--none-color)',
            marginBottom: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '10px',
          }}
        >
          <button
            onClick={() => setCurrentView('landing')}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--none-color)',
              fontSize: '0.82rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: 0,
            }}
          >
            <ArrowLeft size={16} />
            Exit Demo to Landing Page
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600 }}>
            <Info size={14} style={{ flexShrink: 0 }} />
            <span>Interactive Demo Mode (Sample Data)</span>
          </div>
        </div>
      )}

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

      {/* Record Blood Sugar Primary Button */}
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
            fontWeight: 700,
          }}
        >
          {user ? <Plus size={20} /> : <UserIcon size={18} />}
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
