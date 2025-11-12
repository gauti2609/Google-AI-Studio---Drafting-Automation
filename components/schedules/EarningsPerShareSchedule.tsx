

import React from 'react';
// FIX: Add file extension to fix module resolution error.
import { EpsData, ScheduleData } from '../../types.ts';

interface EarningsPerShareScheduleProps {
    data: EpsData;
    onUpdate: React.Dispatch<React.SetStateAction<ScheduleData>>;
    isFinalized: boolean;
}

const InputField: React.FC<{ label: string; value: string; onChange: (value: string) => void; disabled: boolean; }> = 
({ label, value, onChange, disabled }) => (
    <div>
        <label className="block text-sm font-medium text-gray-400">{label}</label>
        <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            disabled={disabled}
            className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md p-2 text-white disabled:bg-gray-800 disabled:cursor-not-allowed"
        />
    </div>
);


export const EarningsPerShareSchedule: React.FC<EarningsPerShareScheduleProps> = ({ data, onUpdate, isFinalized }) => {

    const handleUpdate = (field: keyof EpsData, value: string) => {
        onUpdate(prev => ({ ...prev, eps: { ...prev.eps, [field]: value } }));
    };

    const parse = (val: string) => parseFloat(val.replace(/,/g, '')) || 0;
    const pat = parse(data.pat);
    const prefDiv = parse(data.preferenceDividend);
    const shares = parse(data.weightedAvgEquityShares);
    const basicEps = shares > 0 ? (pat - prefDiv) / shares : 0;
    
    return (
        <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white">Earnings Per Share (EPS) Calculation</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <InputField label="Profit After Tax (PAT)" value={data.pat} onChange={v => handleUpdate('pat', v)} disabled={isFinalized} />
                <InputField label="Preference Dividend" value={data.preferenceDividend} onChange={v => handleUpdate('preferenceDividend', v)} disabled={isFinalized} />
                <InputField label="Weighted Average Equity Shares" value={data.weightedAvgEquityShares} onChange={v => handleUpdate('weightedAvgEquityShares', v)} disabled={isFinalized} />
            </div>
             <div className="mt-4 p-4 bg-gray-900/50 rounded-lg text-sm">
                <h4 className="font-bold text-gray-300">Calculated Basic EPS</h4>
                 <div className="flex justify-between mt-2 pt-2 border-t border-gray-600">
                    <span className="font-bold">Basic EPS (₹):</span>
                    <span className="font-mono font-bold">{basicEps.toLocaleString('en-IN', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                </div>
            </div>
        </div>
    );
};