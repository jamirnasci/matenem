import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import HomePage from '../views/HomePage.vue'
import SimuladoPage from '@/views/SimuladoPage.vue';
import ResultadoPage from '@/views/ResultadoPage.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/simulado',
    name: 'Simulado',
    component: SimuladoPage
  },
  {
    path:'/resultado/:acertos/:erros/:totalQuestoes',
    name:'Resultado',
    component: ResultadoPage
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
