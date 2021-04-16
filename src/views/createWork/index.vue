<template>
  <div>
    <el-row>
      <el-col :span="18">
        <el-form size="small" :inline="true" style="margin: 20px;">
          <el-form-item>
            <el-input v-model="work.homework_id" placeholder="请输入作业ID"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="work.homework_name" placeholder="请输入作业名称"></el-input>
          </el-form-item>
          <el-form-item>
            <el-select placeholder="请输入班级" v-model="className" style="width: 160px;">
              <!-- <el-select-option></el-select-option> -->
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="search">搜索</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="6">
        <el-button type="primary" @click="showModal" style="margin: 20px;" size="small">创建作业</el-button>
      </el-col>
    </el-row>
    <div class="rc-mysite__site-list">
      <div class="nothing" v-show="list.length === 0">
        <p>没有数据，请先创建作业！</p>
      </div>
      <homeWork @saveHomework="saveHomework" v-for="item in list" :siteDetail="item" :key="item.pageID"
        @deleteHomework="handlerDeleteHomework"></homeWork>
    </div>
    <!-- <div class="rc-mysite__site-list-pagination" v-show="list.length !== 0">
      <el-pagination @change="pageChange" @showSizeChange="pageSizeChange" :total="total" show-size-changer
        :page-size-options="pageSizeOptions" :current="searchContent.page_index" :page-size="searchContent.page_size">
        <template slot="buildOptionText" slot-scope="props">
          <span>{{ props.value }}条/页</span>
        </template>
      </el-pagination>
    </div> -->
    <el-dialog title="创建作业" :visible="visible" @close="cancelModal" center width="500px">
      <el-form :model="work" :rules="rules" :inline="true">
        <el-form-item label="作业名字:" placeholder="请输入作业名字" prop="homework_name">
          <el-input v-model="work.homework_name"  style="width: 350px;"></el-input>
        </el-form-item>
        <el-form-item label="作业须知:" placeholder="请输入作业须知" prop="homework_notice">
          <el-input type="textarea" v-model="work.homework_notice" style="width: 350px;"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="handleOk" type="primary" size="small">确定</el-button>
        <el-button @click="cancelModal" size="small">取消</el-button>
      </div>
    </el-dialog>
    <!-- <div id="edit"></div> -->
  </div>
</template>
<script>
import homeWork from '@/components/homework/index.vue'
import { createWork, getHomeWorList, deleteHomework } from '@/services/createWork.js'
export default {
  components: {
    homeWork
  },
  data () {
    return {
      work: {
        homework_name: '',
        homework_notice: ''
      },
      layout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 }
      },
      rules: {
        homework_name: [{ trigger: 'blur', required: true, message: '请输入作业名称' }],
        homework_notice: [{ trigger: 'blur', required: true, message: '请输入作业须知' }],
        columns: [
          {
            title: '作业名字',
            dataIndex: 'homework_name',
            align: 'center'
          },
          {
            title: '作业须知',
            dataIndex: 'homework_notice',
            align: 'center'
          },
          {
            title: '最后修改时间',
            dataIndex: 'last_modified_time',
            align: 'center'
          },
          {
            title: '操作',
            dataIndex: 'opearte',
            slots: { customRender: 'operation' }
          }
        ],
        tableList: [...Array(100)].map((_, i) => ({
          homework_id: i,
          homework_name: '测试数据',
          homework_notice: '作业须知',
          last_modified_time: `20210310`
        }))
      },
      className: '',
      visible: false,
      list: [],
      total: 0,
      searchContent: {
        current_page: 1,
        page_size: 10
      }
    }
  },
  created () {
    this.getSitesList()
  },
  methods: {
    showModal () {
      this.visible = true
    },
    cancelModal () {
      this.visible = false
    },
    async getSitesList () {
      const { data } = await getHomeWorList(this.searchContent)
      this.list = data.list || []
    },
    async handleOk () {
      const { data } = await createWork(this.work)
      this.$notify.success('创建作业成功！')
      this.$router.push({ path: `/edit/${data}` })
    },
    search () {
      // console.log('搜索')
    },
    // 清除校验
    clearValid () {
      this.visible = false
      this.$refs.form && this.$refs.form.resetFields()
    },
    // 切换当前页
    pageChange (current) {
      this.searchContent.page_index = current
      this.getSitesList()
    },
    // 切换每页条数
    pageSizeChange (current, size) {
      this.searchContent.page_index = 1
      this.searchContent.page_size = size
      this.getSitesList()
    },
    async handlerDeleteHomework (homeworkID) {
      await deleteHomework({ 'homework_id': homeworkID })
      this.$notify.success('作业删除成功！')
      this.searchContent.current_page = 1
      this.searchContent.page_size = 10
      this.getSitesList()
    },
    saveHomework () {
      // console.log('保存作业')
    }
  }
}
</script>
<style lang="scss" scoped>
.rc-mysite {
  width: 100%;

  &__operator {
    margin: 15px;
  }

  &__site-list {
    display: flex;
    flex-wrap: wrap;

    .nothing {
      min-height: 400px;
      margin: 0 auto;

      p {
        position: relative;
        top: 50%;
      }
    }
  }

  &__site-list-pagination {
    padding: 10px;
    text-align: center;
  }
}
</style>
