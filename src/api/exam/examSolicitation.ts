import axiosInstance from '../../plugins/axios';
import { ExamSolicitation } from '../../types/api/exam';

const PATH = '/exam-solicitation';

interface ExamSolicitationPutParams {
  examResultId: number;
}

interface ExamSolicitationPostParams {
  doctorId: number;
  userId: number;
  examId: number;
}

export default {
  get(id: number) {
    return axiosInstance.get<ExamSolicitation>(`${PATH}/${id}`);
  },
  post(data: ExamSolicitationPostParams) {
    return axiosInstance.post<ExamSolicitation>(`${PATH}`, data);
  },
  put(id: number, data: ExamSolicitationPutParams) {
    return axiosInstance.put<ExamSolicitation>(`${PATH}/${id}`, data);
  },
};
