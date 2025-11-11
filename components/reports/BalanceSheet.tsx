
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


export const BalanceSheet: React.FC<ReportProps> = ({ allData }) => {
    const { trialBalanceData } = allData;

    const getTBTotal = (groupingCode: string, year: 'cy' | 'py') => {
        const key = year === 'cy' ? 'closingCy' : 'closingPy';
        return trialBalanceData
            .filter(i => i.isMapped && i.groupingCode === groupingCode)
            .reduce((sum, item) => sum + item[key], 0);
    };

    // ASSETS
    const ppeCy = getTBTotal('A.10.01', 'cy');
    const ppePy = getTBTotal('A.10.01', 'py');
    const nonCurrentAssetsCy = ppeCy;
    const nonCurrentAssetsPy = ppePy;

    const receivablesCy = getTBTotal('A.20.01', 'cy');
    const receivablesPy = getTBTotal('A.20.01', 'py');
    const cashCy = getTBTotal('A.20.02', 'cy');
    const cashPy = getTBTotal('A.20.02', 'py');
    const currentAssetsCy = receivablesCy + cashCy;
    const currentAssetsPy = receivablesPy + cashPy;

    const totalAssetsCy = nonCurrentAssetsCy + currentAssetsCy;
    const totalAssetsPy = nonCurrentAssetsPy + currentAssetsPy;

    // EQUITY AND LIABILITIES
    const equityShareCapitalCy = Math.abs(getTBTotal('B.10.01', 'cy'));
    const equityShareCapitalPy = Math.abs(getTBTotal('B.10.01', 'py'));
    
    // Simplified Retained Earnings (P&L balance)
    const revenueCy = Math.abs(getTBTotal('C.10.01', 'cy'));
    const expensesCy = getTBTotal('C.20.01', 'cy') + getTBTotal('C.20.02', 'cy');
    const retainedEarningsCy = revenueCy - expensesCy;
    const revenuePy = Math.abs(getTBTotal('C.10.01', 'py'));
    const expensesPy = getTBTotal('C.20.01', 'py') + getTBTotal('C.20.02', 'py');
    const retainedEarningsPy = revenuePy - expensesPy;

    const totalEquityCy = equityShareCapitalCy + retainedEarningsCy;
    const totalEquityPy = equityShareCapitalPy + retainedEarningsPy;
    
    const payablesCy = Math.abs(getTBTotal('B.20.01', 'cy'));
    const payablesPy = Math.abs(getTBTotal('B.20.01', 'py'));
    const currentLiabilitiesCy = payablesCy;
    const currentLiabilitiesPy = payablesPy;

    const totalEquityLiabilitiesCy = totalEquityCy + currentLiabilitiesCy;
    const totalEquityLiabilitiesPy = totalEquityPy + currentLiabilitiesPy;

    const differenceCy = totalAssetsCy - totalEquityLiabilitiesCy;

    return (
        <div className="bg-gray-800 text-gray-200">
            <h2 className="text-xl font-semibold mb-4 text-white">Balance Sheet</h2>
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
                        <ReportRow label="I. ASSETS" isHeader />
                        <ReportRow label="Non-current assets" isBold />
                        <ReportRow label="Property, Plant and Equipment" note="4" valueCy={ppeCy} valuePy={ppePy} isSub />
                        <ReportRow label="Total non-current assets" valueCy={nonCurrentAssetsCy} valuePy={nonCurrentAssetsPy} isBold />
                        
                        <ReportRow label="Current assets" isBold />
                        <ReportRow label="Trade Receivables" note="7" valueCy={receivablesCy} valuePy={receivablesPy} isSub />
                        <ReportRow label="Cash and cash equivalents" valueCy={cashCy} valuePy={cashPy} isSub />
                        <ReportRow label="Total current assets" valueCy={currentAssetsCy} valuePy={currentAssetsPy} isBold />
                        <ReportRow label="TOTAL ASSETS" valueCy={totalAssetsCy} valuePy={totalAssetsPy} isBold />

                        <ReportRow label="II. EQUITY AND LIABILITIES" isHeader />
                        <ReportRow label="Equity" isBold />
                        <ReportRow label="Equity Share Capital" note="3" valueCy={equityShareCapitalCy} valuePy={equityShareCapitalPy} isSub />
                        <ReportRow label="Other Equity (Retained Earnings)" valueCy={retainedEarningsCy} valuePy={retainedEarningsPy} isSub />
                        <ReportRow label="Total equity" valueCy={totalEquityCy} valuePy={totalEquityPy} isBold />
                        
                        <ReportRow label="Current liabilities" isBold />
                        <ReportRow label="Trade Payables" note="6" valueCy={payablesCy} valuePy={payablesPy} isSub />
                        <ReportRow label="Total current liabilities" valueCy={currentLiabilitiesCy} valuePy={currentLiabilitiesPy} isBold />
                        <ReportRow label="TOTAL EQUITY AND LIABILITIES" valueCy={totalEquityLiabilitiesCy} valuePy={totalEquityLiabilitiesPy} isBold />
                    </tbody>
                </table>
                 <div className="mt-4 p-4 bg-gray-900/50 rounded-lg text-xs">
                    <h4 className="font-bold text-gray-300">Balance Sheet Check</h4>
                     <div className="flex justify-between mt-2 pt-2 border-t border-gray-600">
                        <span className="font-bold">Difference (Assets - Equity & Liabilities):</span>
                        <span className={`font-mono font-bold ${Math.abs(differenceCy) > 0.01 ? 'text-red-400' : 'text-green-400'}`}>
                            {formatCurrency(differenceCy)}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};
