<template>
  <div>
    <el-button type="primary" @click="addOption">增加选项</el-button>
    <el-checkbox-group v-model="checkedList" style="width: 100%">>
      <el-checkbox v-for="(item, index) in optionList" :value="index" :label="index" :key="item.key" style="width: 100%">
        <div class="check">
          <span class="title">选项{{String.fromCharCode(65 + parseInt(index))}}</span>
          <div class="option markdown" :id="'option_' + index"></div>
          <div class="minus"><i class="el-icon-remove-outline" @click="removeOption(item)" /></div>
        </div>
      </el-checkbox>
    </el-checkbox-group>
  </div>
</template>
<script>
import 'highlight.js/styles/github.css'
import editorConfig from '@/components/createSubject/editorConfig.js'
import Editor from 'wangeditor'
export default {
  data () {
    return {
      optionList: [],
      checkedList: [],
      result: {},
      editorList: []
    }
  },
  computed: {
    changeResult () {
      return this.checkedList.map(item => String.fromCharCode(parseInt(item) + 65))
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
  }
}
</script>
<style scoped>
.check {
  padding-top: 15px;
  display: flex;
  width: 600px;
}

.minus {
  font-size: 20px;
  padding-left: 10px;
  width: 30px;
}
.title {
  width: 50px;
}
.markdown {
  flex: 1;
}
</style>
