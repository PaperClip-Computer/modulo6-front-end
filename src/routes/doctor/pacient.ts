import { RouteRecordRaw } from 'vue-router';

import DoctorPacientExamGraph from '@/pages/common/Graph.vue';
import DoctorPacientExamList from '@/pages/doctor/pacient/PacientExamList.vue';
import DoctorPacientInfo from '@/pages/doctor/pacient/PacientInfo.vue';

export default [
  {
    path: '',
    name: 'doctor.pacient.info',
    component: DoctorPacientInfo,
  },
  // {
  //   path: 'exam/:examId',
  //   name: 'doctor.pacient.exam.info',
  //   component: Common-DoctorPacientInfo,
  // },
  {
    path: 'exam-list',
    name: 'doctor.pacient.info.exam.list',
    component: DoctorPacientExamList,
  },
  {
    path: 'graph',
    name: 'doctor.pacient.info.graph',
    component: DoctorPacientExamGraph,
  },
] as RouteRecordRaw[];
