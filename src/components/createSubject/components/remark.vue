<template>
  <div>
    <el-checkbox v-model="checked">添加答案解析</el-checkbox>
    <div id="remarkContent" ref="remarkContentRef"/>
  </div>
</template>
<script>
import 'highlight.js/styles/github.css'
import editorConfig from '@/components/createSubject/editorConfig.js'
import Editor from 'wangeditor'
export default {
  data () {
    return {
      editor: null,
      checked: false,
      content: ''
    }
  },
  beforeDestroy () {
    if (this.editor) {
      this.editor.destroy()
      this.editor = null
    }
  },
  watch: {
    checked: {
      handler: function (val) {
        if (val) {
          this.createE()
        } else {
          if (this.editor) {
            this.editor.destroy()
            this.editor = null
          }
        }
      }
    }

  },
  methods: {
    createE () {
      this.editor = new Editor(document.getElementById('remarkContent'))
      editorConfig(this.editor)
      this.editor.create()
    }
  }
}
</script>
