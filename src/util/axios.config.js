// 封装axios
import axios from 'axios'
const router = window.app.config.globalProperties.$router
const $notification = window.app.config.globalProperties.$notification
const service = axios.create({
  timeout: 20000,
  withCredentials: true,
  baseURL: '/api',
  headers: {
    'token': 'eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2MTcwODc4NjUsInVzZXJJZCI6MX0.Hd585CuKklv8Y6xUom1vf7l6ORj7ftRUdNS1qAAecmo'
  }
})

service.interceptors.request.use(config => {
  if(!config.headers.token) {
    setTimeout(() => {router.push({path: '/login'})})
  }
  return config
}, error => {
  $notification.error({
    message: '请求错误',
    description: error
  })
})

service.interceptors.response.use(response => {
  const { data } = response
  if(data.code === 0) {
    return Promise.resolve(data)
  } else {
    $notification.error({
      message: '错误',
      description: '发生了错误'
    })
    return Promise.reject(data)
    // sessionStorage.removeItem('token')
    // router.push({path: '/login'})
  }
}, error => {
  $notification.error({
    message: '获取数据错误',
    description: error
  })
})

export default service