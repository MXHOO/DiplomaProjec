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
          <el-option v-for="item in teamList" :key="item.key" :label="item.val" :value="item.val"></el-option>
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
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[5, 10, 20]"
      :current-page.sync="searchContent.current_page" :page-size="searchContent.page_size"
      layout="sizes, total, prev, pager, next" :total="total">
    </el-pagination>
    <el-dialog :visible.sync="analyseVisible" title="数据分析" @opened="showData">
      <div id="dataSys" style="width: 100%; height: 300px;"></div>
    </el-dialog>
  </div>
</template>
<script>
import { publishedList } from '@/services/published'
export default {
  data () {
    return {
      search: {
        homework_id: '',
        homework_name: '',
        class: ''
      },
      list: [
        {
          homework_id: 1,
          homework_name: '作业1'
        }
      ],
      classList: [
        { class_id: 2, class_name: '软件1701' }
      ],
      teamList: [
        {
          key: 1, val: '软件1701'
        }
      ],
      analyseVisible: false,
      searchContent: {
        page_size: 10,
        current_page: 1
      },
      total: 10
    }
  },
  created () {
    // this.getList()
  },
  methods: {
    async getList () {
      const { data } = await publishedList(this.searchContent)
      this.list = data.list || []
      this.total = data.total
    },
    handleSizeChange (page) {
      this.searchContent.page_size = page
      this.getList()
    },
    handleCurrentChange (current) {
      this.searchContent.current_page = current
      this.getList()
    },
    dataAnalyse (row) {
      this.analyseVisible = true
    },
    // 查看班级对应学生
    detail (row) {
      this.$router.push({
        path: `/exam/homework/classDetail/${row.class_id}`,
        query: {
          name: row.class_name,
          id: row.class_id
        }
      })
    },
    searchHandler () {
      // console.log('搜索')
    },
    showData () {
      // eslint-disable-next-line no-undef
      const pie = echarts.init(document.getElementById('dataSys'))
      pie.setOption({
        title: {
          text: '作业完成度对比',
          x: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '111'
        },
        legend: {
          orient: 'vertical',
          bottom: 'bottom',
          data: ['已完成', '未完成']
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: [
              { value: 335, name: '已完成' },
              { value: 310, name: '未完成' }
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      })
    }
  }
}
</script>
