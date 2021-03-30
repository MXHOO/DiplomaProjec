<template>
  <div>
    <a-row>
    <a-col :span="18">
      <a-form layout="inline">
        <a-form-item>
          <a-input v-model="work.homework_id" placeholder="请输入作业ID"></a-input>
        </a-form-item>
        <a-form-item>
          <a-input v-model="work.homework_name" placeholder="请输入作业名称"></a-input>
        </a-form-item>
        <a-form-item>
          <a-select placeholder="请输入班级" v-model="className" style="width: 160px;">
            <!-- <a-select-option></a-select-option> -->
          </a-select>
        </a-form-item>
         <a-form-item>
          <a-button type="primary" @click="search">搜索</a-button>
        </a-form-item>
      </a-form>
    </a-col>
    <a-col :span="6"><a-button type="primary" @click="showModal">创建作业</a-button></a-col>
    </a-row>
    <!-- <a-table :columns="columns" :pagination="{ pageSize: 10 }" :data-source="tableList" rowKey="homework_id">
      <template>
      </template>
    </a-table>
    <a-modal title="创建作业"  v-model:visible="visible" @cancel="cancelModal" @ok="handleOk">
      <a-form :model="work" v-bind="layout" :rules="rules">
        <a-form-item label="作业名字" placeholder="请输入作业名字" name="homework_name">
          <a-input v-model:value="work.homework_name"></a-input>
        </a-form-item>
        <a-form-item label="作业须知" placeholder="请输入作业须知" name="homework_notice">
          <a-textarea v-model:value="work.homework_notice"></a-textarea>
        </a-form-item>
      </a-form>
    </a-modal>
    <div id="edit"></div> -->
  </div>
</template>
<script>
import { createWork } from '@/services/createWork.js'
export default {
  data () {
    return {
      work: {
        homework_name: '',
        homework_notice: ''
      },
      layout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 }
      },
      rules: {
        homework_name: [{ trigger: 'blur', required: true, message: '请输入作业名称' }],
        homework_notice: [{ trigger: 'blur', required: true, message: '请输入作业须知' }],
        columns: [
          {
            title: '作业名字',
            dataIndex: 'homework_name',
            align: 'center'
          },
          {
            title: '作业须知',
            dataIndex: 'homework_notice',
            align: 'center'
          },
          {
            title: '最后修改时间',
            dataIndex: 'last_modified_time',
            align: 'center'
          },
          {
            title: '操作',
            dataIndex: 'opearte',
            slots: { customRender: 'operation' }
          }
        ],
        tableList: [...Array(100)].map((_, i) => ({
          homework_id: i,
          homework_name: '测试数据',
          homework_notice: '作业须知',
          last_modified_time: `20210310`
        }))
      },
      className: '',
      visible: false
    }
  },
  methods: {
    showModal () {
      this.visible.value = true
    },
    cancelModal () {
      this.visible.value = false
    },
    async handleOk () {
      const { data } = await createWork(this.work)
      console.log(data)
    }
  }
}
</script>
