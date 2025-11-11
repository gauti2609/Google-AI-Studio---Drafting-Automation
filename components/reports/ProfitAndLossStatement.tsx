
import React from 'react';
// FIX: Add file extension to fix module resolution error.
import { AllData } from '../../types.ts';

interface ReportProps {
  allData: AllData;
}

const formatCurrency = (num: number): string => {
    if (isNaN(num) || num === 0) return '-';
    const formatted = new Intl.NumberFormat('en-IN', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(Math.abs(num));
    return num < 0 ? `(${formatted})` : formatted;
};

const ReportRow: React.FC<{ label: string; note?: string; valueCy?: number; valuePy?: number; isBold?: boolean; isSub?: boolean; isHeader?: boolean; }> = 
({ label, note, valueCy, valuePy, isBold, isSub, isHeader }) => {
    if (isHeader) {
        return (
            <tr className="font-bold bg-gray-700/30">
                <td className="p-3 text-white">{label}</td>
                <td className="p-3 text-center"></td>
                <td className="p-3 text-right"></td>
                <td className="p-3 text-right"></td>
            </tr>
        );
    }
    return (
        <tr className={`${isBold ? 'font-bold text-white' : ''}`}>
            <td className={`p-2 ${isSub ? 'pl-8' : ''}`}>{label}</td>
            <td className="p-2 text-center text-gray-400">{note}</td>
            <td className="p-2 text-right font-mono">{valueCy !== undefined ? formatCurrency(valueCy) : ''}</td>
            <td className="p-2 text-right font-mono">{valuePy !== undefined ? formatCurrency(valuePy) : ''}</td>
        </tr>
    );
};


export const ProfitAndLossStatement: React.FC<ReportProps> = ({ allData }) => {
    const { trialBalanceData, scheduleData } = allData;

    const getTBTotal = (groupingCode: string, year: 'cy' | 'py') => {
        const key = year === 'cy' ? 'closingCy' : 'closingPy';
        return trialBalanceData
            .filter(i => i.isMapped && i.groupingCode === groupingCode)
            .reduce((sum, item) => sum + item[key], 0);
    };
    
    const parseNumeric = (val: string): number => parseFloat(val.replace(/,/g, '')) || 0;

    // --- REVENUE ---
    const revenueCy = Math.abs(getTBTotal('C.10.01', 'cy'));
    const revenuePy = Math.abs(getTBTotal('C.10.01', 'py'));

    // --- EXPENSES ---
    const purchasesCy = getTBTotal('C.20.01', 'cy');
    const purchasesPy = getTBTotal('C.20.01', 'py');
    const employeeBenefitsCy = getTBTotal('C.20.02', 'cy');
    const employeeBenefitsPy = getTBTotal('C.20.02', 'py');
    const depreciationCy = scheduleData.ppe.reduce((sum, row) => sum + parseNumeric(row.depreciationForYear), 0);
    const depreciationPy = 0; // PY schedule data not available in this mock setup

    const totalExpensesCy = purchasesCy + employeeBenefitsCy + depreciationCy;
    const totalExpensesPy = purchasesPy + employeeBenefitsPy + depreciationPy;

    // --- PROFIT ---
    const profitBeforeTaxCy = revenueCy - totalExpensesCy;
    const profitBeforeTaxPy = revenuePy - totalExpensesPy;
    
    // --- EPS ---
    const epsCy = profitBeforeTaxCy / parseNumeric(scheduleData.eps.weightedAvgEquityShares);
    const epsPy = 0;

    return (
        <div className="bg-gray-800 text-gray-200">
            <h2 className="text-xl font-semibold mb-4 text-white">Statement of Profit and Loss</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                    <thead className="bg-gray-700/50">
                        <tr>
                            <th className="p-3 text-left font-medium w-1/2">Particulars</th>
                            <th className="p-3 text-center font-medium">Note No.</th>
                            <th className="p-3 text-right font-medium">Current Year (₹)</th>
                            <th className="p-3 text-right font-medium">Previous Year (₹)</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                        <ReportRow label="I. Revenue from operations" note="" valueCy={revenueCy} valuePy={revenuePy} isBold/>
                        <ReportRow label="II. Other Income" note="" isBold />
                        <ReportRow label="III. Total Income (I + II)" valueCy={revenueCy} valuePy={revenuePy} isBold />

                        <ReportRow label="IV. EXPENSES" isHeader />
                        <ReportRow label="Purchases of Stock-in-Trade" valueCy={purchasesCy} valuePy={purchasesPy} isSub />
                        <ReportRow label="Employee benefits expense" valueCy={employeeBenefitsCy} valuePy={employeeBenefitsPy} isSub />
                        <ReportRow label="Depreciation and amortisation expense" valueCy={depreciationCy} valuePy={depreciationPy} isSub />
                        <ReportRow label="Total expenses" valueCy={totalExpensesCy} valuePy={totalExpensesPy} isBold />

                        <ReportRow label="V. Profit before tax (III - IV)" valueCy={profitBeforeTaxCy} valuePy={profitBeforeTaxPy} isBold />
                        <ReportRow label="VI. Tax expense" isBold/>
                        <ReportRow label="VII. Profit for the period (V - VI)" valueCy={profitBeforeTaxCy} valuePy={profitBeforeTaxPy} isBold />
                        
                        <ReportRow label="VIII. Earnings per equity share" isHeader />
                        <ReportRow label="Basic (₹)" note="11" valueCy={epsCy} valuePy={epsPy} isSub />
                        <ReportRow label="Diluted (₹)" note="11" valueCy={epsCy} valuePy={epsPy} isSub />
                    </tbody>
                </table>
            </div>
        </div>
    );
};
