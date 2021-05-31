<template>
  <div style="margin: 20px;">
    <el-form :model="form" :inline="true">
      <el-form-item label="班级：" style="width: 300px;">{{$route.query.name}}</el-form-item>
      <el-form-item label="学生：">
        <el-input v-model="form.student"></el-input>
      </el-form-item>
    </el-form>
    <el-table :data="tableData">
      <el-table-column label="学生ID" prop="user_id"></el-table-column>
      <el-table-column label="学生名字" prop="user_name"></el-table-column>
      <el-table-column label="完成状态">
        <template slot-scope="scope">
          {{statusList[scope.row.homework_status]}}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button v-if="scope.row.homework_status === 'done'" type="primary" size="small" @click="showDetail(scope.row)">查看详情</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { getCompletion } from '@/services/published'
export default {
  data () {
    return {
      form: {
        student: ''
      },
      tableData: [
        { user_id: 1, status: '已完成' },
        { user_id: 2, status: '未完成' }
      ],
      statusList: {
        'unStart': '未开始',
        'done': '已完成',
        'doing': '进行中',
        'expire': '已过期'
      }
    }
  },
  created () {
    this.getList()
  },
  methods: {
    showDetail (row) {
      this.$router.push({
        path: `/my_work/read/${this.$route.query.publish_id}`,
        query: {
          id: this.$route.query.publish_id
        }
      })
    },
    async getList () {
      const param = {
        class_id: this.$route.query.class_id,
        publish_id: this.$route.query.publish_id
      }
      const { data } = await getCompletion(param)
      this.tableData = data
    },
    search () {

    }
  }
}
</script>
