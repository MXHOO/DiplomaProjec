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

export function getUserMsg (params = {}) {
  return get('/user/select_info', params)
}

export function updataPerson (params = {}) {
  return post('/user/update', params)
}
