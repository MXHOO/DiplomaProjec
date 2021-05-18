<template>
  <div style="margin: 20px;">
    <el-row>
      <el-button type="primary" @click="visible=true">添加教师</el-button>
    </el-row>
    <el-table :data="tableList">
      <el-table-column label="教师ID" prop="id"></el-table-column>
      <el-table-column label="教师名字" prop="name"></el-table-column>
      <el-table-column label="教授班级" prop="classes"></el-table-column>
      <el-table-column label="编辑">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope)">编辑</el-button>
          <el-button type="warning" @click="deleteStudent(scope)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :visible.sync="visible">
      <el-form :form="form" label-width="100px">
        <el-form-item label="教师名字:">
          <el-input v-model="form.name" style="width: 360px;"></el-input>
        </el-form-item>
        <el-form-item label="教授班级:">
          <el-select multiple v-model="form.classes" style="width: 360px;">
            <el-option v-for="item in classList" :key="item.key" :label="item.val" :value="item.val"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="管理权限:">
          <el-select multiple v-model="form.rule" style="width: 360px;">
            <el-option v-for="item in roles" :key="item.key" :label="item.val" :value="item.val"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="邮箱:">
          <el-input v-model="form.mail" style="width: 360px;"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="addTeacher">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data () {
    return {
      visible: false,
      form: {
        name: '',
        mail: '',
        rule: '',
        classes: []
      },
      roles: [
        { key: 2, val: '教师' },
        { key: 3, val: '管理员' }
      ],
      classList: [
        { key: 1701, val: '软件1701' },
        { key: 1702, val: '软件1702' },
        { key: 1703, val: '软件1703' },
        { key: 1704, val: '软件1704' }
      ],
      tableList: [
        { id: 1, name: '张三', classes: '软件1701' },
        { id: 1, name: '张三', classes: '软件1701' },
        { id: 1, name: '张三', classes: '软件1701' },
        { id: 1, name: '张三', classes: '软件1701' },
        { id: 1, name: '张三', classes: '软件1701' }
      ]
    }
  },
  methods: {
    addTeacher () {
      this.$message.success('添加成功')
      this.visible = false
    }
  }
}
</script>
