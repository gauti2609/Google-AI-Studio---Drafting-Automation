


import React from 'react';
import { v4 as uuidv4 } from 'uuid';
// FIX: Add file extension to fix module resolution error.
import { PpeRow, ScheduleData } from '../../types.ts';
import { PlusIcon, TrashIcon } from '../icons.tsx';

interface PPEScheduleProps {
    data: PpeRow[];
    onUpdate: React.Dispatch<React.SetStateAction<ScheduleData>>;
    isFinalized: boolean;
}

export const PPESchedule: React.FC<PPEScheduleProps> = ({ data, onUpdate, isFinalized }) => {

    const handleUpdate = (id: string, field: keyof Omit<PpeRow, 'id'>, value: string) => {
        onUpdate(prev => ({ ...prev, ppe: prev.ppe.map(row => row.id === id ? { ...row, [field]: value } : row) }));
    };

    const addRow = () => {
        const newRow: PpeRow = {
            id: uuidv4(), classOfAsset: '', grossBlockOpening: '', grossBlockAdditions: '', grossBlockDisposals: '',
            depreciationOpening: '', depreciationForYear: '', depreciationOnDisposals: ''
        };
        onUpdate(prev => ({ ...prev, ppe: [...prev.ppe, newRow] }));
    };

    const removeRow = (id: string) => {
        onUpdate(prev => ({ ...prev, ppe: prev.ppe.filter(row => row.id !== id) }));
    };

    const renderHeader = (title: string, colSpan: number) => (
        <th colSpan={colSpan} className="p-2 text-center font-medium border-l border-gray-600">{title}</th>
    );

    const renderSubHeader = (title: string) => (
        <th className="p-2 text-left font-medium border-t border-gray-600 min-w-[120px]">{title}</th>
    );
    
    const renderCell = (row: PpeRow, field: keyof Omit<PpeRow, 'id'>) => (
        <td className="p-0">
            <input
                type="text"
                value={row[field]}
                onChange={e => handleUpdate(row.id, field, e.target.value)}
                disabled={isFinalized}
                className="w-full h-full bg-transparent p-2 text-right border-none focus:ring-0 focus:outline-none focus:bg-gray-700/50"
            />
        </td>
    );

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Property, Plant and Equipment Schedule</h3>
            <div className="overflow-x-auto">
                <table className="min-w-full text-sm border border-gray-600">
                    <thead className="bg-gray-700/50">
                        <tr>
                            <th rowSpan={2} className="p-2 text-left font-medium w-1/4">Class of Asset</th>
                            {renderHeader('Gross Block', 3)}
                            {renderHeader('Depreciation', 3)}
                            <th rowSpan={2} className="p-2 text-left font-medium border-l border-gray-600">Net Block (CY)</th>
                        </tr>
                        <tr>
                            {renderSubHeader('Opening')}
                            {renderSubHeader('Additions')}
                            {renderSubHeader('Disposals')}
                            {renderSubHeader('Opening')}
                            {renderSubHeader('For the Year')}
                            {renderSubHeader('On Disposals')}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-600">
                        {data.map(row => {
                             const parse = (val: string) => parseFloat(val.replace(/,/g, '')) || 0;
                             const grossClosing = parse(row.grossBlockOpening) + parse(row.grossBlockAdditions) - parse(row.grossBlockDisposals);
                             const depClosing = parse(row.depreciationOpening) + parse(row.depreciationForYear) - parse(row.depreciationOnDisposals);
                             const netClosing = grossClosing - depClosing;

                            return (
                                <tr key={row.id} className="hover:bg-gray-700/30">
                                    <td className="p-0 flex items-center">
                                        {!isFinalized && 
                                            <button onClick={() => removeRow(row.id)} className="p-2 text-gray-500 hover:text-red-400">
                                                <TrashIcon className="w-4 h-4"/>
                                            </button>
                                        }
                                        <input
                                            type="text"
                                            value={row.classOfAsset}
                                            onChange={e => handleUpdate(row.id, 'classOfAsset', e.target.value)}
                                            disabled={isFinalized}
                                            className="w-full bg-transparent p-2 border-none focus:ring-0 focus:outline-none focus:bg-gray-700/50"
                                            />
                                    </td>
                                    {renderCell(row, 'grossBlockOpening')}
                                    {renderCell(row, 'grossBlockAdditions')}
                                    {renderCell(row, 'grossBlockDisposals')}
                                    {renderCell(row, 'depreciationOpening')}
                                    {renderCell(row, 'depreciationForYear')}
                                    {renderCell(row, 'depreciationOnDisposals')}
                                    <td className="p-2 text-right font-mono bg-gray-800/50">
                                        {netClosing.toLocaleString('en-IN', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            {!isFinalized && (
                <button onClick={addRow} className="mt-4 flex items-center text-sm text-brand-blue-light hover:text-white transition-colors font-medium">
                    <PlusIcon className="w-4 h-4 mr-2" />
                    Add Asset Class
                </button>
            )}
        </div>
    );
};