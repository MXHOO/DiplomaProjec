// import http from '@/util/axios.config.js'
import {get, post} from '@/util/http.js'
/**
 * 创建作业
 * @param {string} homework_name [必填]  作业名称
 * @param {string} homework_notice [必填] 作业须知
 */
export function createWork(param = {}) {
  return post('/homework_library/create_homework', param)
}

/**
 * 获取作业库
 */
export function getHomeWorList(params = {}) {
  return get('/homework_library/homework_list', params)
}