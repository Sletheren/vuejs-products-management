import axios from 'axios'
import config from '../../config'

const state = () => ({
  products: [],
  product: {},
  error: []
})

const mutations = {
  getProduct: (state, data) => {
    state.error = ''
    state.product = data
  },
  initProducts: (state, data) => {
    state.error = ''
    state.products = data
  },
  createProduct: (state, data) => {
    state.error = ''
    state.products.push(data)
  },
  updateProduct: (state, data) => {
    state.error = ''
    state.products = state.products.map(product => {
      return product.id === data.id ? data : product
    })
  },
  deleteProduct: (state, id) => {
    state.error = ''
    state.products = state.products.filter(product => product.id !== id)
  }
}

const actions = {
  initProducts: async ({ state, commit, dispatch }) => {
    try {
      const response = await axios.get(`${config.API_URL}/products`)
      commit('initProducts', response.data)
      dispatch('notification/showSuccessNotification', 'Products loaded', {
        root: true
      })
    } catch (error) {
      state.error = error.response.statusText
      dispatch('notification/showErrorNotification', 'Error loading products', {
        root: true
      })
    }
  },
  getProduct: async ({ state, commit, dispatch }, id) => {
    try {
      const response = await axios.get(`${config.API_URL}/products/${id}`)
      commit('getProduct', response.data)
    } catch (error) {
      state.error = error.response.statusText
      dispatch('notification/showErrorNotification', 'Cannot find product', {
        root: true
      })
    }
  },
  createProduct: async ({ state, commit, dispatch }, data) => {
    try {
      await axios.post(`${config.API_URL}/products`, data)
      commit('createProduct', data)
      dispatch('notification/showSuccessNotification', 'Product created!', {
        root: true
      })
    } catch (error) {
      state.error = 'error.response.statusText'
      dispatch(
        'notification/showErrorNotification',
        'A product has this ID already.',
        {
          root: true
        }
      )
    }
  },
  updateProduct: async ({ state, commit, dispatch }, data) => {
    try {
      const response = await axios.patch(
        `${config.API_URL}/products/${data.id}`,
        data
      )
      commit('updateProduct', response.data)
      dispatch('notification/showSuccessNotification', 'Product updated!', {
        root: true
      })
    } catch (error) {
      state.error = error.response.statusText
      dispatch(
        'notification/showErrorNotification',
        'Cannot updating the product',
        {
          root: true
        }
      )
    }
  },
  deleteProduct: async ({ state, commit, dispatch }, id) => {
    try {
      await axios.delete(`${config.API_URL}/products/${id}`)
      commit('deleteProduct', id)
      dispatch('notification/showSuccessNotification', 'Product deleted!', {
        root: true
      })
    } catch (error) {
      state.error = error.response.statusText
      dispatch(
        'notification/showErrorNotification',
        'Cannot deleting the product',
        {
          root: true
        }
      )
    }
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
