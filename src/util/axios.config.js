// 封装axios
import axios from 'axios'
import vue from 'vue'
const router = vue.prototype.$$router
// const $notification = window.app.config.globalProperties.$notification
const service = axios.create({
  timeout: 20000,
  withCredentials: true,
  baseURL: '/api',
  headers: {
    'token': 'eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2MTcyNzI0MDUsInVzZXJJZCI6MX0.UzKQzpiy4SLP12nlh2BO0cUazSXNbkhN3XsUPW-Q-Tg'
  }
})

service.interceptors.request.use(config => {
  if (!config.headers.token) {
    setTimeout(() => { router.push({ path: '/login' }) })
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
  } else {
    vue.prototype.$message.error(data.msg)
    // router.push({ path: '/login' })
    return Promise.reject(data)
    // sessionStorage.removeItem('token')
  }
}, error => {
  vue.prototype.$message.error(error.msg)
  return Promise.reject(error.msg)
})

export default service
