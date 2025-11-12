import React from 'react';
// FIX: Add file extension to fix module resolution error.
import { ScheduleData, GenericScheduleItem } from '../../types.ts';
import { GenericSchedule } from './GenericSchedule.tsx';

interface OtherIncomeScheduleProps {
    data: GenericScheduleItem[];
    onUpdate: React.Dispatch<React.SetStateAction<ScheduleData>>;
    isFinalized: boolean;
}

export const OtherIncomeSchedule: React.FC<OtherIncomeScheduleProps> = ({ data, onUpdate, isFinalized }) => {
    
    const handleDataUpdate = (updatedData: GenericScheduleItem[]) => {
        onUpdate(prev => ({
            ...prev,
            otherIncome: updatedData
        }));
    };

    return (
        <GenericSchedule
            title="Other Income"
            data={data}
            onUpdate={handleDataUpdate}
            isFinalized={isFinalized}
        />
    );
};
