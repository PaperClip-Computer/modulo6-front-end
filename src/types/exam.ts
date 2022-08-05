import { FilePreview } from './input';

export interface Exam {
  id: number;
  name: string;
  unitMeasure: string;
  info: Record<string, string | undefined>;
}

export interface ExamRequest extends Omit<Exam, 'info'> {
  requestDate: string;
  done: boolean;
}

export interface ExamResult extends Exam {
  measureDate: string;
  releasedDate: string;
  result: number;
  document: FilePreview;
}
