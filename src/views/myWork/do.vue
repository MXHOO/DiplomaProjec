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
          <QuestionEdit :qType="questionItem.problem_type" :question="questionItem.content"
            :answer="answer.answerItem[index]" />
        </el-form-item>
      </el-card>
    </el-form>
  </div>
</template>
<script>
import QuestionEdit from './components/questionEdit'
import { getSubjects } from '@/services/createSubject.js'
export default {
  components: {
    QuestionEdit
  },
  data () {
    return {
      homework_id: '111',
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
      this.subjectList.forEach(item => {
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
      const { data } = await getSubjects({ homework_id: 15 })
      this.subjectList = data.problems || []
      this.rules = data.rules
      this.homework = data.homework
      const self = this
      this.subjectList.forEach((item, index) => {
        let temp = []
        if (item.problem_type === 3) {
          temp = item.content.body.match(/【填空】/g) || []
        }
        if (Array.isArray(temp) && temp.length > 0) {
          self.answer.answerItem.push({ questionId: self.subjectList[index].problem_id, content: null, contentArray: temp.map(item => null), completed: false })
        } else {
          self.answer.answerItem.push({ questionId: self.subjectList[index].problem_id, content: null, contentArray: [], completed: false })
        }
      })
    },
    initAnswer () {

    },
    submitForm () {
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
        }).then(() => {
          console.log('提交答案', this.answer, this.getParams())
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消提交'
          })
        })
      }
    },
    getParams () {
      const param = {
        homework_id: this.homework_id,
        problem_answer: []
      }
      const answer = this.answer.answerItem
      this.subjectList.forEach((item, index) => {
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
