


import React from 'react';
import { v4 as uuidv4 } from 'uuid';
// FIX: Add file extension to fix module resolution error.
import { ShareCapitalData, ScheduleData } from '../../types.ts';
import { PlusIcon, TrashIcon } from '../icons.tsx';

interface ShareCapitalScheduleProps {
    data: ShareCapitalData;
    onUpdate: React.Dispatch<React.SetStateAction<ScheduleData>>;
    isFinalized: boolean;
}

const InputField: React.FC<{ label: string; value: string; onChange: (value: string) => void; disabled: boolean; placeholder?: string; }> = 
({ label, value, onChange, disabled, placeholder }) => (
    <div>
        <label className="block text-sm font-medium text-gray-400">{label}</label>
        <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            disabled={disabled}
            placeholder={placeholder}
            className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md p-2 text-white disabled:bg-gray-800 disabled:cursor-not-allowed"
        />
    </div>
);

export const ShareCapitalSchedule: React.FC<ShareCapitalScheduleProps> = ({ data, onUpdate, isFinalized }) => {

    const handleAuthorizedChange = (field: 'count' | 'amount', value: string) => {
        onUpdate(prev => ({ ...prev, shareCapital: { ...prev.shareCapital, authorized: { ...prev.shareCapital.authorized, [field]: value } } }));
    };
    
    const handleIssuedChange = (id: string, field: string, value: string) => {
        onUpdate(prev => ({ ...prev, shareCapital: { ...prev.shareCapital, issued: prev.shareCapital.issued.map(item => item.id === id ? { ...item, [field]: value } : item) } }));
    };

    const addIssuedRow = () => {
        onUpdate(prev => ({ ...prev, shareCapital: { ...prev.shareCapital, issued: [...prev.shareCapital.issued, { id: uuidv4(), class: '', countCy: '', amountCy: '', countPy: '', amountPy: '' }] } }));
    };

    const removeIssuedRow = (id: string) => {
        onUpdate(prev => ({ ...prev, shareCapital: { ...prev.shareCapital, issued: prev.shareCapital.issued.filter(item => item.id !== id) } }));
    };

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-semibold text-white mb-2">Authorized Capital</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputField label="Number of Shares" value={data.authorized.count} onChange={val => handleAuthorizedChange('count', val)} disabled={isFinalized} placeholder="e.g., 100,000" />
                    <InputField label="Amount (₹)" value={data.authorized.amount} onChange={val => handleAuthorizedChange('amount', val)} disabled={isFinalized} placeholder="e.g., 1,000,000" />
                </div>
            </div>

            <div>
                <h3 className="text-lg font-semibold text-white mb-2">Issued, Subscribed, and Paid-up Capital</h3>
                <div className="space-y-4">
                    {data.issued.map(item => (
                        <div key={item.id} className="grid grid-cols-1 md:grid-cols-6 gap-4 items-end bg-gray-900/50 p-4 rounded-lg">
                            <div className="md:col-span-2">
                                <InputField label="Class of Shares" value={item.class} onChange={val => handleIssuedChange(item.id, 'class', val)} disabled={isFinalized} placeholder="e.g., Equity Shares of ₹10 each" />
                            </div>
                            <InputField label="Count (CY)" value={item.countCy} onChange={val => handleIssuedChange(item.id, 'countCy', val)} disabled={isFinalized} />
                            <InputField label="Amount (CY)" value={item.amountCy} onChange={val => handleIssuedChange(item.id, 'amountCy', val)} disabled={isFinalized} />
                            <InputField label="Count (PY)" value={item.countPy} onChange={val => handleIssuedChange(item.id, 'countPy', val)} disabled={isFinalized} />
                            <div className="flex items-center">
                                <InputField label="Amount (PY)" value={item.amountPy} onChange={val => handleIssuedChange(item.id, 'amountPy', val)} disabled={isFinalized} />
                                 {!isFinalized && (
                                    <button onClick={() => removeIssuedRow(item.id)} className="ml-2 mt-6 p-2 text-gray-400 hover:text-red-400 rounded-md hover:bg-red-500/10 transition-colors">
                                        <TrashIcon className="w-5 h-5" />
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
                 {!isFinalized && (
                    <button onClick={addIssuedRow} className="mt-4 flex items-center text-sm text-brand-blue-light hover:text-white transition-colors font-medium">
                        <PlusIcon className="w-4 h-4 mr-2" />
                        Add Share Class
                    </button>
                )}
            </div>
        </div>
    );
};