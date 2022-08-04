import { RouteRecordRaw } from 'vue-router';

import DoctorPacientInfo from '@/pages/doctor/pacient/ExamInfo.vue';
import DoctorPacientExamList from '@/pages/doctor/pacient/ExamList.vue';
import DoctorPacientExamGraph from '@/pages/doctor/pacient/Graph.vue';

export default [
  {
    path: 'exam/:examId/',
    name: 'doctor.pacient.info',
    component: DoctorPacientInfo,
  },
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
