import { RouteRecordRaw } from 'vue-router';

import DoctorPacientExamList from '@/pages/doctor/pacient/ExamList.vue';
import DoctorPacientExam from '@/pages/doctor/pacient/ExamInfo.vue';
import DoctorPacientExamGraph from '@/pages/doctor/pacient/Graph.vue';

export default [
  {
    path: 'exam-list',
    name: 'doctor.pacient.info.exam.list',
    component: DoctorPacientExamList,
  },
  {
    path: 'exam/:examId/',
    name: 'doctor.pacient.info.exam.info',
    component: DoctorPacientExam,
  },
  {
    path: 'graph',
    name: 'doctor.pacient.info.graph',
    component: DoctorPacientExamGraph,
  },
] as RouteRecordRaw[];
