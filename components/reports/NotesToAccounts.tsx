
import React from 'react';
// FIX: Add file extensions to fix module resolution errors.
import { AllData } from '../../types.ts';
import { CorporateInfoNote } from '../schedules/narrative/CorporateInfoNote.tsx';
import { AccountingPoliciesNote } from '../schedules/narrative/AccountingPoliciesNote.tsx';
import { RelatedPartyNote } from './notes/RelatedPartyNote.tsx';
import { ContingentLiabilitiesNote } from './notes/ContingentLiabilitiesNote.tsx';

interface ReportProps {
  allData: AllData;
}

const NoteWrapper: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="py-4">
        <h3 className="text-lg font-bold text-white mb-3">{title}</h3>
        <div className="bg-gray-900/50 p-4 rounded-lg">
            {children}
        </div>
    </div>
);

export const NotesToAccounts: React.FC<ReportProps> = ({ allData }) => {
    const { scheduleData } = allData;
    const { noteSelections } = scheduleData;
    
    const selectedNotes = noteSelections.filter(n => n.isSelected).sort((a,b) => a.order - b.order);

    const renderNote = (noteId: string) => {
        switch(noteId) {
            case 'corpInfo':
                return <CorporateInfoNote data={scheduleData.corporateInfo} />;
            case 'acctPolicies':
                return <AccountingPoliciesNote data={scheduleData.accountingPolicies} />;
            case 'relatedParty':
                return <RelatedPartyNote data={scheduleData.relatedParties} />;
            case 'contingent':
                return <ContingentLiabilitiesNote data={scheduleData.contingentLiabilities} />;
            // TODO: Add cases for all other notes (Share Capital, PPE, etc.) which are typically tabular and shown in the main statements.
            // This component is more for narrative notes. For a full implementation, you'd render detailed schedule tables here as well.
            default:
                return <p className="text-sm text-gray-500">Note content not implemented for this selection.</p>;
        }
    }

    return (
        <div className="bg-gray-800 text-gray-200">
            <h2 className="text-xl font-semibold mb-4 text-white">Notes to the Financial Statements</h2>
            <div className="space-y-4 divide-y divide-gray-700">
                {selectedNotes.map(note => (
                    <NoteWrapper key={note.id} title={note.name}>
                       {renderNote(note.id)}
                    </NoteWrapper>
                ))}
                {selectedNotes.length === 0 && (
                    <div className="text-center py-10 text-gray-500">
                        No notes have been selected for display.
                    </div>
                )}
            </div>
        </div>
    );
};
