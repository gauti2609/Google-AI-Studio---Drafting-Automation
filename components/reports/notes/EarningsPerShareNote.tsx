import React from 'react';
import { EpsData } from '../../../types.ts';

interface EarningsPerShareNoteProps {
    data: EpsData;
}

const formatCurrency = (val: string): string => {
    const num = parseFloat(val.replace(/,/g, ''));
    if (isNaN(num)) return '-';
    return new Intl.NumberFormat('en-IN', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(num);
};

export const EarningsPerShareNote: React.FC<EarningsPerShareNoteProps> = ({ data }) => {
    const parse = (val: string) => parseFloat(val.replace(/,/g, '')) || 0;
    const pat = parse(data.pat);
    const prefDiv = parse(data.preferenceDividend);
    const shares = parse(data.weightedAvgEquityShares);

    const earningsForEquityHolders = pat - prefDiv;
    const basicEps = shares > 0 ? earningsForEquityHolders / shares : 0;

    return (
        <div className="overflow-x-auto max-w-lg">
            <table className="min-w-full text-sm">
                <tbody className="divide-y divide-gray-700">
                    <tr>
                        <td className="p-2">Profit After Tax (PAT)</td>
                        <td className="p-2 text-right font-mono">{formatCurrency(data.pat)}</td>
                    </tr>
                    <tr>
                        <td className="p-2">Less: Preference Dividend</td>
                        <td className="p-2 text-right font-mono">({formatCurrency(data.preferenceDividend)})</td>
                    </tr>
                    <tr className="border-t-2 border-gray-500">
                        <td className="p-2 font-semibold">Earnings available for Equity Shareholders</td>
                        <td className="p-2 text-right font-mono font-semibold">{formatCurrency(earningsForEquityHolders.toString())}</td>
                    </tr>
                    <tr>
                        <td className="p-2">Weighted Average number of Equity Shares</td>
                        <td className="p-2 text-right font-mono">{shares.toLocaleString('en-IN')}</td>
                    </tr>
                    <tr className="font-bold bg-gray-700/30">
                        <td className="p-2">Basic Earnings Per Share (₹)</td>
                        <td className="p-2 text-right font-mono">{basicEps.toFixed(2)}</td>
                    </tr>
                     <tr className="font-bold bg-gray-700/30">
                        <td className="p-2">Diluted Earnings Per Share (₹)</td>
                        <td className="p-2 text-right font-mono">{basicEps.toFixed(2)}</td>
                    </tr>
                </tbody>
            </table>
            <p className="text-xs text-gray-500 mt-2">Note: Diluted EPS is assumed to be the same as Basic EPS for this calculation.</p>
        </div>
    );
};
