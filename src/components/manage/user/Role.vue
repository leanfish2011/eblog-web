<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>后台管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider></el-divider>
    <el-button type="primary" @click="onAddShow" size="mini">创建</el-button>
    <el-divider></el-divider>
    <el-table
      :data="roleData"
      stripe
      style="width: 100%">
      <el-table-column
        prop="name"
        label="名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="remark"
        label="备注">
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="创建时间" :formatter="dateFormat">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleMenu(scope.$index, scope.row)">分配菜单
          </el-button>
          <el-button
            size="mini"
            @click="handleUser(scope.$index, scope.row)">分配用户
          </el-button>
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <role-add-dialog ref="addDialog" @refresh="load()"></role-add-dialog>
    <role-menu-dialog ref="menuDialog"></role-menu-dialog>
    <role-user-dialog ref="userDialog"></role-user-dialog>
  </div>
</template>

<script>
  import RoleAddDialog from './RoleAddDialog'
  import RoleMenuDialog from './RoleMenuDialog'
  import RoleUserDialog from './RoleUserDialog'
  import Service from '../../../config/service'
  import DateUtil from '../../../utils/dateUtil'
  import AuthUtil from '../../../utils/authUtil'

  export default {
    name: "Role",
    components: {
      "roleAddDialog": RoleAddDialog,
      "roleMenuDialog": RoleMenuDialog,
      "roleUserDialog": RoleUserDialog
    },
    data() {
      return {
        roleData: null
      }
    },
    methods: {
      onAddShow() {
        this.$refs.addDialog.dialogFormVisible = true;
      },
      handleMenu(index, row) {
        this.$refs.menuDialog.dialogFormVisible = true;
        this.$refs.menuDialog.roleModel = Object.assign({}, row);
      },
      handleUser(index, row) {
        this.$refs.userDialog.dialogFormVisible = true;
        this.$refs.userDialog.roleModel = Object.assign({}, row);
      },
      handleEdit(index, row) {
        this.$refs.addDialog.dialogFormVisible = true;
        this.$refs.addDialog.addModel = Object.assign({}, row);//将数据传入dialog页面
      },
      handleDelete(index, row) {
        this.$confirm('确定删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios.delete(Service.authUrl.role + '/' + row.id, {
            headers: {
              'Authorization': localStorage.getItem('token')
            }
          }).then((res) => {
            if (res.status === 200) {
              let responseData = res.data;
              if (responseData.code === 0) {
                this.$message.success(responseData.msg);
                this.load();
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
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      //时间格式化
      dateFormat(row) {
        return DateUtil.dateFormat(row.createTime);
      },
      load() {
        this.$axios.get(Service.authUrl.role, {
          headers: {
            'Authorization': localStorage.getItem('token')
          }
        }).then((res) => {
          if (res.status === 200) {
            let responseData = res.data;
            if (responseData.code === 0) {
              this.roleData = responseData.data;
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
      this.load();
    }
  }
</script>

<style scoped>
  .el-divider {
    margin: 10px 0;
  }
</style>
