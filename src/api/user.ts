import axiosInstance from '../plugins/axios';
import { User } from '../types/api/user';

const PATH = '/user';

export default {
  get(id: number) {
    return axiosInstance.get<User>(`${PATH}/${id}`, {});
  },
  getByCpf(cpf: string) {
    return axiosInstance.get<User[]>(`${PATH}`, {
      params: {
        cpf,
      },
    });
  },
};
