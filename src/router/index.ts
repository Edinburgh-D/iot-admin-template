import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/login.vue'),
        meta: {
            title: '登录',
            hideNavbar: true, // 可以在 meta 中添加一些自定义属性，用于控制布局等
        },
    },
    {
        path: '/',
        name: 'Home',
        component: () => import('@/views/Home.vue'),
        meta: {
            title: '首页',
        },
    },
    {
        path: '/about',
        name: 'About',
        component: () => import('@/views/about.vue'),
        meta: {
            title: '关于',
        },
    },
    // 可以添加更多的路由，例如嵌套路由、动态路由等
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

// 全局前置守卫 (可选)
router.beforeEach((to, from, next) => {
    console.log(to)
    document.title = (to.meta.title ? to.meta.title + ' - ' : '') + '管理后台';

    // 简单的登录验证示例：如果用户未登录，并且访问的不是登录页，则跳转到登录页
    const loggedIn = localStorage.getItem('isLoggedIn'); // 假设你用 localStorage 存储登录状态
    console.log(loggedIn, to.name);


    if (!loggedIn && to.name !== 'Login') {
        next({ name: 'Login' });
    } else if (loggedIn && to.name === 'Login') {
        next({ name: 'Home' }); // 如果已登录还访问登录页，则跳转到首页
    } else {
        next();
    }
})

export default router;