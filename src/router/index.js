import { createRouter, createWebHistory } from 'vue-router'
const routes = [
  {
    path: '/',
    redirect: '/usuario/listar'
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
