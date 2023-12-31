<template>
  <div class="asideMenu">
    <el-menu text-color="#bfcbd9"
             active-text-color="#20a0ff"
             default-active="/bloglist"
             :collapse="isCollapse"
             :router="true">
      <el-menu-item disabled>
        <i class="el-icon-user-solid"></i>
        <span slot="title">{{ userCode }}</span>
      </el-menu-item>
      <el-menu-item index="/bloglist">
        <i class="el-icon-notebook-2"></i>
        <span slot="title">博客列表</span>
      </el-menu-item>
      <el-menu-item index="/blogadd">
        <i class="el-icon-edit"></i>
        <span slot="title">博客发布</span>
      </el-menu-item>
      <el-menu-item index="/dictlist">
        <i class="el-icon-notebook-2"></i>
        <span slot="title">数据字典</span>
      </el-menu-item>
      <el-menu-item index="/">
        <i class="el-icon-s-home"></i>
        <span slot="title">回到首页</span>
      </el-menu-item>
      <el-menu-item @click="logout()">
        <i class="el-icon-switch-button"></i>
        <span slot="title">退出登录</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import Service from "../../config/service";
import AuthUtil from "../../utils/authUtil";

export default {
  name: "Aside",
  data() {
    return {
      isCollapse: true,
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
.asideMenu {
  height: 100%;
}

.el-menu {
  height: 100%;
  background-color: #dbdde0;
}
</style>
