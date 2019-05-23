import ProjectAPI from '@/api/projects'
import UsersAPI from '@/api/users'
import PermissionsAPI from '@/api/permissions'
import InvitesAPI from '@/api/invites'
import FormsAPI from '@/api/forms'
import LabelsAPI from '@/api/labels'
import PipelinesAPI from '@/api/pipelines'
import RequestsAPI from '@/api/requests'
import TimelineAPI from '@/api/timeline'

import snackbar from '@/helpers/snackbar'

const API = {
  projects: () => new ProjectAPI(),
  users: () => new UsersAPI(),
  permissions: (context) => new PermissionsAPI(context.rootState.projects.activeId),
  invites: (context) => new InvitesAPI(context.rootState.projects.activeId),
  forms: (context) => new FormsAPI(context.rootState.projects.activeId),
  labels: (context) => new LabelsAPI(context.rootState.projects.activeId),
  pipelines: (context) => new PipelinesAPI(context.rootState.projects.activeId),
  requests: (context) => new RequestsAPI(context.rootState.projects.activeId),
  timeline: (context) => new TimelineAPI(context.rootState.projects.activeId, context.rootState.requests.activeId)
}

const actions = (resource) => ({
  async fetch (context) {
    try {
      const result = await API[resource](context).fetch()
      context.commit('SET', result)
    } catch (error) {
      snackbar.showSnackbar(error.message, 'error')
    }
  },
  async fetchById (context, id) {
    try {
      const result = await API[resource](context).fetchById(id)
      context.commit('ADD', result)
    } catch (error) {
      snackbar.showSnackbar(error.message, 'error')
    }
  },
  async create (context, payload) {
    try {
      const result = await API[resource](context).create(payload)
      context.commit('ADD', result)
    } catch (error) {
      snackbar.showSnackbar(error.message, 'error')
    }
  },
  async put (context, { id, payload }) {
    try {
      const result = await API[resource](context).put(id, payload)
      context.commit('ADD', result)
    } catch (error) {
      snackbar.showSnackbar(error.message, 'error')
    }
  },
  async delete (context, id) {
    try {
      await API[resource](context).delete(id)
      context.commit('REMOVE', id)
    } catch (error) {
      snackbar.showSnackbar(error.message, 'error')
    }
  }
})

export default actions
