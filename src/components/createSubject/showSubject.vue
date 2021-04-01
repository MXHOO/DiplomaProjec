<template>
  <div>
    <el-form>
      <el-form-item v-for="(item, index) in subjectList" :key="index" :label="index + 1 + ''">
        <span v-html="item.content.body"></span>
        <div v-if="item && item.problem_type === 1">
          <el-radio-group>
            <el-radio style="display: block; line-height: 30px; height: 30px;"
              v-for="(option,select_index) in item.content.options" :key="select_index" :value="option.key"
              :label="option.key">
              {{option.key}}. {{option.value}}
            </el-radio>
          </el-radio-group>
        </div>

        <div v-if="item && item.problem_type === 2">
          <el-checkbox-group>
            <el-checkbox v-for="(option,select_index) in item.content.options" :key="select_index" :value="option.key">
              {{option.key}}. {{option.value}}
            </el-checkbox>
          </el-checkbox-group>
        </div>

        <div v-if="item && item.problem_type === 3"/>

        <div v-if="item && item.problem_type === 4"/>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { getSubject } from './handleSubject'
export default {
  data () {
    return {
      subjectList: getSubject() || []

    }
  },
  computed: {
  },
  methods: {
    answerList () {
      return this.subjectList.length.fill(null)
    }
  }
}
</script>
