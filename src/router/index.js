import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/usuario/crear',
    name: 'CreateComponent',
    component: () => import('../components/user/CreateComponent.vue')
  },
  {
    path: '/usuario/editar/:id',
    name: 'EditComponent',
    component: () => import('../components/user/EditComponent.vue')
  },
  {
    path: '/usuario/listar',
    name: 'ListComponent',
    component: () => import('../components/user/ListComponent.vue')
  }
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
