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
        <div class="minus"><i class="el-icon-minus" @click="removeOption(item)"></i></div>
      </a-radio>
    </a-radio-group>
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
      rightAnswer: '',
      optionList: [],
      result: {},
      editorList: []
    }
  },
  methods: {
    addOption () {
      this.optionList.push({ key: Date.now() })
      this.$nextTick(() => {
        const element = document.getElementById(`option_${this.optionList.length - 1}`)
        const temp = new Editor(element)
        editorConfig(temp)
        temp.create()
        this.editorList.push(temp)
      })
    },
    removeOption (item) {
      this.optionList.splice(item, 1)
      this.editorList.slice(item, 1)
    }
  },
  beforeDestroy () {
    if (this.optionList && this.optionList.length > 0) {
      this.optionList = []
      this.editorList.length > 0 && this.editorList.forEach(item => item && item.destroy())
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
