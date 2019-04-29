import Vue from 'vue'
import Vuex from 'vuex'
import userModule from './modules/user.js'
import typesModule from './modules/type'
import pipelineModule from './modules/pipelines'
import requestModule from './modules/requests'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user: userModule,
    type: typesModule,
    pipelines: pipelineModule,
    requests: requestModule
  }
})
