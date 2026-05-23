export type SubjectCategory = 
  | "Umanistiche e Comunicative" 
  | "Scientifiche e Informatiche" 
  | "Tecnico-Professionali";

export interface Subject {
  id: string;
  title: string;
  category: SubjectCategory;
  description: string;
  objectives: string[];
  topics: { title: string; content: string }[];
  icon: string;
  color: string;
}

export interface Tutorial {
  id: string;
  title: string;
  subjectId: string;
  url: string;
  pages: number;
  size: string;
}

export interface Presentation {
  id: string;
  title: string;
  subjectId: string;
  slides: { image: string; text: string }[];
}

export interface GlossaryTerm {
  id: string;
  term: string;
  definition: string;
  subjectId: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  subjectId: string;
}
