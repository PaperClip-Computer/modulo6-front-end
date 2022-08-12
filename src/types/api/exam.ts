import { Doctor } from './doctor';
import { User } from './user';

export interface Exam {
  id: number;
  name: string;
  synonym: string;
  material: string;
  conservation: string;
  preparation: string;
  method: string;
  interferer: string;
  normalValues: string;
  interpretation: string;
  measureUnit: string;
}

export type ExamInfoFields = keyof Omit<Exam, 'id' | 'name' | 'measureUnit'>;

export interface ExamSolicitation {
  id: number;
  doctor: Doctor;
  user: User;
  exam: Exam;
  requestDate: string;
  examResult?: ExamResult;
}

export interface ExamResult {
  id: number;
  measureDate: string;
  result: string;
  resultDate: string;
  document: string;
  solicitation: ExamSolicitation;
}
