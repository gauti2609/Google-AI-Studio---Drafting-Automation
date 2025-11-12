
import React from 'react';
import { AllData } from '../../types.ts';

// Import all note components
import { CorporateInfoNote } from '../schedules/narrative/CorporateInfoNote.tsx';
import { AccountingPoliciesNote } from '../schedules/narrative/AccountingPoliciesNote.tsx';
import { ShareCapitalNote } from './notes/ShareCapitalNote.tsx';
import { OtherEquityNote } from './notes/OtherEquityNote.tsx';
import { PPENote } from './notes/PPENote.tsx';
import { IntangibleAssetsNote } from './notes/IntangibleAssetsNote.tsx';
import { CWIPNote } from './notes/CWIPNote.tsx';
import { BorrowingsNote } from './notes/BorrowingsNote.tsx';
import { TradePayablesAgeingNote } from './notes/TradePayablesAgeingNote.tsx';
import { TradeReceivablesNote } from './notes/TradeReceivablesAgeingNote.tsx';
import { CashAndCashEquivalentsNote } from './notes/CashAndCashEquivalentsNote.tsx';
import { RevenueFromOpsNote } from './notes/RevenueFromOpsNote.tsx';
import { OtherIncomeNote } from './notes/OtherIncomeNote.tsx';
import { EmployeeBenefitsNote } from './notes/EmployeeBenefitsNote.tsx';
import { FinanceCostsNote } from './notes/FinanceCostsNote.tsx';
import { OtherExpensesNote } from './notes/OtherExpensesNote.tsx';
import { TaxExpenseNote } from './notes/TaxExpenseNote.tsx';
import { EarningsPerShareNote } from './notes/EarningsPerShareNote.tsx';
import { RelatedPartyNote } from './notes/RelatedPartyNote.tsx';
import { ContingentLiabilitiesNote } from './notes/ContingentLiabilitiesNote.tsx';
import { EventsAfterBalanceSheetNote } from '../schedules/narrative/EventsAfterBalanceSheetNote.tsx';
import { CommitmentsNote } from './notes/CommitmentsNote.tsx';

interface ReportProps {
  allData: AllData;
}

const NoteWrapper: React.FC<{ title: string; noteNumber: number; children: React.ReactNode }> = ({ title, noteNumber, children }) => (
    <div className="mb-8 p-4 bg-gray-900/50 rounded-lg">
        <h3 className="text-lg font-bold text-white mb-3">
            <span className="text-brand-blue">{noteNumber}.</span> {title}
        </h3>
        <div className="text-sm">
            {children}
        </div>
    </div>
);


export const NotesToAccounts: React.FC<ReportProps> = ({ allData }) => {
    const { scheduleData } = allData;

    // This is a simplified mapping. A real app would have a more dynamic system.
    const notes = [
        { id: 'corpInfo', number: 1, title: 'Corporate Information', component: <CorporateInfoNote data={scheduleData.corporateInfo} /> },
        { id: 'acctPolicies', number: 2, title: 'Significant Accounting Policies', component: <AccountingPoliciesNote data={scheduleData.accountingPolicies} /> },
        { id: 'shareCap', number: 3, title: 'Share Capital', component: <ShareCapitalNote data={scheduleData.shareCapital} /> },
        { id: 'otherEquity', number: 4, title: 'Other Equity', component: <OtherEquityNote data={scheduleData.otherEquity} /> },
        { id: 'ppe', number: 5, title: 'Property, Plant and Equipment', component: <PPENote data={scheduleData.ppe} /> },
        { id: 'intangible', number: 6, title: 'Intangible Assets', component: <IntangibleAssetsNote data={scheduleData.intangibleAssets} /> },
        { id: 'cwip', number: 7, title: 'Capital Work-in-Progress', component: <CWIPNote data={scheduleData.cwip} /> },
        { id: 'borrowings', number: 13, title: 'Borrowings', component: <BorrowingsNote data={scheduleData.borrowings} /> },
        { id: 'tradePayables', number: 14, title: 'Trade Payables', component: <TradePayablesAgeingNote data={scheduleData.tradePayables.ageing} /> },
        { id: 'tradeReceivables', number: 11, title: 'Trade Receivables', component: <TradeReceivablesNote data={scheduleData.tradeReceivables} /> },
        { id: 'cash', number: 12, title: 'Cash and Cash Equivalents', component: <CashAndCashEquivalentsNote data={scheduleData.cashAndCashEquivalents} /> },
        { id: 'revenue', number: 16, title: 'Revenue from Operations', component: <RevenueFromOpsNote data={scheduleData.revenueFromOps} /> },
        { id: 'otherIncome', number: 17, title: 'Other Income', component: <OtherIncomeNote data={scheduleData.otherIncome} /> },
        { id: 'employee', number: 20, title: 'Employee Benefit Expense', component: <EmployeeBenefitsNote data={scheduleData.employeeBenefits} allData={allData} /> },
        { id: 'finance', number: 21, title: 'Finance Costs', component: <FinanceCostsNote data={scheduleData.financeCosts} /> },
        { id: 'otherExpenses', number: 22, title: 'Other Expenses', component: <OtherExpensesNote data={scheduleData.otherExpenses} /> },
        { id: 'tax', number: 23, title: 'Tax Expense', component: <TaxExpenseNote data={scheduleData.taxExpense} /> },
        { id: 'eps', number: 25, title: 'Earnings Per Share', component: <EarningsPerShareNote data={scheduleData.eps} /> },
        { id: 'relatedParties', number: 26, title: 'Related Party Disclosures', component: <RelatedPartyNote data={scheduleData.relatedParties} /> },
        { id: 'contingent', number: 27, title: 'Contingent Liabilities', component: <ContingentLiabilitiesNote data={scheduleData.contingentLiabilities} /> },
        { id: 'commitments', number: 28, title: 'Commitments', component: <CommitmentsNote data={scheduleData.commitments} /> },
        { id: 'eventsAfterBS', number: 29, title: 'Events after Balance Sheet Date', component: <EventsAfterBalanceSheetNote data={scheduleData.eventsAfterBalanceSheet} /> },
    ];

    const selectedNotes = scheduleData.noteSelections.filter(n => n.isSelected).map(n => n.id);

    return (
        <div className="bg-gray-800 text-gray-200">
            <h2 className="text-xl font-semibold mb-4 text-white">Notes to the Financial Statements</h2>
            {notes
                .filter(note => selectedNotes.includes(note.id))
                .sort((a, b) => a.number - b.number)
                .map(note => (
                    <NoteWrapper key={note.id} title={note.title} noteNumber={note.number}>
                        {note.component}
                    </NoteWrapper>
                ))}
        </div>
    );
};
