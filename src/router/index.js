import { createRouter, createWebHistory } from 'vue-router'
//import HomeView from '../views/HomeView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/auth',
      component:() => import("@/views/auth/AuthBase.vue"),
      children: [
        { path: 'login',
          component:() => import("@/views/auth/LoginView.vue"),
        },
      ]
    },
    {
      path: '/',
      name: 'home',
      component: ()=> import('@/views/IndexView.vue'),
      meta: {requiresAuth: true}
    },
   {
      path: '/index',
      name: 'ln',
      component: ()=> import('@/views/HomeView.vue')
    },
    {
      path: '/teachers-assistant',
      name: 'lp',
      component: ()=> import('@/views/LPView.vue')
    }
  ]
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('auth_token');
  if (to.meta.requiresAuth && !token) {
    next('/auth/login');
  } else {
    next();
  }
});
export default router