
import React from 'react';

interface Step {
  title: string;
  desc: string;
}

interface WorkflowGuideProps {
  title: string;
  type: 'unity' | 'android';
  steps: Step[];
}

export const WorkflowGuide: React.FC<WorkflowGuideProps> = ({ title, type, steps }) => {
  return (
    <div className="animate-in fade-in slide-in-from-right-8 duration-500">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-extrabold text-white tracking-tight">{title}</h2>
        <div className={`px-4 py-1 rounded-full text-xs font-bold border uppercase tracking-widest ${
          type === 'unity' ? 'bg-black text-white border-white/20' : 'bg-green-600/10 text-green-500 border-green-500/20'
        }`}>
          {type === 'unity' ? 'Unity 3D Engine' : 'Android Studio Mobile'}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {steps.map((step, idx) => (
          <div 
            key={idx} 
            className="group relative bg-slate-900 border border-slate-800 rounded-2xl p-6 flex items-start space-x-6 hover:border-blue-500/50 hover:bg-slate-800/50 transition-all cursor-default"
          >
            <div className="flex-shrink-0 w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center text-xl font-black text-slate-500 group-hover:bg-blue-600 group-hover:text-white transition-all">
              {idx + 1}
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-slate-100 mb-1 group-hover:text-blue-400 transition-colors">{step.title}</h3>
              <p className="text-slate-400 leading-relaxed">{step.desc}</p>
            </div>
            <div className="hidden md:block opacity-0 group-hover:opacity-100 transition-opacity">
               <svg className="w-6 h-6 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
               </svg>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 p-8 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl text-white shadow-2xl overflow-hidden relative">
        <div className="relative z-10">
          <h3 className="text-2xl font-bold mb-4">Pro Optimization Tip</h3>
          <p className="text-blue-100 mb-6 max-w-2xl text-lg leading-relaxed">
            When exporting to Android, use <strong>ASTC texture compression</strong> and set your <strong>Graphic API to Vulkan</strong> for the best performance on modern flight simulator scenes.
          </p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-xl font-bold hover:bg-blue-50 transition-colors shadow-lg">
            View Performance Specs
          </button>
        </div>
        <div className="absolute top-0 right-0 -mr-16 -mt-16 opacity-10">
           <svg className="w-64 h-64 text-white" fill="currentColor" viewBox="0 0 24 24">
             <path d="M13 10V3L4 14h7v7l9-11h-7z" />
           </svg>
        </div>
      </div>
    </div>
  );
};
