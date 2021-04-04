<template>
  <el-form :model="userInfo" :rules="rules">
    <el-form-item label="用户姓名" prop="user_name">
      <el-input v-model.trim="userInfo.user_name" />
    </el-form-item>
    <el-form-item label="用户角色">
      <span>{{userInfo.role_names}}</span>
    </el-form-item>
    <el-form-item label="邮箱" prop="email">
      <el-input v-model.trim="userInfo.email" />
    </el-form-item>
    <el-form-item label="教学班级">
      <p>{{ userInfo.study_class_ids }}</p>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submit">更新</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { getUserInfo } from '@/services/userInfo.js'
export default {
  data () {
    return {
      userInfo: {},
      rules: {
        user_name: [{ required: true, message: '用户姓名不能为空', trigger: 'blur' }],
        email: [{ required: true, message: '邮箱不能为空', trigger: 'blur' }]
      }
    }
  },
  created () {
    this.getUserInfo()
  },
  methods: {
    async getUserInfo () {
      const { data } = await getUserInfo()
      this.userInfo = data
    },
    submit () {
      // console.log('更新个人信息')
    }
  }
}
</script>
