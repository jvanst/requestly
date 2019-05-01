import Vue from 'vue'
import Vuex from 'vuex'
import userModule from './modules/user'
import formsModule from './modules/forms'
import pipelineModule from './modules/pipelines'
import requestModule from './modules/requests'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user: userModule,
    forms: formsModule,
    pipelines: pipelineModule,
    requests: requestModule
  }
})
