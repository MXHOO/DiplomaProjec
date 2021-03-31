<template>
  <div id="subjectContent">
  </div>
</template>
<script>
import fillMenu from '@/components/createSubject/fillMenu.js'
import editorConfig from '@/components/createSubject/editorConfig.js'
import Editor from 'wangeditor'
export default {
  props: {
    subjectType: String
  },
  data () {
    return {
      content: {
        html: ''
      },
      stemList: [],
      editor: {}
    }
  },
  watch: {
    subjectType: {
      handler: function () {
        this.destroyEditor()
        this.createEditor()
      }
    }
  },
  methods: {
    createEditor () {
      this.editor = new Editor(document.getElementById('subjectContent'))
      if (this.subjectType === '填空') {
        const key = 'fillMenu'
        this.editor.menus.extend(key, fillMenu)
        editorConfig(this.editor)
        this.editor.config.menus.push(key)
      } else {
        editorConfig(this.editor)
      }
      this.editor.config.onchange = function (newHtml) {
        this.content.html = newHtml
      }
      this.editor.create()
      this.stemList.push(this.editor)
    },
    destroyEditor () {
      if (this.stemList && this.stemList.length > 0) {
        this.stemList.forEach(item => item && item.destroy())
        this.stemList = []
      }
    }
  },
  mounted () {
    this.createEditor()
  },
  beforeMount () {
    this.destroyEditor()
  }
}
</script>
