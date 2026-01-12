
import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { CodeGenerator } from './components/CodeGenerator';
import { WorkflowGuide } from './components/WorkflowGuide';
import { WorkflowStep, ScriptItem } from './types';

const App: React.FC = () => {
  const [activeStep, setActiveStep] = useState<WorkflowStep>(WorkflowStep.GENERATION);
  const [scripts, setScripts] = useState<ScriptItem[]>([]);

  const addScript = (script: ScriptItem) => {
    setScripts(prev => [script, ...prev]);
  };

  const deleteScript = (id: string) => {
    setScripts(prev => prev.filter(s => s.id !== id));
  };

  return (
    <div className="flex h-screen bg-slate-950 overflow-hidden font-sans">
      {/* Sidebar Navigation */}
      <Sidebar 
        activeStep={activeStep} 
        setActiveStep={setActiveStep} 
      />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full relative overflow-y-auto">
        <header className="h-16 border-b border-slate-800 flex items-center px-8 bg-slate-900/50 backdrop-blur-md sticky top-0 z-10">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h1 className="text-xl font-bold tracking-tight text-slate-100">
              Flight Sim Architect <span className="text-blue-500 font-medium text-sm ml-2 px-2 py-0.5 bg-blue-500/10 rounded-full border border-blue-500/20">v1.0</span>
            </h1>
          </div>
        </header>

        <div className="p-8 max-w-7xl mx-auto w-full">
          {activeStep === WorkflowStep.GENERATION && (
            <CodeGenerator onSaveScript={addScript} savedScripts={scripts} onDeleteScript={deleteScript} />
          )}
          
          {activeStep === WorkflowStep.UNITY_SETUP && (
            <WorkflowGuide 
              title="Unity Integration Engine" 
              type="unity"
              steps={[
                { title: "Initialize Scene", desc: "Set up the 3D environment with a Skybox and Terrain." },
                { title: "RigidBody Setup", desc: "Attach a Rigidbody to your aircraft prefab. Set Mass and Drag." },
                { title: "Apply Generated Scripts", desc: "Create new C# scripts in Unity and paste the AI-generated code." },
                { title: "Input Mapping", desc: "Use the Unity Input System for mobile-friendly joysticks." }
              ]}
            />
          )}

          {activeStep === WorkflowStep.ANDROID_EXPORT && (
            <WorkflowGuide 
              title="Android Deployment Pipeline" 
              type="android"
              steps={[
                { title: "Switch Platform", desc: "Build Settings > Android > Switch Platform." },
                { title: "Player Settings", desc: "Configure Package Name, Version, and Target API level (API 34+)." },
                { title: "Keystore Creation", desc: "Generate a release key for the APK/AAB." },
                { title: "Build and Run", desc: "Connect your device or generate the final APK file." }
              ]}
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
