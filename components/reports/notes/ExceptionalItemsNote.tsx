import React from 'react';
import { GenericScheduleItem } from '../../../types.ts';
import { GenericNote } from './GenericNote.tsx';

interface ExceptionalItemsNoteProps {
    data: GenericScheduleItem[];
}

export const ExceptionalItemsNote: React.FC<ExceptionalItemsNoteProps> = ({ data }) => {
    return (
        <GenericNote title="Exceptional, Extraordinary and Prior Period Items" data={data} />
    );
};