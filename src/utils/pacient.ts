import { BloodType, PacientInfoFields, Sex } from '../types/api/user';

export const bloodTypeTranslator: Record<BloodType, string> = {
  A_PLUS: 'A+',
  A_MINUS: 'A-',
  B_PLUS: 'B+',
  B_MINUS: 'B-',
  AB_PLUS: 'AB+',
  AB_MINUS: 'AB-',
  O_PLUS: 'O+',
  O_MINUS: 'O-',
};

export const sexTranslator: Record<Sex, string> = {
  masc: 'Masculino',
  fem: 'Feminino',
  other: 'Outro',
};

export const pacientInfoTranslator: Record<PacientInfoFields, string> = {
  birthDate: 'Data de Nascimento',
  bloodType: 'Tipo Sanguíneo',
  sex: 'Sexo Biológico',
  allergies: 'Alergias',
  medicines: 'Remédios Controlados',
  medicalHistory: 'Histórico Médico',
};
