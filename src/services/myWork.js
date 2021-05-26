import {
  get
} from '@/util/http.js'

export function getMyWorkList (params = {}) {
  return get('/homework/list', params)
}

export function submitWork (params = {}) {
  return postMessage('/homework/submit', params)
}

export function getHomeworkDetail (params = {}) {
  return get('/homework/detail', params)
}
