
import React from 'react';
// FIX: Add file extensions to fix module resolution errors.
import { AllData, ScheduleData } from '../types.ts';

interface NotesSelectionPageProps {
  allData: AllData;
  setScheduleData: React.Dispatch<React.SetStateAction<ScheduleData>>;
}

export const NotesSelectionPage: React.FC<NotesSelectionPageProps> = ({ allData, setScheduleData }) => {
    const { noteSelections } = allData.scheduleData;

    const handleToggleNote = (id: string) => {
        setScheduleData(prev => ({
            ...prev,
            noteSelections: prev.noteSelections.map(note => 
                note.id === id ? { ...note, isSelected: !note.isSelected } : note
            )
        }));
    };
    
    return (
        <div className="p-6 h-full flex flex-col space-y-4">
            <header>
                <h1 className="text-2xl font-bold text-white">Notes Selection</h1>
                <p className="text-sm text-gray-400">Select which narrative notes to include in the final report.</p>
            </header>
            <main className="flex-1 bg-gray-800 p-6 rounded-lg border border-gray-700 overflow-y-auto max-w-2xl mx-auto">
                 <div className="space-y-3">
                    {noteSelections.sort((a,b) => a.order - b.order).map(note => (
                        <div key={note.id} className="flex items-center p-3 bg-gray-900/50 rounded-lg">
                            <label className="flex items-center cursor-pointer w-full">
                                <input
                                    type="checkbox"
                                    checked={note.isSelected}
                                    onChange={() => handleToggleNote(note.id)}
                                    className="h-5 w-5 rounded bg-gray-700 border-gray-600 text-brand-blue focus:ring-brand-blue focus:ring-2"
                                />
                                <span className="ml-4 text-gray-200">{note.name}</span>
                            </label>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};