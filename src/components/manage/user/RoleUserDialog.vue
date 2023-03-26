<template>
  <div>
    <el-dialog
      title="分配用户"
      :visible.sync="dialogFormVisible">
      <span>角色名称：{{roleModel.name}} 角色备注：{{roleModel.remark}}</span>
      <el-container>
        <el-aside width="50%">
          <div class="tag-selectedUser">
            <span class="tag-group__title">已选用户：</span>
            <el-tag
              :key="tag.id"
              v-for="tag in userSelected"
              closable
              :disable-transitions="false"
              @close="handleClose(tag)">
              {{tag.name}}
            </el-tag>
          </div>
        </el-aside>
        <el-main>
          <div class="alluser">
            <span class="tag-group__title">选择用户：</span>
            <el-table
              size="medium"
              height="250"
              ref="multipleUserTable"
              :data="tableUserData"
              tooltip-effect="dark"
              style="width: 100%"
              @selection-change="handleSelectionChange">
              <el-table-column
                type="selection"
                width="55">
              </el-table-column>
              <el-table-column
                prop="name"
                label="姓名"
                width="120">
              </el-table-column>
              <el-table-column
                prop="userCode"
                label="用户名"
                width="120">
              </el-table-column>
            </el-table>
          </div>
        </el-main>
      </el-container>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="onSubmit" :loading="submiting" size="mini">确定</el-button>
        <el-button @click="onCancel" size="mini">取消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import Service from '../../../config/service'
  import AuthUtil from '../../../utils/authUtil'

  export default {
    name: "roleUserDialog",
    data() {
      return {
        dialogFormVisible: false,
        submiting: false,
        addUserModel: {
          userIdList: null,
          roleId: ""
        },
        roleModel: {
          id: "",
          name: "",
          remark: ""
        },
        defaultProps: {
          children: 'children',
          label: 'name'
        },
        tableUserData: null,
        userSelected: [],
        multipleSelection: []
      };
    },
    watch: {
      dialogFormVisible() {
        if (this.dialogFormVisible) {
          this.loadRoleUser();
        }
      }
    },
    methods: {
      onSubmit() {
        //角色增加用户
        this.addUserModel.roleId = this.roleModel.id;
        let userSelectedId = [];
        this.userSelected.forEach(user => {
          userSelectedId.push(user.id);
        });

        this.addUserModel.userIdList = userSelectedId;
        this.$axios.post(Service.authUrl.roleUser, this.addUserModel, {
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
        this.dialogFormVisible = false;
        this.addUserModel = Object.assign({}, "");//清空model
        this.$refs.multipleUserTable.clearSelection();//清空已经选择的用户
      },
      onClose() {
        this.onCancel();
      },
      loadAllUser() {
        this.$axios.get(Service.authUrl.user, {
          headers: {
            'Authorization': localStorage.getItem('token')
          }
        }).then((res) => {
          if (res.status === 200) {
            let responseData = res.data;
            if (responseData.code === 0) {
              this.tableUserData = responseData.data.list;
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
      loadRoleUser() {
        this.$axios.get(Service.authUrl.roleUser + "/" + this.roleModel.id, {
          headers: {
            'Authorization': localStorage.getItem('token')
          }
        }).then((res) => {
          if (res.status === 200) {
            let responseData = res.data;
            if (responseData.code === 0) {
              let roleUserData = responseData.data;
              this.userSelected = roleUserData;
              let userSelectedId = [];

              //选中用户
              this.userSelected.forEach(user => {
                userSelectedId.push(user.id);
              });

              this.tableUserData.forEach(row => {
                if (userSelectedId.indexOf(row.id) >= 0) {
                  this.$refs.multipleUserTable.toggleRowSelection(row, true);
                }
              });
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
      handleClose(tag) {
        let delTag = tag;
        let multipleSelection2 = this.multipleSelection;
        let length = this.multipleSelection.length;
        let that = this;

        function search(arr, dst) {//返回寻找当前元素的index
          let i = arr.length;
          for (let j = 0; j < i; j++) {
            if (arr[j] == dst) {
              return j;
            }
          }
          return false;
        }

        this.$refs.multipleUserTable.clearSelection();//清空所有选择
        let arr = [];//存储剩下的选项
        for (let i = 0; i < length; i++) {
          if ((multipleSelection2[i]) != delTag) {//如果当前项是删除的那一项
            let num = search(that.tableUserData, multipleSelection2[i]);
            arr.push(that.tableUserData[num]);
          }
        }
        that.toggleSelection(arr);
      },
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleUserTable.toggleRowSelection(row, true);
          });
        } else {
          this.$refs.multipleUserTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
        this.userSelected = val;
      }
    },
    created() {
      this.loadAllUser();
    }
  }
</script>

<style scoped>

</style>
