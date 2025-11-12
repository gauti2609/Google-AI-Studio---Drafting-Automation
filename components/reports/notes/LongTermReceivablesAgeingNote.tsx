// components/reports/notes/LongTermReceivablesAgeingNote.tsx
import React from 'react';
import { TradeReceivablesAgeingRow } from '../../../types.ts';

// Reusing the note from trade receivables as the structure is identical
import { TradeReceivablesNote } from './TradeReceivablesAgeingNote.tsx';

interface LongTermReceivablesAgeingNoteProps {
    data: TradeReceivablesAgeingRow[];
}

export const LongTermReceivablesAgeingNote: React.FC<LongTermReceivablesAgeingNoteProps> = ({ data }) => {
    const mockTradeRecData = {
        securedGood: '', unsecuredGood: '', doubtful: '', provisionForDoubtful: '',
        ageing: data,
    };
    return (
        <div>
             <h4 className="font-semibold text-gray-300 mb-2">Ageing of Long-Term Trade Receivables</h4>
            <TradeReceivablesNote data={mockTradeRecData} />
        </div>
    );
};
