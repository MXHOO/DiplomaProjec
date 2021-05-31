import {
  get
} from '@/util/http.js'

export function getMsgList () {
  return get('/user/email_list')
}
