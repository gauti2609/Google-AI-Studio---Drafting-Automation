import React from 'react';
import { AdditionalRegulatoryInfoData, FundUtilisationData, FundUtilisationIntermediary, FundUtilisationGuarantee, FundUtilisationUltimate } from '../../../types.ts';

interface AdditionalRegulatoryInfoNoteProps {
    data: AdditionalRegulatoryInfoData;
}

const Section: React.FC<{title: string; children: React.ReactNode}> = ({title, children}) => (
    <div className="mt-4">
        <h4 className="font-semibold text-gray-300 text-sm mb-2">{title}</h4>
        <div className="text-xs space-y-1 text-gray-400">{children}</div>
    </div>
);

const InfoRow: React.FC<{label: string; value: string}> = ({label, value}) => (
    <div className="grid grid-cols-2">
        <span>{label}</span>
        <span className="font-mono text-right">{value || '-'}</span>
    </div>
);

const FundUtilisationDisplayTable: React.FC<{
    title: string;
    rows: (FundUtilisationIntermediary | FundUtilisationUltimate | FundUtilisationGuarantee)[];
}> = ({ title, rows }) => {
    if (rows.length === 0) {
        return (
            <div>
                <h5 className="font-semibold text-gray-300 text-xs mt-3 mb-1">{title}</h5>
                <p className="text-gray-500 text-xs italic">No items reported.</p>
            </div>
        );
    }

    return (
        <div>
            <h5 className="font-semibold text-gray-300 text-xs mt-3 mb-1">{title}</h5>
            <table className="min-w-full text-xs">
                <thead className="bg-gray-800/50">
                    <tr>
                        <th className="p-2 text-left font-medium">Name/Details</th>
                        <th className="p-2 text-left font-medium">Date</th>
                        <th className="p-2 text-right font-medium">Amount</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                    {rows.map(row => (
                        <tr key={row.id}>
                            <td className="p-2">{row.name || '-'}</td>
                            <td className="p-2">{row.date || '-'}</td>
                            <td className="p-2 text-right font-mono">{row.amount || '-'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};


export const AdditionalRegulatoryInfoNote: React.FC<AdditionalRegulatoryInfoNoteProps> = ({ data }) => {
    return (
        <div className="space-y-4">
            <Section title="Corporate Social Responsibility (CSR)">
                <InfoRow label="Amount required to be spent" value={data.csr.required} />
                <InfoRow label="Amount of expenditure incurred" value={data.csr.spent} />
                <InfoRow label="Shortfall at the end of the year" value={data.csr.shortfall} />
                {data.csr.shortfall && <p>Reason for shortfall: {data.csr.reason}</p>}
            </Section>
            
            <Section title="Details of Crypto Currency or Virtual Currency">
                <InfoRow label="Profit or loss on transactions" value={data.crypto.profitOrLoss} />
                <InfoRow label="Amount of currency held as at reporting date" value={data.crypto.amountHeld} />
                <InfoRow label="Deposits or advances from any person for trading or investing" value={data.crypto.advances} />
            </Section>

            <Section title="Utilisation of Borrowed funds and share premium">
                <FundUtilisationDisplayTable
                    title="Funds advanced or loaned to Intermediaries"
                    rows={data.fundUtilisation.intermediaries}
                />
                <FundUtilisationDisplayTable
                    title="Funds advanced or loaned by Intermediaries to Ultimate Beneficiaries"
                    rows={data.fundUtilisation.ultimateBeneficiaries}
                />
                <FundUtilisationDisplayTable
                    title="Guarantees, security or the like provided to or on behalf of the Ultimate Beneficiaries"
                    rows={data.fundUtilisation.guarantees}
                />
            </Section>
             
            <Section title="Other Disclosures">
                <p><strong>Registration of charges with ROC:</strong> {data.registrationOfCharges || 'No issues to report.'}</p>
                <p><strong>Compliance with number of layers:</strong> {data.layerCompliance || 'The Company is in compliance with the number of layers prescribed.'}</p>
                <p><strong>Compliance with Schemes of Arrangements:</strong> {data.schemeOfArrangements || 'No schemes of arrangements were entered into during the year.'}</p>
                <p><strong>Undisclosed Income:</strong> {data.undisclosedIncome || 'No transactions not recorded in the books of accounts have been surrendered or disclosed as income during the year in the tax assessments.'}</p>
            </Section>
        </div>
    );
};