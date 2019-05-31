import ProjectAPI from '@/api/projects'
import UserAPI from '@/api/users'
import PermissionAPI from '@/api/permissions'
import InviteAPI from '@/api/invites'
import FormAPI from '@/api/forms'
import LabelAPI from '@/api/labels'
import PipelineAPI from '@/api/pipelines'
import RequestAPI from '@/api/requests'
import TimelineAPI from '@/api/timeline'

const API = {
  projects: () => new ProjectAPI(),
  users: () => new UserAPI(),
  permissions: (context) => new PermissionAPI(context.rootState.projects.activeId),
  invites: (context) => new InviteAPI(context.rootState.projects.activeId),
  forms: (context) => new FormAPI(context.rootState.projects.activeId),
  labels: (context) => new LabelAPI(context.rootState.projects.activeId),
  pipelines: (context) => new PipelineAPI(context.rootState.projects.activeId),
  requests: (context) => new RequestAPI(context.rootState.projects.activeId),
  timeline: (context) => new TimelineAPI(context.rootState.projects.activeId, context.rootState.requests.activeId)
}

const actions = (resource) => ({
  async fetch (context) {
    try {
      const result = await API[resource](context).fetch()
      context.commit('SET', result)
    } catch (error) {
      context.commit('SHOW_SNACKBAR', {
        message: error.message,
        color: 'red'
      })
    }
  },
  async fetchById (context, id) {
    try {
      const result = await API[resource](context).fetchById(id)
      context.commit('ADD', result)
    } catch (error) {
      context.commit('SHOW_SNACKBAR', {
        message: error.message,
        color: 'red'
      })
    }
  },
  async create (context, payload) {
    try {
      const result = await API[resource](context).create(payload)
      context.commit('ADD', result)
    } catch (error) {
      context.commit('SHOW_SNACKBAR', {
        message: error.message,
        color: 'red'
      })
    }
  },
  async put (context, { id, payload }) {
    try {
      const result = await API[resource](context).put(id, payload)
      context.commit('ADD', result)
    } catch (error) {
      context.commit('SHOW_SNACKBAR', {
        message: error.message,
        color: 'red'
      })
    }
  },
  async delete (context, id) {
    try {
      await API[resource](context).delete(id)
      context.commit('REMOVE', id)
    } catch (error) {
      context.commit('SHOW_SNACKBAR', {
        message: error.message,
        color: 'red'
      })
    }
  }
})

export default actions
