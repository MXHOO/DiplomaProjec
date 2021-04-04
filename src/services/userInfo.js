import { get } from '@/util/http.js'
export function getUserInfo () {
  return get('/user/info')
}
