
import React from 'react';
// FIX: Add file extension to fix module resolution error.
import { AllData } from '../../types.ts';
// FIX: Add file extension to fix module resolution error.
import { formatNumber } from '../../utils/formatNumber.ts';

interface ReportProps {
  allData: AllData;
}

const ReportRow: React.FC<{ label: string; note?: string; valueCy?: number; valuePy?: number; isBold?: boolean; isSub?: boolean; isHeader?: boolean; formatFn: (num: number) => string; }> = 
({ label, note, valueCy, valuePy, isBold, isSub, isHeader, formatFn }) => {
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
            <td className="p-2 text-right font-mono">{valueCy !== undefined ? formatFn(valueCy) : ''}</td>
            <td className="p-2 text-right font-mono">{valuePy !== undefined ? formatFn(valuePy) : ''}</td>
        </tr>
    );
};

export const BalanceSheet: React.FC<ReportProps> = ({ allData }) => {
    const { trialBalanceData, scheduleData } = allData;
    const { roundingUnit } = scheduleData.corporateInfo;
    const format = (num: number) => formatNumber(num, roundingUnit);

    const getTBTotal = (groupingCode: string, year: 'cy' | 'py') => {
        const key = year === 'cy' ? 'closingCy' : 'closingPy';
        return trialBalanceData
            .filter(i => i.isMapped && i.groupingCode === groupingCode)
            .reduce((sum, item) => sum + item[key], 0);
    };

    // ASSETS
    // Non-current assets
    const ppeCy = getTBTotal('A.10.01', 'cy');
    const ppePy = getTBTotal('A.10.01', 'py');
    const intangiblesCy = getTBTotal('A.10.02', 'cy');
    const intangiblesPy = getTBTotal('A.10.02', 'py');
    const cwipCy = getTBTotal('A.10.03', 'cy');
    const cwipPy = getTBTotal('A.10.03', 'py');
    const totalNonCurrentAssetsCy = ppeCy + intangiblesCy + cwipCy;
    const totalNonCurrentAssetsPy = ppePy + intangiblesPy + cwipPy;

    // Current assets
    const inventoriesCy = getTBTotal('A.20.02', 'cy');
    const inventoriesPy = getTBTotal('A.20.02', 'py');
    const receivablesCy = getTBTotal('A.20.03', 'cy');
    const receivablesPy = getTBTotal('A.20.03', 'py');
    const cashCy = getTBTotal('A.20.04', 'cy');
    const cashPy = getTBTotal('A.20.04', 'py');
    const totalCurrentAssetsCy = inventoriesCy + receivablesCy + cashCy;
    const totalCurrentAssetsPy = inventoriesPy + receivablesPy + cashPy;

    const totalAssetsCy = totalNonCurrentAssetsCy + totalCurrentAssetsCy;
    const totalAssetsPy = totalNonCurrentAssetsPy + totalCurrentAssetsPy;

    // EQUITY AND LIABILITIES
    // Equity
    const shareCapitalCy = Math.abs(getTBTotal('B.10.01', 'cy'));
    const shareCapitalPy = Math.abs(getTBTotal('B.10.01', 'py'));
    const otherEquityCy = Math.abs(getTBTotal('B.10.02', 'cy'));
    const otherEquityPy = Math.abs(getTBTotal('B.10.02', 'py'));
    const totalEquityCy = shareCapitalCy + otherEquityCy;
    const totalEquityPy = shareCapitalPy + otherEquityPy;

    // Liabilities
    // Non-current liabilities
    const longTermBorrowingsCy = Math.abs(getTBTotal('B.20.01', 'cy'));
    const longTermBorrowingsPy = Math.abs(getTBTotal('B.20.01', 'py'));
    const totalNonCurrentLiabilitiesCy = longTermBorrowingsCy;
    const totalNonCurrentLiabilitiesPy = longTermBorrowingsPy;
    
    // Current liabilities
    const shortTermBorrowingsCy = Math.abs(getTBTotal('B.30.01', 'cy'));
    const shortTermBorrowingsPy = Math.abs(getTBTotal('B.30.01', 'py'));
    const tradePayablesCy = Math.abs(getTBTotal('B.30.02', 'cy'));
    const tradePayablesPy = Math.abs(getTBTotal('B.30.02', 'py'));
    const totalCurrentLiabilitiesCy = shortTermBorrowingsCy + tradePayablesCy;
    const totalCurrentLiabilitiesPy = shortTermBorrowingsPy + tradePayablesPy;

    const totalLiabilitiesCy = totalNonCurrentLiabilitiesCy + totalCurrentLiabilitiesCy;
    const totalLiabilitiesPy = totalNonCurrentLiabilitiesPy + totalCurrentLiabilitiesPy;
    
    const totalEquityAndLiabilitiesCy = totalEquityCy + totalLiabilitiesCy;
    const totalEquityAndLiabilitiesPy = totalEquityPy + totalLiabilitiesPy;

    return (
        <div className="bg-gray-800 text-gray-200">
            <h2 className="text-xl font-semibold mb-4 text-white">Balance Sheet</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                    <thead className="bg-gray-700/50">
                        <tr>
                            <th className="p-3 text-left font-medium w-1/2">Particulars</th>
                            <th className="p-3 text-center font-medium">Note No.</th>
                            <th className="p-3 text-right font-medium">Current Year ({scheduleData.corporateInfo.currencySymbol})</th>
                            <th className="p-3 text-right font-medium">Previous Year ({scheduleData.corporateInfo.currencySymbol})</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                        <ReportRow label="ASSETS" isHeader formatFn={format} />
                        <ReportRow label="Non-current assets" isBold formatFn={format} />
                        <ReportRow label="Property, Plant and Equipment" note="5" valueCy={ppeCy} valuePy={ppePy} isSub formatFn={format} />
                        <ReportRow label="Intangible assets" note="6" valueCy={intangiblesCy} valuePy={intangiblesPy} isSub formatFn={format} />
                        <ReportRow label="Capital work-in-progress" note="7" valueCy={cwipCy} valuePy={cwipPy} isSub formatFn={format} />
                        <ReportRow label="Total non-current assets" valueCy={totalNonCurrentAssetsCy} valuePy={totalNonCurrentAssetsPy} isBold formatFn={format} />

                        <ReportRow label="Current assets" isBold formatFn={format} />
                        <ReportRow label="Inventories" note="10" valueCy={inventoriesCy} valuePy={inventoriesPy} isSub formatFn={format} />
                        <ReportRow label="Trade receivables" note="11" valueCy={receivablesCy} valuePy={receivablesPy} isSub formatFn={format} />
                        <ReportRow label="Cash and cash equivalents" note="12" valueCy={cashCy} valuePy={cashPy} isSub formatFn={format} />
                        <ReportRow label="Total current assets" valueCy={totalCurrentAssetsCy} valuePy={totalCurrentAssetsPy} isBold formatFn={format} />
                        <ReportRow label="TOTAL ASSETS" valueCy={totalAssetsCy} valuePy={totalAssetsPy} isBold formatFn={format} />

                        <ReportRow label="EQUITY AND LIABILITIES" isHeader formatFn={format} />
                        <ReportRow label="Equity" isBold formatFn={format} />
                        <ReportRow label="Share Capital" note="3" valueCy={shareCapitalCy} valuePy={shareCapitalPy} isSub formatFn={format} />
                        <ReportRow label="Other Equity" note="4" valueCy={otherEquityCy} valuePy={otherEquityPy} isSub formatFn={format} />
                        <ReportRow label="Total Equity" valueCy={totalEquityCy} valuePy={totalEquityPy} isBold formatFn={format} />
                        
                        <ReportRow label="Liabilities" isBold formatFn={format} />
                        <ReportRow label="Non-current liabilities" isBold formatFn={format} />
                        <ReportRow label="Long-term borrowings" note="13" valueCy={longTermBorrowingsCy} valuePy={longTermBorrowingsPy} isSub formatFn={format} />
                        <ReportRow label="Total non-current liabilities" valueCy={totalNonCurrentLiabilitiesCy} valuePy={totalNonCurrentLiabilitiesPy} isBold formatFn={format} />
                        
                        <ReportRow label="Current liabilities" isBold formatFn={format} />
                        <ReportRow label="Short-term borrowings" note="13" valueCy={shortTermBorrowingsCy} valuePy={shortTermBorrowingsPy} isSub formatFn={format} />
                        <ReportRow label="Trade payables" note="14" valueCy={tradePayablesCy} valuePy={tradePayablesPy} isSub formatFn={format} />
                        <ReportRow label="Total current liabilities" valueCy={totalCurrentLiabilitiesCy} valuePy={totalCurrentLiabilitiesPy} isBold formatFn={format} />
                        <ReportRow label="Total Liabilities" valueCy={totalLiabilitiesCy} valuePy={totalLiabilitiesPy} isBold formatFn={format} />

                        <ReportRow label="TOTAL EQUITY AND LIABILITIES" valueCy={totalEquityAndLiabilitiesCy} valuePy={totalEquityAndLiabilitiesPy} isBold formatFn={format} />
                    </tbody>
                </table>
            </div>
        </div>
    );
};