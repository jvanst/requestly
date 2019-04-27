import { fetch } from '@/api/types'

const fetchTypes = (context) => fetch.then(res => {
  context.commit('TYPES_UPDATED', res)
})

export default {
  fetchTypes
}
