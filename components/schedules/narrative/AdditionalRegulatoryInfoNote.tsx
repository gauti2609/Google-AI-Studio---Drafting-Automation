import React from 'react';
import { v4 as uuidv4 } from 'uuid';
// FIX: Import FundUtilisationData to resolve type errors.
import { AdditionalRegulatoryInfoData, ScheduleData, FundUtilisationIntermediary, FundUtilisationUltimate, FundUtilisationGuarantee, FundUtilisationData } from '../../../types.ts';
import { PlusIcon, TrashIcon } from '../../icons.tsx';

interface AdditionalRegulatoryInfoNoteProps {
    data: AdditionalRegulatoryInfoData;
    onUpdate?: React.Dispatch<React.SetStateAction<ScheduleData>>;
    isFinalized?: boolean;
}

const Section: React.FC<{title: string; children: React.ReactNode}> = ({title, children}) => (
    <div className="space-y-2 p-4 bg-gray-900/50 rounded-lg">
        <h4 className="font-semibold text-gray-300">{title}</h4>
        {children}
    </div>
);

const InputField: React.FC<{ label: string; value: string; onChange: (value: string) => void; disabled: boolean;}> = 
({ label, value, onChange, disabled}) => (
    <div className="grid grid-cols-3 gap-4 items-center">
        <label className="block text-sm font-medium text-gray-400 col-span-1">{label}</label>
        <input type="text" value={value} onChange={(e) => onChange(e.target.value)} disabled={disabled} className="mt-1 block w-full bg-gray-700 p-2 rounded-md col-span-2"/>
    </div>
);

const TextAreaField: React.FC<{ label: string; value: string; onChange: (value: string) => void; disabled: boolean; rows?: number}> = 
({ label, value, onChange, disabled, rows=3 }) => (
     <div>
        <label className="block text-sm font-medium text-gray-400 mb-1">{label}</label>
        <textarea value={value} onChange={e => onChange(e.target.value)} disabled={disabled} rows={rows} className="mt-1 block w-full bg-gray-700 p-2 rounded-md"/>
    </div>
);

const FundUtilisationTable: React.FC<{
    title: string;
    rows: (FundUtilisationIntermediary | FundUtilisationUltimate | FundUtilisationGuarantee)[];
    tableKey: keyof FundUtilisationData;
    onUpdate: (table: keyof FundUtilisationData, id: string, field: keyof (FundUtilisationIntermediary | FundUtilisationUltimate | FundUtilisationGuarantee), value: string) => void;
    onAdd: (table: keyof FundUtilisationData) => void;
    onRemove: (table: keyof FundUtilisationData, id: string) => void;
    isFinalized: boolean;
}> = ({ title, rows, tableKey, onUpdate, onAdd, onRemove, isFinalized }) => {
    return (
        <div>
            <h5 className="text-sm font-semibold text-gray-400 mt-2 mb-1">{title}</h5>
            <div className="space-y-2">
                {rows.map(row => (
                    <div key={row.id} className="grid grid-cols-12 gap-2 items-center">
                        <input type="text" placeholder="Name/Details" value={row.name} onChange={e => onUpdate(tableKey, row.id, 'name', e.target.value)} disabled={isFinalized} className="col-span-6 bg-gray-700 p-2 rounded-md text-sm"/>
                        <input type="text" placeholder="Date" value={row.date} onChange={e => onUpdate(tableKey, row.id, 'date', e.target.value)} disabled={isFinalized} className="col-span-2 bg-gray-700 p-2 rounded-md text-sm"/>
                        <input type="text" placeholder="Amount" value={row.amount} onChange={e => onUpdate(tableKey, row.id, 'amount', e.target.value)} disabled={isFinalized} className="col-span-3 bg-gray-700 p-2 rounded-md text-sm text-right"/>
                        {!isFinalized && <button onClick={() => onRemove(tableKey, row.id)} className="p-2 text-gray-400 hover:text-red-400 col-span-1"><TrashIcon className="w-5 h-5"/></button>}
                    </div>
                ))}
            </div>
            {!isFinalized && <button onClick={() => onAdd(tableKey)} className="mt-2 flex items-center text-xs text-brand-blue-light hover:text-white"><PlusIcon className="w-3 h-3 mr-1"/> Add Item</button>}
        </div>
    );
};


export const AdditionalRegulatoryInfoNote: React.FC<AdditionalRegulatoryInfoNoteProps> = ({ data, onUpdate, isFinalized = false }) => {

    const handleUpdate = <T extends keyof AdditionalRegulatoryInfoData>(field: T, value: AdditionalRegulatoryInfoData[T]) => {
        if (onUpdate) onUpdate(prev => ({ ...prev, additionalRegulatoryInfo: { ...prev.additionalRegulatoryInfo, [field]: value } }));
    };

    const handleFundUtilisationUpdate = <T extends keyof FundUtilisationData, U extends FundUtilisationIntermediary | FundUtilisationUltimate | FundUtilisationGuarantee >(
        table: T, id: string, field: keyof U, value: string
    ) => {
        if (onUpdate) onUpdate(prev => ({...prev, additionalRegulatoryInfo: { ...prev.additionalRegulatoryInfo, fundUtilisation: {
            ...prev.additionalRegulatoryInfo.fundUtilisation,
            [table]: (prev.additionalRegulatoryInfo.fundUtilisation[table] as any[]).map(item => item.id === id ? {...item, [field]: value} : item)
        }}}));
    };
    
    const addFundUtilisationRow = (table: keyof FundUtilisationData) => {
        const newRow = { id: uuidv4(), name: '', date: '', amount: '' };
         if (onUpdate) onUpdate(prev => ({...prev, additionalRegulatoryInfo: { ...prev.additionalRegulatoryInfo, fundUtilisation: {
            ...prev.additionalRegulatoryInfo.fundUtilisation,
            [table]: [...prev.additionalRegulatoryInfo.fundUtilisation[table] as any[], newRow]
        }}}));
    };
    
     const removeFundUtilisationRow = (table: keyof FundUtilisationData, id: string) => {
        if (onUpdate) onUpdate(prev => ({...prev, additionalRegulatoryInfo: { ...prev.additionalRegulatoryInfo, fundUtilisation: {
            ...prev.additionalRegulatoryInfo.fundUtilisation,
            [table]: (prev.additionalRegulatoryInfo.fundUtilisation[table] as any[]).filter(item => item.id !== id)
        }}}));
    };
    
    if (!onUpdate) {
         return (
            <div className="space-y-6 text-sm">
                <Section title="Corporate Social Responsibility (CSR)">
                    <p>Required to be spent: {data.csr.required}</p>
                </Section>
                {/* Add readonly views for other sections */}
            </div>
        );
    }

    return (
        <div className="space-y-6">
             <h3 className="text-lg font-semibold text-white">Additional Regulatory Information</h3>
             
             <Section title="Corporate Social Responsibility (CSR)">
                <InputField label="Amount required to be spent" value={data.csr.required} onChange={v => handleUpdate('csr', {...data.csr, required: v})} disabled={isFinalized}/>
                <InputField label="Amount of expenditure incurred" value={data.csr.spent} onChange={v => handleUpdate('csr', {...data.csr, spent: v})} disabled={isFinalized}/>
                <InputField label="Shortfall at the end of the year" value={data.csr.shortfall} onChange={v => handleUpdate('csr', {...data.csr, shortfall: v})} disabled={isFinalized}/>
                <InputField label="Reason for shortfall" value={data.csr.reason} onChange={v => handleUpdate('csr', {...data.csr, reason: v})} disabled={isFinalized}/>
             </Section>

             <Section title="Details of Crypto Currency or Virtual Currency">
                <InputField label="Profit or loss on transactions" value={data.crypto.profitOrLoss} onChange={v => handleUpdate('crypto', {...data.crypto, profitOrLoss: v})} disabled={isFinalized}/>
                <InputField label="Amount of currency held as at reporting date" value={data.crypto.amountHeld} onChange={v => handleUpdate('crypto', {...data.crypto, amountHeld: v})} disabled={isFinalized}/>
                <InputField label="Deposits or advances from any person for trading or investing" value={data.crypto.advances} onChange={v => handleUpdate('crypto', {...data.crypto, advances: v})} disabled={isFinalized}/>
             </Section>
            
            <Section title="Utilisation of Borrowed funds and share premium">
                <FundUtilisationTable
                    title="Funds advanced/loaned to Intermediaries"
                    rows={data.fundUtilisation.intermediaries}
                    tableKey="intermediaries"
                    onUpdate={handleFundUtilisationUpdate}
                    onAdd={addFundUtilisationRow}
                    onRemove={removeFundUtilisationRow}
                    isFinalized={isFinalized}
                />
                <FundUtilisationTable
                    title="Funds advanced/loaned by Intermediaries to Ultimate Beneficiaries"
                    rows={data.fundUtilisation.ultimateBeneficiaries}
                    tableKey="ultimateBeneficiaries"
                    onUpdate={handleFundUtilisationUpdate}
                    onAdd={addFundUtilisationRow}
                    onRemove={removeFundUtilisationRow}
                    isFinalized={isFinalized}
                />
                <FundUtilisationTable
                    title="Guarantees, security, etc. provided to or on behalf of Ultimate Beneficiaries"
                    rows={data.fundUtilisation.guarantees}
                    tableKey="guarantees"
                    onUpdate={handleFundUtilisationUpdate}
                    onAdd={addFundUtilisationRow}
                    onRemove={removeFundUtilisationRow}
                    isFinalized={isFinalized}
                />
            </Section>
             
             <TextAreaField label="Registration of charges or satisfactions with Registrar of Companies" value={data.registrationOfCharges} onChange={v => handleUpdate('registrationOfCharges', v)} disabled={isFinalized} />
             <TextAreaField label="Compliance with number of layers of companies" value={data.layerCompliance} onChange={v => handleUpdate('layerCompliance', v)} disabled={isFinalized} />
             <TextAreaField label="Compliance with approved Scheme(s) of Arrangements" value={data.schemeOfArrangements} onChange={v => handleUpdate('schemeOfArrangements', v)} disabled={isFinalized} />
             <TextAreaField label="Details of any transaction not recorded in the books of accounts that has been surrendered or disclosed as income during the year in the tax assessments" value={data.undisclosedIncome} onChange={v => handleUpdate('undisclosedIncome', v)} disabled={isFinalized} />

        </div>
    );
};