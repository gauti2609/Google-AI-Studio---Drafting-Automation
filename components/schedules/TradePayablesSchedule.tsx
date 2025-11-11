


import React from 'react';
// FIX: Add file extension to fix module resolution error.
import { TradePayablesData, ScheduleData } from '../../types.ts';

interface TradePayablesScheduleProps {
    data: TradePayablesData;
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


export const TradePayablesSchedule: React.FC<TradePayablesScheduleProps> = ({ data, onUpdate, isFinalized }) => {

    const handleUpdate = (field: keyof TradePayablesData, value: string) => {
        onUpdate(prev => ({
            ...prev,
            tradePayables: {
                ...prev.tradePayables,
                [field]: value,
            }
        }));
    };
    
    const parse = (val: string) => parseFloat(val.replace(/,/g, '')) || 0;
    const totalPayables = parse(data.msme) + parse(data.others);

    return (
        <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white">Trade Payables Schedule</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField 
                    label="Dues to Micro, Small and Medium Enterprises (MSME)" 
                    value={data.msme} 
                    onChange={v => handleUpdate('msme', v)} 
                    disabled={isFinalized} 
                />
                <InputField 
                    label="Dues to other than MSME" 
                    value={data.others} 
                    onChange={v => handleUpdate('others', v)} 
                    disabled={isFinalized} 
                />
            </div>

            <div className="mt-4 p-4 bg-gray-900/50 rounded-lg text-sm">
                <h4 className="font-bold text-gray-300">Summary</h4>
                 <div className="flex justify-between mt-2 pt-2 border-t border-gray-600">
                    <span className="font-bold">Total Trade Payables:</span>
                    <span className="font-mono font-bold">{totalPayables.toLocaleString('en-IN', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                </div>
            </div>
        </div>
    );
};