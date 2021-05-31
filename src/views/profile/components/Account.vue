<template>
  <div>
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
      <el-form-item label="班级:">
        <p>{{ classCon }}</p>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="visible = true">修改密码</el-button>
        <el-button type="primary" @click="submit">更新</el-button>
      </el-form-item>
    </el-form>
    <el-dialog :visible.sync="visible" width="350" title="修改密码">
      <el-form :inline="true">
        <el-form-item label="新的密码:">
          <el-input v-model="password" style="width: 300px;"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="confirm">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getUserInfo } from '@/services/userInfo.js'
import { mapGetters } from 'vuex'
import { getClasses } from '@/services/createWork.js'
import { updataPerson } from '@/services/personManage'
const roles = {
  admin: '管理员',
  student: '学生',
  teacher: '老师'
}
export default {
  data () {
    return {
      visible: false,
      userMsg: {},
      rules: {
        user_name: [{ required: true, message: '用户姓名不能为空', trigger: 'blur' }],
        email: [{ required: true, message: '邮箱不能为空', trigger: 'blur' }]
      },
      class_id: [],
      password: '',
      classCon: ''
    }
  },
  async created () {
    await this.getUserInfo()
    this.getClasses()
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
    async getClasses () {
      if (this.userInfo.role_names.includes('teacher')) {
        this.class_id = this.userInfo.teach_class_ids
      } else {
        this.class_id = this.userInfo.study_class_ids
      }
      const { data } = await getClasses({ class_ids: this.class_id })
      this.classCon = data.map(item => item.class_name).join(',')
    },
    async submit () {
      const param = {
        user_id: this.userMsg.user_id,
        class_id: this.class_id,
        user_name: this.userMsg.user_name,
        email: this.userMsg.email,
        role: this.userMsg.role_names
      }
      await updataPerson(param)
      this.$message.success('更新成功！')
      window.location.reload()
    },
    async confirm () {
      const param = {
        user_id: this.userMsg.user_id,
        class_id: this.class_id,
        user_name: this.userMsg.user_name,
        email: this.userMsg.email,
        role: this.userMsg.role_names,
        password: this.password
      }
      await updataPerson(param)
      this.password = ''
      this.visible = false
      this.$message.success('密码更新成功')
      localStorage.removeItem('token')
      window.location.reload()
    }
  }
}
</script>
