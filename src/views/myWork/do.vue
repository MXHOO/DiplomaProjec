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
        <el-form-item :key="questionItem.problem_id" :label="index+ 1 +'.'" v-for="(questionItem, index) in subjectList"
          class="exam-question-item" label-width="50px" :id="'question-'+ questionItem.problem_id">
          <QuestionEdit :qType="questionItem.problem_type" :question="questionItem.content"
            :answer="answer.answerItem[index]" />
        </el-form-item>
      </el-card>

      <!-- <el-form-item v-for="(item, index) in subjectList" :key="index" :label="index + 1 + ''">
        <span v-if="item && (item.problem_type === 1 || item.problem_type === 2 || item.problem_type === 4)" v-html="item.content.body"></span>
        <span v-if="item.problem_type === 3" v-html="replaceFill(item.content.body)"></span>
        <div v-if="item && item.problem_type === 1">
          <el-radio-group v-model="radio">
            <el-radio style="display: block; line-height: 30px; height: 30px;"
              v-for="(option,select_index) in item.content.options" :key="select_index" :value="option.key"
              :label="option.key">
              {{option.key}}. {{option.value}}
            </el-radio>
          </el-radio-group>
        </div>

        <div v-if="item && item.problem_type === 2">
          <el-checkbox-group v-model="check">
            <el-checkbox v-for="(option,select_index) in item.content.options" :key="select_index" :value="option.key">
              {{option.key}}. {{option.value}}
            </el-checkbox>
          </el-checkbox-group>
        </div>

        <div v-if="item && item.problem_type === 3">
        </div>

        <div v-if="item && item.problem_type === 4"/>
      </el-form-item> -->
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
  created () {
    this.getList()
  },
  methods: {
    replaceFill (html) {
      const temp = html.replace(/【填空】/g, '<input class="fillContent" style="margin: 10px;"/>')
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
        self.answer.answerItem.push({ questionId: self.subjectList[index].problem_id, content: null, contentArray: [], completed: false })
      })
      // const problemList = data.problems || []
      // this.answer.push({ value: '' })
      // console.log(problemList.lenght)
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
          console.log('_____')
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
        if ((item.problem_type === 1 || item.problem_type === 3) && item.content) {
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
