<template>
  <div>
    <p> <a-checkbox :checked="checked">添加答案解析</a-checkbox></p>
  <div id="remarkContent" ref="remarkContentRef">
  </div>
  </div>
</template>
<script>
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import 'highlight.js/styles/github.css'
import editorConfig from '@/components/createSubject/editorConfig.js'
import Editor from 'wangeditor'
export default {
  setup () {
    let editor = null
    let checked = ref(false)
    onMounted(() => {
    })
    onBeforeUnmount(() => {
      if (editor) {
        editor.destroy()
        editor = null
      }
    })
    function createE () {
      editor = new Editor(document.getElementById('remarkContent'))
      editorConfig(editor)
      editor.create()
    }
    watch(checked, (val) => {
      if (val) {
        createE()
      } else {
        if (editor) {
          editor.destroy()
          editor = null
        }
      }
    })
    return {
      checked,
      editor
    }
  }
}
</script>
