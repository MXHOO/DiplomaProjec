import {
  get,
  post
} from '@/util/http.js'

export function getMyWorkList (params = {}) {
  return get('/homework/list', params)
}

export function submitWork (params = {}) {
  return post('/homework/submit', params)
}

export function getHomeworkDetail (params = {}) {
  return get('/homework/detail', params)
}

export function getDataAsy () {
  return get('/homework/data_analysis')
}
