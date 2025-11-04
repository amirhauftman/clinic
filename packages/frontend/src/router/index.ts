import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/animal/:id',
            name: 'animalDetail',
            component: () => import('@/views/AnimalDetail.vue'),
            props: true
        }
    ]
});

export default router;