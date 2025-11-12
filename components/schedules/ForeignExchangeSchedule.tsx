
import React from 'react';
// FIX: Add file extension to fix module resolution error.
import { ForeignExchangeData, ScheduleData, GenericScheduleItem } from '../../types.ts';
import { GenericSchedule } from './GenericSchedule.tsx';

interface ForeignExchangeScheduleProps {
    data: ForeignExchangeData;
    onUpdate: React.Dispatch<React.SetStateAction<ScheduleData>>;
    isFinalized: boolean;
}

export const ForeignExchangeSchedule: React.FC<ForeignExchangeScheduleProps> = ({ data, onUpdate, isFinalized }) => {

    const handleEarningsUpdate = (updatedData: GenericScheduleItem[]) => {
        onUpdate(prev => ({...prev, foreignExchange: {...prev.foreignExchange, earnings: updatedData }}));
    };
    
    const handleExpenditureUpdate = (updatedData: GenericScheduleItem[]) => {
        onUpdate(prev => ({...prev, foreignExchange: {...prev.foreignExchange, expenditure: updatedData }}));
    };

    return (
        <div className="space-y-8">
             <GenericSchedule
                title="Foreign Exchange Earnings"
                data={data.earnings}
                onUpdate={handleEarningsUpdate}
                isFinalized={isFinalized}
            />
             <GenericSchedule
                title="Foreign Exchange Expenditure"
                data={data.expenditure}
                onUpdate={handleExpenditureUpdate}
                isFinalized={isFinalized}
            />
        </div>
    );
};
