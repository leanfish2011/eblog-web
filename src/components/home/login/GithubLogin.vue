<template>
  <div class="loading"
       v-loading="loading"
       element-loading-text=loadingText
       element-loading-spinner="el-icon-loading"></div>
</template>

<script>
  import Service from '../../../config/service'

  export default {
    name: "GithubLogin",
    data() {
      return {
        loadingText: "github登录中...",
        loading: true
      };
    },
    mounted() {
      let code = this.$route.query.code;
      this.$axios.get(Service.authUrl.loginByGitHub + "?code=" + code).then((res) => {
        if (res.status === 200) {
          let responseData = res.data;
          if (responseData.code === 0) {
            this.loading = false;
            let userData = responseData.data;
            localStorage.setItem('userCode', userData.userCode);
            localStorage.setItem('userName', userData.name);
            localStorage.setItem('token', userData.token);
            localStorage.setItem('userId', userData.userId);
            localStorage.setItem('photourl', userData.photourl);

            this.$router.push({path: "/my"});
          } else {
            this.loading = false;
            this.$message.error(responseData.msg);
            this.$router.push({path: "/login"});
          }
        } else {
          this.loading = false;
          this.$message.error("系统内部错误");
          this.$router.push({path: "/login"});
        }
      })
    }
  }
</script>

<style scoped>
  .loading {
    width: 80%;
    height: 40%;
    margin: 0 auto 0 auto;
  }
</style>
