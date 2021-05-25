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
      <el-table-column label="作业名称" prop="homework_name"></el-table-column>
      <el-table-column label="发布人" prop="publisher_name"></el-table-column>
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
import { getMyWorkList } from '@/services/myWork.js'
export default {
  data () {
    return {
      tableList: [
        {
          publish_id: 3,
          publisher_name: '发布人的名字',
          homework: {
            homework_id: 1,
            homework_name: '作业名称1',
            homework_notice: '作业须知1',
            last_modified_time: '2021-03-01 15:31:09'
          },
          deadline_time: '2021-03-05 16:26:28',
          publish_time: '2021-03-05 17:59:08',
          homework_status: 'unStart'
        },
        {
          publish_id: 4,
          publisher_name: '发布人的名字',
          homework: {
            homework_id: 1,
            homework_name: '作业名称1',
            homework_notice: '作业须知1',
            last_modified_time: '2021-03-01 15:31:09'
          },
          deadline_time: '2021-03-05 16:26:28',
          publish_time: '2021-03-05 17:59:08',
          homework_status: 'doing'
        },
        {
          publish_id: 5,
          publisher_name: '发布人的名字',
          homework: {
            homework_id: 1,
            homework_name: '作业名称1',
            homework_notice: '作业须知1',
            last_modified_time: '2021-03-01 15:31:09'
          },
          deadline_time: '2021-03-05 16:26:28',
          publish_time: '2021-03-05 17:59:08',
          homework_status: 'done'
        }
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
  },
  methods: {
    async getList () {
      const { data } = await getMyWorkList()
      console.log(data)
    },
    start (row) {
      this.$router.push('/my_work/do')
    },
    detail (row) {
      this.$router.push('/my_work/read')
    }
  }
}
</script>
