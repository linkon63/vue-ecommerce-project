import AppLayout from '@/layout/AppLayout.vue';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/admin',
            component: AppLayout,
            children: [
                // working on the route
                {
                    path: '/admin/dashboard',
                    name: 'dashboard',
                    component: () => import('@/views/Dashboard.vue')
                },
                //
                {
                    path: '/uikit/admin/products',
                    name: 'products',
                    component: () => import('@/views/uikit/admin/Products.vue')
                },
                {
                    path: '/uikit/admin/orders',
                    name: 'orders',
                    component: () => import('@/views/uikit/admin/Orders.vue')
                },
                {
                    path: '/uikit/admin/reviews',
                    name: 'reviews',
                    component: () => import('@/views/uikit/admin/Reviews.vue')
                }
            ]
        },
        {
            path: '/',
            name: 'landing',
            component: () => import('@/views/pages/Landing.vue')
        },
        {
            path: '/all-products',
            name: 'allProduct',
            component: () => import('@/views/pages/AllProduct.vue')
        },
        {
            path: '/all-orders',
            name: 'allOrders',
            component: () => import('@/views/pages/AllOrder.vue')
        },
        {
            path: '/product/details',
            name: 'productDetails',
            component: () => import('@/views/pages/ProductDetails.vue')
        },
        {
            path: '/add-to-cart',
            name: 'addToCart',
            component: () => import('@/views/pages/AddToCart.vue')
        },
        {
            path: '/pages/notfound',
            name: 'notfound',
            component: () => import('@/views/pages/NotFound.vue')
        },
        // for the admin login and Registration
        {
            path: '/auth/login',
            name: 'login',
            component: () => import('@/views/pages/auth/Login.vue')
        },
        {
            path: '/auth/registration',
            name: 'registration',
            component: () => import('@/views/pages/auth/Registration.vue')
        },
        // for the admin user and Registration
        {
            path: '/user/login',
            name: 'userLogin',
            component: () => import('@/views/pages/user/Login.vue')
        },
        {
            path: '/user/registration',
            name: 'userRegistration',
            component: () => import('@/views/pages/user/Registration.vue')
        },
        {
            path: '/auth/access',
            name: 'accessDenied',
            component: () => import('@/views/pages/auth/Access.vue')
        },
        {
            path: '/auth/error',
            name: 'error',
            component: () => import('@/views/pages/auth/Error.vue')
        }
    ]
});

export default router;
