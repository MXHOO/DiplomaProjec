<template>
  <div style="margin: 20px;">
    <el-form :model="form" :inline="true">
      <el-form-item label="学生：">
        <el-input v-model="form.student"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="search">查找</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData">
      <el-table-column label="学生ID" prop="student_id"></el-table-column>
      <el-table-column label="完成状态" prop="status"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button v-if="scope.row.status === '已完成'" type="primary" size="small" @click="showDetail(scope.row)">查看详情</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data () {
    return {
      form: {
        student: ''
      },
      tableData: [
        { student_id: 1, status: '已完成' },
        { student_id: 2, status: '未完成' }
      ]
    }
  },
  methods: {
    showDetail (row) {
      this.$router.push('/my_work/list')
    },
    search () {

    }
  }
}
</script>
