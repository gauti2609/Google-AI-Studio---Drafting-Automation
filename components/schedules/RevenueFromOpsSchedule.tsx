
import React from 'react';
// FIX: Add file extension to fix module resolution error.
import { ScheduleData, GenericScheduleItem } from '../../types.ts';
import { GenericSchedule } from './GenericSchedule.tsx';

interface RevenueFromOpsScheduleProps {
    data: GenericScheduleItem[];
    onUpdate: React.Dispatch<React.SetStateAction<ScheduleData>>;
    isFinalized: boolean;
}

export const RevenueFromOpsSchedule: React.FC<RevenueFromOpsScheduleProps> = ({ data, onUpdate, isFinalized }) => {
    
    const handleDataUpdate = (updatedData: GenericScheduleItem[]) => {
        onUpdate(prev => ({
            ...prev,
            revenueFromOps: updatedData
        }));
    };

    return (
        <GenericSchedule
            title="Revenue from Operations"
            data={data}
            onUpdate={handleDataUpdate}
            isFinalized={isFinalized}
        />
    );
};
