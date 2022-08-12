import axiosInstance from '../../plugins/axios';
import { ExamResult } from '../../types/api/exam';

const PATH = '/exam-result';

interface ExamResultPostParams {
  measureDate: Date;
  result: string;
  resultDate: Date;
  document: string;
  examSolicitationId: number;
}

export default {
  get(id: number) {
    return axiosInstance.get<ExamResult>(`${PATH}/${id}`);
  },
  post(data: ExamResultPostParams) {
    return axiosInstance.post<ExamResult>(`${PATH}`, data);
  },
};
