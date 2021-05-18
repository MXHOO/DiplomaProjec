<template>
  <div style="line-height:1.8">
    <div v-if="qType==1">
      <div class="q-title" v-html="question.body"/>
      <div class="q-content">
        <el-radio-group v-model="answer.content" @change="change" >
          <el-radio  v-for="item in question.options"  :key="item.key"  :label="item.key" >
            <span class="question-prefix">{{item.key}}.</span>
            <span v-html="item.value" class="q-item-span-content"></span>
          </el-radio>
        </el-radio-group>
      </div>
    </div>
    <div v-else-if="qType==2">
      <div class="q-title" v-html="question.body"/>
      <div class="q-content">
        <el-checkbox-group v-model="answer.contentArray" @change="answer.completed = true" >
          <el-checkbox v-for="item in question.options" :label="item.key" :key="item.key"  >
            <span class="question-prefix">{{item.key}}.</span>
            <span v-html="item.value" class="q-item-span-content"></span>
          </el-checkbox>
        </el-checkbox-group>
      </div>
    </div>
    <div v-else-if="qType==3">
      <div class="q-title" v-html="question.body"/>
      <div>
        <el-form-item :label="item.prefix" :key="item.prefix"  v-for="item in question.items"  label-width="50px" style="margin-top: 10px;margin-bottom: 10px;">
          <el-input v-model="answer.contentArray[item.prefix-1]"  @change="answer.completed = true" />
        </el-form-item>
      </div>
    </div>
    <div v-else-if="qType==4">
      <div class="q-title" v-html="question.body"/>
      <div>
        <el-input v-model="answer.content" type="textarea" rows="5"  @change="answer.completed = true"/>
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
        return { id: null, content: '', contentArray: [] }
      }
    },
    qType: {
      type: Number,
      default: 0
    }
  },
  created () {
    console.log('初始化答案', this.answer)
  },
  methods: {
    change () {
      console.log('切换答案', this.answer)
    }
  }
}
</script>
