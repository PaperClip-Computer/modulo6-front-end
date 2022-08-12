import axiosInstance from '../plugins/axios';
import { Doctor } from '../types/api/doctor';

const PATH = '/doctor';

export default {
  get(id: number) {
    return axiosInstance.get<Doctor>(`${PATH}/${id}`, {});
  },
};
