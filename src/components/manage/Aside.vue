<template>
  <div class="asideMenu">
    <el-menu background-color="#324157"
             text-color="#bfcbd9" active-text-color="#20a0ff" default-active="/bloglist"
             :collapse="isCollapse" :router="true">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span slot="title">发布管理</span>
        </template>
        <el-menu-item index="/bloglist">
          <i class="el-icon-notebook-2"></i>
          <span slot="title">博客列表</span>
        </el-menu-item>
        <el-menu-item index="/blogadd">
          <i class="el-icon-edit"></i>
          <span slot="title">博客发布</span>
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "Aside",
  data() {
    return {
      isCollapse: false
    }
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
