<template>
  <div id="total"></div>
</template>
<script>
import { getDataAsy } from '@/services/myWork'
export default {
  data () {
    return {
      total: {}
    }
  },
  created () {
    this.getData()
  },
  methods: {
    async getData () {
      const { data } = await getDataAsy()
      this.total = data
      console.log('数据统计', this.total)
    }
  }
}
</script>
