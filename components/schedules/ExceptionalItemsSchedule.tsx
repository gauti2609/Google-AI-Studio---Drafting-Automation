import React from 'react';
import { ScheduleData, GenericScheduleItem } from '../../types.ts';
import { GenericSchedule } from './GenericSchedule.tsx';

interface ExceptionalItemsScheduleProps {
    data: GenericScheduleItem[];
    onUpdate: (data: GenericScheduleItem[]) => void;
    isFinalized: boolean;
}

export const ExceptionalItemsSchedule: React.FC<ExceptionalItemsScheduleProps> = ({ data, onUpdate, isFinalized }) => {
    
    return (
        <GenericSchedule
            title="Exceptional, Extraordinary and Prior Period Items"
            data={data}
            onUpdate={onUpdate}
            isFinalized={isFinalized}
        />
    );
};