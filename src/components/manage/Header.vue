<template>
  <div>
    <div class="manageHeader">
      <div class="headerLogo">
        <el-row>
          <el-col :span="2">
            <img width="50" height="50" src="../../../static/img/pen.png"/>
          </el-col>
          <el-col :span="22">
            <span class="logoTitle">爱收藏-后台管理</span>
          </el-col>
        </el-row>
      </div>
      <div class="headerUser">
        <el-row type="flex" justify="space-around" align="middle">
          <el-col :span="6">
              <el-link href="/" type="primary">回到首页</el-link>
              <el-divider direction="vertical"></el-divider>
          </el-col>
          <el-col :span="6">
              <el-link @click="changePwd" type="primary">修改密码</el-link>
              <el-divider direction="vertical"></el-divider>
          </el-col>
          <el-col :span="5">
              <el-link @click="logout" type="primary">退出登录</el-link>
          </el-col>
          <el-col :span="7">
            <el-tooltip effect="dark" :content=userName placement="left-start">
              <el-avatar :size="30" ref="photourlAvatar" :src=userPhotoUrl></el-avatar>
            </el-tooltip>
          </el-col>
        </el-row>
      </div>
    </div>
    <change-pwd-dialog ref="changePwd"></change-pwd-dialog>
  </div>
</template>

<script>
  import Service from '../../config/service'
  import AuthUtil from '../../utils/authUtil'
  import ChangePwdDialog from './ChangePwdDialog'

  export default {
    name: "Header",
    components: {
      "changePwdDialog": ChangePwdDialog,
    },
    data() {
      return {
        userName: '',
        userPhotoUrl: '',
      }
    },
    methods: {
      logout() {
        this.$confirm('确认退出?', '提示', {})
        .then(() => {
          //调用接口
          this.$axios.get(Service.authUrl.logout, {
            headers: {
              'Authorization': localStorage.getItem('token')
            }
          }).then((res) => {
            AuthUtil.clearSession();
            this.userName = '';
            this.userPhotoUrl = '';
            this.$router.push('/login');
          }).catch(function (error) {
            console.error(error);
          });
        })
      },
      changePwd() {
        this.$refs.changePwd.dialogFormVisible = true;
      }
    },
    mounted() {
      this.userName = localStorage.getItem('userName');
      this.userPhotoUrl = localStorage.getItem('photourl');
    }
  }
</script>

<style scoped>
  .headerLogo {
    float: left;
    width: 50%;
  }

  .logoTitle {
    font-size: 25px;
    color: #e37d57;
  }

  .headerUser {
    float: right;
    width: 16%;
  }

  .headerUser .el-col {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  .el-dropdown-link {
    color: #e3e0db;
  }
</style>
