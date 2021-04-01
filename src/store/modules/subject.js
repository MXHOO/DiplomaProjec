const state = {
  homeworkList: [],
  subjectList: []
}

const getters = {
  getSubjectList: (state) => {
    return state.subjectList
  }
}

const mutations = {
  setSubjectList: (state, payload) => {
    const subjectId = payload.problem_id
    const index = state.homeworkList.indexOf(item => item.problem_id === subjectId)
    if (index >= 0) {
      state.homeworkList.splice(index, 1)
    }
    state.homeworkList.push(payload)
  },
  deleteSubject: (state, payload) => {

  }
}

export {
  state,
  getters,
  mutations
}
