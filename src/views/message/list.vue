<template>
  <div class="app-container">

    <el-table :data="tableData" border fit highlight-current-row style="width: 100%">
      <el-table-column prop="title" label="标题"/>
      <el-table-column label="内容">
        <template slot-scope="scope">
          <div v-html="scope.row.content"></div>
        </template>
      </el-table-column>
      <el-table-column prop="time" label="发送时间"/>
    </el-table>
  </div>
</template>

<script>
import { getMsgList } from '@/services/message.js'

export default {
  data () {
    return {
      tableData: []
    }
  },
  created () {
    this.getList()
  },
  methods: {
    async getList () {
      const { data } = await getMsgList()
      this.tableData = data || []
    }
  }
}
</script>
