
// components/schedules/LongTermReceivablesAgeingSchedule.tsx
import React from 'react';
import { TradeReceivablesData, TradeReceivablesAgeingRow } from '../../types.ts';
import { TradeReceivablesSchedule } from './TradeReceivablesSchedule.tsx'; // Re-using for structure

interface LongTermReceivablesAgeingScheduleProps {
    data: TradeReceivablesAgeingRow[];
    onUpdate: (data: TradeReceivablesAgeingRow[]) => void;
    isFinalized: boolean;
}

// This is a simplified version that re-uses the ageing table logic from TradeReceivablesSchedule
// A more robust implementation might have a shared AgeingTable component.
export const LongTermReceivablesAgeingSchedule: React.FC<LongTermReceivablesAgeingScheduleProps> = ({ data, onUpdate, isFinalized }) => {
    
    // Mocking the structure required by TradeReceivablesSchedule for its AgeingTable part
    const mockTradeRecData: TradeReceivablesData = {
        securedGood: '', unsecuredGood: '', doubtful: '', provisionForDoubtful: '',
        ageing: data,
    };
    
    return (
        <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white">Long-Term Trade Receivables - Ageing</h3>
            {/* FIX: The TradeReceivablesSchedule component has more fields than just ageing, so we only render its ageing table part by passing mock data. We also adjust the onUpdate to only pass back the ageing data. */}
            <TradeReceivablesSchedule
                title=""
                data={mockTradeRecData}
                onUpdate={(d) => onUpdate(d.ageing)}
                isFinalized={isFinalized}
            />
        </div>
    );
};
