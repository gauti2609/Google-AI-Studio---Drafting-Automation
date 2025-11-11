import React, { useState } from 'react';
// FIX: Add file extensions to fix module resolution errors.
import { AllData } from '../types.ts';
import { BalanceSheet } from '../components/reports/BalanceSheet.tsx';
import { ProfitAndLossStatement } from '../components/reports/ProfitAndLossStatement.tsx';
import { CashFlowStatement } from '../components/reports/CashFlowStatement.tsx';
import { NotesToAccounts } from '../components/reports/NotesToAccounts.tsx';
import { RatioAnalysis } from '../components/reports/RatioAnalysis.tsx';
import { exportToExcel } from '../services/exportService.ts';
import { DownloadIcon } from '../components/icons.tsx';

interface ReportsPageProps {
  allData: AllData;
}

type ReportView = 'bs' | 'pl' | 'cf' | 'notes' | 'ratios';

export const ReportsPage: React.FC<ReportsPageProps> = ({ allData }) => {
    const [activeView, setActiveView] = useState<ReportView>('bs');

    const renderReport = () => {
        switch(activeView) {
            case 'bs': return <BalanceSheet allData={allData} />;
            case 'pl': return <ProfitAndLossStatement allData={allData} />;
            case 'cf': return <CashFlowStatement allData={allData} />;
            case 'notes': return <NotesToAccounts allData={allData} />;
            case 'ratios': return <RatioAnalysis allData={allData} />;
            default: return null;
        }
    };
    
    const reportNav = [
        { id: 'bs', name: 'Balance Sheet' },
        { id: 'pl', name: 'Profit & Loss' },
        { id: 'cf', name: 'Cash Flow' },
        { id: 'notes', name: 'Notes to Accounts' },
        { id: 'ratios', name: 'Ratio Analysis' },
    ];

    return (
        <div className="p-6 h-full flex flex-col space-y-4">
             <header className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-white">Financial Reports</h1>
                    <p className="text-sm text-gray-400">View and export generated financial statements.</p>
                </div>
                <button onClick={() => exportToExcel(allData)} className="flex items-center bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md transition-colors text-sm">
                    <DownloadIcon className="w-4 h-4 mr-2"/>
                    Export to Excel
                </button>
            </header>
            <div className="flex border-b border-gray-700">
                {reportNav.map(item => (
                     <button key={item.id} onClick={() => setActiveView(item.id as ReportView)} className={`px-4 py-2 text-sm font-medium transition-colors ${activeView === item.id ? 'border-b-2 border-brand-blue text-white' : 'text-gray-400 hover:text-white'}`}>
                        {item.name}
                    </button>
                ))}
            </div>
            <main className="flex-1 bg-gray-800 p-6 rounded-lg border border-gray-700 overflow-y-auto">
                {renderReport()}
            </main>
        </div>
    );
};
