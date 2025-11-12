// components/schedules/DeferredTaxSchedule.tsx
import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { DeferredTaxData, DeferredTaxRow } from '../../types.ts';
import { PlusIcon, TrashIcon } from '../icons.tsx';

interface DeferredTaxScheduleProps {
    data: DeferredTaxData;
    onUpdate: (data: DeferredTaxData) => void;
    isFinalized: boolean;
}

const TaxTable: React.FC<{
    title: string;
    rows: DeferredTaxRow[];
    type: 'assets' | 'liabilities';
    onUpdate: (type: 'assets' | 'liabilities', id: string, field: keyof Omit<DeferredTaxRow, 'id'>, value: string) => void;
    onAdd: (type: 'assets' | 'liabilities') => void;
    onRemove: (type: 'assets' | 'liabilities', id: string) => void;
    isFinalized: boolean;
}> = ({ title, rows, type, onUpdate, onAdd, onRemove, isFinalized }) => (
    <div>
        <h4 className="text-md font-semibold text-gray-300 mb-2">{title}</h4>
        {/* Table implementation similar to CWIPSchedule */}
        <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
                <thead>
                    <tr>
                        <th className="p-2 text-left w-2/5">Particulars</th>
                        <th className="p-2 text-right">Opening</th>
                        <th className="p-2 text-right">Charge to P&L</th>
                        <th className="p-2 text-right">Closing</th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map(row => {
                         const parse = (val: string) => parseFloat(val) || 0;
                         const closing = parse(row.openingBalance) + parse(row.pnlCharge);
                         return(
                            <tr key={row.id}>
                                {/* Inputs for particular, opening, pnlCharge */}
                                <td className="p-2 text-right font-mono">{closing.toFixed(2)}</td>
                            </tr>
                         )
                    })}
                </tbody>
            </table>
        </div>
        {!isFinalized && <button onClick={() => onAdd(type)}>Add</button>}
    </div>
);

export const DeferredTaxSchedule: React.FC<DeferredTaxScheduleProps> = ({ data, onUpdate, isFinalized }) => {

    const handleUpdate = (type: 'assets' | 'liabilities', id: string, field: keyof Omit<DeferredTaxRow, 'id'>, value: string) => {
        onUpdate({ ...data, [type]: data[type].map(r => r.id === id ? { ...r, [field]: value } : r) });
    };

    const addRow = (type: 'assets' | 'liabilities') => {
        const newRow: DeferredTaxRow = { id: uuidv4(), particular: '', openingBalance: '', pnlCharge: '', closingBalance: '' };
        onUpdate({ ...data, [type]: [...data[type], newRow] });
    };

    const removeRow = (type: 'assets' | 'liabilities', id: string) => {
        onUpdate({ ...data, [type]: data[type].filter(r => r.id !== id) });
    };
    
    return (
        <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white">Deferred Tax (Net)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <TaxTable title="Deferred Tax Assets" rows={data.assets} type="assets" onUpdate={handleUpdate} onAdd={addRow} onRemove={removeRow} isFinalized={isFinalized} />
                <TaxTable title="Deferred Tax Liabilities" rows={data.liabilities} type="liabilities" onUpdate={handleUpdate} onAdd={addRow} onRemove={removeRow} isFinalized={isFinalized} />
            </div>
        </div>
    );
};
