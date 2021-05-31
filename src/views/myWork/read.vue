<template>
  <div style="margin: 20px;">
    <el-row class="do-exam-title" style="background-color: #F5F5DC">
      <el-col :span="24">
        <!-- <span :key="item.itemOrder"  v-for="item in answer.answerItems">
             <el-tag :type="questionDoRightTag(item.doRight)" class="do-exam-title-tag" @click="goAnchor('#question-'+item.itemOrder)">{{item.itemOrder}}</el-tag>
        </span> -->
      </el-col>
    </el-row>
    <!-- <el-row  class="do-exam-title-hidden">
    <el-col :span="24">
        <span :key="item.itemOrder"  v-for="item in answer.answerItems">
             <el-tag  class="do-exam-title-tag" >{{item.itemOrder}}</el-tag>
        </span>
    </el-col>
  </el-row> -->
    <el-container class="app-item-contain">
      <el-header class="align-center">
        <h1>{{form.name}}</h1>
        <div>
          <span class="question-title-padding">作业：{{homework.homework && homework.homework.homework_name}}</span>
          <span class="question-title-padding">总分：{{homework.total_score}}</span>
          <span class="question-title-padding">作业得分：{{homework.user_score}}</span>
        </div>
      </el-header>
      <el-main>
        <el-card class="exampaper-item-box" v-if="subjectList.length!==0">
          <el-form>
            <el-form-item :key="questionItem.problem_id" :label="index+ 1 +'.'"
              v-for="(questionItem, index) in getCpmputedList" class="exam-question-item" label-width="50px"
              :id="'question-'+ questionItem.problem_id">
              <QuestionShow ref="test" :qType="questionItem.problem_type" :question="questionItem.content"
                :answer="submitList[index]" :isSubmit="isSubmitList[index]"/>
            </el-form-item>
          </el-form>

        </el-card>
      </el-main>
    </el-container>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { getMyWorkList, getHomeworkDetail } from '@/services/myWork.js'
// import { formatSeconds } from '@/utils'
import QuestionShow from './components/questionShow'
// import examPaperAnswerApi from '@/api/examPaperAnswer'
export default {
  components: { QuestionShow },
  data () {
    return {
      publish_id: this.$route.query.id,
      form: {},
      formLoading: false,
      answer: {
        id: null,
        score: 0,
        doTime: 0,
        answerItems: [],
        doRight: false
      },
      subjectList: [],
      rules: [],
      homework: {},
      submitList: []
    }
  },
  async created () {
    await this.getList()
    this.getSubmitAnswer()
  },
  methods: {
    goAnchor (selector) {
      this.$el.querySelector(selector).scrollIntoView({ behavior: 'instant', block: 'center', inline: 'nearest' })
    },
    async getList () {
      const { data } = await getHomeworkDetail({ publish_id: this.publish_id })
      this.subjectList = data.problems || []
      this.rules = data.rules
      this.homework = data
      const self = this
      this.subjectList.forEach((item, index) => {
        self.answer.answerItems.push({ questionId: self.subjectList[index].problem_metadata.problem_id, content: null, contentArray: [], completed: false })
      })
    },
    replaceFill (html) {
      const temp = html.replace(/【填空】/g, '&nbsp;____&nbsp;')
      return temp
    },
    getSubmitAnswer () {
      this.subjectList.forEach(item => {
        if (item.has_submit_answer) {
          switch (item.problem_metadata.problem_type) {
            case 1:
              this.submitList.push({ questionId: item.problem_metadata.problem_id, content: item.submit_answer[0] })
              break
            case 2:
              this.submitList.push({ questionId: item.problem_metadata.problem_id, contentArray: item.submit_answer })
              break
            case 3:
              this.submitList.push({ questionId: item.problem_metadata.problem_id, contentArray: item.submit_answer })
              break
            case 4:
              this.submitList.push({ questionId: item.problem_metadata.problem_id, content: item.submit_answer[0] })
          }
        } else {
          this.submitList.push({ questionId: item.problem_metadata.problem_id, content: null, contentArray: [] })
        }
      })
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
    },
    isSubmitList () {
      return this.subjectList.map(item => item.has_submit_answer)
    }
  }
}
</script>

<style lang="scss" scoped>
.align-center {
  text-align: center;
}

.exam-question-item {
  padding: 10px;
  .el-form-item__label {
    font-size: 15px !important;
  }
}

.question-title-padding {
  padding-left: 25px;
  padding-right: 25px;
}
</style>
