import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/components/Home';
import Login from '@/components/user/Login';
import Register from '@/components/user/Register';
import Create from '@/components/Create';

const routes = [
    {path: '/', component: Home},
    {path: '/login', component: Login},
    {path: '/register', component: Register},
    {path: '/create', component: Create}
]

Vue.use(VueRouter);

export default new VueRouter({
    mode: 'history',
    routes
});

// router.beforeEach((to, from, next) => {
//     const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
//     if (requiresAuth) {
//         firebase.auth().onAuthStateChanged(u => u ? next() : next('/login'));
//     } else {
//         next();
//     }
// })