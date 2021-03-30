<template>
  <div>
    <a-form>
      <a-form-item v-for="(item, index) in subjectList" :key="index" :label="index + 1">
        <span v-html="item.content.body"></span>
        <div v-if="item && item.problem_type === 1">
          <a-radio-group>
            <a-radio style="display: block; line-height: 30px; height: 30px;"
              v-for="(option,select_index) in item.content.options" :key="select_index" :value="option.key"
              :label="option.key">
              {{option.key}}. {{option.value}}
            </a-radio>
          </a-radio-group>
        </div>

        <div v-if="item && item.problem_type === 2">
          <a-checkbox-group>
            <a-checkbox v-for="(option,select_index) in item.content.options" :key="select_index" :value="option.key">
              {{option.key}}. {{option.value}}
            </a-checkbox>
          </a-checkbox-group>
        </div>

        <div v-if="item && item.problem_type === 3">
          <div></div>
        </div>

        <div v-if="item && item.problem_type === 4">
        </div>
      </a-form-item>
    </a-form>
  </div>
</template>
<script>
import { reactive, watch } from 'vue'
import { getSubject } from './handleSubject'
export default {
  setup () {
    let subjectList = reactive([])
    subjectList = getSubject() || []
    watch(() => subjectList, val => {
      subjectList = val
    })
    const length = subjectList.length || 0
    let answerList = reactive([])
    answerList = new Array(length).fill(null)
    return {
      subjectList,
      answerList
    }
  }
}
</script>
