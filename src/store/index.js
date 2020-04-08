import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        snackbar: {}
    },
    mutations: {
        SET_SNACKBAR(state, snackbar) {
            state.snackbar = snackbar;
        },
    },
    actions: {
        setSnackbar({ commit }, snackbar) {
            snackbar.showing = true;
            snackbar.color = snackbar.color || 'success';
            commit('SET_SNACKBAR', snackbar);
        },
    },
    modules: {},
});