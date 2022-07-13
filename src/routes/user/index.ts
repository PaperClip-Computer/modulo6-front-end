import { RouteRecordRaw } from 'vue-router';

import userExamRoutes from './exam';

import UserExamLayout from '@/layouts/Base.vue';
import UserDoctor from '@/pages/user/Doctor.vue';
import UserGraph from '@/pages/user/Graph.vue';
import UserHistory from '@/pages/user/History.vue';
import UserHome from '@/pages/user/Home.vue';
import UserSearch from '@/pages/user/Search.vue';

export default [
  {
    path: '/',
    component: UserHome,
    name: 'user.home',
  },
  {
    path: 'search',
    component: UserSearch,
    name: 'user.search',
  },
  {
    path: 'history',
    component: UserHistory,
    name: 'user.history',
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
