import axiosInstance from '../../plugins/axios';
import { Exam } from '../../types/api/exam';

const PATH = '/exam';

export default {
  list() {
    return axiosInstance.get<Exam[]>(`${PATH}`);
  },
  get(name: string) {
    return axiosInstance.get<Exam>(`${PATH}/${name}`);
  },
};
