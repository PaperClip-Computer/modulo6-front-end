import { RouteRecordRaw } from 'vue-router';
import DoctorPacientRoutes from './pacient';

import DoctorPacientLayout from '@/layouts/Base.vue';
import DoctorHome from '@/pages/doctor/Home.vue';
import DoctorSearch from '@/pages/doctor/Search.vue';
import DoctorExamInfo from '@/pages/doctor/exam/Info.vue';
import DoctorOrder from '@/pages/doctor/exam/Order.vue';

export default [
  {
    path: '',
    name: 'doctor.home',
    component: DoctorHome,
  },
  {
    path: '/search',
    name: 'doctor.search',
    component: DoctorSearch,
  },
  {
    path: '/exam/:examId',
    name: 'doctor.exam.info',
    component: DoctorExamInfo,
    children: [
      {
        path: '/order',
        name: 'doctor.exam.info.order',
        component: DoctorOrder,
      },
    ],
  },
  {
    path: '/pacient/:id',
    name: 'doctor.pacient.info',
    component: DoctorPacientLayout,
    children: [...DoctorPacientRoutes],
  },
] as RouteRecordRaw[];
