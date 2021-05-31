<template>
  <div class="app-container">
    <div>
      <el-row :gutter="20">
        <el-col :span="18" :xs="24">
          <el-card>
            <el-tabs active-name="account">
              <el-tab-pane label="账号" name="account" :lazy="true">
                <account :userInfo="userInfo"  />
              </el-tab-pane>
            </el-tabs>
          </el-card>
        </el-col>

      </el-row>
    </div>
  </div>
</template>

<script>
// import UserCard from './components/UserCard'
// import Timeline from './components/Timeline'
import Account from './components/Account'
import userApi from '@/api/user'

export default {
  name: 'Profile',
  data () {
    return {
      userInfo: {
        realName: '',
        phone: '',
        lastActiveTime: '',
        createTime: '',
        role: '1',
        imagePath: null
      }
    }
  },
  components: { Account },
  created () {
    let _this = this
    userApi.getCurrentUser().then(re => {
      _this.userInfo = re.response
    })
  }
}
</script>
