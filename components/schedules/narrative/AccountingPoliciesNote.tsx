


import React from 'react';
import { v4 as uuidv4 } from 'uuid';
// FIX: Add file extension to fix module resolution error.
import { AccountingPoliciesData, ScheduleData } from '../../../types.ts';
import { PlusIcon, TrashIcon } from '../../icons.tsx';

interface AccountingPoliciesNoteProps {
    data: AccountingPoliciesData;
    onUpdate?: React.Dispatch<React.SetStateAction<ScheduleData>>;
    isFinalized?: boolean;
}

export const AccountingPoliciesNote: React.FC<AccountingPoliciesNoteProps> = ({ data, onUpdate, isFinalized = false }) => {

    const handleBasisUpdate = (value: string) => {
        if (onUpdate) onUpdate(prev => ({ ...prev, accountingPolicies: { ...prev.accountingPolicies, basisOfPreparation: value } }));
    };

    const handlePolicyUpdate = (id: string, value: string) => {
        if (onUpdate) onUpdate(prev => ({ ...prev, accountingPolicies: { ...prev.accountingPolicies, policies: prev.accountingPolicies.policies.map(p => p.id === id ? { ...p, policy: value } : p) } }));
    };

    const addPolicy = () => {
        if (onUpdate) onUpdate(prev => ({ ...prev, accountingPolicies: { ...prev.accountingPolicies, policies: [...prev.accountingPolicies.policies, { id: uuidv4(), policy: '' }] } }));
    };

    const removePolicy = (id: string) => {
        if (onUpdate) onUpdate(prev => ({ ...prev, accountingPolicies: { ...prev.accountingPolicies, policies: prev.accountingPolicies.policies.filter(p => p.id !== id) } }));
    };
    
    // For the display version in the Notes To Accounts
    if (!onUpdate) {
         return (
            <div className="space-y-4 text-sm">
                <div>
                    <h4 className="font-semibold text-gray-300">a. Basis of Preparation</h4>
                    <p className="mt-1">{data.basisOfPreparation}</p>
                </div>
                 <div>
                    <h4 className="font-semibold text-gray-300">b. Significant Accounting Policies</h4>
                    <ul className="list-disc pl-5 mt-2 space-y-2">
                        {data.policies.map(p => <li key={p.id}>{p.policy}</li>)}
                    </ul>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white">Significant Accounting Policies</h3>
            <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Basis of Preparation</label>
                <textarea
                    value={data.basisOfPreparation}
                    onChange={e => handleBasisUpdate(e.target.value)}
                    disabled={isFinalized}
                    rows={3}
                    className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md p-2 text-white disabled:bg-gray-800 disabled:cursor-not-allowed"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Policies</label>
                <div className="space-y-2">
                    {data.policies.map(p => (
                        <div key={p.id} className="flex items-center space-x-2">
                            <textarea
                                value={p.policy}
                                onChange={e => handlePolicyUpdate(p.id, e.target.value)}
                                disabled={isFinalized}
                                rows={2}
                                className="flex-1 block w-full bg-gray-700 border border-gray-600 rounded-md p-2 text-white disabled:bg-gray-800 disabled:cursor-not-allowed"
                            />
                             {!isFinalized && (
                                <button onClick={() => removePolicy(p.id)} className="p-2 text-gray-400 hover:text-red-400 rounded-md hover:bg-red-500/10 transition-colors">
                                    <TrashIcon className="w-5 h-5" />
                                </button>
                            )}
                        </div>
                    ))}
                </div>
                 {!isFinalized && (
                    <button onClick={addPolicy} className="mt-4 flex items-center text-sm text-brand-blue-light hover:text-white transition-colors font-medium">
                        <PlusIcon className="w-4 h-4 mr-2" />
                        Add Policy
                    </button>
                )}
            </div>
        </div>
    );
};