
import React from 'react';
import { v4 as uuidv4 } from 'uuid';
// FIX: Add file extension to fix module resolution error.
import { BorrowingsData, ScheduleData } from '../../types.ts';
import { PlusIcon, TrashIcon } from '../icons.tsx';

interface BorrowingsScheduleProps {
    data: BorrowingsData[];
    onUpdate: React.Dispatch<React.SetStateAction<ScheduleData>>;
    isFinalized: boolean;
}

export const BorrowingsSchedule: React.FC<BorrowingsScheduleProps> = ({ data, onUpdate, isFinalized }) => {
    
    const handleUpdate = (id: string, field: keyof Omit<BorrowingsData, 'id'>, value: string | boolean) => {
        onUpdate(prev => ({ ...prev, borrowings: prev.borrowings.map(b => b.id === id ? { ...b, [field]: value } : b) }));
    };

    const addRow = () => {
        const newRow: BorrowingsData = { id: uuidv4(), lender: '', isSecured: false, amountCy: '', amountPy: '', isCurrent: true };
        onUpdate(prev => ({ ...prev, borrowings: [...prev.borrowings, newRow] }));
    };

    const removeRow = (id: string) => {
        onUpdate(prev => ({ ...prev, borrowings: prev.borrowings.filter(b => b.id !== id) }));
    };

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Borrowings Schedule</h3>
            <div className="space-y-2">
                {data.map(item => (
                    <div key={item.id} className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center bg-gray-900/50 p-3 rounded-lg">
                        <div className="md:col-span-2">
                             <label className="block text-xs font-medium text-gray-400">Lender</label>
                            <input type="text" value={item.lender} onChange={e => handleUpdate(item.id, 'lender', e.target.value)} disabled={isFinalized} className="w-full bg-gray-700 p-2 rounded-md mt-1" />
                        </div>
                         <div>
                            <label className="block text-xs font-medium text-gray-400">Amount (CY)</label>
                            <input type="text" value={item.amountCy} onChange={e => handleUpdate(item.id, 'amountCy', e.target.value)} disabled={isFinalized} className="w-full bg-gray-700 p-2 rounded-md mt-1" />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-400">Amount (PY)</label>
                            <input type="text" value={item.amountPy} onChange={e => handleUpdate(item.id, 'amountPy', e.target.value)} disabled={isFinalized} className="w-full bg-gray-700 p-2 rounded-md mt-1" />
                        </div>
                        <div className="flex items-center space-x-4">
                            <label className="flex items-center text-sm text-gray-300 mt-5">
                                <input type="checkbox" checked={item.isSecured} onChange={e => handleUpdate(item.id, 'isSecured', e.target.checked)} disabled={isFinalized} className="h-4 w-4 rounded bg-gray-700 border-gray-600 text-brand-blue focus:ring-brand-blue" />
                                <span className="ml-2">Secured</span>
                            </label>
                             <label className="flex items-center text-sm text-gray-300 mt-5">
                                <input type="checkbox" checked={item.isCurrent} onChange={e => handleUpdate(item.id, 'isCurrent', e.target.checked)} disabled={isFinalized} className="h-4 w-4 rounded bg-gray-700 border-gray-600 text-brand-blue focus:ring-brand-blue" />
                                <span className="ml-2">Current</span>
                            </label>
                        </div>
                         {!isFinalized && (
                            <button onClick={() => removeRow(item.id)} className="p-2 text-gray-400 hover:text-red-400 rounded-md hover:bg-red-500/10 transition-colors mt-5">
                                <TrashIcon className="w-5 h-5" />
                            </button>
                        )}
                    </div>
                ))}
            </div>
             {!isFinalized && (
                <button onClick={addRow} className="mt-4 flex items-center text-sm text-brand-blue-light hover:text-white transition-colors font-medium">
                    <PlusIcon className="w-4 h-4 mr-2" />
                    Add Borrowing
                </button>
            )}
        </div>
    );
};
