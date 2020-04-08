import firebase from 'firebase'
import dataService from './dataService'
import router from '../plugins/router';
import store from '../store';

const authService = {
    registerUser(email, password, name) {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(res => {
                const uid = res.user.uid
                dataService.setName(name, uid);
                sessionStorage.setItem('name', name);
                sessionStorage.setItem('email', email);
                store.dispatch('setSnackbar', { text: `Welcome, ${name}!` });
                router.push('/')
            })
            .catch(err => {
                store.dispatch('setSnackbar', { color: 'error', text: `${err}` });
            })
    },
    loginUser(email, password) {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(res => {
                const uid = res.user.uid;
                dataService.getName(uid);
                sessionStorage.setItem('email', email);
                store.dispatch('setSnackbar', { text: 'Successfully logged in!' })
                router.push('/');
            })
            .catch(err => {
                store.dispatch('setSnackbar', { color: 'error', text: `${err}` });
            })
    },
    logoutUser() {
        firebase.auth().signOut()
            .then(() => {
                store.dispatch('setSnackbar', { text: 'Successfully logged out!' })
                sessionStorage.clear();
                router.push('/login')
            })
            .catch(err => {
                store.dispatch('setSnackbar', { color: 'error', text: `${err}` });
            })

    }
}
export default authService;