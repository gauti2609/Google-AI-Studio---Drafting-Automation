import React from 'react';
import { BorrowingsData, BorrowingItem } from '../../../types.ts';

interface BorrowingsNoteProps {
    data: BorrowingsData;
}

const format = (val: string) => {
    const num = parseFloat(val.replace(/,/g, '')) || 0;
    return num === 0 ? '-' : num.toLocaleString('en-IN', {minimumFractionDigits: 2});
};

const BorrowingTable: React.FC<{title: string, items: BorrowingItem[]}> = ({title, items}) => (
    <div className="mt-4">
        <h4 className="font-semibold text-gray-300 text-sm mb-2">{title}</h4>
        <table className="min-w-full text-xs">
            <thead className="bg-gray-700/50">
                <tr>
                    <th className="p-2 text-left">Nature of Borrowing</th>
                    <th className="p-2 text-right">Amount (CY)</th>
                    <th className="p-2 text-right">Amount (PY)</th>
                    <th className="p-2 text-left">Repayment Terms</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
                {items.map(item => (
                    <tr key={item.id}>
                        <td className="p-2">{item.nature}</td>
                        <td className="p-2 text-right font-mono">{format(item.amountCy)}</td>
                        <td className="p-2 text-right font-mono">{format(item.amountPy)}</td>
                        <td className="p-2">{item.repaymentTerms}</td>
                    </tr>
                ))}
                {items.length === 0 && <tr><td colSpan={4} className="text-center p-2 text-gray-500">No {title.toLowerCase()} to report.</td></tr>}
            </tbody>
        </table>
    </div>
);

export const BorrowingsNote: React.FC<BorrowingsNoteProps> = ({ data }) => {
    return (
        <div className="space-y-4">
            <BorrowingTable title="Long-Term Borrowings" items={data.longTerm} />
            <BorrowingTable title="Short-Term Borrowings" items={data.shortTerm} />
             {data.reissuableBonds && (
                <div className="text-xs">
                    <span className="font-semibold text-gray-400">Reissuable Redeemed Bonds/Debentures: </span>
                    <span>{data.reissuableBonds}</span>
                </div>
            )}
        </div>
    );
};