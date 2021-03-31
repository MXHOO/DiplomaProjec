<template>
  <div>
    <p>
      <a-checkbox :checked="checked">添加答案解析</a-checkbox>
    </p>
    <div id="remarkContent" ref="remarkContentRef">
    </div>
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
      checked: false
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
