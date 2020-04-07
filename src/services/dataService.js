import db from '../main'
import router from '../plugins/router';

const dataService = {
    setName(name, uid) {
        db.collection('users').doc().set({ user: name, id: uid })

    },
    getName(uid) {
        console.log(uid);
        db.collection('users').get()
            .then(res => {
                res.forEach(doc => {
                    let user = doc.data().user
                    sessionStorage.setItem('name', user);
                })
            })

    },
    async getAllEvents() {
        return await db.collection('events')
            .get()
            .then(res => {
                let events = [];
                res.forEach(doc => {
                    let ev = {
                        id: doc.id,
                        creatorName: doc.data().creatorName,
                        tickets: doc.data().tickets,
                        ticketPrice: doc.data().ticketPrice,
                        date: doc.data().date,
                        time: doc.data().time,
                        category: doc.data().category,
                        name: doc.data().name,
                        venue: doc.data().venue,
                        city: doc.data().city,
                        description: doc.data().description,
                        creatorEmail: doc.data().creatorEmail,
                        photoUrl: doc.data().photoUrl
                    }
                    events.push(ev);
                })
                return events;

            })
    },
    postEvent(data) {
        db.collection('events').add(data)
            .then(() => {
                router.push('/');
            })
    }
}
export default dataService;