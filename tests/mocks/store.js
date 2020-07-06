import Vuex from 'vuex'

import { modules } from '../../src/store'

export const mockedModules = Object.keys(modules).reduce(
  (modulesAcc, moduleName) => {
    const moduleObject = modules[moduleName]
    const result = {}
    result.namespaced = moduleObject.namespaced || false
    // Constructing the
    result.state = moduleObject.state || {}
    // Constructing mutations
    result.mutations = moduleObject.mutations
      ? Object.keys(moduleObject.mutations).reduce(
          (mutationsAcc, mutationName) => {
            mutationsAcc[mutationName] = jest.fn()
            return mutationsAcc
          },
          {}
        )
      : {}
    // Constructing actions
    result.actions = moduleObject.actions
      ? Object.keys(moduleObject.actions).reduce((actionsAcc, actionName) => {
          actionsAcc[actionName] = jest.fn()
          return actionsAcc
        }, {})
      : {}
    // Returning the modulee
    modulesAcc[moduleName] = result
    return modulesAcc
  },
  {}
)

export const mockedStore = new Vuex.Store({
  modules: mockedModules
})
