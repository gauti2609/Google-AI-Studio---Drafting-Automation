import React, { useState } from 'react';
// FIX: Add file extensions to fix module resolution errors.
import { AllData, ScheduleData } from '../types.ts';
import { ShareCapitalSchedule } from '../components/schedules/ShareCapitalSchedule.tsx';
import { PPESchedule } from '../components/schedules/PPESchedule.tsx';
import { TradeReceivablesSchedule } from '../components/schedules/TradeReceivablesSchedule.tsx';
import { TradePayablesSchedule } from '../components/schedules/TradePayablesSchedule.tsx';
import { BorrowingsSchedule } from '../components/schedules/BorrowingsSchedule.tsx';
import { ChangesInInventoriesSchedule } from '../components/schedules/ChangesInInventoriesSchedule.tsx';
import { EarningsPerShareSchedule } from '../components/schedules/EarningsPerShareSchedule.tsx';
import { ContingentLiabilitiesSchedule } from '../components/schedules/ContingentLiabilitiesSchedule.tsx';
import { CorporateInfoNote } from '../components/schedules/narrative/CorporateInfoNote.tsx';
import { AccountingPoliciesNote } from '../components/schedules/narrative/AccountingPoliciesNote.tsx';
import { RelatedPartySchedule } from '../components/schedules/RelatedPartySchedule.tsx';
import { EventsAfterBalanceSheetNote } from '../components/schedules/narrative/EventsAfterBalanceSheetNote.tsx';
import { FinalizedBanner } from '../components/FinalizedBanner.tsx';
import { ConfirmationModal } from '../components/ConfirmationModal.tsx';

interface SchedulesPageProps {
  allData: AllData;
  setScheduleData: React.Dispatch<React.SetStateAction<ScheduleData>>;
}

type ScheduleView = 'shareCapital' | 'ppe' | 'tradeReceivables' | 'tradePayables' | 'borrowings' | 'inventories' | 'eps' | 'contingent' | 'corpInfo' | 'acctPolicies' | 'relatedParty' | 'eventsAfter';

export const SchedulesPage: React.FC<SchedulesPageProps> = ({ allData, setScheduleData }) => {
  const [activeView, setActiveView] = useState<ScheduleView>('shareCapital');
  const [isFinalizeModalOpen, setFinalizeModalOpen] = useState(false);
  const { scheduleData } = allData;
  const isFinalized = scheduleData.isFinalized;

  const handleFinalize = () => {
    setScheduleData(prev => ({ ...prev, isFinalized: true }));
    setFinalizeModalOpen(false);
  };
  
  const handleUnfinalize = () => {
    setScheduleData(prev => ({ ...prev, isFinalized: false }));
  };

  const renderSchedule = () => {
    switch(activeView) {
      case 'shareCapital': return <ShareCapitalSchedule data={scheduleData.shareCapital} onUpdate={setScheduleData} isFinalized={isFinalized} />;
      case 'ppe': return <PPESchedule data={scheduleData.ppe} onUpdate={setScheduleData} isFinalized={isFinalized} />;
      case 'tradeReceivables': return <TradeReceivablesSchedule data={scheduleData.tradeReceivables} onUpdate={setScheduleData} isFinalized={isFinalized} />;
      case 'tradePayables': return <TradePayablesSchedule data={scheduleData.tradePayables} onUpdate={setScheduleData} isFinalized={isFinalized} />;
      case 'borrowings': return <BorrowingsSchedule data={scheduleData.borrowings} onUpdate={setScheduleData} isFinalized={isFinalized} />;
      case 'inventories': return <ChangesInInventoriesSchedule data={scheduleData.changesInInventories} onUpdate={setScheduleData} isFinalized={isFinalized} />;
      case 'eps': return <EarningsPerShareSchedule data={scheduleData.eps} onUpdate={setScheduleData} isFinalized={isFinalized} />;
      case 'contingent': return <ContingentLiabilitiesSchedule data={scheduleData.contingentLiabilities} onUpdate={setScheduleData} isFinalized={isFinalized} />;
      case 'corpInfo': return <CorporateInfoNote data={scheduleData.corporateInfo} onUpdate={setScheduleData} isFinalized={isFinalized} />;
      case 'acctPolicies': return <AccountingPoliciesNote data={scheduleData.accountingPolicies} onUpdate={setScheduleData} isFinalized={isFinalized} />;
      case 'relatedParty': return <RelatedPartySchedule data={scheduleData.relatedParties} onUpdate={setScheduleData} isFinalized={isFinalized} />;
      case 'eventsAfter': return <EventsAfterBalanceSheetNote data={scheduleData.eventsAfterBalanceSheet} onUpdate={setScheduleData} isFinalized={isFinalized} />;
      default: return null;
    }
  };
  
  const scheduleNav = [
      { id: 'corpInfo', name: 'Corporate Info' },
      { id: 'acctPolicies', name: 'Accounting Policies' },
      { id: 'shareCapital', name: 'Share Capital' },
      { id: 'ppe', name: 'PPE' },
      { id: 'tradeReceivables', name: 'Trade Receivables' },
      { id: 'tradePayables', name: 'Trade Payables' },
      { id: 'borrowings', name: 'Borrowings' },
      { id: 'inventories', name: 'Inventories' },
      { id: 'eps', name: 'EPS' },
      { id: 'relatedParty', name: 'Related Parties' },
      { id: 'contingent', name: 'Contingent Liabilities' },
      { id: 'eventsAfter', name: 'Events After B/S' },
  ];

  return (
    <div className="p-6 h-full flex flex-col space-y-4">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">Schedules Entry</h1>
          <p className="text-sm text-gray-400">Enter detailed data for financial statement schedules and notes.</p>
        </div>
        {!isFinalized ? (
            <button onClick={() => setFinalizeModalOpen(true)} className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md transition-colors text-sm">
                Finalize Schedules
            </button>
        ) : (
             <button onClick={handleUnfinalize} className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded-md transition-colors text-sm">
                Edit Schedules
            </button>
        )}
      </header>
      
      {isFinalized && <FinalizedBanner />}

      <div className="flex-1 flex space-x-4 overflow-hidden">
        <nav className="w-1/5 bg-gray-800 p-2 rounded-lg border border-gray-700 overflow-y-auto">
            <ul className="space-y-1">
                {scheduleNav.map(item => (
                    <li key={item.id}>
                        <button onClick={() => setActiveView(item.id as ScheduleView)} className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${activeView === item.id ? 'bg-brand-blue text-white' : 'hover:bg-gray-700'}`}>
                            {item.name}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
        <main className="w-4/5 bg-gray-800 p-6 rounded-lg border border-gray-700 overflow-y-auto">
            {renderSchedule()}
        </main>
      </div>
      <ConfirmationModal 
        isOpen={isFinalizeModalOpen}
        onClose={() => setFinalizeModalOpen(false)}
        onConfirm={handleFinalize}
        title="Finalize Schedules?"
        message="Finalizing will lock the schedules from editing and allow you to proceed to reports. You can unlock them later if needed."
        confirmButtonText="Yes, Finalize"
        confirmButtonClass="bg-green-600 hover:bg-green-700"
      />
    </div>
  );
};
