import { createRouter, createWebHistory } from 'vue-router'

import LoginPage from '@/views/login/login-page.vue'
import HomePage from '@/views/home/home-page.vue'
import ProfilePage from '@/views/profile/profile-page.vue'
import RegisterPage from '@/views/register/register-pate.vue'
import TemplatePage from '@/views/template/template-page.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', name: 'Login', component: LoginPage},
    { path: '/home', name: 'Home', component: HomePage },
    { path: '/profile', name: 'Profile', component: ProfilePage },
    { path: '/register', name: 'Register', component: RegisterPage },
    { path: '/template', name: 'Template', component: TemplatePage },
  ],
})

export default router
