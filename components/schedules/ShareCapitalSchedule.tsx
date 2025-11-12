
// components/schedules/ShareCapitalSchedule.tsx
import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ShareCapitalData, ScheduleData, ShareCapitalItem } from '../../types.ts';
import { PlusIcon, TrashIcon } from '../icons.tsx';

interface ShareCapitalScheduleProps {
    data: ShareCapitalData;
    onUpdate: React.Dispatch<React.SetStateAction<ScheduleData>>;
    isFinalized: boolean;
}

const ClassTable: React.FC<{ title: string; items: ShareCapitalItem[]; type: 'authorized' | 'issued' | 'subscribed'; onUpdate: Function; isFinalized: boolean }> = ({ title, items, type, onUpdate, isFinalized }) => {
    // ... implementation for add/remove/update rows
    return (
        <div>
            <h4 className="font-semibold text-gray-300 mb-2">{title}</h4>
            {/* Table implementation */}
        </div>
    );
};

// Simplified component structure for brevity
export const ShareCapitalSchedule: React.FC<ShareCapitalScheduleProps> = ({ data, onUpdate, isFinalized }) => {
    
    const handleUpdate = <T extends keyof ShareCapitalData>(field: T, value: ShareCapitalData[T]) => {
        onUpdate(prev => ({...prev, shareCapital: {...prev.shareCapital, [field]: value}}))
    };

    const addRow = (field: 'authorized' | 'issued' | 'subscribed' | 'reconciliationCy' | 'reconciliationPy' | 'shareholders' | 'promoterShareholding') => {
        let newRow;
        switch(field) {
            case 'shareholders': newRow = { id: uuidv4(), name: '', noOfShares: '', percentage: ''}; break;
            case 'promoterShareholding': newRow = {id: uuidv4(), promoterName: '', noOfShares: '', percentageTotal: '', percentageChange: ''}; break;
            case 'reconciliationCy':
            case 'reconciliationPy': newRow = { id: uuidv4(), particular: '', noOfShares: '', amount: ''}; break;
            default: newRow = { id: uuidv4(), particular: 'Equity Shares of __ each', noOfSharesCy: '', amountCy: '', noOfSharesPy: '', amountPy: ''}; break;
        }
        handleUpdate(field, [...data[field] as any[], newRow] as any);
    };

    const removeRow = (field: 'authorized' | 'issued' | 'subscribed' | 'reconciliationCy' | 'reconciliationPy' | 'shareholders' | 'promoterShareholding', id: string) => {
        handleUpdate(field, (data[field] as any[]).filter(item => item.id !== id) as any);
    };

    const updateRow = <T extends 'authorized' | 'issued' | 'subscribed' | 'reconciliationCy' | 'reconciliationPy' | 'shareholders' | 'promoterShareholding'>(
        field: T, id: string, prop: keyof ShareCapitalData[T][0], value: string
    ) => {
        handleUpdate(field, (data[field] as any[]).map(item => item.id === id ? {...item, [prop]: value} : item) as any);
    };

    return (
        <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white">Share Capital</h3>
            {/* Tables for Authorized, Issued, Subscribed Capital */}
            {/* ... */}
            <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Rights, preferences and restrictions attaching to each class of shares</label>
                <textarea value={data.rightsPreferences} onChange={e => handleUpdate('rightsPreferences', e.target.value)} disabled={isFinalized} rows={3} className="mt-1 block w-full bg-gray-700 p-2 rounded-md"/>
            </div>
             <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Shares held by holding company or ultimate holding company</label>
                <input type="text" value={data.holdingCompanyShares} onChange={e => handleUpdate('holdingCompanyShares', e.target.value)} disabled={isFinalized} className="mt-1 block w-full bg-gray-700 p-2 rounded-md"/>
            </div>
            {/* Table for Shareholders > 5% */}
            {/* ... */}
             <div>
                <h4 className="font-semibold text-gray-300 mb-2">Promoter Shareholding</h4>
                 {data.promoterShareholding.map(p => (
                    <div key={p.id} className="flex items-center space-x-2">
                        {/* inputs for promoter shareholding */}
                    </div>
                 ))}
                 {!isFinalized && <button onClick={() => addRow('promoterShareholding')}>Add Promoter</button>}
            </div>
            <div>
                <h4 className="font-semibold text-gray-300 mb-2">Aggregate number and class of shares for 5 years:</h4>
                <input type="text" placeholder="Allotted as fully paid up bonus shares" value={data.fiveYearHistoryBonus} onChange={e => handleUpdate('fiveYearHistoryBonus', e.target.value)} disabled={isFinalized} className="mt-1 block w-full bg-gray-700 p-2 rounded-md"/>
                <input type="text" placeholder="Allotted as fully paid up without payment being received in cash" value={data.fiveYearHistoryNoCash} onChange={e => handleUpdate('fiveYearHistoryNoCash', e.target.value)} disabled={isFinalized} className="mt-1 block w-full bg-gray-700 p-2 rounded-md"/>
                <input type="text" placeholder="Bought back" value={data.fiveYearHistoryBuyback} onChange={e => handleUpdate('fiveYearHistoryBuyback', e.target.value)} disabled={isFinalized} className="mt-1 block w-full bg-gray-700 p-2 rounded-md"/>
            </div>
            <input type="text" placeholder="Terms of any securities convertible into equity/preference shares" value={data.convertibleSecurities} onChange={e => handleUpdate('convertibleSecurities', e.target.value)} disabled={isFinalized} className="mt-1 block w-full bg-gray-700 p-2 rounded-md"/>
            <input type="text" placeholder="Calls unpaid" value={data.callsUnpaid} onChange={e => handleUpdate('callsUnpaid', e.target.value)} disabled={isFinalized} className="mt-1 block w-full bg-gray-700 p-2 rounded-md"/>
            <input type="text" placeholder="Forfeited shares (amount originally paid-up)" value={data.forfeitedShares} onChange={e => handleUpdate('forfeitedShares', e.target.value)} disabled={isFinalized} className="mt-1 block w-full bg-gray-700 p-2 rounded-md"/>
        </div>
    );
};