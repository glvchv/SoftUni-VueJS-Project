import db from '../main'

const dataService = {
    setName(name, uid) {
        db.collection('users').doc().set({user: name, id: uid})

    },
    getName(uid) {
        console.log(uid);
        db.collection('users').get()
            .then(res=> {
                console.log(res);
                res.forEach(doc => {
                    let user = doc.data().user
                    sessionStorage.setItem('name', user);
                })
            })
        
    }
}
export default dataService;