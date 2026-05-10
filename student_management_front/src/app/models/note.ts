export interface Note {
  id: number;
  studentId: number;
  moduleName: string;
  value: number;
}

export const MODULES = [
  'Algebre',
  'Analyse',
  'Info',
  'Anglais',
  'Gestion'
];