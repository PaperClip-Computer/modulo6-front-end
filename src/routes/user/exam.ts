import { RouteRecordRaw } from 'vue-router';

import UserExamInfo from '@/pages/user/exam/Info.vue';
import UserExamRegister from '@/pages/user/exam/Register.vue';
import UserExamResult from '@/pages/user/exam/Result.vue';

export default [
  {
    path: '',
    component: UserExamInfo,
    name: 'user.exam.info',
  },
  {
    path: 'register',
    component: UserExamRegister,
    name: 'user.exam.register',
  },
  {
    path: 'result',
    component: UserExamResult,
    name: 'user.exam.result',
  },
] as RouteRecordRaw[];
