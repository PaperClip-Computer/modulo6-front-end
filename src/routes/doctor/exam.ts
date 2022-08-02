import { RouteRecordRaw } from 'vue-router';

import DoctorExamInfo from '@/pages/doctor/exam/Info.vue';
import DoctorOrder from '@/pages/doctor/exam/Order.vue';

export default [
  {
    path: '',
    name: 'doctor.exam.info',
    component: DoctorExamInfo,
  },
  {
    path: 'order',
    name: 'doctor.exam.info.order',
    component: DoctorOrder,
  },
] as RouteRecordRaw[];
