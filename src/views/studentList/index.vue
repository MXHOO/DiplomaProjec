<template>
  <div style="margin: 20px;">学生列表
    <el-table :data="studentList">
      <el-table-column label="学生ID" prop="id" align="center">
      </el-table-column>
      <el-table-column label="作业详情" align="center">
        <template slot-scope="scope">
          <!-- 详情跳转到学生作业详情 -->
          <el-button type="text">
            <router-link :to="scope.row.id">查看详情</router-link>
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data () {
    return {
      studentList: [
        { id: 1 },
        { id: 2 }
      ]
    }
  }
}
</script>
