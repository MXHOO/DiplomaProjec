<template>
  <div style="padding: 20px;">
    <el-row>
      <el-col :span="18">
        <p>作业题目</p>
      </el-col>
      <el-col :span="6">
        <el-button type="primary" @click="submitForm">提交作业</el-button>
      </el-col>
    </el-row>
    <el-form>
      <el-card class="exampaper-item-box" v-if="subjectList.length!==0">
        <el-form-item :key="questionItem.problem_id" :label="index+ 1 +'.'"
          v-for="(questionItem, index) in getCpmputedList" class="exam-question-item" label-width="50px"
          :id="'question-'+ questionItem.problem_id">
          <QuestionEdit :qType="questionItem.problem_type" :isSubmit="questionItem.has_submit_answer" :question="questionItem.content"
            :answer="answer.answerItem[index]" />
        </el-form-item>
      </el-card>
    </el-form>
  </div>
</template>
<script>
import QuestionEdit from './components/questionEdit'
import { getHomeworkDetail, submitWork } from '@/services/myWork.js'
export default {
  components: {
    QuestionEdit
  },
  data () {
    return {
      homework_id: '',
      publish_id: this.$route.query.id,
      subjectList: [],
      rules: [],
      homework: null,
      answer: {
        answerItem: []
      }
    }
  },
  computed: {
    getCpmputedList () {
      const list = []
      this.subjectList.forEach(content => {
        const item = content.problem_metadata
        if (item.problem_type === 3) {
          item.content.body = this.replaceFill(item.content.body)
        }
        list.push(item)
      })
      return list
    }
  },
  created () {
    this.getList()
  },
  methods: {
    replaceFill (html) {
      const temp = html.replace(/【填空】/g, '&nbsp;____&nbsp;')
      return temp
    },
    // 获取作业列表
    async getList () {
      const { data } = await getHomeworkDetail({ publish_id: this.publish_id })
      this.subjectList = data.problems || []
      this.rules = data.rules
      this.homework_id = data.homework && data.homework.homework_id
      const self = this
      this.subjectList.forEach((content, index) => {
        const item = content.problem_metadata
        let temp = []
        if (item.problem_type === 3) {
          temp = item.content.body.match(/【填空】/g) || []
        }
        if (Array.isArray(temp) && temp.length > 0) {
          self.answer.answerItem.push({ questionId: self.subjectList[index].problem_metadata.problem_id, content: null, contentArray: temp.map(item => null), completed: false })
        } else {
          self.answer.answerItem.push({ questionId: self.subjectList[index].problem_metadata.problem_id, content: null, contentArray: [], completed: false })
        }
      })
    },
    initAnswer () {

    },
    async submitForm () {
      const unfinished = []
      this.answer.answerItem.forEach((item, index) => {
        if (!item.completed) {
          unfinished.push(index + 1)
        }
      })
      if (unfinished.length > 0) {
        this.$confirm(`题目${unfinished.join(',')}还未完成，确认提交？`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async _ => {
          const { data } = await submitWork(this.getParams())
          this.afterSubmit(data.score)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消提交'
          })
        })
      } else {
        const { data } = await submitWork(this.getParams())
        this.afterSubmit(data.score)
      }
    },
    afterSubmit (score) {
      this.$message.success('提交成功！')
      this.$confirm(`你的成绩是${score}`, '提示', {
        confirmButtonText: '查看详情',
        cancelButtonText: '取消',
        type: 'success'
      }).then(() => {
        this.$router.push({
          path: `/my_work/read/${this.publish_id}`,
          query: {
            id: this.publish_id
          }
        })
      }).catch(() => {
        this.$router.push('/my_work/list')
      })
    },
    getParams () {
      const param = {
        publish_id: this.publish_id,
        problem_answer: []
      }
      const answer = this.answer.answerItem
      this.subjectList.forEach((content, index) => {
        const item = content.problem_metadata
        if ((item.problem_type === 1) && item.content) {
          param.problem_answer.push({
            problem_id: item.problem_id,
            answer: [answer[index].content]
          })
        } else {
          param.problem_answer.push({
            problem_id: item.problem_id,
            answer: answer[index].contentArray
          })
        }
      })
      return param
    }
  }
}
</script>
