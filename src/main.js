import Vue from 'vue'
import App from './App.vue'
import vuetify from '@/plugins/vuetify'
import router from '@/plugins/router'
import firebase from 'firebase/app'
import store from "./store";

Vue.config.productionTip = false
const firebaseConfig = {
  apiKey: "AIzaSyCtE8Ks3a8SGMN4sCLfXSYdoqprfPro_18",
  authDomain: "eventure-36c34.firebaseapp.com",
  databaseURL: "https://eventure-36c34.firebaseio.com",
  projectId: "eventure-36c34",
  storageBucket: "eventure-36c34.appspot.com",
  messagingSenderId: "751954914621",
  appId: "1:751954914621:web:e968f7a0a76ab4f8f8a954"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export default firebase.firestore();

new Vue({
  render: h => h(App),
  vuetify,
  router,
  store
}).$mount('#app')
