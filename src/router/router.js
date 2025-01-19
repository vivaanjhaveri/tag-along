import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomePage.vue';
import LoginPage from '@/views/LoginPage.vue';
import SignupPage from '@/views/SignupPage.vue';
import DashboardPage from '@/views/DashboardPage.vue';
import store from '@/store/store';
import { IS_USER_AUTHENTICATE_GETTER } from '@/store/storeconstants';


const routes = [
    { path: '/', component: HomeView },
    { path: '/login', component: LoginPage, meta: { auth: false } },
    { path: '/signup', component: SignupPage, meta: { auth: false } },
    { path: '/dashboard', component: DashboardPage, meta: { auth: true } },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = store.getters[`auth/${IS_USER_AUTHENTICATE_GETTER}`];
  if (to.meta.auth && !isAuthenticated) {
    next('/login');
  } else if (!to.meta.auth && isAuthenticated && (to.path === '/login' || to.path === '/signup')) {
    next('/dashboard');
  } else {
    next();
  }
});

export default router;