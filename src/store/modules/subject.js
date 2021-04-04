const state = {
  subjectList: []
}

const getters = {
  getSubjectList: (state) => {
    return state.subjectList
  },
  getSubjectIds: (state) => {
    return state.subjectList.map(item => item.problem_id) || []
  }
}

const mutations = {
  setSubjectList: (state, payload) => {
    if (state.subjectList.length === 0) {
      state.subjectList = payload
    } else {
      const subjectId = payload.problem_id
      const result = state.subjectList.indexOf(item => item.problem_id === subjectId)
      if (result >= 0) {
        state.subjectList.splice(result, 1)
      }
      state.subjectList.push(payload)
    }
  },
  // 移除课程
  deleteSubject: (state, payload) => {
    const subjectId = payload.problem_id
    const result = state.subjectList.indexOf(item => item.problem_id === subjectId)
    if (result >= 0) {
      state.subjectList.splice(result, 1)
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations
}
