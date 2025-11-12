import React from 'react';
// FIX: Add file extension to fix module resolution error.
// FIX: Changed OtherExpensesData to GenericScheduleItem to match type definitions.
import { GenericScheduleItem } from '../../../types.ts';

interface OtherExpensesNoteProps {
    data: GenericScheduleItem[];
}

const formatCurrency = (val: string): string => {
    const num = parseFloat(val.replace(/,/g, ''));
    if (isNaN(num) || num === 0) return '-';
    return new Intl.NumberFormat('en-IN', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(num);
};

export const OtherExpensesNote: React.FC<OtherExpensesNoteProps> = ({ data }) => {
    const parse = (val: string) => parseFloat(val.replace(/,/g, '')) || 0;
    // FIX: Reduced over data directly, not data.items.
    const totalCy = data.reduce((sum, item) => sum + parse(item.amountCy), 0);
    const totalPy = data.reduce((sum, item) => sum + parse(item.amountPy), 0);
    
    return (
        <div className="overflow-x-auto">
             <table className="min-w-full text-sm">
                <thead className="bg-gray-700/50">
                    <tr>
                        <th className="p-2 text-left font-medium w-3/5">Particulars</th>
                        <th className="p-2 text-right font-medium">Amount CY (₹)</th>
                        <th className="p-2 text-right font-medium">Amount PY (₹)</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-600">
                    {/* FIX: Mapped over data directly, not data.items. */}
                    {data.map(item => (
                        <tr key={item.id}>
                            <td className="p-2">{item.particular}</td>
                            <td className="p-2 text-right font-mono">{formatCurrency(item.amountCy)}</td>
                            <td className="p-2 text-right font-mono">{formatCurrency(item.amountPy)}</td>
                        </tr>
                    ))}
                     <tr className="font-bold bg-gray-700/30">
                        <td className="p-2">Total</td>
                        <td className="p-2 text-right font-mono">{formatCurrency(totalCy.toString())}</td>
                        <td className="p-2 text-right font-mono">{formatCurrency(totalPy.toString())}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};