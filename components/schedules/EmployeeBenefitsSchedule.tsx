import React from 'react';
import { EmployeeBenefitsData, ScheduleData } from '../../types.ts';

interface EmployeeBenefitsScheduleProps {
    data: EmployeeBenefitsData;
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


export const EmployeeBenefitsSchedule: React.FC<EmployeeBenefitsScheduleProps> = ({ data, onUpdate, isFinalized }) => {

    const handleUpdate = (field: keyof EmployeeBenefitsData, value: string) => {
        onUpdate(prev => ({ ...prev, employeeBenefits: { ...prev.employeeBenefits, [field]: value } }));
    };

    const parse = (val: string) => parseFloat(val.replace(/,/g, '')) || 0;
    const total = parse(data.salariesAndWages) + parse(data.contributionToFunds) + parse(data.staffWelfare);
    
    return (
        <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white">Employee Benefit Expense</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <InputField label="Salaries and Wages" value={data.salariesAndWages} onChange={v => handleUpdate('salariesAndWages', v)} disabled={isFinalized} />
                <InputField label="Contribution to Provident & Other Funds" value={data.contributionToFunds} onChange={v => handleUpdate('contributionToFunds', v)} disabled={isFinalized} />
                <InputField label="Staff Welfare Expenses" value={data.staffWelfare} onChange={v => handleUpdate('staffWelfare', v)} disabled={isFinalized} />
            </div>
             <div className="mt-4 p-4 bg-gray-900/50 rounded-lg text-sm max-w-sm">
                <h4 className="font-bold text-gray-300">Summary</h4>
                 <div className="flex justify-between mt-2 pt-2 border-t border-gray-600">
                    <span className="font-bold">Total Employee Benefit Expense:</span>
                    <span className="font-mono font-bold">{total.toLocaleString('en-IN', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                </div>
            </div>
        </div>
    );
};