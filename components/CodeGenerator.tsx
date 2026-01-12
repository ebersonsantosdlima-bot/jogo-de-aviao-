
import React, { useState } from 'react';
import { gemini } from '../services/geminiService';
import { ScriptItem } from '../types';

interface CodeGeneratorProps {
  onSaveScript: (script: ScriptItem) => void;
  onDeleteScript: (id: string) => void;
  savedScripts: ScriptItem[];
}

export const CodeGenerator: React.FC<CodeGeneratorProps> = ({ onSaveScript, onDeleteScript, savedScripts }) => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    try {
      const code = await gemini.generateFlightScript(prompt);
      setResult(code);
    } catch (error) {
      console.error(error);
      setResult("Error generating code. Check API Key.");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = () => {
    const name = prompt.split(' ').slice(0, 3).join('_').replace(/[^a-zA-Z0-9_]/g, '') || 'New_Script';
    onSaveScript({
      id: Date.now().toString(),
      name: `${name}.cs`,
      code: result,
      type: 'Physics',
      createdAt: Date.now()
    });
    setResult('');
    setPrompt('');
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <section className="bg-slate-900 rounded-2xl border border-slate-800 p-8 shadow-xl">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 bg-blue-500/10 rounded-lg">
            <svg className="w-6 h-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-100">AI Script Architect</h2>
            <p className="text-sm text-slate-400">Specify your flight logic, aerodynamics, or NPC behavior.</p>
          </div>
        </div>

        <div className="relative mb-6">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g., Generate a Unity C# script for a realistic Cessna flight model with lift/drag curves and mobile joystick input."
            className="w-full h-32 bg-slate-950 border border-slate-800 rounded-xl px-4 py-4 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all resize-none font-mono text-sm"
          />
          <button
            onClick={handleGenerate}
            disabled={loading || !prompt}
            className={`absolute bottom-4 right-4 px-6 py-2 rounded-lg font-bold transition-all flex items-center space-x-2 ${
              loading || !prompt 
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed' 
                : 'bg-blue-600 text-white hover:bg-blue-500 shadow-lg shadow-blue-600/30'
            }`}
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Synthesizing...</span>
              </>
            ) : (
              <>
                <span>Generate Script</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </>
            )}
          </button>
        </div>

        {result && (
          <div className="animate-in slide-in-from-bottom-4 duration-300">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Generated Output</span>
              <button 
                onClick={handleSave}
                className="text-xs font-bold text-blue-400 hover:text-blue-300 transition-colors flex items-center space-x-1"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                </svg>
                <span>Add to Project</span>
              </button>
            </div>
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-6 overflow-x-auto">
              <pre className="text-sm font-mono text-slate-300 leading-relaxed whitespace-pre-wrap">
                {result}
              </pre>
            </div>
          </div>
        )}
      </section>

      {savedScripts.length > 0 && (
        <section className="animate-in fade-in duration-700">
          <h3 className="text-lg font-bold text-slate-100 mb-4 flex items-center space-x-2">
            <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
            </svg>
            <span>Project Workspace</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {savedScripts.map((script) => (
              <div key={script.id} className="bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition-all group">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center text-blue-500">
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-200">{script.name}</h4>
                      <p className="text-xs text-slate-500">Created {new Date(script.createdAt).toLocaleTimeString()}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => onDeleteScript(script.id)}
                    className="p-2 text-slate-600 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
                <button 
                  onClick={() => navigator.clipboard.writeText(script.code)}
                  className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold rounded-lg transition-colors flex items-center justify-center space-x-2"
                >
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  <span>Copy C# Code</span>
                </button>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
