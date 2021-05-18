<template>
  <el-form :model="userMsg" :rules="rules">
    <el-form-item label="用户姓名:" prop="user_name">
      <el-input v-model.trim="userMsg.user_name" />
    </el-form-item>
    <el-form-item label="用户角色:">
      <span>{{role}}</span>
    </el-form-item>
    <el-form-item label="邮箱:" prop="email">
      <el-input v-model.trim="userMsg.email" />
    </el-form-item>
    <el-form-item label="教学班级:">
      <p>{{ userInfo.study_class_ids.join(',') }}</p>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submit">更新</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { getUserInfo } from '@/services/userInfo.js'
import { mapGetters } from 'vuex'
const roles = {
  admin: '管理员',
  student: '学生',
  teacher: '老师'
}
export default {
  data () {
    return {
      userMsg: {},
      rules: {
        user_name: [{ required: true, message: '用户姓名不能为空', trigger: 'blur' }],
        email: [{ required: true, message: '邮箱不能为空', trigger: 'blur' }]
      }
    }
  },
  created () {
    this.getUserInfo()
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ]),
    role: function () {
      if (this.userInfo.role_names && this.userInfo.role_names.length > 0) {
        const result = this.userInfo.role_names.map(item => roles[item])
        return result.join(',')
      }
      return ''
    }
  },
  methods: {
    async getUserInfo () {
      if (!this.userInfo) {
        const { data } = await getUserInfo()
        this.$store.commit('user/setUserInfo', data)
      }
      this.userMsg = { ...this.userInfo }
    },
    submit () {
      // console.log('更新个人信息')
    }
  }
}
</script>
