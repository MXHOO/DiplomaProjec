<template>
  <div>
    <el-form>
      <el-form-item v-for="(item, index) in subjectList" :key="index">
        <el-row>
          <el-col :span="1" style="font-size: 20px; margin-top: 1rem;" >
            <span class="delete"><i class="el-icon-remove-outline" @click="deleteSubject(item.problem_id, index+ 1)"></i>
            </span>
            <span style="margin-left: 10px;">{{index + 1}}.</span>
          </el-col>
          <el-col :span="22"> <span
              v-if="item && (item.problem_type === 1 || item.problem_type === 2 || item.problem_type === 4)"
              v-html="item.content.body"></span>
            <span v-if="item.problem_type === 3" v-html="replaceFill(item.content.body)"></span>
            <div v-if="item && item.problem_type === 1">
              <el-radio-group v-model="radio">
                <el-radio style="display: block; line-height: 30px; height: 30px;"
                  v-for="(option,select_index) in item.content.options" :key="select_index" :value="option.key"
                  :label="option.key">
                  {{option.key}}. {{option.value}}
                </el-radio>
              </el-radio-group>
            </div>

            <div v-if="item && item.problem_type === 2">
              <el-checkbox-group v-model="check">
                <el-checkbox v-for="(option,select_index) in item.content.options" :key="select_index"
                  :value="option.key">
                  {{option.key}}. {{option.value}}
                </el-checkbox>
              </el-checkbox-group>
            </div>

            <div v-if="item && item.problem_type === 3">
            </div>

            <div v-if="item && item.problem_type === 4" />
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data () {
    return {
      subjectList: [],
      check: [],
      radio: ''
    }
  },
  computed: {
    rightAnswer () {
      return ''
    }
  },
  methods: {
    answerList () {
      return this.subjectList.length.fill(null)
    },
    replaceFill (html) {
      const temp = html.replace(/【填空】/g, '&nbsp;___&nbsp;')
      return temp
    },
    deleteSubject (id, index) {
      this.$confirm(`确认移除改题目 ${index} ？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$emit('delete', id)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>
<style scoped>
p {
  margin: 0;
  padding: 0;
}
.delete:hover {
  cursor: pointer;
  color: coral;
}
</style>
