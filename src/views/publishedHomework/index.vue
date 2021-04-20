<template>
  <div style="padding: 20px;">
    <el-form :model="search" size="small" :inline="true" label-width="100">
      <el-form-item label="作业id">
        <el-input v-model="search.homework_id"></el-input>
      </el-form-item>
      <el-form-item label="作业名称">
        <el-input v-model="search.homework_name"></el-input>
      </el-form-item>
      <el-form-item label="班级">
        <el-select v-model="search.class">
          <el-option></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="searchHandler">搜索</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="list" size="small">
      <el-table-column type="expand">
        <!-- 作业对应的班级 -->
        <el-table :data="classList">
          <el-table-column prop="class_id" label="班级ID">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button @click="dataAnalyse(scope.row)" size="small" type="success">数据分析</el-button>
              <el-button @click="detail(scope.row)" size="small">查看班级详情数据</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-table-column>
      <el-table-column prop="homework_id" label="作业ID">
      </el-table-column>
      <el-table-column prop="homework_name" label="作业名称">
      </el-table-column>
      <el-table-column prop="" label="最后修改时间"></el-table-column>
    </el-table>
    <el-dialog :visible.sync="analyseVisible">
      <div>数据分析</div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data () {
    return {
      search: {
        homework_id: '',
        homework_name: '',
        class: ''
      },
      list: [
        { homework_id: 1,
          homework_name: '作业1' }
      ],
      classList: [
        {
          class_id: 1
        }
      ],
      analyseVisible: false
    }
  },
  methods: {
    dataAnalyse (row) {
      this.analyseVisible = true
    },
    // 查看班级对应学生
    detail (row) {
      this.$router.push('/task/student')
    },
    searchHandler () {
      // console.log('搜索')
    }
  }
}
</script>
