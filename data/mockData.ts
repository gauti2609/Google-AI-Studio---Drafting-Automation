import { v4 as uuidv4 } from 'uuid';
// FIX: Add file extension to fix module resolution error.
import { TrialBalanceItem, Masters, ScheduleData } from '../types.ts';

export const mockMasters: Masters = {
  majorHeads: [
    { code: 'A', name: 'Assets' },
    { code: 'B', name: 'Equity and Liabilities' },
    { code: 'C', name: 'Statement of Profit and Loss' },
  ],
  minorHeads: [
    { code: 'A.10', name: 'Non-current assets', majorHeadCode: 'A' },
    { code: 'A.20', name: 'Current assets', majorHeadCode: 'A' },
    { code: 'B.10', name: 'Equity', majorHeadCode: 'B' },
    { code: 'B.20', name: 'Current liabilities', majorHeadCode: 'B' },
    { code: 'C.10', name: 'Revenue', majorHeadCode: 'C' },
    { code: 'C.20', name: 'Expenses', majorHeadCode: 'C' },
  ],
  groupings: [
    { code: 'A.10.01', name: 'Property, Plant and Equipment', minorHeadCode: 'A.10' },
    { code: 'A.20.01', name: 'Trade Receivables', minorHeadCode: 'A.20' },
    { code: 'A.20.02', name: 'Cash and cash equivalents', minorHeadCode: 'A.20' },
    { code: 'B.10.01', name: 'Equity Share Capital', minorHeadCode: 'B.10' },
    { code: 'B.10.02', name: 'Other Equity', minorHeadCode: 'B.10' },
    { code: 'B.20.01', name: 'Trade Payables', minorHeadCode: 'B.20' },
    { code: 'C.10.01', name: 'Revenue from operations', minorHeadCode: 'C.10' },
    { code: 'C.20.01', name: 'Purchases of Stock-in-Trade', minorHeadCode: 'C.20' },
    { code: 'C.20.02', name: 'Employee benefits expense', minorHeadCode: 'C.20' },
  ],
};

export const mockTrialBalanceData: Omit<TrialBalanceItem, 'id' | 'isMapped' | 'majorHeadCode' | 'minorHeadCode' | 'groupingCode'>[] = [
    { ledger: 'Equity Share Capital', closingCy: -500000, closingPy: -500000 },
    { ledger: 'Sales Revenue', closingCy: -1200000, closingPy: -1000000 },
    { ledger: 'Trade Payables', closingCy: -150000, closingPy: -120000 },
    { ledger: 'Land and Building', closingCy: 400000, closingPy: 400000 },
    { ledger: 'Plant and Machinery', closingCy: 250000, closingPy: 200000 },
    { ledger: 'Trade Receivables', closingCy: 200000, closingPy: 180000 },
    { ledger: 'Cash at Bank', closingCy: 150000, closingPy: 100000 },
    { ledger: 'Purchases', closingCy: 600000, closingPy: 550000 },
    { ledger: 'Salaries and Wages', closingCy: 250000, closingPy: 220000 },
];

export const initialScheduleData: ScheduleData = {
    isFinalized: false,
    shareCapital: {
        authorized: { count: '100000', amount: '1000000' },
        issued: [
            { id: uuidv4(), class: 'Equity Shares of ₹10 each', countCy: '50000', amountCy: '500000', countPy: '50000', amountPy: '500000' }
        ]
    },
    ppe: [
        { id: uuidv4(), classOfAsset: 'Land and Building', grossBlockOpening: '400000', grossBlockAdditions: '0', grossBlockDisposals: '0', depreciationOpening: '50000', depreciationForYear: '10000', depreciationOnDisposals: '0' },
        { id: uuidv4(), classOfAsset: 'Plant and Machinery', grossBlockOpening: '200000', grossBlockAdditions: '50000', grossBlockDisposals: '0', depreciationOpening: '40000', depreciationForYear: '20000', depreciationOnDisposals: '0' }
    ],
    tradeReceivables: {
        outstandingForMoreThan6Months: { secured: '0', unsecured: '20000', doubtful: '5000' },
        others: { secured: '0', unsecured: '180000', doubtful: '0' },
        provisionForDoubtful: '5000'
    },
    tradePayables: {
        msme: '50000',
        others: '100000'
    },
    borrowings: [],
    changesInInventories: {
        opening: [],
        closing: []
    },
    eps: {
        pat: '320000',
        preferenceDividend: '0',
        weightedAvgEquityShares: '50000'
    },
    contingentLiabilities: [],
    corporateInfo: {
        companyName: 'FinAutomate Demo Inc.',
        cin: 'U12345MH2024PTC67890',
        incorporationDate: '01-01-2024',
        registeredOffice: '123 Tech Park, Mumbai, Maharashtra, India'
    },
    accountingPolicies: {
        basisOfPreparation: 'The financial statements have been prepared in accordance with Indian Accounting Standards (Ind AS) notified under the Companies (Indian Accounting Standards) Rules, 2015.',
        policies: [
            {id: uuidv4(), policy: 'Revenue is recognized upon transfer of control of promised goods or services to customers in an amount that reflects the consideration to which the Company expects to be entitled in exchange for those goods or services.'},
            {id: uuidv4(), policy: 'Property, Plant, and Equipment are stated at cost, less accumulated depreciation and accumulated impairment losses, if any.'}
        ]
    },
    relatedParties: {
        parties: [],
        transactions: []
    },
    eventsAfterBalanceSheet: {
        content: 'No significant events occurred after the balance sheet date that would require adjustment to or disclosure in the financial statements.'
    },
    noteSelections: [
        { id: 'corpInfo', name: '1. Corporate Information', order: 1, isSelected: true },
        { id: 'acctPolicies', name: '2. Significant Accounting Policies', order: 2, isSelected: true },
        { id: 'shareCapital', name: '3. Share Capital', order: 3, isSelected: false }, // Tabular notes are usually not selected here
        { id: 'ppe', name: '4. Property, Plant and Equipment', order: 4, isSelected: false },
        { id: 'tradePayables', name: '6. Trade Payables', order: 6, isSelected: false },
        { id: 'tradeReceivables', name: '7. Trade Receivables', order: 7, isSelected: false },
        { id: 'relatedParty', name: '10. Related Party Disclosures', order: 10, isSelected: true },
        { id: 'eps', name: '11. Earnings Per Share', order: 11, isSelected: false },
        { id: 'contingent', name: '12. Contingent Liabilities and Commitments', order: 12, isSelected: true },
        { id: 'eventsAfter', name: '13. Events after Balance Sheet date', order: 13, isSelected: false },
    ]
};
