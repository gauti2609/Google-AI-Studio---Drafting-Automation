import React from 'react';
// FIX: Import GenericScheduleItem for type mapping.
import { ContingentLiability, GenericScheduleItem } from '../../../types.ts';
import { GenericNote } from './GenericNote.tsx';

interface CommitmentsNoteProps {
    data: ContingentLiability[];
}

export const CommitmentsNote: React.FC<CommitmentsNoteProps> = ({ data }) => {
    // FIX: Map data from ContingentLiability[] to GenericScheduleItem[] to match GenericNote component's expected props.
    const genericData: GenericScheduleItem[] = data.map(item => ({
        id: item.id,
        particular: item.nature,
        amountCy: item.amountCy,
        amountPy: item.amountPy,
    }));
    return (
        <GenericNote title="Commitments" data={genericData} />
    );
};
