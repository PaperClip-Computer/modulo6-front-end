import { User } from './user';

export interface Doctor {
  id: number;
  name: string;
  crm: string;
  speciality: string;
  icon?: string;
  pacients: User[];
}
