
import React from 'react';
import { WorkflowStep } from '../types';

interface SidebarProps {
  activeStep: WorkflowStep;
  setActiveStep: (step: WorkflowStep) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeStep, setActiveStep }) => {
  const navItems = [
    { 
      id: WorkflowStep.GENERATION, 
      label: 'Script Generator', 
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      )
    },
    { 
      id: WorkflowStep.UNITY_SETUP, 
      label: 'Unity Engine', 
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      )
    },
    { 
      id: WorkflowStep.ANDROID_EXPORT, 
      label: 'Android Export', 
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      )
    },
  ];

  return (
    <aside className="w-72 bg-slate-900 border-r border-slate-800 flex flex-col shadow-2xl z-20">
      <div className="p-8 flex-1">
        <div className="mb-10">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-4">Core Workflow</p>
          <nav className="space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveStep(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                  activeStep === item.id 
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' 
                    : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                }`}
              >
                <span className={activeStep === item.id ? 'text-white' : 'text-slate-500 group-hover:text-slate-300'}>
                  {item.icon}
                </span>
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-4">Resources</p>
          <div className="space-y-3">
            <a href="https://docs.unity3d.com" target="_blank" className="block text-sm text-slate-400 hover:text-blue-400 transition-colors">Unity Documentation</a>
            <a href="https://developer.android.com" target="_blank" className="block text-sm text-slate-400 hover:text-blue-400 transition-colors">Android Studio Guide</a>
            <a href="https://ai.google.dev" target="_blank" className="block text-sm text-slate-400 hover:text-blue-400 transition-colors">Gemini API Docs</a>
          </div>
        </div>
      </div>

      <div className="p-6 border-t border-slate-800 bg-slate-900/50">
        <div className="bg-slate-800 rounded-xl p-4">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs font-bold text-slate-300">SYSTEM STATUS</span>
          </div>
          <p className="text-[10px] text-slate-500 font-mono leading-tight">
            GEMINI 3.0 CONNECTED<br/>
            UNITY ENGINE READY<br/>
            ADB LINK ACTIVE
          </p>
        </div>
      </div>
    </aside>
  );
};
