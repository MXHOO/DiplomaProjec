import {
  get,
  post
} from '@/util/http.js'
export function addPerson (params = {}) {
  return post('/user/insert', params)
}

export function deletePerson (params = {}) {
  return get('/user/delete', params)
}

export function getPersonList (params = {}) {
  return get('/user/info_list', params)
}
