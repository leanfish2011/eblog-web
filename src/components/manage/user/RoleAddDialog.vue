<template>
  <div>
    <el-dialog
      title="新增角色"
      :visible.sync="dialogFormVisible">
      <el-form ref="addForm" :model="addModel" label-width="80px" :rules="validRule"
               status-icon
               class="register-page">
        <el-form-item label="名称" prop="name">
          <el-input v-model="addModel.name" placeholder="请输入名称"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="addModel.remark" placeholder="请输入备注"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit" :loading="submiting">确定</el-button>
          <el-button @click="onCloseDialog">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  import Service from '../../../config/service'
  import AuthUtil from '../../../utils/authUtil'

  export default {
    name: "roleAddDialog",
    data() {
      return {
        dialogFormVisible: false,
        submiting: false,
        addModel: {
          id: "",
          name: "",
          remark: ""
        },
        validRule: {
          name: [{required: true, message: '请输入名称', trigger: 'blur'}]
        }
      };
    },
    methods: {
      onSubmit() {
        if (this.addModel.id === "" || this.addModel.id === undefined) {
          this.$axios.post(Service.authUrl.role, this.addModel, {
            headers: {
              'Authorization': localStorage.getItem('token')
            }
          }).then((res) => {
            if (res.status === 200) {
              let responseData = res.data;
              if (responseData.code === 0) {
                this.$message.success(responseData.msg);
                this.onCloseDialog();
                this.$emit('refresh');
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
        } else {
          this.$axios.put(Service.authUrl.role, this.addModel, {
            headers: {
              'Authorization': localStorage.getItem('token')
            }
          }).then((res) => {
            if (res.status === 200) {
              let responseData = res.data;
              if (responseData.code === 0) {
                this.$message.success(responseData.msg);
                this.onCloseDialog();
                this.$emit('refresh');
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
        }
      },
      onCloseDialog() {
        this.$refs.addForm.resetFields();
        this.dialogFormVisible = false;
        this.addModel = Object.assign({}, "");//将数据传入dialog页面
      },
      onClose() {
        this.onCloseDialog();
      }
    }
  }
</script>

<style scoped>

</style>
