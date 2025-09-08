import { useUserStore } from '@/stores/user'
import { createRouter, createWebHistory } from 'vue-router'
import ProductList from '../views/ProductList.vue'
import CartView from '../views/CartView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import OrdersView from '../views/OrdersView.vue'

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
      meta: { authRequired: true }
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
    }
  ]
})

router.beforeEach((to, from) => {
  const storeUser = useUserStore()

  if (
    (!storeUser.isAuthenticated && to.meta.authRequired) ||
    (storeUser.isAuthenticated && to.name == 'login')
  ) {
    return { name: 'home' }
  }
})

export default router
