import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { DailyGraphicChart } from './components/DailyGraphicChart';
import { MealImpactCard } from './components/MealImpactCard';
import { HistoryList } from './components/HistoryList';
import { QuickLogModal } from './components/QuickLogModal';
import { AuthModal } from './components/AuthModal';
import { BottomNav } from './components/BottomNav';
import { useBPStore } from './hooks/useBPStore';
import { getLocalDateString } from './utils/dateUtils';
import type { ViewPeriod, BPReading } from './types/bp';
import { Plus } from 'lucide-react';

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

  const filteredReadings = filterByPeriod(
    readings,
    period,
    selectedDate,
    customStartDate,
    customEndDate
  );

  const dailyReadings = filterByPeriod(readings, 'today', selectedDate);
  const mealStats = calculateMealStats(filteredReadings);

  const handleSaveReading = (readingData: Omit<BPReading, 'id'>) => {
    if (editingReading) {
      updateReading(editingReading.id, readingData);
      setEditingReading(null);
    } else {
      addReading(readingData);
    }
  };

  const handleOpenEdit = (reading: BPReading) => {
    setEditingReading(reading);
    setIsModalOpen(true);
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

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '16px',
        }}
      >
        <button
          onClick={() => {
            setEditingReading(null);
            setIsModalOpen(true);
          }}
          className="btn btn-primary"
          style={{ width: '100%', padding: '14px', fontSize: '1rem', background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)', boxShadow: '0 4px 14px rgba(16, 185, 129, 0.4)' }}
        >
          <Plus size={20} />
          Record Blood Sugar
        </button>
      </div>

      <DailyGraphicChart readings={dailyReadings} allReadings={readings} selectedDate={selectedDate} />

      <MealImpactCard stats={mealStats} periodName={periodLabelMap[period]} />

      <HistoryList
        readings={filteredReadings}
        onEdit={handleOpenEdit}
        onDelete={deleteReading}
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
        onOpenModal={() => {
          setEditingReading(null);
          setIsModalOpen(true);
        }}
      />
    </div>
  );
}

export default App;
