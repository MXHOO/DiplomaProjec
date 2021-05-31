<template>
  <div style="padding: 20px;">
    <el-form :model="searchContent" size="small" :inline="true" label-width="100">
      <el-form-item label="作业id">
        <el-input v-model="searchContent.homework_id"></el-input>
      </el-form-item>
      <el-form-item label="作业名称">
        <el-input v-model="searchContent.homework_name"></el-input>
      </el-form-item>
      <el-form-item label="班级">
        <el-select v-model="searchContent.class" clearable>
          <el-option v-for="item in teamList" :key="item.class_id" :label="item.class_name" :value="item.class_id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="searchHandler">搜索</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="list" size="small">
      <el-table-column type="expand">
        <!-- 作业对应的班级 -->
        <template slot-scope="props">
          <el-table :data="props.row.class">
          <el-table-column prop="class_id" label="班级ID">
          </el-table-column>
          <el-table-column prop="class_name" label="班级名字"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button @click="dataAnalyse(scope.row, props.row.publish_id)" size="small" type="success">数据分析</el-button>
              <el-button @click="detail(scope.row, props.row.publish_id)" size="small">查看班级详情数据</el-button>
            </template>
          </el-table-column>
        </el-table>
        </template>
      </el-table-column>
      <el-table-column prop="publish_id" label="发布ID">
      </el-table-column>
      <el-table-column label="作业名称">
        <template slot-scope="scope">
          <div>{{ scope.row.homework && scope.row.homework.homework_name}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="publish_time" label="发布时间"></el-table-column>
      <el-table-column prop="deadline_time" label="截止时间"></el-table-column>
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
import { mapGetters } from 'vuex'
import { getClasses } from '@/services/createWork.js'
import { getUserInfo } from '@/services/userInfo.js'
import { publishedList, dataAsy } from '@/services/published'
export default {
  data () {
    return {
      list: [],
      classList: [
        { class_id: 2, class_name: '软件1701' }
      ],
      teamList: [],
      analyseVisible: false,
      searchContent: {
        homework_id: '',
        homework_name: '',
        class_id: '',
        page_size: 10,
        current_page: 1
      },
      total: 10,
      asy: {
        done_count: 0,
        not_done_count: 0
      }
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  async created () {
    this.getUserInfo().then(_ => {
      this.getTeachClass()
      this.getList()
    })
  },
  methods: {
    async getTeachClass () {
      const param = {
        class_ids: this.userInfo.teach_class_ids
      }
      const { data } = await getClasses(param)
      this.teamList = data || []
    },
    async getUserInfo () {
      if (!this.userInfo) {
        const { data } = await getUserInfo()
        this.$store.commit('user/setUserInfo', data)
      }
    },
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
    // eslint-disable-next-line camelcase
    async dataAnalyse (row, publish_id) {
      this.analyseVisible = true
      const { data } = await dataAsy({ class_id: row.class_id, publish_id: publish_id })
      this.asy = { ...data }
    },
    // 查看班级对应学生
    detail (row, id) {
      this.$router.push({
        path: `/exam/homework/classDetail/${row.class_id}`,
        query: {
          publish_id: id,
          class_id: row.class_id
        }
      })
    },
    searchHandler () {
      this.getList()
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
          formatter: ''
        },
        legend: {
          orient: 'vertical',
          bottom: 'bottom',
          data: ['已完成', '未完成']
        },
        series: [
          {
            name: '数据对比',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: [
              { value: this.asy.done_count, name: '已完成' },
              { value: this.asy.not_done_count, name: '未完成' }
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
