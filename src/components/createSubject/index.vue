<template>
  <div>
    <a-button type="primary" @click="showModal">创建题目</a-button>
    <div id="edit" v-html="edit"></div>
    <show-subject ref="showSubjectRef"></show-subject>
    <a-modal :visible="visible" title="创建题目" @ok="handleOk" @cancel="cancelModal" width="800px">
      <a-form v-bind="layout">
        <a-form-item label="题目类型">
          <a-select v-model="subjectType" style="width: 120px; margin: 10px;" ref="select" @change="selectChange">
            <a-select-option value="单选">单选题</a-select-option>
            <a-select-option value="多选">多选题</a-select-option>
            <a-select-option value="填空">填空题</a-select-option>
            <a-select-option value="主观">主观题</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="题干">
          <stem :subjectType="subjectType" ref="stemRef"></stem>
        </a-form-item>
        <a-form-item label="选项" v-if="subjectType === '单选' || subjectType === '多选'">
          <singleChoice ref="singleChoiceRef" v-if="subjectType === '单选'"></singleChoice>
          <multipleChoice ref="multipleChoiceRef" v-if="subjectType === '多选'"></multipleChoice>
        </a-form-item>
        <a-form-item label="备注">
          <remark></remark>
        </a-form-item>
        <a-form-item label="分值">
          <a-input-number v-model="score" :min="1" :max="10" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
<script>
import {
  showModal,
  handleOk,
  editContent,
  visible,
  subjectType,
  selectChange,
  cancelModal,
  singleChoiceRef,
  multipleChoiceRef,
  subjectiveRef,
  fillBlankRef,
  stemRef,
  score,
  edit,
  showSubjectRef
} from './index.js'
import showSubject from './showSubject.vue'
import remark from '@/components/createSubject/components/remark.vue'
import singleChoice from '@/components/createSubject/components/singleChoice.vue'
import multipleChoice from '@/components/createSubject/components/multipleChoice.vue'
import stem from '@/components/createSubject/components/stem.vue'
import { reactive, ref, onMounted, watch } from 'vue'
import { getSubject } from './handleSubject.js'
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
  setup () {
    onMounted(() => {
    })
    const layout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 20 }
    }
    watch(visible, (val) => {
      if (!val) {
        showSubjectRef.value.subjectList = getSubject()
      }
    })
    // 下拉框
    let editorOption = reactive({})
    let content = ref('')
    return {
      content,
      editContent,
      editorOption,
      visible,
      showModal,
      handleOk,
      subjectType,
      selectChange,
      cancelModal,
      singleChoiceRef,
      multipleChoiceRef,
      subjectiveRef,
      fillBlankRef,
      stemRef,
      score,
      layout,
      edit,
      showSubjectRef
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
