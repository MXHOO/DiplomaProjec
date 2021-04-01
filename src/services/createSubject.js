import { get, post } from '@/util/http.js'
/**
 * 根据作业id获取对应的作业列表
 * @param {homework_id} 作业ID
 * @returns Promise
 */
export function getSubjects (params = {}) {
  return get('/homework_library/homework_detail', params)
}

/**
 * 创建题目
 */
export function createProblem (params = {}) {
  return post('/homework_library/create_problem', params)
}

/**
 * 保存作业
 */
export function saveHomework (params = {}) {
  return post('/homework_library/save_homework', params)
}
