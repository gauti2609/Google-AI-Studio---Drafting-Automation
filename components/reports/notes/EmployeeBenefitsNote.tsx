import React from 'react';
import { EmployeeBenefitsData, AllData } from '../../../types.ts';

interface EmployeeBenefitsNoteProps {
    data: EmployeeBenefitsData;
    allData: AllData;
}

const formatCurrency = (val: string): string => {
    const num = parseFloat(val.replace(/,/g, ''));
    if (isNaN(num)) return '-';
    return new Intl.NumberFormat('en-IN', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(num);
};

export const EmployeeBenefitsNote: React.FC<EmployeeBenefitsNoteProps> = ({ data, allData }) => {
    const parse = (val: string) => parseFloat(val.replace(/,/g, '')) || 0;
    const totalFromSchedule = parse(data.salariesAndWages) + parse(data.contributionToFunds) + parse(data.staffWelfare);

    const totalFromTB = allData.trialBalanceData
        .filter(i => i.isMapped && i.groupingCode === 'C.20.04')
        .reduce((sum, item) => sum + item.closingCy, 0);

    return (
        <div className="overflow-x-auto max-w-md">
            <table className="min-w-full text-sm">
                <tbody className="divide-y divide-gray-700">
                    <tr>
                        <td className="p-2">Salaries and Wages</td>
                        <td className="p-2 text-right font-mono">{formatCurrency(data.salariesAndWages)}</td>
                    </tr>
                    <tr>
                        <td className="p-2">Contribution to Provident and other funds</td>
                        <td className="p-2 text-right font-mono">{formatCurrency(data.contributionToFunds)}</td>
                    </tr>
                     <tr>
                        <td className="p-2">Staff welfare expenses</td>
                        <td className="p-2 text-right font-mono">{formatCurrency(data.staffWelfare)}</td>
                    </tr>
                    <tr className="font-bold bg-gray-700/30">
                        <td className="p-2">Total per Schedule</td>
                        <td className="p-2 text-right font-mono">{formatCurrency(totalFromSchedule.toString())}</td>
                    </tr>
                     <tr className="font-bold">
                        <td className="p-2">Total as per P&L (from TB Mapping)</td>
                        <td className="p-2 text-right font-mono">{formatCurrency(totalFromTB.toString())}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};