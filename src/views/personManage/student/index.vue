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
    <el-dialog :visible.sync="editVisible">
      <el-form :form="editForm" label-width="100px" ref="editForm">
        <el-form-item label="教师名字:">
          <el-input v-model="editForm.user_name" style="width: 360px;"></el-input>
        </el-form-item>
        <el-form-item label="班级:">
          <el-select v-model="editForm.class_id" style="width: 360px;">
            <el-option v-for="item in classList" :key="item.class_id" :label="item.class_name" :value="item.class_id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="管理权限:">
          <el-select multiple v-model="editForm.role" style="width: 360px;">
            <el-option v-for="item in roles" :key="item.key" :label="item.val" :value="item.key"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="邮箱:">
          <el-input v-model="editForm.email" style="width: 360px;"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="editTeacher">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { addPerson, getPersonList, deletePerson, getUserMsg, updataPerson } from '@/services/personManage.js'
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
      tableList: [],
      editVisible: false,
      editForm: {
        user_name: '',
        email: '',
        role: '',
        class_id: ''
      }
    }
  },
  created () {
    this.init()
    this.getList()
  },
  methods: {
    async editTeacher (row) {
      const param = {
        ...this.editForm,
        class_id: [this.editForm.class_id],
        user_id: this.user_id
      }
      await updataPerson(param)
      this.$message.success('修改成功')
      this.editVisible = false
      this.getList()
      this.$refs.editForm && this.$refs.editForm.resetFields()
    },
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
    async edit (row) {
      this.user_id = row.user_id
      const { data } = await getUserMsg({ user_id: row.user_id })
      this.editForm.email = data.email
      this.editForm.user_name = data.user_name
      this.editForm.role = data.role_names
      this.editForm.class_id = data.study_class_ids[0]
      this.editVisible = true
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
