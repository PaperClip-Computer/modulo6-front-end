import Maska from 'maska';
import { createApp } from 'vue';
import InlineSvg from 'vue-inline-svg';

import router from './routes';

import App from './App.vue';
import './index.css';

createApp(App).use(router).use(Maska).component('Svg', InlineSvg).mount('#app');
