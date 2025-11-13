import React from 'react';
// FIX: Add file extensions to fix module resolution errors.
import { Page } from '../types.ts';
import { MapIcon, FileTextIcon, ListBulletIcon, BarChartIcon } from './icons.tsx';

interface SidebarProps {
  activePage: Page;
  setActivePage: (page: Page) => void;
}

const NavItem: React.FC<{
    label: string;
    isActive: boolean;
    onClick: () => void;
    icon: React.ReactNode;
}> = ({ label, isActive, onClick, icon }) => (
    <button
        onClick={onClick}
        className={`w-full flex items-center px-4 py-2.5 rounded-md text-sm font-medium transition-colors ${
            isActive 
                ? 'bg-brand-blue text-white' 
                : 'text-gray-400 hover:bg-gray-700 hover:text-gray-200'
        }`}
    >
        {icon}
        <span className="ml-3">{label}</span>
    </button>
);

export const Sidebar: React.FC<SidebarProps> = ({ activePage, setActivePage }) => {
  return (
    <aside className="w-64 bg-gray-800 border-r border-gray-700 p-4 flex flex-col print:hidden">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">FinAutomate</h1>
        <p className="text-xs text-gray-400">Phase I Workbench</p>
      </div>
      <nav className="space-y-2">
        <NavItem 
            label="Mapping Workbench" 
            isActive={activePage === 'mapping'} 
            onClick={() => setActivePage('mapping')}
            icon={<MapIcon className="w-5 h-5"/>}
        />
        <NavItem 
            label="Schedules Entry" 
            isActive={activePage === 'schedules'} 
            onClick={() => setActivePage('schedules')}
            icon={<FileTextIcon className="w-5 h-5"/>}
        />
        <NavItem 
            label="Notes Selection" 
            isActive={activePage === 'notes'} 
            onClick={() => setActivePage('notes')}
            icon={<ListBulletIcon className="w-5 h-5"/>}
        />
        <NavItem 
            label="Financial Reports" 
            isActive={activePage === 'reports'} 
            onClick={() => setActivePage('reports')}
            icon={<BarChartIcon className="w-5 h-5"/>}
        />
      </nav>
    </aside>
  );
};