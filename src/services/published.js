import {
  get,
  post
} from '@/util/http.js'

export function publishedList (params = {}) {
  return post('/publish/homework_record_list', params)
}
// 数据统计
export function dataAsy (params = {}) {
  return get('/publish/homework_data_analysis', params)
}

// 作业完成情况，班级维度
export function getCompletion (params = {}) {
  return get('/publish/homework_completion', params)
}
