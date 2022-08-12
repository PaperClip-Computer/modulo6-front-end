import { Doctor } from './doctor';
import { ExamSolicitation } from './exam';

export interface User {
  id: number;
  name: string;
  cpf: string;
  birthDate: string;
  sex: Sex;
  bloodType: BloodType;
  icon?: string;
  medicines: string[];
  medicalHistory: string[];
  allergies: string[];
  doctor: Doctor;
  examSolicitations: ExamSolicitation[];
}

export type PacientInfoFields = keyof Pick<
  User,
  'birthDate' | 'bloodType' | 'sex' | 'allergies' | 'medicines' | 'medicalHistory'
>;

export type Sex = 'masc' | 'fem' | 'other';

export type BloodType =
  | 'A_PLUS'
  | 'A_MINUS'
  | 'B_PLUS'
  | 'B_MINUS'
  | 'AB_PLUS'
  | 'AB_MINUS'
  | 'O_PLUS'
  | 'O_MINUS';
