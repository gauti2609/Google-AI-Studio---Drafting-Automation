
import React, { useState } from 'react';
import { AllData, ScheduleData } from '../types.ts';
import { ShareCapitalSchedule } from '../components/schedules/ShareCapitalSchedule.tsx';
import { ConfirmationModal } from '../components/ConfirmationModal.tsx';
import { FinalizedBanner } from '../components/FinalizedBanner.tsx';
// Import all other schedule components...
import { OtherEquitySchedule } from '../components/schedules/OtherEquitySchedule.tsx';
import { BorrowingsSchedule } from '../components/schedules/BorrowingsSchedule.tsx';
import { TradePayablesSchedule } from '../components/schedules/TradePayablesSchedule.tsx';
import { PPESchedule } from '../components/schedules/PPESchedule.tsx';
import { CWIPSchedule } from '../components/schedules/CWIPSchedule.tsx';
import { IntangibleAssetsSchedule } from '../components/schedules/IntangibleAssetsSchedule.tsx';
import { InvestmentsSchedule } from '../components/schedules/InvestmentsSchedule.tsx';
import { LoansAndAdvancesSchedule } from '../components/schedules/LoansAndAdvancesSchedule.tsx';
import { InventoriesBalanceSchedule } from '../components/schedules/InventoriesBalanceSchedule.tsx';
import { TradeReceivablesSchedule } from '../components/schedules/TradeReceivablesSchedule.tsx';
import { CashAndCashEquivalentsSchedule } from '../components/schedules/CashAndCashEquivalentsSchedule.tsx';
import { RevenueFromOpsSchedule } from '../components/schedules/RevenueFromOpsSchedule.tsx';
import { OtherIncomeSchedule } from '../components/schedules/OtherIncomeSchedule.tsx';
import { CostOfMaterialsConsumedSchedule } from '../components/schedules/CostOfMaterialsConsumedSchedule.tsx';
import { ChangesInInventoriesSchedule } from '../components/schedules/ChangesInInventoriesSchedule.tsx';
import { EmployeeBenefitsSchedule } from '../components/schedules/EmployeeBenefitsSchedule.tsx';
import { FinanceCostsSchedule } from '../components/schedules/FinanceCostsSchedule.tsx';
import { OtherExpensesSchedule } from '../components/schedules/OtherExpensesSchedule.tsx';
import { TaxExpenseSchedule } from '../components/schedules/TaxExpenseSchedule.tsx';
import { EarningsPerShareSchedule } from '../components/schedules/EarningsPerShareSchedule.tsx';
import { RelatedPartySchedule } from '../components/schedules/RelatedPartySchedule.tsx';
import { ContingentLiabilitiesSchedule } from '../components/schedules/ContingentLiabilitiesSchedule.tsx';
import { CorporateInfoNote } from '../components/schedules/narrative/CorporateInfoNote.tsx';
import { AccountingPoliciesNote } from '../components/schedules/narrative/AccountingPoliciesNote.tsx';
import { EventsAfterBalanceSheetNote } from '../components/schedules/narrative/EventsAfterBalanceSheetNote.tsx';
import { CommitmentsSchedule } from '../components/schedules/CommitmentsSchedule.tsx';
import { ExceptionalItemsSchedule } from '../components/schedules/ExceptionalItemsSchedule.tsx';
import { AuditorPaymentsSchedule } from '../components/schedules/AuditorPaymentsSchedule.tsx';
import { ForeignExchangeSchedule } from '../components/schedules/ForeignExchangeSchedule.tsx';
import { RatioAnalysisExplanations } from '../components/schedules/RatioAnalysisExplanations.tsx';
import { DeferredTaxSchedule } from '../components/schedules/DeferredTaxSchedule.tsx';
import { CWIPAgeingSchedule } from '../components/schedules/CWIPAgeingSchedule.tsx';
import { IntangibleAssetsUnderDevelopmentMovementSchedule } from '../components/schedules/IntangibleAssetsUnderDevelopmentMovementSchedule.tsx';
import { IntangibleAssetsUnderDevelopmentSchedule } from '../components/schedules/IntangibleAssetsUnderDevelopmentSchedule.tsx';
import { AdditionalRegulatoryInfoNote } from '../components/schedules/narrative/AdditionalRegulatoryInfoNote.tsx';
import { TradePayablesMsmeSchedule } from '../components/schedules/TradePayablesMsmeSchedule.tsx';
import { LongTermReceivablesAgeingSchedule } from '../components/schedules/LongTermReceivablesAgeingSchedule.tsx';


type ScheduleView = 'corpInfo' | 'accountingPolicies' | 'shareCapital' | 'otherEquity' | 'borrowings' | 'tradePayables' | 'ppe' | 'cwip' | 'intangible' | 'investments' | 'loans' | 'inventories' | 'tradeReceivables' | 'cash' | 'revenue' | 'otherIncome' | 'cogs' | 'purchases' | 'changesInInv' | 'employee' | 'finance' | 'otherExpenses' | 'tax' | 'exceptional' | 'eps' | 'relatedParties' | 'contingent' | 'commitments' | 'eventsAfterBS' | 'forex' | 'auditor' | 'regulatory' | 'deferredTax' | 'ratioExplanations' | 'intangibleDev' | 'msme' | 'longTermReceivables';

export const SchedulesPage: React.FC<{ allData: AllData; setScheduleData: React.Dispatch<React.SetStateAction<ScheduleData>> }> = ({ allData, setScheduleData }) => {
    const [activeView, setActiveView] = useState<ScheduleView>('corpInfo');
    const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);
    
    const { scheduleData } = allData;
    const isFinalized = scheduleData.isFinalized;

    const handleFinalize = () => {
        setScheduleData(prev => ({...prev, isFinalized: true}));
        setConfirmModalOpen(false);
    };

    const handleEdit = () => {
        setScheduleData(prev => ({...prev, isFinalized: false}));
    }

    const renderSchedule = () => {
        switch (activeView) {
            case 'corpInfo':
                return <CorporateInfoNote data={scheduleData.corporateInfo} onUpdate={setScheduleData} isFinalized={isFinalized} />;
            case 'accountingPolicies':
                return <AccountingPoliciesNote data={scheduleData.accountingPolicies} onUpdate={setScheduleData} isFinalized={isFinalized} />;
            case 'shareCapital':
                return <ShareCapitalSchedule data={scheduleData.shareCapital} onUpdate={setScheduleData} isFinalized={isFinalized} />;
            case 'otherEquity':
                return <OtherEquitySchedule data={scheduleData.otherEquity} onUpdate={(d) => setScheduleData(p => ({...p, otherEquity: d}))} isFinalized={isFinalized} />;
            case 'borrowings':
                return <BorrowingsSchedule data={scheduleData.borrowings} onUpdate={setScheduleData} isFinalized={isFinalized} />;
            case 'tradePayables':
                return <TradePayablesSchedule data={scheduleData.tradePayables} onUpdate={(d) => setScheduleData(p => ({...p, tradePayables: d}))} isFinalized={isFinalized} />;
            case 'msme':
                return <TradePayablesMsmeSchedule data={scheduleData.tradePayables.msmeDisclosures} onUpdate={(d) => setScheduleData(p => ({...p, tradePayables: {...p.tradePayables, msmeDisclosures: d}}))} isFinalized={isFinalized} />;
            case 'ppe':
                 return <PPESchedule ppeData={scheduleData.ppe} onUpdate={(d) => setScheduleData(p => ({...p, ppe: d}))} isFinalized={isFinalized} />;
            case 'cwip':
                return (
                    <div className="space-y-8">
                        {/* FIX: Changed onUpdate to pass setScheduleData directly, as the component expects the full state setter. */}
                        <CWIPSchedule data={scheduleData.cwip} onUpdate={setScheduleData} isFinalized={isFinalized} />
                        <CWIPAgeingSchedule data={scheduleData.cwipAgeing} onUpdate={(d) => setScheduleData(p => ({...p, cwipAgeing: d}))} isFinalized={isFinalized} />
                    </div>
                );
            case 'intangible':
                 return <IntangibleAssetsSchedule data={scheduleData.intangibleAssets} onUpdate={(d) => setScheduleData(p => ({...p, intangibleAssets: d}))} isFinalized={isFinalized} />;
            case 'intangibleDev':
                 return (
                    <div className="space-y-8">
                        <IntangibleAssetsUnderDevelopmentMovementSchedule data={scheduleData.intangibleAssetsUnderDevelopmentMovement} onUpdate={(d) => setScheduleData(p => ({...p, intangibleAssetsUnderDevelopmentMovement: d}))} isFinalized={isFinalized} />
                        <IntangibleAssetsUnderDevelopmentSchedule data={scheduleData.intangibleAssetsUnderDevelopmentAgeing} onUpdate={(d) => setScheduleData(p => ({...p, intangibleAssetsUnderDevelopmentAgeing: d}))} isFinalized={isFinalized} />
                    </div>
                );
            case 'investments':
                return <InvestmentsSchedule data={scheduleData.investments} onUpdate={(d) => setScheduleData(p => ({...p, investments: d}))} isFinalized={isFinalized} />;
            case 'loans':
                return <LoansAndAdvancesSchedule data={scheduleData.loansAndAdvances} onUpdate={(d) => setScheduleData(p => ({...p, loansAndAdvances: d}))} isFinalized={isFinalized} />;
            case 'inventories':
                return <InventoriesBalanceSchedule data={scheduleData.inventories} valuationMode={scheduleData.inventoriesValuationMode} onUpdate={setScheduleData} isFinalized={isFinalized} />;
            case 'tradeReceivables':
                return <TradeReceivablesSchedule title="Short-Term Trade Receivables" data={scheduleData.tradeReceivables} onUpdate={(d) => setScheduleData(p => ({...p, tradeReceivables: d}))} isFinalized={isFinalized} />;
            case 'longTermReceivables':
                {/* FIX: Pass the correct slice of data (`.ageing`) and update the state accordingly to match component props. */}
                return <LongTermReceivablesAgeingSchedule data={scheduleData.longTermTradeReceivables.ageing} onUpdate={(d) => setScheduleData(p => ({...p, longTermTradeReceivables: {...p.longTermTradeReceivables, ageing: d}}))} isFinalized={isFinalized} />;
            case 'cash':
                return <CashAndCashEquivalentsSchedule data={scheduleData.cashAndCashEquivalents} onUpdate={setScheduleData} isFinalized={isFinalized} />;
            case 'revenue':
                {/* FIX: Changed onUpdate to pass setScheduleData directly, as the component expects the full state setter. */}
                return <RevenueFromOpsSchedule data={scheduleData.revenueFromOps} onUpdate={setScheduleData} isFinalized={isFinalized} />;
            case 'otherIncome':
                {/* FIX: Changed onUpdate to pass setScheduleData directly, as the component expects the full state setter. */}
                return <OtherIncomeSchedule data={scheduleData.otherIncome} onUpdate={setScheduleData} isFinalized={isFinalized} />;
            case 'cogs':
                return <CostOfMaterialsConsumedSchedule data={scheduleData.costOfMaterialsConsumed} onUpdate={setScheduleData} isFinalized={isFinalized} />;
            case 'changesInInv':
                return <ChangesInInventoriesSchedule data={scheduleData.changesInInventories} onUpdate={setScheduleData} isFinalized={isFinalized} />;
            case 'employee':
                return <EmployeeBenefitsSchedule data={scheduleData.employeeBenefits} onUpdate={setScheduleData} isFinalized={isFinalized} />;
            case 'finance':
                {/* FIX: Changed onUpdate to pass setScheduleData directly, as the component expects the full state setter. */}
                return <FinanceCostsSchedule data={scheduleData.financeCosts} onUpdate={setScheduleData} isFinalized={isFinalized} />;
            case 'otherExpenses':
                {/* FIX: Changed onUpdate to pass setScheduleData directly, as the component expects the full state setter. */}
                return <OtherExpensesSchedule data={scheduleData.otherExpenses} onUpdate={setScheduleData} isFinalized={isFinalized} />;
            case 'tax':
                return <TaxExpenseSchedule data={scheduleData.taxExpense} onUpdate={setScheduleData} isFinalized={isFinalized} />;
            case 'exceptional':
                return <ExceptionalItemsSchedule data={scheduleData.exceptionalItems} onUpdate={(d) => setScheduleData(p => ({...p, exceptionalItems: d}))} isFinalized={isFinalized} />;
            case 'eps':
                return <EarningsPerShareSchedule data={scheduleData.eps} onUpdate={setScheduleData} isFinalized={isFinalized} />;
            case 'relatedParties':
                return <RelatedPartySchedule data={scheduleData.relatedParties} onUpdate={setScheduleData} isFinalized={isFinalized} />;
            case 'contingent':
                return <ContingentLiabilitiesSchedule data={scheduleData.contingentLiabilities} onUpdate={setScheduleData} isFinalized={isFinalized} />;
            case 'commitments':
                return <CommitmentsSchedule data={scheduleData.commitments} onUpdate={(d) => setScheduleData(p => ({...p, commitments: d}))} isFinalized={isFinalized} />;
            case 'eventsAfterBS':
                return <EventsAfterBalanceSheetNote data={scheduleData.eventsAfterBalanceSheet} onUpdate={setScheduleData} isFinalized={isFinalized} />;
            case 'forex':
                return <ForeignExchangeSchedule data={scheduleData.foreignExchange} onUpdate={setScheduleData} isFinalized={isFinalized} />;
            case 'auditor':
                 return <AuditorPaymentsSchedule data={scheduleData.auditorPayments} onUpdate={(d) => setScheduleData(p => ({...p, auditorPayments: d}))} isFinalized={isFinalized} />;
            case 'regulatory':
                 return <AdditionalRegulatoryInfoNote data={scheduleData.additionalRegulatoryInfo} onUpdate={setScheduleData} isFinalized={isFinalized} />;
            case 'deferredTax':
                return <DeferredTaxSchedule data={scheduleData.deferredTax} onUpdate={(d) => setScheduleData(p => ({...p, deferredTax: d}))} isFinalized={isFinalized} />;
             case 'ratioExplanations':
                return <RatioAnalysisExplanations allData={allData} onUpdate={setScheduleData} isFinalized={isFinalized} />;

            default:
                return <div>Select a schedule from the left panel to begin.</div>
        }
    };

    const scheduleNav = [
        {id: 'corpInfo', name: 'Corporate Info'},
        {id: 'accountingPolicies', name: 'Accounting Policies'},
        {id: 'shareCapital', name: 'Share Capital'},
        {id: 'otherEquity', name: 'Other Equity'},
        {id: 'borrowings', name: 'Borrowings'},
        {id: 'tradePayables', name: 'Trade Payables'},
        {id: 'msme', name: 'MSME Disclosures'},
        {id: 'ppe', name: 'Property, Plant & Equipment'},
        {id: 'cwip', name: 'Capital WIP'},
        {id: 'intangible', name: 'Intangible Assets'},
        {id: 'intangibleDev', name: 'Intangible Assets - Dev.'},
        {id: 'investments', name: 'Investments'},
        {id: 'loans', name: 'Loans and Advances'},
        {id: 'inventories', name: 'Inventories (Balance)'},
        {id: 'tradeReceivables', name: 'Trade Receivables'},
        {id: 'longTermReceivables', name: 'Long-Term Trade Receivables'},
        {id: 'cash', name: 'Cash & Cash Equivalents'},
        {id: 'revenue', name: 'Revenue from Operations'},
        {id: 'otherIncome', name: 'Other Income'},
        {id: 'cogs', name: 'Cost of Materials'},
        {id: 'changesInInv', name: 'Changes in Inventories'},
        {id: 'employee', name: 'Employee Benefits'},
        {id: 'finance', name: 'Finance Costs'},
        {id: 'otherExpenses', name: 'Other Expenses'},
        {id: 'tax', name: 'Tax Expense'},
        {id: 'exceptional', name: 'Exceptional & Prior Items'},
        {id: 'eps', name: 'Earnings Per Share'},
        {id: 'relatedParties', name: 'Related Parties'},
        {id: 'contingent', name: 'Contingent Liabilities'},
        {id: 'commitments', name: 'Commitments'},
        {id: 'auditor', name: 'Auditor Payments'},
        {id: 'forex', name: 'Foreign Exchange'},
        {id: 'deferredTax', name: 'Deferred Tax'},
        {id: 'regulatory', name: 'Additional Reg. Info'},
        {id: 'ratioExplanations', name: 'Ratio Explanations'},
        {id: 'eventsAfterBS', name: 'Events After B/S Date'},
    ];

    return (
        <div className="p-6 h-full flex flex-col space-y-4">
             <header className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-white">Schedules Entry</h1>
                    <p className="text-sm text-gray-400">Enter detailed data for notes and schedules.</p>
                </div>
                 {isFinalized ? (
                    <button onClick={handleEdit} className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-md">Edit Schedules</button>
                 ) : (
                    <button onClick={() => setConfirmModalOpen(true)} className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md">Finalize Schedules</button>
                 )}
            </header>
            
            {isFinalized && <FinalizedBanner />}

            <div className="flex-1 flex space-x-4 overflow-hidden">
                <aside className="w-64 bg-gray-800 p-2 rounded-lg border border-gray-700 overflow-y-auto">
                    <nav className="space-y-1">
                        {scheduleNav.sort((a,b) => a.name.localeCompare(b.name)).map(item => (
                             <button key={item.id} onClick={() => setActiveView(item.id as ScheduleView)} className={`w-full text-left px-3 py-2 text-sm rounded-md ${activeView === item.id ? 'bg-brand-blue text-white' : 'hover:bg-gray-700'}`}>{item.name}</button>
                        ))}
                    </nav>
                </aside>
                <main className="flex-1 bg-gray-800 p-6 rounded-lg border border-gray-700 overflow-y-auto">
                    {renderSchedule()}
                </main>
            </div>
             <ConfirmationModal
                isOpen={isConfirmModalOpen}
                onClose={() => setConfirmModalOpen(false)}
                onConfirm={handleFinalize}
                title="Finalize Schedules?"
                message="Finalizing will lock the data entry for all schedules. You can still edit them later, but this marks a point of completion."
                confirmButtonText="Yes, Finalize"
                confirmButtonClass="bg-green-600 hover:bg-green-700"
            />
        </div>
    );
};
