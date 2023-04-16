<template>
  <div class="mange">
    <el-container class="manageContent">
      <el-aside width="">
        <manage-aside></manage-aside>
      </el-aside>

      <el-main class="viewContent">
        <router-view/>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import Service from '../../config/service'
import AuthUtil from '../../utils/authUtil'
import ManageAside from './Aside'

export default {
  name: 'Manage',
  components: {
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

.manageContent {
  height: 100vh;
}

.viewContent {
  padding: 10px;
  /*height: calc(100vh - 60px);*/
}

</style>