import {
  get
} from '@/util/http.js'

export function publishedList (params = {}) {
  return get('/publish/homework_record_list', params)
}
