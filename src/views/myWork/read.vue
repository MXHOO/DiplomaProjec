<template>
<div>
  <el-row  class="do-exam-title" style="background-color: #F5F5DC">
    <el-col :span="24">
        <span :key="item.itemOrder"  v-for="item in answer.answerItems">
             <el-tag :type="questionDoRightTag(item.doRight)" class="do-exam-title-tag" @click="goAnchor('#question-'+item.itemOrder)">{{item.itemOrder}}</el-tag>
        </span>
    </el-col>
  </el-row>
  <el-row  class="do-exam-title-hidden">
    <el-col :span="24">
        <span :key="item.itemOrder"  v-for="item in answer.answerItems">
             <el-tag  class="do-exam-title-tag" >{{item.itemOrder}}</el-tag>
        </span>
    </el-col>
  </el-row>
  <el-container  class="app-item-contain">
    <el-header class="align-center">
      <h1>{{form.name}}</h1>
      <div>
        <span class="question-title-padding">作业得分：{{answer.score}}</span>
      </div>
    </el-header>
    <el-main>
      <el-form :model="form" ref="form" v-loading="formLoading" label-width="100px">
        <el-row :key="index"  v-for="(titleItem,index) in form.titleItems">
          <h3>{{titleItem.name}}</h3>
          <el-card class="exampaper-item-box" v-if="subjectList.length!==0">
            <el-form-item :key="questionItem.problem_id" :label="index+ 1 +'.'"
                          v-for="questionItem in subjectList"
                          class="exam-question-item"  label-width="50px" :id="'question-'+ questionItem.itemOrder">
              <QuestionAnswerShow :qType="questionItem.problem_type" :question="questionItem.content"  :answer="answer.answerItem[index]"/>
            </el-form-item>
          </el-card>
        </el-row>
      </el-form>
    </el-main>
  </el-container>
</div>
</template>

<script>
import { getSubjects } from '@/services/createSubject.js'
// eslint-disable-next-line no-unused-vars
import { getMyWorkList, getHomeworkDetail } from '@/services/myWork.js'
import { mapState, mapGetters } from 'vuex'
// import { formatSeconds } from '@/utils'
import QuestionAnswerShow from './components/questionShow'
// import examPaperAnswerApi from '@/api/examPaperAnswer'
export default {
  components: { QuestionAnswerShow },
  data () {
    return {
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
      homework: ''
    }
  },
  created () {
    this.getList()
  },
  methods: {
    questionDoRightTag (status) {
      return this.enumFormat(this.doRightTag, status)
    },
    goAnchor (selector) {
      this.$el.querySelector(selector).scrollIntoView({ behavior: 'instant', block: 'center', inline: 'nearest' })
    },
    async getList () {
      const { data } = await getSubjects({ homework_id: 15 })
      this.subjectList = data.problems || []
      this.rules = data.rules
      this.homework = data.homework
      const self = this
      this.subjectList.forEach((item, index) => {
        self.answer.answerItem.push({ questionId: self.subjectList[index].problem_id, content: null, contentArray: [], completed: false })
      })
    }
  },
  computed: {
    ...mapGetters('enumItem', ['enumFormat']),
    ...mapState('enumItem', {
      doRightTag: state => state.exam.question.answer.doRightTag
    })
  }
}
</script>

<style lang="scss" scoped>
  .align-center {
    text-align: center
  }

  .exam-question-item{
    padding: 10px;
    .el-form-item__label{
      font-size: 15px !important;
    }
  }

  .question-title-padding{
    padding-left: 25px;
    padding-right: 25px;
  }
</style>
