import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { PpeAssetRow } from '../../types.ts';
import { PlusIcon, TrashIcon } from '../icons.tsx';

interface PPEScheduleProps {
    ppeData: PpeAssetRow[];
    onUpdate: (data: PpeAssetRow[]) => void;
    isFinalized: boolean;
}

export const PPESchedule: React.FC<PPEScheduleProps> = ({ ppeData, onUpdate, isFinalized }) => {

    const handleUpdate = (id: string, field: keyof Omit<PpeAssetRow, 'id'>, value: string | boolean) => {
        onUpdate(ppeData.map(row => row.id === id ? { ...row, [field]: value } : row));
    };

    const addRow = () => {
        const newRow: PpeAssetRow = {
            id: uuidv4(),
            assetClass: '',
            isUnderLease: false,
            grossBlockOpening: '0',
            grossBlockAdditions: '0',
            grossBlockDisposals: '0',
            grossBlockClosing: '0',
            depreciationOpening: '0',
            depreciationForYear: '0',
            depreciationOnDisposals: '0',
            depreciationClosing: '0',
            netBlockClosing: '0',
        };
        onUpdate([...ppeData, newRow]);
    };

    const removeRow = (id: string) => {
        onUpdate(ppeData.filter(row => row.id !== id));
    };

    const renderCell = (row: PpeAssetRow, field: keyof Omit<PpeAssetRow, 'id' | 'assetClass' | 'isUnderLease' | 'grossBlockClosing' | 'depreciationClosing' | 'netBlockClosing'>) => (
        <td className="p-0 border border-gray-600">
            <input
                type="text"
                value={row[field] as string}
                onChange={e => handleUpdate(row.id, field, e.target.value)}
                disabled={isFinalized}
                className="w-full h-full bg-transparent p-2 text-right border-none focus:ring-0 focus:outline-none focus:bg-gray-700/50"
            />
        </td>
    );

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Property, Plant and Equipment (PPE) Schedule</h3>
            <div className="overflow-x-auto">
                <table className="min-w-full text-xs border-collapse border border-gray-600">
                    <thead className="bg-gray-700/50">
                        <tr>
                            <th rowSpan={2} className="p-2 text-left font-medium border border-gray-600 w-1/4">Asset Class</th>
                            <th colSpan={4} className="p-2 text-center font-medium border border-gray-600">Gross Block</th>
                            <th colSpan={4} className="p-2 text-center font-medium border border-gray-600">Accumulated Depreciation</th>
                            <th rowSpan={2} className="p-2 text-right font-medium border border-gray-600">Net Block</th>
                        </tr>
                        <tr>
                            <th className="p-2 text-right font-medium border border-gray-600">Opening</th>
                            <th className="p-2 text-right font-medium border border-gray-600">Additions</th>
                            <th className="p-2 text-right font-medium border border-gray-600">Disposals</th>
                            <th className="p-2 text-right font-medium border border-gray-600">Closing</th>
                            <th className="p-2 text-right font-medium border border-gray-600">Opening</th>
                            <th className="p-2 text-right font-medium border border-gray-600">For the Year</th>
                            <th className="p-2 text-right font-medium border border-gray-600">On Disposals</th>
                            <th className="p-2 text-right font-medium border border-gray-600">Closing</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ppeData.map(row => {
                            const parse = (val: string) => parseFloat(val.replace(/,/g, '')) || 0;
                            const grossClosing = parse(row.grossBlockOpening) + parse(row.grossBlockAdditions) - parse(row.grossBlockDisposals);
                            const depClosing = parse(row.depreciationOpening) + parse(row.depreciationForYear) - parse(row.depreciationOnDisposals);
                            const netClosing = grossClosing - depClosing;

                            return (
                                <tr key={row.id} className="hover:bg-gray-700/30">
                                    <td className="p-0 border border-gray-600">
                                        <div className="flex items-center">
                                            {!isFinalized && <button onClick={() => removeRow(row.id)} className="p-2 text-gray-500 hover:text-red-400"><TrashIcon className="w-4 h-4"/></button>}
                                            <input type="text" value={row.assetClass} onChange={e => handleUpdate(row.id, 'assetClass', e.target.value)} disabled={isFinalized} className="flex-1 bg-transparent p-2 border-none focus:ring-0 focus:outline-none focus:bg-gray-700/50" placeholder="e.g., Buildings"/>
                                            <div className="flex items-center pr-2">
                                                <input type="checkbox" checked={row.isUnderLease} onChange={e => handleUpdate(row.id, 'isUnderLease', e.target.checked)} disabled={isFinalized} className="h-4 w-4 rounded bg-gray-600 border-gray-500 text-brand-blue focus:ring-brand-blue"/>
                                                <label className="ml-2 text-xs text-gray-400">Leased</label>
                                            </div>
                                        </div>
                                    </td>
                                    {renderCell(row, 'grossBlockOpening')}
                                    {renderCell(row, 'grossBlockAdditions')}
                                    {renderCell(row, 'grossBlockDisposals')}
                                    <td className="p-2 border border-gray-600 text-right font-mono bg-gray-800/50">{grossClosing.toLocaleString('en-IN', {minimumFractionDigits: 2})}</td>
                                    {renderCell(row, 'depreciationOpening')}
                                    {renderCell(row, 'depreciationForYear')}
                                    {renderCell(row, 'depreciationOnDisposals')}
                                    <td className="p-2 border border-gray-600 text-right font-mono bg-gray-800/50">{depClosing.toLocaleString('en-IN', {minimumFractionDigits: 2})}</td>
                                    <td className="p-2 border border-gray-600 text-right font-mono bg-gray-800/50">{netClosing.toLocaleString('en-IN', {minimumFractionDigits: 2})}</td>
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