import ProjectAPI from '@/api/projects'
import UsersAPI from '@/api/users'
import FormsAPI from '@/api/forms'
import LabelsAPI from '@/api/labels'
import PipelinesAPI from '@/api/pipelines'
import RequestsAPI from '@/api/requests'

import snackbar from '@/helpers/snackbar'

const API = {
  projects: () => new ProjectAPI(),
  users: () => new UsersAPI(),
  forms: (projectId) => new FormsAPI(projectId),
  labels: (projectId) => new LabelsAPI(projectId),
  pipelines: (projectId) => new PipelinesAPI(projectId),
  requests: (projectId) => new RequestsAPI(projectId)
}

const actions = (resource) => ({
  async fetch (context) {
    try {
      const result = await API[resource](context.rootState.projects.activeId).fetch()
      context.commit('SET', result)
    } catch (error) {
      snackbar.showSnackbar(error.message, 'error')
    }
  },
  async fetchById (context, id) {
    try {
      const result = await API[resource](context.rootState.projects.activeId).fetchById(id)
      context.commit('ADD', result)
    } catch (error) {
      snackbar.showSnackbar(error.message, 'error')
    }
  },
  async create (context, payload) {
    try {
      const result = await API[resource](context.rootState.projects.activeId).create(payload)
      context.commit('ADD', result)
    } catch (error) {
      snackbar.showSnackbar(error.message, 'error')
    }
  },
  async put (context, { id, payload }) {
    try {
      const result = await API[resource](context.rootState.projects.activeId).put(id, payload)
      context.commit('ADD', result)
    } catch (error) {
      snackbar.showSnackbar(error.message, 'error')
    }
  },
  async delete (context, id) {
    try {
      await API[resource](context.rootState.projects.activeId).delete(id)
      context.commit('REMOVE', id)
    } catch (error) {
      snackbar.showSnackbar(error.message, 'error')
    }
  }
})

export default actions
