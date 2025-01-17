<template>
  <div>
    <el-row>
      <h1>{{$route.query.name}}</h1>
    </el-row>
    <el-button type="primary" @click="showModal" style="margin: 20px;" size="small">创建题目</el-button>
    <!-- v-if="problem_ids.length > 0" -->
    <el-button type="danger" @click="save" style="margin: 20px 0;" size="small">保存作业</el-button>
    <show-subject ref="showSubjectRef" @delete="deleteSubject"></show-subject>
    <el-dialog :visible="visible" title="创建题目" @close="cancelModal" width="800px">
      <el-form label-width="100px">
        <el-form-item label="题目类型">
          <el-select v-model="subjectType" style="width: 120px; margin: 10px;" ref="select" @change="selectChange">
            <el-option value="单选">单选题</el-option>
            <el-option value="多选">多选题</el-option>
            <el-option value="填空">填空题</el-option>
            <el-option value="主观">主观题</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="题干">
          <stem :subjectType="subjectType" ref="stemRef" @fill="fill"></stem>
        </el-form-item>
        <el-form-item label="选项" v-if="subjectType === '单选' || subjectType === '多选'">
          <singleChoice ref="singleChoiceRef" v-if="subjectType === '单选'"></singleChoice>
          <multipleChoice ref="multipleChoiceRef" v-if="subjectType === '多选'"></multipleChoice>
        </el-form-item>
        <div v-if="subjectType === '填空'">
          <div v-for="(item,i) in fillList" :key="i">
            <el-form-item label="是否模糊匹配">
              <el-radio-group v-model="item.case_sensitive">
                <el-radio :label="true">是</el-radio>
                <el-radio :label="false">否</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="答案">
              <el-input v-model="item.content" style="width: 300px;"></el-input>
            </el-form-item>
            <el-form-item label="分值">
              <el-input-number v-model="item.score" :min="1" :max="10" />
            </el-form-item>
          </div>
        </div>
        <el-form-item label="备注">
          <remark ref="remark"></remark>
        </el-form-item>
        <el-form-item label="分值" v-if="subjectType === '单选' || subjectType === '多选' || subjectType === '主观'">
          <el-input-number v-model="score" :min="1" :max="10" />
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button type="primary" @click="handleOk">确定</el-button>
        <el-button @click="cancelModal">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import showSubject from './showSubject.vue'
import 'highlight.js/styles/github.css'
import remark from '@/components/createSubject/components/remark.vue'
import singleChoice from '@/components/createSubject/components/singleChoice.vue'
import multipleChoice from '@/components/createSubject/components/multipleChoice.vue'
import stem from '@/components/createSubject/components/stem.vue'
import { getSubjects, createProblem, saveHomework } from '@/services/createSubject.js'
import { mapGetters } from 'vuex'
export default {
  components: {
    singleChoice,
    multipleChoice,
    stem,
    remark,
    showSubject
  },
  props: {
    user: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      homework_id: '',
      homework_name: '',
      editorOption: {},
      content: '',
      score: '',
      edit: '',
      editor: null,
      visible: false,
      subjectType: '',
      fillList: [],
      blanks: [
        {
          case_sensitive: false,
          fuzzy_match: true,
          answers: [
            'aada'
          ],
          score: this.score
        }
      ]
    }
  },
  watch: {
    // visible: {
    //   handler: function (val) {
    //     if (!val) {
    //       this.$refs.showSubjectRef.subjectList = this.getSubjectList
    //     }
    //   }
    // }
  },
  created () {
    this.homework_id = this.$route.params.homework_id
    this.getAllSubject()
    // console.log('problem_ids', this.problem_ids)
  },
  computed: {
    ...mapGetters({
      'problem_ids': 'subject/getSubjectIds',
      'getSubjectList': 'subject/getSubjectList'
    })
  },
  methods: {
    fill (num) {
      const list = []
      for (let i = 0; i < num; i++) {
        list[i] = {
          content: '',
          case_sensitive: '',
          score: 1
        }
      }
      this.fillList = list
    },
    async getAllSubject () {
      const { data } = await getSubjects({ homework_id: this.homework_id })
      this.$refs.showSubjectRef.subjectList = data.problems
    },
    async save () {
      const ids = this.$refs.showSubjectRef.subjectList.map(item => item.problem_id)
      await saveHomework({ 'homework_id': this.homework_id, 'problem_ids': ids })
      this.$notify.success('作业保存成功！')
      this.getAllSubject()
    },
    deleteSubject (id) {
      let flag = false
      let i = -1
      this.$refs.showSubjectRef.subjectList.forEach((item, index) => {
        if (item.problem_id === id) {
          flag = true
          i = index
        }
      })

      if (flag) {
        this.$refs.showSubjectRef.subjectList.splice(i, 1)
        this.$set(this.$refs.showSubjectRef.subjectList)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      } else {
        this.$message.error('删除失败！')
      }
    },
    showModal () {
      this.visible = true
    },
    async processParam () {
      const param = {
        content: {
          score: this.score,
          body: this.$refs.stemRef.content.html,
          has_remark: this.$refs.remark.checked
        }
      }
      if (this.$refs.remark.checked) {
        param.content.remark = this.$refs.remark.editor.txt.text()
      }
      switch (this.subjectType) {
        case '单选':
          if (this.$refs.singleChoiceRef.editorList && this.$refs.singleChoiceRef.editorList.length > 0) {
            const result = this.$refs.singleChoiceRef.editorList.map((element, index) => {
              return { key: String.fromCharCode(65 + parseInt(index)), value: element.txt.text() }
            })
            param.content.options = result
          }
          param.problem_type = 1
          param.content.answer = [`${String.fromCharCode(65 + parseInt(this.$refs.singleChoiceRef.rightAnswer))}`]
          this.edit = param.content.options
          break

        case '多选':
          if (this.$refs.multipleChoiceRef.editorList && this.$refs.multipleChoiceRef.editorList.length > 0) {
            const result = this.$refs.multipleChoiceRef.editorList.map((element, index) => {
              return { key: String.fromCharCode(65 + parseInt(index)), value: element.txt.text() }
            })
            param.content.options = result
            // console.log('多选', result)
          }
          param.content.options_rules = 0
          param.content.half_score = 5
          param.content.answer = this.$refs.multipleChoiceRef.changeResult
          param.problem_type = 2
          break

        case '填空':
          param.problem_type = 3
          param.content.blanks = this.fillList.map(item => {
            return {
              fuzzy_match: false,
              case_sensitive: item.case_sensitive,
              answers: [item.content],
              score: item.score
            }
          })
          let num = 0
          this.fillList.forEach(item => { num = num + item.score })
          param.content.score = num
          break

        case '主观':
          param.problem_type = 4
          break
      }
      // eslint-disable-next-line no-unused-vars
      const { data } = await createProblem(param)
      this.$notify.success('题目创建成功！')
      param.problem_id = data
      this.$refs.showSubjectRef.subjectList.push(param)
      this.$store.commit('subject/setSubjectList', param)
    },
    replaceFill (html) {
      const temp = html.replace(/【填空】/g, '<input class="fillContent" style="margin: 10px;"/>')
      this.edit = temp
    },
    handleOk () {
      this.processParam()
      // editContent = editor.txt.getJSON()
      // const html = editor.txt.html()
      // if (subjectType.value === '填空') {
      //   replaceFill(html)
      // } else {
      //   document.getElementById('edit').innerHTML = html
      // }
      this.cancelModal()
      this.visible = false
    },
    cancelModal () {
      this.editor && this.editor.destroy()
      this.editor = null
      if (this.subjectType === '单选') {
        if (this.$refs.singleChoiceRef.editorList && this.$refs.singleChoiceRef.editorList.length > 0) {
          this.$refs.singleChoiceRef.editorList.forEach((element) => {
            element.destroy()
          })
          this.$refs.singleChoiceRef.elementList = []
          this.$refs.singleChoiceRef.optionList = []
        }
        this.subjectType = '填空'
      }
      this.visible = false
      this.subjectType = ''
    },
    // 题目类型改变
    selectChange () {
      if (this.editor) {
        this.editor.destroy()
        this.editor = null
      }
    }
  }
}
</script>
<style scoped>
input {
  border-radius: 4px;
  margin: 5px;
}
blockquote {
  display: block;
  border-left: 8px solid #d0e5f2;
  padding: 5px 10px;
  margin: 10px 0;
  line-height: 1.4;
  font-size: 100%;
  background-color: #f1f1f1;
}
</style>
