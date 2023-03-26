<template>
  <div class="mange">
    <el-container class="manageContent">
      <el-header class="manageHeader">
        <manage-header></manage-header>
      </el-header>

      <el-container>
        <el-aside>
          <manage-aside></manage-aside>
        </el-aside>

        <el-main class="viewContent">
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import Service from '../../config/service'
  import AuthUtil from '../../utils/authUtil'
  import ManageHeader from './Header'
  import ManageAside from './Aside'

  export default {
    name: 'Manage',
    components: {
      "manageHeader": ManageHeader,
      "manageAside": ManageAside,
    },
    methods: {
      authCheck() {
        this.$axios.get(Service.authUrl.authCheck, {
          headers: {
            'Authorization': localStorage.getItem('token')
          }
        }).then((res) => {
          if (res.status === 200) {
            let responseData = res.data;
            let code = responseData.code;
            if (code === -1 || code === -2) {
              this.$message.error(responseData.msg);
              AuthUtil.clearSession();

              this.$router.push('/login');
            }
          } else {
            this.$message.error("系统内部错误");
          }
        }).catch(function (error) {
          console.error(error);
        });
      },
    },
    created() {
      this.authCheck();
    }
  }
</script>

<style>
  .mange {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .manageHeader {
    background-color: #2d3a4e;
    color: #8b8626;
    line-height: 60px;
    font-size: 12px;
    height: 60px !important;
  }

  .manageContent {
    height: 100vh;
  }

  .el-aside {
    height: calc(100vh - 60px);
  }

  .viewContent {
    padding: 10px;
    height: calc(100vh - 60px);
  }

</style>
