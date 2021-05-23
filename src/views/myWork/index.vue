<template>
  <div style="padding: 20px;">
    <el-row>
      <el-col :span="18"><p>作业题目</p></el-col>
      <el-col :span="6">
        <el-button type="primary">提交作业</el-button>
      </el-col>
    </el-row>
    <el-form>
      <el-card class="exampaper-item-box" v-if="subjectList.length!==0">
        <el-form-item :key="questionItem.problem_id" :label="index+ 1 +'.'" v-for="(questionItem, index) in subjectList"
          class="exam-question-item" label-width="50px" :id="'question-'+ questionItem.problem_id">
          <QuestionEdit :qType="questionItem.problem_type" :question="questionItem.content" />
          <!-- :answer="answer.answerItems[questionItem.problem_id-1]" -->
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
      for (let tIndex in this.subjectList) {
        let questionArray = this.subjectList[tIndex].questionItems
        for (let qIndex in questionArray) {
          let question = questionArray[qIndex]
          this.answer.answerItems.push({ questionId: question.id, content: null, contentArray: [], completed: false, itemOrder: question.itemOrder })
        }
      }
      // const problemList = data.problems || []
      // this.answer.push({ value: '' })
      // console.log(problemList.lenght)
    },
    initAnswer () {

    },
    submitForm () {
      console.log('答案', this.answer)
    }
  }
}
</script>
