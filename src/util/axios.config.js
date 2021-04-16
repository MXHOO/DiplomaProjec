// 封装axios
import axios from 'axios'
import vue from 'vue'
const router = vue.prototype.$$router
// const $notification = window.app.config.globalProperties.$notification
const service = axios.create({
  timeout: 20000,
  withCredentials: true,
  baseURL: '/api'
})

service.interceptors.request.use(config => {
  console.log('config', config)
  if (!config.headers.token && !sessionStorage.getItem('token')) {
    setTimeout(() => { router.push({ path: '/login' }) })
  } else {
    config.headers.token = 'eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2MTgyODM4NjAsInVzZXJJZCI6MX0.ybH6dY3O2D_9n_3V7kRF8_mn3jOxBgi3PnXnQLzA0GQ'
    // window.sessionStorage.getItem('token')
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
  } else if (data.code === 1003) {
    vue.prototype.$message.error(data.msg)
    router.push({ path: '/login' })
    console.log('在这里看一下')
    // sessionStorage.removeItem('token')
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
