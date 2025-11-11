


import React from 'react';
// FIX: Add file extension to fix module resolution error.
import { ScheduleData, TrialBalanceItem, Masters } from '../../types.ts';

interface ReportProps {
  allData: {
    trialBalanceData: TrialBalanceItem[];
    masters: Masters;
    scheduleData: ScheduleData;
  }
}

const parseNumeric = (val: string): number => {
    if (typeof val !== 'string') return 0;
    return parseFloat(val.replace(/,/g, '')) || 0;
};

const formatCurrency = (num: number): string => {
    if (isNaN(num) || num === 0) return '-';
    const formatted = new Intl.NumberFormat('en-IN', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(Math.abs(num));
    return num < 0 ? `(${formatted})` : formatted;
};

const ReportRow: React.FC<{ label: string; valueCy?: number; valuePy?: number; isBold?: boolean; isSub?: boolean; isHeader?: boolean; }> = 
({ label, valueCy, valuePy, isBold, isSub, isHeader }) => {
    if (isHeader) {
        return (
            <tr className="font-bold bg-gray-700/30">
                <td className="p-3 text-white">{label}</td>
                <td className="p-3 text-right"></td>
                <td className="p-3 text-right"></td>
            </tr>
        );
    }
    return (
        <tr className={`${isBold ? 'font-bold text-white' : ''}`}>
            <td className={`p-2 ${isSub ? 'pl-8' : ''}`}>{label}</td>
            <td className="p-2 text-right font-mono">{valueCy !== undefined ? formatCurrency(valueCy) : ''}</td>
            <td className="p-2 text-right font-mono">{valuePy !== undefined ? formatCurrency(valuePy) : ''}</td>
        </tr>
    );
};

export const CashFlowStatement: React.FC<ReportProps> = ({ allData }) => {
    const { trialBalanceData, scheduleData } = allData;

    // --- HELPER FUNCTIONS ---
    const getTBTotal = (groupingCode: string, year: 'cy' | 'py') => {
        const key = year === 'cy' ? 'closingCy' : 'closingPy';
        return trialBalanceData
            .filter(i => i.isMapped && i.groupingCode === groupingCode)
            .reduce((sum, item) => sum + item[key], 0);
    };

    // --- P&L CALCULATIONS (needed for starting point) ---
    const revenueCy = Math.abs(getTBTotal('C.10.01', 'cy'));
    const purchasesCy = getTBTotal('C.20.01', 'cy');
    const employeeBenefitsCy = getTBTotal('C.20.02', 'cy');
    const totalExpensesCy = purchasesCy + employeeBenefitsCy;
    const profitBeforeTaxCy = revenueCy - totalExpensesCy;

    const revenuePy = Math.abs(getTBTotal('C.10.01', 'py'));
    const purchasesPy = getTBTotal('C.20.01', 'py');
    const employeeBenefitsPy = getTBTotal('C.20.02', 'py');
    const totalExpensesPy = purchasesPy + employeeBenefitsPy;
    const profitBeforeTaxPy = revenuePy - totalExpensesPy;

    // --- CASH FLOW FROM OPERATING ACTIVITIES ---
    const depreciationCy = scheduleData.ppe.reduce((sum, row) => sum + parseNumeric(row.depreciationForYear), 0);
    const depreciationPy = 0; // PY schedule data not available

    const receivablesCy = getTBTotal('A.20.01', 'cy');
    const receivablesPy = getTBTotal('A.20.01', 'py');
    const changeInReceivables = receivablesCy - receivablesPy; // Increase is a use of cash (-)

    const payablesCy = getTBTotal('B.20.01', 'cy'); // This will be negative
    const payablesPy = getTBTotal('B.20.01', 'py'); // This will be negative
    const changeInPayables = payablesCy - payablesPy; // Increase (more negative) is a source of cash (+)

    const cashFromOpsCy = profitBeforeTaxCy + depreciationCy - changeInReceivables + changeInPayables;
    const cashFromOpsPy = profitBeforeTaxPy + depreciationPy; // Incomplete due to lack of PY schedule data

    // --- CASH FLOW FROM INVESTING ACTIVITIES ---
    const purchaseOfPpeCy = scheduleData.ppe.reduce((sum, row) => sum + parseNumeric(row.grossBlockAdditions), 0);
    const cashFromInvCy = -purchaseOfPpeCy;
    const cashFromInvPy = 0; // Incomplete

    // --- CASH FLOW FROM FINANCING ACTIVITIES ---
    const shareCapitalCy = scheduleData.shareCapital.issued.reduce((sum, item) => sum + parseNumeric(item.amountCy), 0);
    const shareCapitalPy = scheduleData.shareCapital.issued.reduce((sum, item) => sum + parseNumeric(item.amountPy), 0);
    const proceedsFromShareCapitalCy = shareCapitalCy - shareCapitalPy;
    const cashFromFinCy = proceedsFromShareCapitalCy;
    const cashFromFinPy = 0; // Incomplete

    // --- RECONCILIATION ---
    const netChangeInCashCy = cashFromOpsCy + cashFromInvCy + cashFromFinCy;
    const netChangeInCashPy = cashFromOpsPy + cashFromInvPy + cashFromFinPy;

    const openingCashCy = getTBTotal('A.20.02', 'py');
    const openingCashPy = 0; // Not available from TB data

    const closingCashCy = getTBTotal('A.20.02', 'cy');
    const closingCashPy = getTBTotal('A.20.02', 'py');
    
    return (
        <div className="bg-gray-800 text-gray-200">
            <h2 className="text-xl font-semibold mb-4 text-white">Cash Flow Statement (Indirect Method)</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                    <thead className="bg-gray-700/50">
                        <tr>
                            <th className="p-3 text-left font-medium w-2/3">Particulars</th>
                            <th className="p-3 text-right font-medium">Current Year (₹)</th>
                            <th className="p-3 text-right font-medium">Previous Year (₹)</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                        <ReportRow label="A. Cash flow from operating activities" isHeader />
                        <ReportRow label="Profit before tax" valueCy={profitBeforeTaxCy} valuePy={profitBeforeTaxPy} isBold />
                        <ReportRow label="Adjustments for:" isBold />
                        <ReportRow label="Depreciation and amortisation expense" valueCy={depreciationCy} valuePy={depreciationPy} isSub />
                        <ReportRow label="Operating profit before working capital changes" valueCy={profitBeforeTaxCy + depreciationCy} valuePy={profitBeforeTaxPy + depreciationPy} isBold />
                        <ReportRow label="Adjustments for changes in working capital:" isBold />
                        <ReportRow label="Increase/Decrease in Trade Receivables" valueCy={-changeInReceivables} valuePy={0} isSub />
                        <ReportRow label="Increase/Decrease in Trade Payables" valueCy={changeInPayables} valuePy={0} isSub />
                        <ReportRow label="Cash generated from operations" valueCy={cashFromOpsCy} valuePy={cashFromOpsPy} isBold />
                        {/* Assuming no tax paid for simplicity */}
                        <ReportRow label="Net cash from operating activities" valueCy={cashFromOpsCy} valuePy={cashFromOpsPy} isBold />
                        
                        <ReportRow label="B. Cash flow from investing activities" isHeader />
                        <ReportRow label="Purchase of Property, Plant and Equipment" valueCy={-purchaseOfPpeCy} valuePy={0} isSub />
                        <ReportRow label="Net cash used in investing activities" valueCy={cashFromInvCy} valuePy={cashFromInvPy} isBold />

                        <ReportRow label="C. Cash flow from financing activities" isHeader />
                        <ReportRow label="Proceeds from issue of Equity Shares" valueCy={proceedsFromShareCapitalCy} valuePy={0} isSub />
                        <ReportRow label="Net cash from financing activities" valueCy={cashFromFinCy} valuePy={cashFromFinPy} isBold />

                        <ReportRow label="Net increase/(decrease) in cash and cash equivalents (A + B + C)" valueCy={netChangeInCashCy} valuePy={netChangeInCashPy} isBold />
                        <ReportRow label="Cash and cash equivalents at the beginning of the year" valueCy={openingCashCy} valuePy={openingCashPy} isBold />
                        <ReportRow label="Cash and cash equivalents at the end of the year" valueCy={closingCashCy} valuePy={closingCashPy} isBold />
                    </tbody>
                </table>
                <div className="mt-4 p-4 bg-gray-900/50 rounded-lg text-xs">
                    <h4 className="font-bold text-gray-300">Cash Reconciliation Check</h4>
                    <div className="flex justify-between">
                        <span>Calculated Closing Cash (Opening + Net Change):</span>
                        <span className="font-mono">{formatCurrency(openingCashCy + netChangeInCashCy)}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Balance Sheet Closing Cash:</span>
                        <span className="font-mono">{formatCurrency(closingCashCy)}</span>
                    </div>
                     <div className="flex justify-between mt-2 pt-2 border-t border-gray-600">
                        <span className="font-bold">Difference:</span>
                        <span className={`font-mono font-bold ${Math.abs((openingCashCy + netChangeInCashCy) - closingCashCy) > 0.01 ? 'text-red-400' : 'text-green-400'}`}>
                            {formatCurrency((openingCashCy + netChangeInCashCy) - closingCashCy)}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};