import { RouteRecordRaw } from 'vue-router';

import DoctorPacientExamResult from '@/pages/common/ExamResult.vue';
import DoctorPacientExamGraph from '@/pages/common/Graph.vue';
import DoctorOrder from '@/pages/doctor/exam/Order.vue';
import DoctorPacientExamList from '@/pages/doctor/pacient/PacientExamList.vue';
import DoctorPacientInfo from '@/pages/doctor/pacient/PacientInfo.vue';

export default [
  {
    path: '',
    name: 'doctor.pacient.info',
    component: DoctorPacientInfo,
  },
  {
    path: 'exam/:examId',
    name: 'doctor.pacient.exam.result',
    component: DoctorPacientExamResult,
  },
  {
    path: 'exam-list',
    name: 'doctor.pacient.info.exam.list',
    component: DoctorPacientExamList,
  },
  {
    path: 'order',
    name: 'doctor.pacient.info.order',
    component: DoctorOrder,
  },
  {
    path: 'graph',
    name: 'doctor.pacient.info.graph',
    component: DoctorPacientExamGraph,
  },
] as RouteRecordRaw[];
