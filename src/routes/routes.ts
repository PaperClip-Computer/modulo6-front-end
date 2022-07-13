import { RouteRecordRaw } from 'vue-router';

import userRoutes from './user';
import doctorRoutes from './doctor';

import BaseLayout from '@/layouts/Base.vue';

export default [
  {
    path: '/user/:id',
    component: BaseLayout,
    children: [...userRoutes],
  },
  {
    path: '/doctor/:id',
    component: BaseLayout,
    children: [...doctorRoutes],
  },
] as RouteRecordRaw[];
