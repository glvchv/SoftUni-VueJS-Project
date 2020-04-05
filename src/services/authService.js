import firebase from 'firebase'
import dataService from './dataService'

const authService = {
    registerUser(email, password, name, router) {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(res => {
                console.log(res.user.uid);
                const uid = res.user.uid
                dataService.setName(name, uid);
                router.push('/login')
            })
            .catch(err => {
                alert(err.message)
            })
    },
    loginUser(email, password,router) {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(res => {
                const uid = res.user.uid;
                console.log(uid);
                dataService.getName(uid);
                sessionStorage.setItem('name', name);
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
    }
}
export default authService;