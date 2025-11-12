import React from 'react';
import { ScheduleData, GenericScheduleItem } from '../../types.ts';
import { GenericSchedule } from './GenericSchedule.tsx';

interface AuditorPaymentsScheduleProps {
    data: GenericScheduleItem[];
    onUpdate: (data: GenericScheduleItem[]) => void;
    isFinalized: boolean;
}

export const AuditorPaymentsSchedule: React.FC<AuditorPaymentsScheduleProps> = ({ data, onUpdate, isFinalized }) => {
    
    return (
        <GenericSchedule
            title="Payments to Auditor"
            data={data}
            onUpdate={onUpdate}
            isFinalized={isFinalized}
        />
    );
};