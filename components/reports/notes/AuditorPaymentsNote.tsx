import React from 'react';
import { GenericScheduleItem } from '../../../types.ts';
import { GenericNote } from './GenericNote.tsx';

interface AuditorPaymentsNoteProps {
    data: GenericScheduleItem[];
}

export const AuditorPaymentsNote: React.FC<AuditorPaymentsNoteProps> = ({ data }) => {
    return (
        <GenericNote title="Payments to Auditor" data={data} />
    );
};