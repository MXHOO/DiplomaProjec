<template>
  <div class="rc-site">
    <div class="rc-site__cover">
      <img src="@/assets/show.png">
    </div>
    <div class="rc-site__describe">
      <p>作业ID:&nbsp; {{siteDetail.homework_id}}
        <i v-show="siteDetail.homework_id" type="copy" class="operator el-icon-copy-document"
          v-clipboard:copy="siteDetail.homework_id" v-clipboard:success="onCopy" v-clipboard:error="onError" />
      </p>
      <p>作业名称：{{ siteDetail.homework_name }}
        <i class="el-icon-edit" @click="editSite" />
      </p>
      <p>作业须知：{{ siteDetail.homework_notice }}</p>
    </div>
    <div class="rc-site__operator">
      <div>
        <span class="operator" @click="editSiteContent">
          <i class="el-icon-edit">编辑</i>
        </span>
      </div>
      <div>
        <span class="operator" @click="publishedVisible=true">
          <i class="el-icon-position">发布</i>
        </span>
      </div>
      <div>
        <el-dropdown trigger="click">
          <span class="operator">
            更多
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="deleteHomework">
              <i class="el-icon-delete operator" style="font-size: 14px;"> 删除作业</i>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <div class="rc-site__status">
      <p v-if="siteDetail.status === 1" class="rc-site__status--published">已发布</p>
      <p v-if="siteDetail.status === 0 || siteDetail.status === null" class="rc-site__status--unpublished">未发布</p>
    </div>
    <!-- 编辑作业 -->
    <el-dialog title="编辑作业" :visible="editVisible" @cancel="clearValid">
      <el-form :model="form" :label-col="{ span: 4 }" ref="form" :wrapper-col="{ span: 19 }" :rules="rules">
        <el-form-item label="作业名称" prop="homework_name">
          <el-input v-model.trim="form.homework_name" placeholder="请输入作业名称" />
        </el-form-item>
        <el-form-item label="作业描述" prop="homework_notice">
          <el-input v-model.trim="form.homework_notice" placeholder="请输入作业描述"></el-input>
        </el-form-item>
      </el-form>
      <template slot="footer">
        <el-button type="primary" @click="confirmModal">确认</el-button>
        <el-button @click="clearValid">取消</el-button>
      </template>
    </el-dialog>
    <el-dialog title="发布作业" :visible.sync="publishedVisible" width="500px">
      <el-form :model="publishContent" label-width="100px" :rules="publishRule" ref="publishForm">
        <el-form-item label="班级:" prop="class_id">
          <el-select v-model="publishContent.class_id" multiple style="width: 300px;">
            <el-option v-for="item in classList" :key="item.key" :label="item.val" :value="item.val"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="截止时间:" prop="deadline_time">
          <el-date-picker v-model="publishContent.deadline_time"  style="width: 300px;" type="datetime" placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" style="text-align: center;">
        <el-button @click="publish" type="primary">发布</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: {
    siteDetail: {
      type: Object,
      default: () => { }
    }
  },
  data () {
    return {
      editVisible: false,
      previewVisible: false,
      form: {},
      rules: {
        homework_name: [{ required: true, message: '作业标题不能为空', trigger: 'blur' }],
        homework_notice: [{ required: true, message: '作业描述不能为空', trigger: 'blur' }]
      },
      publishRule: {
        class_id: [{ required: true, message: '发布班级不能为空', trigger: 'change' }],
        deadline_time: [{ required: true, message: '截至日期必能为空', trigger: 'change' }]
      },
      pageModeList: [
        { label: 'H5', value: 'h5' },
        { label: 'PC', value: 'pc' }
      ],
      protocol: window.location.protocol,
      publishedVisible: false,
      publishContent: {
        class_id: [],
        deadline_time: ''
      },
      classList: [
        { key: 1, val: '软件1701' },
        { key: 2, val: '软件1702' },
        { key: 3, val: '软件1703' },
        { key: 4, val: '软件1704' }
      ]
    }
  },
  methods: {
    editSite () {
      this.form = Object.assign({}, this.siteDetail)
      this.editVisible = true
    },
    clearValid () {
      this.editVisible = false
      this.$refs.form && this.$refs.form.clearValidate()
    },
    confirmModal () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$emit('saveHomeWork', this.form)
          this.clearValid()
        }
      })
    },
    onCopy () {
      this.$message.success('内容复制成功', 0.5)
    },
    onError () {
      this.$message.error('内容复制失败,请重新复制！', 0.5)
    },
    editSiteContent () {
      this.$router.push({
        path: `/edit/${this.siteDetail.homework_id}`,
        query: {
          name: this.siteDetail.homework_name
        }
      })
    },
    // 删除作业
    deleteHomework () {
      const self = this
      this.$confirm('确认删除该作业吗？', '提示').then(_ => {
        self.$emit('deleteHomework', self.siteDetail.homework_id)
      }).catch(_ => { })
    },
    publish () {
      this.$refs.publishForm.validate(valid => {
        if (valid) {
          const self = this
          const param = {
            homework_id: self.siteDetail.homework_id,
            deadline_time: new Date(this.publishContent.deadline_time).getTime(),
            class_ids: this.publishContent.class_id.join(',')
          }
          this.$confirm(`发布作业${self.siteDetail.homework_id}`, '确认').then(_ => {
            self.$emit('publishHomework', param)
          })
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.rc-site {
  width: 220px;
  font-size: 14px;
  margin: 15px;
  border: #eeeeee 1px solid;
  border-radius: 4px;
  position: relative;

  &__cover {
    overflow: hidden;
    display: flex;
    justify-content: center;

    img {
      width: 50%;
      height: 80%;
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;
      margin: 10px 0;
    }
  }

  &__describe {
    padding: 5px 10px;

    p {
      margin-top: 2px;
      margin-bottom: 8px;
    }
  }

  &__operator {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 34px;
    padding: 10px;
    background: #f9f9f9;

    div {
      text-align: center;
      flex: 1;
    }
  }

  .operator {
    &:hover {
      cursor: pointer;
    }
  }

  &__preview {
    .phone {
      width: 320px;
      height: 568px;
      margin: 0 auto;
      border: 10px solid #8d8d8d;
      border-radius: 10px;
      box-sizing: content-box;
    }
  }

  &__status {
    position: absolute;
    right: 10px;
    top: 10px;

    p {
      padding: 3px;
      border-radius: 4px;
    }

    &--published {
      background: #63ce81;
    }

    &--unpublished {
      background: #f95d5d;
    }
  }
}
</style>
