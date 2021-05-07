// 封装axios
import axios from 'axios'
import vue from 'vue'
const router = vue.prototype.$$router
const service = axios.create({
  timeout: 20000,
  withCredentials: true,
  baseURL: '/api'
})

service.interceptors.request.use(config => {
  // console.log('config', config)
  if (!config.headers.token && !window.localStorage.getItem('token')) {
    setTimeout(() => { router.push({ path: '/login' }) })
  } else {
    config.headers.token = window.localStorage.getItem('token')
  }
  return config
}, error => {
  this.$notify.error(error.msg)
  return Promise.reject(error)
})

service.interceptors.response.use(response => {
  const { data } = response
  if (data.code === 0) {
    return Promise.resolve(data)
  } else if (data.code === 1003 || data.code === 1003) {
    vue.prototype.$message.error(data.msg)
    setTimeout(_ => {
      router.push({ path: '/login' })
      localStorage.removeItem('token')
    })
    return Promise.reject(data)
  } else {
    vue.prototype.$message.error(data.msg)
    return Promise.reject(data)
  }
}, error => {
  vue.prototype.$message.error(error.msg || error)
  return Promise.reject(error.msg)
})

export default service
