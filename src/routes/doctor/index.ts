import { RouteRecordRaw } from 'vue-router';
import DoctorExamRoutes from './exam';
import DoctorPacientRoutes from './pacient';

import DoctorBaseLayout from '@/layouts/Base.vue';
import DoctorHome from '@/pages/doctor/Home.vue';
import DoctorSearch from '@/pages/doctor/Search.vue';

export default [
  {
    path: '',
    name: 'doctor.home',
    component: DoctorHome,
  },
  {
    path: 'search',
    name: 'doctor.search',
    component: DoctorSearch,
  },
  {
    path: 'exam/:examId',
    component: DoctorBaseLayout,
    children: [...DoctorExamRoutes],
  },
  {
    path: 'pacient/:id',
    name: 'doctor.pacient.info',
    component: DoctorBaseLayout,
    children: [...DoctorPacientRoutes],
  },
] as RouteRecordRaw[];
