import { RouteRecordRaw } from 'vue-router';

import userExamRoutes from './exam';

import UserExamLayout from '@/layouts/Base.vue';
import UserGraph from '@/pages/common/Graph.vue';
import UserDoctor from '@/pages/user/Doctor.vue';
import UserHome from '@/pages/user/Home.vue';
import { UserRouteMeta } from '../../types/user';

export default [
  {
    path: '',
    component: UserHome,
    name: 'user.home',
  },
  {
    path: 'search',
    component: UserHome,
    name: 'user.search',
    meta: {
      hasSearch: true,
    } as UserRouteMeta,
  },
  {
    path: 'history',
    component: UserHome,
    name: 'user.history',
    meta: {
      hasSearch: true,
      done: true,
    } as UserRouteMeta,
  },
  {
    path: 'my-doctor',
    component: UserDoctor,
    name: 'user.doctor',
  },
  {
    path: 'graph',
    component: UserGraph,
    name: 'user.graph',
  },
  {
    path: 'exam/:examId',
    component: UserExamLayout,
    children: [...userExamRoutes],
  },
] as RouteRecordRaw[];
