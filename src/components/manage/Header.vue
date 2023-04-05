<template>
  <div>
    <div class="manageHeader">
      <div class="headerLogo">
        <el-row>
          <el-col :span="2">
            <img width="50" height="50" src="../../../static/img/pen.png"/>
          </el-col>
          <el-col :span="22">
            <span class="logoTitle">eblog-后台管理</span>
          </el-col>
        </el-row>
      </div>
      <div class="headerUser">
        <el-row type="flex" justify="space-around" align="middle">
          <el-col :span="10">
              <el-link href="/" type="primary">回到首页</el-link>
              <el-divider direction="vertical"></el-divider>
          </el-col>
          <el-col :span="10">
              <el-link @click="logout" type="primary">退出登录</el-link>
          </el-col>
          <el-col :span="4">
            <span>{{userCode}}</span>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
  import Service from '../../config/service'
  import AuthUtil from '../../utils/authUtil'

  export default {
    name: "Header",
    data() {
      return {
        userCode: ''
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
            this.userCode = '';
            this.$router.push('/login');
          }).catch(function (error) {
            console.error(error);
          });
        })
      }
    },
    mounted() {
      this.userCode = localStorage.getItem('userCode');
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
    width: 10%;
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
