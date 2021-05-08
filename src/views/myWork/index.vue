<template>
  <div style="padding: 20px;">
    <el-form>
      <el-button type="primary">提交作业</el-button>
      <el-form-item v-for="(item, index) in subjectList" :key="index" :label="index + 1 + ''">
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
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { getSubjects } from '@/services/createSubject.js'
export default {
  data () {
    return {
      answer: [],
      subjectList: []
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
      console.log('走了吗')
      this.subjectList = data.problems || []
      const problemList = data.problems || []
      this.answer.push({ value: '' })
      console.log(problemList.lenght)
    },
    initAnswer () {

    }
  }
}
</script>
