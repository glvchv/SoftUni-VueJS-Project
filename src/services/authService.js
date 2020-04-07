import firebase from 'firebase'
import dataService from './dataService'
import router from '../plugins/router';

const authService = {
    registerUser(email, password, name) {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(res => {
                console.log(res.user.uid);
                const uid = res.user.uid
                dataService.setName(name, uid);
                sessionStorage.setItem('name', name);
                sessionStorage.setItem('email', email);
                router.push('/')
            })
            .catch(err => {
                alert(err.message)
            })
    },
    loginUser(email, password) {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(res => {
                const uid = res.user.uid;
                console.log(uid);
                dataService.getName(uid);
                sessionStorage.setItem('email', email);
                router.push('/');
            })
            .catch(err => {
                alert(err.message)
            })
    },
    logoutUser() {
        firebase.auth().signOut();
        sessionStorage.clear();
        router.push('/')
    }
}
export default authService;