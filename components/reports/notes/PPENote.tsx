import React from 'react';
import { PpeAssetRow } from '../../../types.ts';

interface PPENoteProps {
    data: PpeAssetRow[];
}

export const PPENote: React.FC<PPENoteProps> = ({ data }) => {
    const hasLeasedAssets = data.some(row => row.isUnderLease);
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full text-xs border-collapse border border-gray-600">
                <thead className="bg-gray-700/50">
                    <tr>
                        <th rowSpan={2} className="p-2 text-left font-medium border border-gray-600 w-1/4">Asset Class</th>
                        <th colSpan={4} className="p-2 text-center font-medium border border-gray-600">Gross Block</th>
                        <th colSpan={4} className="p-2 text-center font-medium border border-gray-600">Accumulated Depreciation</th>
                        <th rowSpan={2} className="p-2 text-right font-medium border border-gray-600">Net Block</th>
                    </tr>
                    <tr>
                        <th className="p-2 text-right font-medium border border-gray-600">Opening</th>
                        <th className="p-2 text-right font-medium border border-gray-600">Additions</th>
                        <th className="p-2 text-right font-medium border border-gray-600">Disposals</th>
                        <th className="p-2 text-right font-medium border border-gray-600">Closing</th>
                        <th className="p-2 text-right font-medium border border-gray-600">Opening</th>
                        <th className="p-2 text-right font-medium border border-gray-600">For the Year</th>
                        <th className="p-2 text-right font-medium border border-gray-600">On Disposals</th>
                        <th className="p-2 text-right font-medium border border-gray-600">Closing</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(row => {
                        const parse = (val: string) => parseFloat(val.replace(/,/g, '')) || 0;
                        const format = (num: number) => num === 0 ? '-' : num.toLocaleString('en-IN', {minimumFractionDigits: 2});
                        
                        const grossClosing = parse(row.grossBlockOpening) + parse(row.grossBlockAdditions) - parse(row.grossBlockDisposals);
                        const depClosing = parse(row.depreciationOpening) + parse(row.depreciationForYear) - parse(row.depreciationOnDisposals);
                        const netClosing = grossClosing - depClosing;

                        return (
                            <tr key={row.id}>
                                <td className="p-2 border border-gray-600">{row.assetClass}{row.isUnderLease ? '*' : ''}</td>
                                <td className="p-2 border border-gray-600 text-right font-mono">{format(parse(row.grossBlockOpening))}</td>
                                <td className="p-2 border border-gray-600 text-right font-mono">{format(parse(row.grossBlockAdditions))}</td>
                                <td className="p-2 border border-gray-600 text-right font-mono">{format(parse(row.grossBlockDisposals))}</td>
                                <td className="p-2 border border-gray-600 text-right font-mono bg-gray-800/50">{format(grossClosing)}</td>
                                <td className="p-2 border border-gray-600 text-right font-mono">{format(parse(row.depreciationOpening))}</td>
                                <td className="p-2 border border-gray-600 text-right font-mono">{format(parse(row.depreciationForYear))}</td>
                                <td className="p-2 border border-gray-600 text-right font-mono">{format(parse(row.depreciationOnDisposals))}</td>
                                <td className="p-2 border border-gray-600 text-right font-mono bg-gray-800/50">{format(depClosing)}</td>
                                <td className="p-2 border border-gray-600 text-right font-mono bg-gray-800/50">{format(netClosing)}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            {hasLeasedAssets && <p className="text-xs italic text-gray-400 mt-2">* Represents assets held under lease.</p>}
        </div>
    );
};