import 'highlight.js/styles/github.css'
import { setSubject } from './handleSubject.js'
import {
  ref,
  reactive
} from 'vue'
const visible = ref(false)
const subject = reactive({}) // 每个题目为一个对象
let editContent
const subjectType = ref('填空')
const score = ref(0)
const remarkContentRef = ref(null)
// 题目创建后反显
let edit = ref(null)

// 不同题型对应的数据
const stemRef = ref(null)
const singleChoiceRef = ref(null)
const multipleChoiceRef = ref(null)
const fillBlankRef = ref(null)
const subjectiveRef = ref(null)
const showSubjectRef = ref(null)
let editor = null

// 打开弹窗
const showModal = async () => {
  visible.value = true
}

const cancelModal = () => {
  editor && editor.destroy()
  editor = null
  if (subjectType.value === '单选') {
    if (singleChoiceRef.value.editorList && singleChoiceRef.value.editorList.length > 0) {
      singleChoiceRef.value.editorList.forEach((element) => {
        element.destroy()
      })
      singleChoiceRef.value.elementList = []
      singleChoiceRef.value.optionList = []
    }
    subjectType.value = '填空'
  }
}

// 题目类型改变
const selectChange = () => {
  if (editor) {
    editor.destroy()
    editor = null
  }
}

// 将填空的选项替换为输入框
// eslint-disable-next-line no-unused-vars
const replaceFill = (html) => {
  const temp = html.replace(/【填空】/g, '<input class="fillContent" style="margin: 10px;"/>')
  edit.value = temp
}
// replaceFill(stemRef.value.stemList[0].txt.html())
function processParam () {
  const param = {
    content: {
      score: score.value,
      body: stemRef.value.content.html
    }
  }
  console.log('题干内容----', stemRef.value.content.html)
  switch (subjectType.value) {
    case '单选':
      if (singleChoiceRef.value.editorList && singleChoiceRef.value.editorList.length > 0) {
        const result = singleChoiceRef.value.editorList.map((element, index) => {
          return { key: String.fromCharCode(65 + parseInt(index)), value: element.txt.text() }
        })
        param.content.options = result
      }
      param.problem_type = 1
      edit.value = param.content.options
      break

    case '多选':
      if (multipleChoiceRef.value.editorList && multipleChoiceRef.value.editorList.length > 0) {
        const result = multipleChoiceRef.value.editorList.map((element, index) => {
          return { key: String.fromCharCode(65 + parseInt(index)), value: element.txt.text() }
        })
        param.content.options = result
      }
      param.problem_type = 2
      break

    case '填空':
      param.problem_type = 3
      break

    case '主观':
      param.problem_type = 4
      break
  }
  setSubject(param)
}
// 创建题目完成
const handleOk = () => {
  processParam()
  // editContent = editor.txt.getJSON()
  // const html = editor.txt.html()
  // if (subjectType.value === '填空') {
  //   replaceFill(html)
  // } else {
  //   document.getElementById('edit').innerHTML = html
  // }
  cancelModal()
  visible.value = false
}

export {
  showModal,
  handleOk,
  editContent,
  visible,
  subjectType,
  selectChange,
  cancelModal,
  subject,
  singleChoiceRef,
  multipleChoiceRef,
  subjectiveRef,
  fillBlankRef,
  stemRef,
  score,
  edit,
  remarkContentRef,
  showSubjectRef
}
