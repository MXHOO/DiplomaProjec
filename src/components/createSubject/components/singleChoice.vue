<template>
 <div>
    <div>
    <a-button type="primary" @click="addOption">增加选项</a-button>
  </div>
  <div>
    <a-radio-group :a-radio-groupvalue="rightAnswer">
      <a-radio class="radio" v-for="(item, index) in optionList" :value="index" :label="index" :key="item.key">
        <p class="title">选项{{String.fromCharCode(65 + parseInt(index))}}</p>
        <div  class="option markdown" :id="'option_' + index"></div>
        <div class="minus"><MinusCircleOutlined @click="removeOption(item)"/></div>
      </a-radio>
    </a-radio-group>
  </div>
 </div>
</template>
<script>
import { MinusCircleOutlined } from '@ant-design/icons-vue'
import { nextTick, onBeforeUnmount, reactive, ref } from 'vue'
import 'highlight.js/styles/github.css'
import editorConfig from '@/components/createSubject/editorConfig.js'
import Editor from 'wangeditor'
export default {
  components: {
    MinusCircleOutlined
  },
  setup () {
    const rightAnswer = ref('')
    let optionList = reactive([])
    const result = reactive({})

    // 新增选项
    let editorList = reactive([])
    const addOption = function () {
      optionList.push({ key: Date.now() })
      nextTick(() => {
        const element = document.getElementById(`option_${optionList.length - 1}`)
        const temp = new Editor(element)
        editorConfig(temp)
        temp.create()
        editorList.push(temp)
      })
    }

    // 移除选项
    const removeOption = function (item) {
      optionList.splice(item, 1)
      editorList.slice(item, 1)
    }

    onBeforeUnmount(() => {
      if (optionList && optionList.length > 0) {
        optionList = []
        editorList.length > 0 && editorList.forEach(item => item && item.destroy())
      }
    })

    return {
      optionList,
      rightAnswer,
      addOption,
      removeOption,
      result,
      editorList
    }
  }
}
</script>
<style scoped>
.radio {
  display: block;
  position: relative;
}
.title .minus .markdown{
  position: absolute;
}
.title {
  width: 30px;
}
.markdown {
  top: 0;
  left: 30px;
}
</style>
