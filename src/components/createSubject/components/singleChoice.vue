<template>
  <div>
    <div>
      <el-button type="primary" @click="addOption" size="small">增加选项</el-button>
    </div>
    <div>
      <el-radio-group v-model="rightAnswer" style="width: 100%;">
        <el-radio v-for="(item, index) in optionList" :value="index" :label="index" :key="item.key"
          @change="changeRadio" style="width: 100%; margin-top: 10px;" >
          <div class="radio">
            <span class="title">选项{{String.fromCharCode(65 + parseInt(index))}}</span>
            <div class="markdown" :id="'option_' + index"></div>
            <div class="minus"><i class="el-icon-remove-outline" @click="removeOption(item)"></i></div>
          </div>
        </el-radio>
      </el-radio-group>
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
    },
    changeRadio () {
      // console.log('切换radio.并获取焦点')
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
el-radio__input {
  display: flex;
}
.radio {
  display: flex;
}
.minus {
  font-size: 20px;
  padding-left: 10px;
  width: 50px;
}
.title {
  padding-top: 5px;
  padding-bottom: 15px;
  width: 50px;
}
.markdown {
  flex: 1;
}
</style>
