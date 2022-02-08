import { createRouter, createWebHistory } from 'vue-router'

import TheAuth from '../views/TheAuth'
import TheRegister from '../views/TheRegister'
import MainView from '../views/MainView'
import TheNotFound from '../views/TheNotFound'

const routes = [
    { path: '/', redirect: '/auth' },
    {
        path: '/auth',
        name: 'auth',
        component: TheAuth,
    },
    {
        path: '/register',
        name: 'register',
        component: TheRegister,
    },
    {
        path: '/main',
        name: 'MainView',
        component: MainView,
    },
    {
        path: '/404',
        name: 'TheNotFound',
        component: TheNotFound,
    },
    {
        path: '/:notFound(.*)',
        redirect: '/404'
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router