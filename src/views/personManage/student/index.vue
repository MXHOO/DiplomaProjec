<template>
  <div style="margin: 20px;">
    <el-row>
      <el-button type="primary" @click="visible=true">添加学生</el-button>
    </el-row>
    <el-table :data="tableList">
      <el-table-column label="学生ID" prop="user_id"></el-table-column>
      <el-table-column label="学生名字" prop="user_name"></el-table-column>
      <el-table-column label="学生班级">
        <template slot-scope="scope">
          {{scope.row.class[0].class_name}}
        </template>
      </el-table-column>
      <el-table-column label="编辑">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row)">编辑</el-button>
          <el-button type="warning" @click="deleteStudent(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :visible.sync="visible">
      <el-form :form="form" label-width="100px" ref="form">
        <el-form-item label="学生名字:">
          <el-input v-model="form.user_name" style="width: 360px;"></el-input>
        </el-form-item>
        <el-form-item label="账号：">
          <el-input v-model="form.account" style="width: 360px;"></el-input>
        </el-form-item>
        <el-form-item label="班级:">
          <el-select v-model="form.class_id" style="width: 360px;">
            <el-option v-for="item in classList" :key="item.class_id" :label="item.class_name" :value="item.class_id">
            </el-option>
            <el-option v-for="item in classList" :key="item.key" :label="item.val" :value="item.val"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="权限:">
          <el-select v-model="form.role" multiple style="width: 360px;">
            <el-option v-for="item in roles" :key="item.key" :label="item.val" :value="item.val"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="邮箱:">
          <el-input v-model="form.email" style="width: 360px;"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="addStudent">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { addPerson, getPersonList, deletePerson } from '@/services/personManage.js'
import { getAllClasses } from '@/services/classes.js'
export default {
  data () {
    return {
      visible: false,
      form: {
        user_name: '',
        email: '',
        role: '',
        class_id: '',
        account: ''
      },
      roles: [
        { key: 'student', val: '学生' }
      ],
      classList: [],
      tableList: []
    }
  },
  created () {
    this.init()
    this.getList()
  },
  methods: {
    async addStudent () {
      const param = {
        ...this.form,
        class_id: [this.form.class_id]
      }
      const data = await addPerson(param)
      if (data.code === 1006) {
        this.$message.eror(data.msg)
        this.visible = false
      } else {
        this.$message.success('添加成功！')
        this.visible = false
        this.getList()
      }
      this.$refs.form && this.$refs.form.resetFields()
    },
    async init () {
      const { data } = await getAllClasses()
      this.classList = data || []
    },
    async getList () {
      const { data } = await getPersonList()
      const list = data || []
      this.tableList = list.filter(item => item.roles.includes('student'))
    },
    deleteStudent (item) {
      this.$confirm(`确认删除学生${item.user_name}`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async _ => {
        await deletePerson({ user_id: item.user_id })
        this.$message.success('删除成功')
        this.getList()
      })
    }
  }
}
</script>
