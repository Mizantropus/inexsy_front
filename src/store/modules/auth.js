const state = () => ({
  token: undefined,
})

const getters = {
  token(state) {
    return state.token
  }
}

const actions = {
  setToken ({ commit, state }, token) {
    commit('update', {
      key: 'token',
      value: token
    })
  }
}

const mutations = {
  update (state, { key, value }) {
    state[key] = value
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}