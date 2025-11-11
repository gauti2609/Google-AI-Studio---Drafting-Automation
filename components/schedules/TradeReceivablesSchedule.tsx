


import React from 'react';
// FIX: Add file extension to fix module resolution error.
import { TradeReceivablesData, ScheduleData } from '../../types.ts';

interface TradeReceivablesScheduleProps {
    data: TradeReceivablesData;
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

export const TradeReceivablesSchedule: React.FC<TradeReceivablesScheduleProps> = ({ data, onUpdate, isFinalized }) => {

    const handleUpdate = (category: 'outstandingForMoreThan6Months' | 'others', field: 'secured' | 'unsecured' | 'doubtful', value: string) => {
        onUpdate(prev => ({
            ...prev,
            tradeReceivables: {
                ...prev.tradeReceivables,
                [category]: {
                    ...prev.tradeReceivables[category],
                    [field]: value,
                }
            }
        }));
    };

    const handleProvisionUpdate = (value: string) => {
        onUpdate(prev => ({ ...prev, tradeReceivables: { ...prev.tradeReceivables, provisionForDoubtful: value } }));
    };
    
    const parse = (val: string) => parseFloat(val.replace(/,/g, '')) || 0;
    const totalOutstanding = parse(data.outstandingForMoreThan6Months.secured) + parse(data.outstandingForMoreThan6Months.unsecured) + parse(data.outstandingForMoreThan6Months.doubtful);
    const totalOthers = parse(data.others.secured) + parse(data.others.unsecured) + parse(data.others.doubtful);
    const totalGross = totalOutstanding + totalOthers;
    const totalNet = totalGross - parse(data.provisionForDoubtful);

    return (
        <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white">Trade Receivables Schedule</h3>
            
            <div className="p-4 bg-gray-900/50 rounded-lg space-y-4">
                <h4 className="font-semibold text-gray-300">Outstanding for more than 6 months</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <InputField label="Considered good - Secured" value={data.outstandingForMoreThan6Months.secured} onChange={v => handleUpdate('outstandingForMoreThan6Months', 'secured', v)} disabled={isFinalized} />
                    <InputField label="Considered good - Unsecured" value={data.outstandingForMoreThan6Months.unsecured} onChange={v => handleUpdate('outstandingForMoreThan6Months', 'unsecured', v)} disabled={isFinalized} />
                    <InputField label="Considered doubtful" value={data.outstandingForMoreThan6Months.doubtful} onChange={v => handleUpdate('outstandingForMoreThan6Months', 'doubtful', v)} disabled={isFinalized} />
                </div>
            </div>

            <div className="p-4 bg-gray-900/50 rounded-lg space-y-4">
                <h4 className="font-semibold text-gray-300">Other Receivables</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <InputField label="Considered good - Secured" value={data.others.secured} onChange={v => handleUpdate('others', 'secured', v)} disabled={isFinalized} />
                    <InputField label="Considered good - Unsecured" value={data.others.unsecured} onChange={v => handleUpdate('others', 'unsecured', v)} disabled={isFinalized} />
                    <InputField label="Considered doubtful" value={data.others.doubtful} onChange={v => handleUpdate('others', 'doubtful', v)} disabled={isFinalized} />
                </div>
            </div>

            <div className="p-4 bg-gray-900/50 rounded-lg">
                <InputField label="Less: Provision for doubtful receivables" value={data.provisionForDoubtful} onChange={handleProvisionUpdate} disabled={isFinalized} />
            </div>

            <div className="mt-4 p-4 bg-gray-900/50 rounded-lg text-sm">
                <h4 className="font-bold text-gray-300">Summary</h4>
                 <div className="flex justify-between mt-2 pt-2 border-t border-gray-600">
                    <span>Total Gross Receivables:</span>
                    <span className="font-mono">{totalGross.toLocaleString('en-IN', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                </div>
                <div className="flex justify-between">
                    <span>Total Net Receivables:</span>
                    <span className="font-mono font-bold">{totalNet.toLocaleString('en-IN', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                </div>
            </div>
        </div>
    );
};