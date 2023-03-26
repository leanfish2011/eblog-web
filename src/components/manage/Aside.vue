<template>
  <div class="asideMenu">
    <el-menu background-color="#324157"
             text-color="#bfcbd9" active-text-color="#20a0ff" default-active="/site"
             :collapse="isCollapse" :router="true">
      <label v-for="(item,index) in userMenu" :key="index">
        <label v-if="item.children.length>0">
          <label v-for="firstItem in item.children">
            <el-submenu :index="firstItem.id">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span slot="title">{{firstItem.name}}</span>
              </template>
              <label v-for="child in firstItem.children">
                <el-menu-item :index=child.url>{{child.name}}</el-menu-item>
              </label>
            </el-submenu>
          </label>
        </label>
      </label>
    </el-menu>
  </div>
</template>

<script>
  import Service from '../../config/service'
  import AuthUtil from '../../utils/authUtil'

  export default {
    name: "Aside",
    data() {
      return {
        isCollapse: false,
        userMenu: null
      }
    },
    methods: {
      loadUserMenu() {
        this.$axios.get(Service.authUrl.menuUser+ "/" + localStorage.getItem('userId'), {
          headers: {
            'Authorization': localStorage.getItem('token')
          }
        }).then((res) => {
          if (res.status === 200) {
            let responseData = res.data;
            if (responseData.code === 0) {
              this.userMenu = responseData.data;
            } else {
              this.$message.error(responseData.msg);
              if (responseData.code === -2) {
                AuthUtil.clearSession();
                this.$router.push('/login');
              }
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
      this.loadUserMenu();
    }
  }
</script>

<style scoped>
  .asideMenu {
    height: 100%;
  }

  .el-menu {
    height: 100%;
    background-color: #324157;
  }
</style>
