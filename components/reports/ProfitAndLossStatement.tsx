
import React from 'react';
import { AllData } from '../../types.ts';
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

export const ProfitAndLossStatement: React.FC<ReportProps> = ({ allData }) => {
    const { trialBalanceData, scheduleData } = allData;
    const { roundingUnit } = scheduleData.corporateInfo;
    const format = (num: number) => formatNumber(num, roundingUnit);
    const parse = (val: string) => parseFloat(String(val).replace(/,/g, '')) || 0;

    const getTBTotal = (groupingCode: string, year: 'cy' | 'py') => {
        const key = year === 'cy' ? 'closingCy' : 'closingPy';
        return trialBalanceData
            .filter(i => i.isMapped && i.groupingCode === groupingCode)
            .reduce((sum, item) => sum + item[key], 0);
    };

    // --- INCOME ---
    const revenueCy = Math.abs(getTBTotal('C.10.01', 'cy'));
    const revenuePy = Math.abs(getTBTotal('C.10.01', 'py'));
    const otherIncomeCy = Math.abs(getTBTotal('C.10.02', 'cy'));
    const otherIncomePy = Math.abs(getTBTotal('C.10.02', 'py'));
    const totalIncomeCy = revenueCy + otherIncomeCy;
    const totalIncomePy = revenuePy + otherIncomePy;

    // --- EXPENSES ---
    const purchasesCy = getTBTotal('C.20.02', 'cy');
    const purchasesPy = getTBTotal('C.20.02', 'py');
    const employeeBenefitsCy = getTBTotal('C.20.04', 'cy');
    const employeeBenefitsPy = getTBTotal('C.20.04', 'py');
    const financeCostsCy = getTBTotal('C.20.05', 'cy');
    const financeCostsPy = getTBTotal('C.20.05', 'py');
    const otherExpensesCy = getTBTotal('C.20.07', 'cy');
    const otherExpensesPy = getTBTotal('C.20.07', 'py');
    const depreciationCy = scheduleData.ppe.reduce((sum, row) => sum + parse(row.depreciationForYear), 0) +
                         scheduleData.intangibleAssets.reduce((sum, row) => sum + parse(row.depreciationForYear), 0);
    const depreciationPy = 0; // PY schedule data not implemented
    
    const totalExpensesCy = purchasesCy + employeeBenefitsCy + financeCostsCy + otherExpensesCy + depreciationCy;
    const totalExpensesPy = purchasesPy + employeeBenefitsPy + financeCostsPy + otherExpensesPy + depreciationPy;
    
    // --- PROFIT ---
    const profitBeforeTaxCy = totalIncomeCy - totalExpensesCy;
    const profitBeforeTaxPy = totalIncomePy - totalExpensesPy;
    const taxCy = parse(scheduleData.taxExpense.currentTax) + parse(scheduleData.taxExpense.deferredTax);
    const taxPy = 0; // Not implemented
    const profitAfterTaxCy = profitBeforeTaxCy - taxCy;
    const profitAfterTaxPy = profitBeforeTaxPy - taxPy;
    
    // --- EPS ---
    const shares = parse(scheduleData.eps.weightedAvgEquityShares);
    const basicEpsCy = shares > 0 ? profitAfterTaxCy / shares : 0;
    const basicEpsPy = 0; // Not implemented

    return (
        <div className="bg-gray-800 text-gray-200">
            <h2 className="text-xl font-semibold mb-4 text-white">Statement of Profit and Loss</h2>
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
                        <ReportRow label="I. Revenue from operations" note="16" valueCy={revenueCy} valuePy={revenuePy} formatFn={format} />
                        <ReportRow label="II. Other income" note="17" valueCy={otherIncomeCy} valuePy={otherIncomePy} formatFn={format} />
                        <ReportRow label="III. Total Income (I + II)" valueCy={totalIncomeCy} valuePy={totalIncomePy} isBold formatFn={format} />

                        <ReportRow label="IV. EXPENSES" isHeader formatFn={format} />
                        <ReportRow label="Purchases of Stock-in-Trade" valueCy={purchasesCy} valuePy={purchasesPy} formatFn={format} />
                        <ReportRow label="Employee benefits expense" note="20" valueCy={employeeBenefitsCy} valuePy={employeeBenefitsPy} formatFn={format} />
                        <ReportRow label="Finance costs" note="21" valueCy={financeCostsCy} valuePy={financeCostsPy} formatFn={format} />
                        <ReportRow label="Depreciation and amortisation expense" note="5, 6" valueCy={depreciationCy} valuePy={depreciationPy} formatFn={format} />
                        <ReportRow label="Other expenses" note="22" valueCy={otherExpensesCy} valuePy={otherExpensesPy} formatFn={format} />
                        <ReportRow label="Total Expenses" valueCy={totalExpensesCy} valuePy={totalExpensesPy} isBold formatFn={format} />
                        
                        <ReportRow label="V. Profit before tax (III - IV)" valueCy={profitBeforeTaxCy} valuePy={profitBeforeTaxPy} isBold formatFn={format} />
                        <ReportRow label="VI. Tax expense" note="23" valueCy={taxCy} valuePy={taxPy} formatFn={format} />
                        <ReportRow label="VII. Profit for the period (V - VI)" valueCy={profitAfterTaxCy} valuePy={profitAfterTaxPy} isBold formatFn={format} />

                        <ReportRow label="VIII. Earnings per equity share (for continuing operation):" isHeader formatFn={format} />
                        <ReportRow label="Basic (₹)" note="25" valueCy={basicEpsCy} valuePy={basicEpsPy} formatFn={format} />
                        <ReportRow label="Diluted (₹)" note="25" valueCy={basicEpsCy} valuePy={basicEpsPy} formatFn={format} />
                    </tbody>
                </table>
            </div>
        </div>
    );
};
