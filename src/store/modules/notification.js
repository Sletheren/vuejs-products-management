const state = () => ({
  notificationSettings: {
    type: '',
    message: '',
    show: false
  }
})

const mutations = {
  showNotification: (state, { type, message }) => {
    state.notificationSettings.show = true
    state.notificationSettings.type = type
    state.notificationSettings.message = message
  },
  hideNotification: state => {
    state.notificationSettings.show = false
    state.notificationSettings.type = ''
    state.notificationSettings.message = ''
  }
}

const actions = {
  showSuccessNotification: ({ dispatch }, message) => {
    dispatch('showNotification', {
      type: 'success',
      message
    })
  },
  showErrorNotification: ({ dispatch }, message) => {
    dispatch('showNotification', {
      type: 'error',
      message
    })
  },
  showNotification: ({ commit, dispatch }, payload) => {
    commit('showNotification', payload)
    setTimeout(() => {
      dispatch('hideNotification')
    }, 4000)
  },
  hideNotification: ({ commit }) => {
    commit('hideNotification')
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
