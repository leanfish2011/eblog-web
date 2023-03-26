<template>
  <div>
    <el-tree
      :data="menuData"
      ref="menutree"
      show-checkbox
      node-key="id"
      :default-expanded-keys="[2, 3]"
      :default-checked-keys="[5]"
      :props="defaultProps"
      @node-click="handleNodeClick">
    </el-tree>
    <el-button @click="getCheckedKeys">通过 key 获取</el-button>
    <el-button @click="setCheckedKeys">通过 key 设置</el-button>
  </div>
</template>

<script>
  import Service from '../../../config/service'
  import AuthUtil from '../../../utils/authUtil'

  export default {
    name: "TreeData",
    data() {
      return {
        menuData: null,
        defaultProps: {
          children: 'children',
          label: 'name'
        }
      };
    },
    methods: {
      load() {
        this.$axios.get(Service.authUrl.menuAll, {
          headers: {
            'Authorization': localStorage.getItem('token')
          }
        }).then((res) => {
          if (res.status === 200) {
            let responseData = res.data;
            if (responseData.code === 0) {
              this.menuData = responseData.data;
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
      handleNodeClick(data) {
        console.log(data);
      },
      getCheckedKeys() {
        console.log(this.$refs.menutree.getCheckedKeys());
      },
      setCheckedKeys() {
        this.$refs.menutree.setCheckedKeys([3]);
      },
    },
    created() {
      this.load();
    }
  }
</script>

<style scoped>

</style>
