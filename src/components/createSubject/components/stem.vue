<template>
  <div id="subjectContent">
  </div>
</template>
<script>
import { onBeforeUnmount, onMounted, reactive, watch } from 'vue'
import fillMenu from '@/components/createSubject/fillMenu.js'
import editorConfig from '@/components/createSubject/editorConfig.js'
import Editor from 'wangeditor'
export default {
  props: {
    subjectType: String
  },
  setup (props) {
    let stemList = reactive([])
    const content = reactive({
      html: ''
    })
    // 用来创建输入框
    // let blankList = reactive([])
    let editor = reactive({})
    watch(() => props.subjectType, () => {
      destroyEditor()
      createEditor()
    })

    // 创建编辑器
    const createEditor = () => {
      editor = new Editor(document.getElementById('subjectContent'))
      if (props.subjectType === '填空') {
        const key = 'fillMenu'
        editor.menus.extend(key, fillMenu)
        editorConfig(editor)
        editor.config.menus.push(key)
   
      } else {
        editorConfig(editor)
      }
        editor.config.onchange = function (newHtml) {
          content.html = newHtml
        }
      editor.create()
      stemList.push(editor)
    }

    // 销毁编辑器 
    const destroyEditor = () => {
     if(stemList && stemList.length > 0) {
        stemList.forEach(item => item && item.destroy())
        stemList = []
      }
    }

    onMounted(() => {
      createEditor()
    })

    onBeforeUnmount(() => {
      destroyEditor()
    })
    return {
      content,
      editor,
      stemList
    }
  }
}
</script>