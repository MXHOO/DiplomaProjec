<template>
  <div style="padding: 20px;">
    <el-form>
      <el-form-item label="状态">
        <!-- <el-select>
          <el-option v-for="ite"></el-option>
        </el-select> -->
      </el-form-item>
    </el-form>
    <el-table :data="tableList">
      <el-table-column label="发布id" prop="publish_id"></el-table-column>
      <el-table-column label="作业名称">
        <template slot-scope="scope">
          <div>
            {{scope.row.homework && scope.row.homework.homework_name}}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="发布时间" prop="publish_time"></el-table-column>
      <el-table-column label="截止时间" prop="deadline_time"></el-table-column>
      <el-table-column label="作业状态">
        <template slot-scope="scope">
          {{statusList[scope.row.homework_status]}}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button v-if="scope.row.homework_status === 'unStart'" size="small" type="primary"
            @click="start(scope.row)">开始做题</el-button>
          <el-button v-if="scope.row.homework_status === 'done'" size="small" type="warning" @click="detail(scope.row)">
            查看详情</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
// eslint-disable-next-line no-unused-vars
import { getMyWorkList, getHomeworkDetail } from '@/services/myWork.js'
export default {
  data () {
    return {
      tableList: [],
      statusList: {
        'unStart': '未开始',
        'done': '已完成',
        'doing': '进行中',
        'expire': '已过期'
      },
      search: {
        current_page: 1,
        page_size: 10
      }
    }
  },
  created () {
    this.getList()
  },
  methods: {
    async getList () {
      const { data } = await getMyWorkList(this.search)
      this.tableList = data && (data.list || [])
    },
    start (row) {
      this.$router.push({
        path: `/my_work/do/${row.publish_id}`,
        query: {
          id: row.publish_id
        }
      })
    },
    detail (row) {
      this.$router.push({
        path: `/my_work/read/${row.publish_id}`,
        query: {
          id: row.publish_id
        }
      })
    }
  }
}
</script>
