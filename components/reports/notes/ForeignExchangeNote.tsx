
import React from 'react';
// FIX: Add file extension to fix module resolution error.
import { ForeignExchangeData } from '../../../types.ts';
import { GenericNote } from './GenericNote.tsx';

interface ForeignExchangeNoteProps {
    data: ForeignExchangeData;
}

export const ForeignExchangeNote: React.FC<ForeignExchangeNoteProps> = ({ data }) => {
    return (
        <div className="space-y-6">
            <div>
                <h4 className="font-semibold text-gray-300 mb-2">a. Earnings in foreign currency</h4>
                <GenericNote title="" data={data.earnings} />
            </div>
            <div>
                <h4 className="font-semibold text-gray-300 mb-2">b. Expenditure in foreign currency</h4>
                <GenericNote title="" data={data.expenditure} />
            </div>
        </div>
    );
};
