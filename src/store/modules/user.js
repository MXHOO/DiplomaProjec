// initial state
const state = {
  userInfo: null
}

const getters = {
  getUserInfo (state) {
    return state.userInfo
  }
}

// mutations
const mutations = {
  setUserInfo: (state, userInfo) => {
    state.userInfo = userInfo
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  getters
}
