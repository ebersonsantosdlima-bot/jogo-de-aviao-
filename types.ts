
export enum WorkflowStep {
  GENERATION = 'GENERATION',
  UNITY_SETUP = 'UNITY_SETUP',
  ANDROID_EXPORT = 'ANDROID_EXPORT'
}

export interface ScriptItem {
  id: string;
  name: string;
  code: string;
  type: 'Physics' | 'AI' | 'Controls' | 'Logic';
  createdAt: number;
}

export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}
