<template>
  <div style="line-height:1.8">
    <div v-if="qType==1">
      <div class="q-title" v-html="question.body" />
      <div class="q-content">
        <el-radio-group v-model="answer.content" disabled>
          <el-radio v-for="item in question.options" :key="item.key" :label="item.key">
            <span class="question-prefix">{{item.key}}.</span>
            <span v-html="item.value" class="q-item-span-content"></span>
          </el-radio>
        </el-radio-group>
        <div>{{isSubmit ? '' : '我的答案：暂无'}}</div>
        <div style="color: green; padding: 10px 0;">正确答案为：{{getRightAnswer}}</div>
      </div>
    </div>
    <div v-else-if="qType==2">
      <div class="q-title" v-html="question.body" />
      <div class="q-content">
        <el-checkbox-group v-model="answer.contentArray" disabled>
          <el-checkbox v-for="item in question.options" :label="item.key" :key="item.key">
            <span class="question-prefix">{{item.key}}.</span>
            <span v-html="item.value" class="q-item-span-content"></span>
          </el-checkbox>
        </el-checkbox-group>
      </div>
      <div style="color: green; padding: 10px 0;">正确答案为：{{getRightAnswer}}</div>
    </div>
    <div v-else-if="qType==3">
      <div class="q-title" v-html="question.body" />
      <div>
        <el-form-item :label="index + 1 + ''" :key="index" v-for="(item, index) in answer.contentArray"
          label-width="20px" style="margin-top: 10px;margin-bottom: 10px;" disabled>
          <el-input v-model="answer.contentArray[index]" style="width: 300px;" disabled/>
        </el-form-item>
      </div>
      <div style="color: green; padding: 10px 0;">正确答案为：{{getRightAnswer}}</div>
    </div>
    <div v-else-if="qType==4">
      <div class="q-title" v-html="question.body" />
      <div>
        <el-input v-model="answer.content" type="textarea" rows="5" />
      </div>
    </div>
    <div v-else>
    </div>
  </div>

</template>

<script>
export default {
  name: 'QuestionShow',
  props: {
    question: {
      type: Object,
      default: function () {
        return {}
      }
    },
    answer: {
      type: Object,
      default: function () {
        return { id: null, content: '', contentArray: [], doRight: false }
      }
    },
    qType: {
      type: Number,
      default: 0
    },
    isSubmit: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    getRightAnswer () {
      if (this.qType === 1 || this.qType === 2) {
        return this.question.answer.join(',')
      } else {
        const list = this.question.blanks.map(item => item.answers[0])
        return list.join(',')
      }
    }
  },
  methods: {
  },
  created () {
  }
}
</script>
