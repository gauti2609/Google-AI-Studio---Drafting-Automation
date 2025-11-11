import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
// FIX: Add file extensions to fix module resolution errors.
import { Sidebar } from './components/Sidebar.tsx';
import { MappingWorkbench } from './components/MappingWorkbench.tsx';
import { SchedulesPage } from './pages/SchedulesPage.tsx';
import { NotesSelectionPage } from './pages/NotesSelectionPage.tsx';
import { ReportsPage } from './pages/ReportsPage.tsx';
import { Page, TrialBalanceItem, Masters, ScheduleData, AllData } from './types.ts';
import { mockMasters, initialScheduleData } from './data/mockData.ts';
import { useLocalStorage } from './hooks/useLocalStorage.ts';

function App() {
  const [activePage, setActivePage] = useState<Page>('mapping');

  const [trialBalanceData, setTrialBalanceData] = useLocalStorage<TrialBalanceItem[]>('trialBalanceData', []);
  const [masters, setMasters] = useLocalStorage<Masters>('masters', mockMasters);
  const [scheduleData, setScheduleData] = useLocalStorage<ScheduleData>('scheduleData', initialScheduleData);

  const allData: AllData = { trialBalanceData, masters, scheduleData };

  const handleImport = (data: Omit<TrialBalanceItem, 'id' | 'isMapped' | 'majorHeadCode' | 'minorHeadCode' | 'groupingCode'>[]) => {
    const newData: TrialBalanceItem[] = data.map(item => ({
      ...item,
      id: uuidv4(),
      isMapped: false,
      majorHeadCode: null,
      minorHeadCode: null,
      groupingCode: null,
    }));
    setTrialBalanceData(newData);
    setActivePage('mapping');
  };
  
  const handleReset = () => {
    // Clear local storage for a full reset
    window.localStorage.removeItem('trialBalanceData');
    window.localStorage.removeItem('scheduleData');
    window.localStorage.removeItem('masters');
    window.location.reload(); // Easiest way to reset state from all components
  };

  const renderPage = () => {
    switch (activePage) {
      case 'mapping':
        return <MappingWorkbench allData={allData} setTrialBalanceData={setTrialBalanceData} onImport={handleImport} masters={masters} setMasters={setMasters} onReset={handleReset} />;
      case 'schedules':
        return <SchedulesPage allData={allData} setScheduleData={setScheduleData} />;
      case 'notes':
        return <NotesSelectionPage allData={allData} setScheduleData={setScheduleData}/>;
      case 'reports':
        return <ReportsPage allData={allData} />;
      default:
        return <div>Page not found</div>;
    }
  };

  return (
    <div className="flex h-screen bg-gray-900 text-gray-200">
      <Sidebar activePage={activePage} setActivePage={setActivePage} />
      <main className="flex-1 overflow-y-auto">
        {renderPage()}
      </main>
    </div>
  );
}

export default App;
