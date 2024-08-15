import { createStore } from 'vuex'

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
      const data = await fetch('http://localhost:3000/ingredientes')
        .then((response) => response.json())

      commit('getIngredientes', data)
    },
    async getStatus({ commit }) {
      const data = await fetch('http://localhost:3000/status')
        .then((response) => response.json())

      commit('getStatusList', data)
    },
    async getBurguers({ commit }) {
      const data = await fetch('http://localhost:3000/burgers')
        .then((response) => response.json())
      commit('getBurguersList', data)
    }
  },

  modules: {
  }
})
