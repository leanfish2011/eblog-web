<template>
  <div>
    <el-dialog
      title="分配权限"
      :visible.sync="dialogFormVisible">
      <span>角色名称：{{roleModel.name}} 角色备注：{{roleModel.remark}}</span>
      <el-tree
        :data="menuData"
        show-checkbox
        node-key="id"
        ref="menuTree"
        default-expand-all
        :props="defaultProps">
      </el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="onSubmit" :loading="submiting">确定</el-button>
        <el-button @click="onCancel">取消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import Service from '../../../config/service'
  import AuthUtil from '../../../utils/authUtil'

  export default {
    name: "roleMenuDialog",
    data() {
      return {
        dialogFormVisible: false,
        submiting: false,
        addModel: {
          menuIdList: null,
          roleId: ""
        },
        roleModel: {
          id: "",
          name: "",
          remark: ""
        },
        validRule: {
          name: [{required: true, message: '请输入名称', trigger: 'blur'}]
        },
        menuData: null,
        defaultProps: {
          children: 'children',
          label: 'name'
        },
      };
    },
    watch: {
      dialogFormVisible() {
        if (this.dialogFormVisible) {
          this.loadRoleMenu();
        }
      }
    },
    methods: {
      onSubmit() {
        this.addModel.roleId = this.roleModel.id;
        //菜单保存选中的，以及半选中的项，用于展示完整树形菜单
        this.addModel.menuIdList = this.$refs.menuTree.getCheckedKeys().concat(
          this.$refs.menuTree.getHalfCheckedKeys());
        console.log(this.addModel);
        this.$axios.post(Service.authUrl.menuRole, this.addModel, {
          headers: {
            'Authorization': localStorage.getItem('token')
          }
        }).then((res) => {
          if (res.status === 200) {
            let responseData = res.data;
            if (responseData.code === 0) {
              this.$message.success(responseData.msg);
              this.onCancel();
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
        })
      },
      onCancel() {
        this.$refs.menuTree.setCheckedKeys([]);
        this.dialogFormVisible = false;
        this.addModel = Object.assign({}, "");//清空model
      },
      onClose() {
        this.onCancel();
      },
      loadAllMenu() {
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
      loadRoleMenu() {
        this.$axios.get(Service.authUrl.menuRole + "/" + this.roleModel.id, {
          headers: {
            'Authorization': localStorage.getItem('token')
          }
        }).then((res) => {
          if (res.status === 200) {
            let responseData = res.data;
            if (responseData.code === 0) {
              //选中菜单
              this.$refs.menuTree.setCheckedKeys(responseData.data);
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
      }
    },
    created() {
      this.loadAllMenu();
    }
  }
</script>

<style scoped>

</style>
