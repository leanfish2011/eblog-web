<template>
  <div>
    <el-dialog
      title="编辑用户"
      :visible.sync="dialogFormVisible">
      <el-form ref="updateForm" :model="updateModel" label-width="80px" :rules="validRule"
               status-icon>
        <el-form-item label="用户名" prop="userCode">
          <el-input v-model="updateModel.userCode" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="昵称" prop="name">
          <el-input v-model="updateModel.name" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="updateModel.email" placeholder="请输入邮箱地址"></el-input>
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
    name: "userUpdateDialog",
    data() {
      return {
        dialogFormVisible: false,
        submiting: false,
        updateModel: {
          id: "",
          userCode: "",
          name: "",
          email: "",
        },
        validRule: {
          name: [{required: true, message: '请输入姓名', trigger: 'blur'}]
        }
      };
    },
    methods: {
      onSubmit() {
        this.$refs.updateForm.validate((valid) => {
          if (!valid) {
            return;
          }
          this.submiting = true;
          this.$axios.put(Service.authUrl.user, this.updateModel, {
            headers: {
              'Authorization': localStorage.getItem('token')
            }
          }).then((res) => {
            if (res.status !== 200) {
              this.$message.error("系统内部错误");
              return;
            }
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
          });
        });
      },
      onCloseDialog() {
        this.$refs.updateForm.resetFields();
        this.dialogFormVisible = false;
        this.updateModel = Object.assign({}, "");//原提交的数据置空
        this.submiting = false;
      },
      onClose() {
        this.onCloseDialog();
      }
    }
  };
</script>

<style scoped>

</style>
