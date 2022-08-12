import { RouteRecordRaw } from 'vue-router';

import DoctorPacientExamResult from '@/pages/common/ExamResult.vue';
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
  {
    path: 'pacient/:id',
    name: 'doctor.pacient.exam.result',
    component: DoctorPacientExamResult,
  },
] as RouteRecordRaw[];
