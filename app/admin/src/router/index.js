import { createRouter, createWebHistory } from 'vue-router'
import useUserStore from '@/stores/user'
import LoginView from '@/views/LoginView.vue';
import HomeView from '@/views/HomeView.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
            meta: { requiresAuth: true }
        },
        {
            path: '/login',
            name: 'login',
            component: LoginView
        }
    ]
});

router.beforeEach((to, from) => {
    const user = useUserStore();

    if(to.meta.requiresAuth && !user.isAuth) {
        return { name: 'login' }
    }
})

export default router;