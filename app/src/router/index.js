import { useUserStore } from '@/stores/user'
import { createRouter, createWebHistory } from 'vue-router'
import ProductList from '../views/ProductList.vue'
import CartView from '../views/CartView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import OrdersView from '../views/OrdersView.vue'
import VerificationNotice from '@/views/VerificationNotice.vue'
import NotFound from '@/views/NotFound.vue'
import { emailVerificationGuard } from './guards'
import { h } from 'vue' // TODO: Refactor into function component (create function_components.js for small components, that don't require .vue components)

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: ProductList
    },
    {
      path: '/categories/:category_name',
      name: 'product-list',
      component: ProductList
    },
    {
      path: '/cart',
      name: 'cart',
      component: CartView
    },
    {
      path: '/orders',
      name: 'orders',
      component: OrdersView,
      meta: { auth: true, verification: true }
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/verification_notice',
      name: 'verification-notice',
      component: VerificationNotice, // TODO: Refactor into function component (create function_components.js for small components, that don't require .vue components)
      meta: { auth: true }
    },
    {
      path: '/email/verify/:id/:hash',
      name: 'verification-handler',
      beforeEnter: emailVerificationGuard
    },
    {
      path: '/not-found',
      name: 'not-found',
      component: NotFound
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'catch-all',
      redirect: 'not-found'
    }
  ]
})

router.beforeEach((to, from) => {
  const storeUser = useUserStore()

  if(to.meta.auth && !storeUser.isAuthenticated) {
    return { name: 'login' }
  }

  if(to.meta.verification && storeUser.isAuthenticated && !storeUser.isVerified) {
    return { name: 'verification-notice' }
  }

  if(storeUser.isAuthenticated && to.name == 'login') {
    return { name: 'home' }
  }
})

export default router
