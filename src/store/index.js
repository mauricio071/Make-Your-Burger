import { createStore } from "vuex";

const baseUrl = process.env.VUE_APP_BASE_URL;

export default createStore({
  state: {
    paes: [],
    carnes: [],
    opcionaisLista: [],
    statusList: [],
    burgers: [],
  },
  mutations: {
    getIngredientes(state, data) {
      state.paes = data.paes;
      state.carnes = data.carnes;
      state.opcionaisLista = data.opcionais;
    },
    getStatusList(state, data) {
      state.statusList = data;
    },
    getBurgersList(state, data) {
      state.burgers = data;
    },
  },
  getters: {},
  actions: {
    async getDadosIngredientes({ commit }) {
      const data = await fetch(`${baseUrl}/ingredientes`).then((response) =>
        response.json()
      );

      commit("getIngredientes", data);
    },
    async getStatus({ commit }) {
      const data = await fetch(`${baseUrl}/status`).then((response) =>
        response.json()
      );

      commit("getStatusList", data);
    },
    async getBurgers({ commit }) {
      const data = await fetch(`${baseUrl}/burgers`).then((response) =>
        response.json()
      );
      commit("getBurgersList", data);
    },
  },
});
