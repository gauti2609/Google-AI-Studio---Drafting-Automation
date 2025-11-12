import React from 'react';
// FIX: Add file extension to fix module resolution error.
import { ScheduleData, GenericScheduleItem } from '../../types.ts';
import { GenericSchedule } from './GenericSchedule.tsx';

interface FinanceCostsScheduleProps {
    data: GenericScheduleItem[];
    onUpdate: React.Dispatch<React.SetStateAction<ScheduleData>>;
    isFinalized: boolean;
}

export const FinanceCostsSchedule: React.FC<FinanceCostsScheduleProps> = ({ data, onUpdate, isFinalized }) => {
    
    const handleDataUpdate = (updatedData: GenericScheduleItem[]) => {
        onUpdate(prev => ({
            ...prev,
            financeCosts: updatedData
        }));
    };

    return (
        <GenericSchedule
            title="Finance Costs"
            data={data}
            onUpdate={handleDataUpdate}
            isFinalized={isFinalized}
        />
    );
};
