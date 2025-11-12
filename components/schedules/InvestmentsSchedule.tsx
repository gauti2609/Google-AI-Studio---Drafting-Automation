import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { InvestmentsScheduleData, InvestmentItem, ScheduleData } from '../../types.ts';
import { PlusIcon, TrashIcon } from '../icons.tsx';

interface InvestmentsScheduleProps {
    data: InvestmentsScheduleData;
    onUpdate: (data: InvestmentsScheduleData) => void;
    isFinalized: boolean;
}

export const InvestmentsSchedule: React.FC<InvestmentsScheduleProps> = ({ data, onUpdate, isFinalized }) => {

    const handleItemUpdate = (id: string, field: keyof Omit<InvestmentItem, 'id'>, value: string) => {
        onUpdate({ ...data, items: data.items.map(item => item.id === id ? { ...item, [field]: value } : item) });
    };

    const handleFieldUpdate = (field: keyof InvestmentsScheduleData, value: string) => {
        onUpdate({ ...data, [field]: value });
    }

    const addItem = () => {
        const newRow: InvestmentItem = { id: uuidv4(), particular: '', amountCy: '', amountPy: '', basisOfValuation: '' };
        onUpdate({ ...data, items: [...data.items, newRow] });
    };

    const removeItem = (id: string) => {
        onUpdate({ ...data, items: data.items.filter(item => item.id !== id) });
    };

    return (
        <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white">Investments Schedule</h3>
            <div className="space-y-2">
                {data.items.map(item => (
                    <div key={item.id} className="grid grid-cols-12 gap-2 items-center bg-gray-900/50 p-2 rounded-lg">
                        <input type="text" placeholder="Particular" value={item.particular} onChange={e => handleItemUpdate(item.id, 'particular', e.target.value)} disabled={isFinalized} className="col-span-4 bg-gray-700 p-2 rounded-md"/>
                        <input type="text" placeholder="Amount CY" value={item.amountCy} onChange={e => handleItemUpdate(item.id, 'amountCy', e.target.value)} disabled={isFinalized} className="col-span-2 bg-gray-700 p-2 rounded-md"/>
                        <input type="text" placeholder="Amount PY" value={item.amountPy} onChange={e => handleItemUpdate(item.id, 'amountPy', e.target.value)} disabled={isFinalized} className="col-span-2 bg-gray-700 p-2 rounded-md"/>
                        <input type="text" placeholder="Basis of Valuation (if not cost)" value={item.basisOfValuation} onChange={e => handleItemUpdate(item.id, 'basisOfValuation', e.target.value)} disabled={isFinalized} className="col-span-3 bg-gray-700 p-2 rounded-md"/>
                        {!isFinalized && <button onClick={() => removeItem(item.id)} className="p-2 text-gray-400 hover:text-red-400"><TrashIcon className="w-5 h-5"/></button>}
                    </div>
                ))}
            </div>
            {!isFinalized && <button onClick={addItem} className="flex items-center text-sm text-brand-blue-light hover:text-white"><PlusIcon className="w-4 h-4 mr-1"/> Add Investment</button>}
            
            <div className="mt-4">
                 <label className="block text-sm font-medium text-gray-400">Aggregate Provision for Diminution in Value</label>
                 <input
                    type="text"
                    value={data.provisionForDiminution}
                    onChange={(e) => handleFieldUpdate('provisionForDiminution', e.target.value)}
                    disabled={isFinalized}
                    className="mt-1 block w-full max-w-sm bg-gray-700 border border-gray-600 rounded-md p-2 text-white disabled:bg-gray-800"
                />
            </div>
        </div>
    );
};