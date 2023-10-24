import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import PacienteHomeView from '../views/PacienteHomeView.vue'
import PacienteNuevoTurnoView from '../views/PacienteNuevoTurnoView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/homePaciente',
      name: 'homePaciente',
      component: PacienteHomeView
    },
    {
      path: '/pacienteNuevoTurno',
      name: 'pacienteNuevoTurno',
      component: PacienteNuevoTurnoView
    }
  ]
})

export default router
