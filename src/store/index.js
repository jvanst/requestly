import Vue from 'vue'
import Vuex from 'vuex'
import uiModule from './modules/ui'
import userModule from './modules/user'
import formsModule from './modules/forms'
import pipelineModule from './modules/pipelines'
import requestModule from './modules/requests'
import labelsModule from './modules/labels'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    ui: uiModule,
    user: userModule,
    forms: formsModule,
    pipelines: pipelineModule,
    requests: requestModule,
    labels: labelsModule
  }
})
