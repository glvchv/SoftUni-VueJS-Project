import db from '../main'
import router from '../plugins/router';
import store from '../store'

const dataService = {
    setName(name, uid) {
        db.collection('users').doc().set({ user: name, id: uid })

    },
    getName(uid) {
        db.collection('users').get()
            .then(res => {
                res.forEach(doc => {
                    if (doc.data().id === uid) {
                        let user = doc.data().user;
                        sessionStorage.setItem('name', user);
                    }
                    
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
                        photoUrl: doc.data().photoUrl,
                        reservations: doc.data().reservations
                    }
                    events.push(ev);
                })
                return events;

            })
    },
    getSingleEventById(id) {
        return db.collection('events').doc(id).get()
            .then(res => {
                return res.data()
            })
            .catch(err => {
                console.error(err)
            })
    },
    postEvent(data) {
        db.collection('events').add(data)
            .then(() => {
                store.dispatch('setSnackbar', { text: 'Event successfully created!' });
                router.push('/');
            })
            .catch(err => {
                store.dispatch('setSnackbar', { color: 'error', text: `${err}` });
            })
    },
    updateEvent(data, id) {
        db.collection('events').doc(id).update(data)
            .then(() => {
                store.dispatch('setSnackbar', { text: 'Successfully reserved a ticket!' });
            })
            .catch(err => {
                store.dispatch('setSnackbar', { color: 'error', text: `${err}` })
            })
    },
    deleteEvent(id) {
        db.collection('events').doc(id).delete()
            .then(() => {
                store.dispatch('setSnackbar', { text: 'Successfully deleted an event!' });
                router.push('/')
            })
    }
}
export default dataService;