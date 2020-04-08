import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/components/Home';
import Login from '@/components/user/Login';
import Register from '@/components/user/Register';
import Create from '@/components/Create';
import NotFound from '@/components/NotFound';
import EventDetails from '@/components/EventDetails';
import MyEvents from '@/components/user/MyEvents';
import firebase from 'firebase';

const routes = [
    {path: '/', component: Home},
    {path: '/login', component: Login, meta: {requiresGuest: true}},
    {path: '/register', component: Register, meta: {requiresGuest: true}},
    {path: '/create', component: Create, meta: {requiresAuth: true}},
    {path: '/details/:id', name: 'details', component: EventDetails, meta: {requiresAuth: true}},
    {path: '/myevents', component: MyEvents, meta: {requiresAuth: true}},
    {path: '*', component: NotFound}
]

Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',
    routes
});

router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    if (requiresAuth) {
         firebase.auth().onAuthStateChanged(u => u ? next() : next('/login'));
    } else {
        next();
    }
    const requiresGuest = to.matched.some(record => record.meta.requiresGuest);
    if(requiresGuest) {
        firebase.auth().onAuthStateChanged(u => u ? next('/') : next());
    } else {
        next();
    }
})

export default router;