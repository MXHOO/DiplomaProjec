<template>
  <div style="margin: 20px;">
    <el-button type="primary" @click="visible=true">添加班级</el-button>
    <el-table :data="tableList">
      <el-table-column label="班级ID" prop="class_id"></el-table-column>
      <el-table-column label="班级名称" prop="class_name"></el-table-column>
    </el-table>
    <el-dialog :visible.sync="visible">
      <el-form>
        <el-form-item label="班级名称：" label-width="100px">
          <el-input v-model="class_name"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button type="primary" @click="addTeam">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getAllClasses, addTeam } from '@/services/classes.js'
export default {
  data () {
    return {
      tableList: [],
      class_name: '',
      visible: false
    }
  },
  created () {
    this.init()
  },
  methods: {
    async init () {
      const { data } = await getAllClasses()
      this.tableList = data || []
    },
    async addTeam () {
      await addTeam({ class_name: this.class_name })
      this.$message.success('添加成功')
      this.init()
    }
  }
}
</script>
