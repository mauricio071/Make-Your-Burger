import { createStore } from 'vuex'

const baseUrl = process.env.VUE_APP_BASE_URL;

export default createStore({
  state: {
    paes: [],
    carnes: [],
    opcionaisLista: [],
    statusList: [],
    burguers: []
  },
  mutations: {
    getIngredientes(state, data) {
      state.paes = data.paes
      state.carnes = data.carnes
      state.opcionaisLista = data.opcionais
    },
    getStatusList(state, data) {
      state.statusList = data
    },
    getBurguersList(state, data) {
      state.burguers = data
    }
  },
  getters: {
  },
  actions: {
    async getDadosIngredientes({ commit }) {

      const data = await fetch(`${baseUrl}/ingredientes`)
        .then((response) => response.json())

      commit('getIngredientes', data)
    },
    async getStatus({ commit }) {
      const data = await fetch(`${baseUrl}/status`)
        .then((response) => response.json())

      commit('getStatusList', data)
    },
    async getBurguers({ commit }) {
      const data = await fetch(`${baseUrl}/burguers`)
        .then((response) => response.json())
      commit('getBurguersList', data)
    }
  },
})
