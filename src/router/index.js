import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import PacienteHomeView from '../views/PacienteHomeView.vue'
import PacienteNuevoTurnoView from '../views/PacienteNuevoTurnoView.vue'
import RegisterView from '../views/RegisterView.vue'
import OlvideContrasenaView from '../views/OlvideContrasenaView.vue'
import ListadoTurnosView from '../views/ListadoTurnosView.vue'
import MedicoHomeView from '../views/MedicoHomeView.vue'
import AgendaMedicoView from '../views/AgendaMedicoView.vue'
import MedicoModificarInfoView from '../views/MedicoModificarInfoView.vue'

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
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/olvideContrasena',
      name: 'olvideContrasena',
      component: OlvideContrasenaView
    },
    {
      path: '/listadoTurnos',
      name: "listadoTurnos",
      component: ListadoTurnosView
    },
    {
      path: '/homeMedico',
      name: "homeMedico",
      component: MedicoHomeView
    },
    {
      path: '/agendaMedico',
      name: 'agendaMedico',
      component: AgendaMedicoView
    },
    {
      path: '/modificarInfoMedico',
      name: 'modificarInfoMedico',
      component: MedicoModificarInfoView
    }
  ]
})

export default router
