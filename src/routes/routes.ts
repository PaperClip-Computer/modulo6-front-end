import { RouteRecordRaw } from 'vue-router';

import doctorRoutes from './doctor';
import userRoutes from './user';

import BaseLayout from '@/layouts/Base.vue';

export default [
  {
    path: '/user/:id',
    component: BaseLayout,
    children: [...userRoutes],
  },
  {
    path: '/doctor/:doctorId',
    component: BaseLayout,
    children: [...doctorRoutes],
  },
] as RouteRecordRaw[];
