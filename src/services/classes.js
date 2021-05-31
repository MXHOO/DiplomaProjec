import {
  get,
  post
} from '@/util/http.js'
/**
 * 获取全量班级
 */
export function getAllClasses () {
  return get('/class/all')
}

export function addTeam (params = {}) {
  return post('/class/insert', params)
}
