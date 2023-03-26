<template>
  <el-dialog title="修改密码" :visible.sync="dialogFormVisible" width="20%">
    <el-form :model="updateModel" ref="changeForm" :rules="validRule">
      <el-form-item label="旧密码" :label-width="formLabelWidth" prop="oldPassword">
        <el-input type="password" v-model="updateModel.oldPassword" autocomplete="off"
                  placeholder="请输入旧密码"></el-input>
      </el-form-item>
      <el-form-item label="新密码" :label-width="formLabelWidth" prop="newPassword">
        <el-input type="password" v-model="updateModel.newPassword" autocomplete="off"
                  placeholder="请输入新密码"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="onCloseDialog">取消</el-button>
      <el-button type="primary" @click="submit">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import Service from "../../config/service";
  import AuthUtil from "../../utils/authUtil";
  import Md5Util from "../../utils/md5Util";

  export default {
    name: "ChangePwdDialog",
    data() {
      var validateOldPwd = (rule, value, callback) => {
        if (value === "") {
          callback(new Error("请输入旧密码"));
        } else {
          if (this.updateModel.oldPassword !== "") {
            this.$refs.changeForm.validateField("newPassword");
          }
          callback();
        }
      };

      var validateNewPwd = (rule, value, callback) => {
        if (value === "") {
          callback(new Error("请输入新密码"));
        } else if (value === this.updateModel.oldPassword) {
          callback(new Error("新密码与旧密码相同!"));
        } else {
          callback();
        }
      };
      return {
        dialogFormVisible: false,
        updateModel: {
          oldPassword: "",
          newPassword: "",
        },
        updateModelSubmit: {
          id: "",
          oldPassword: "",
          newPassword: "",
        },
        formLabelWidth: "70px",
        validRule: {
          oldPassword: [
            {required: true, message: "请输入旧密码", trigger: "blur"},
            {
              min: 5,
              max: 10,
              message: "长度在 5 到 10 个字符",
              trigger: "blur",
            },
            {validator: validateOldPwd, trigger: "blur"},
          ],
          newPassword: [
            {required: true, message: "请输入新密码", trigger: "blur"},
            {
              min: 5,
              max: 10,
              message: "长度在 5 到 10 个字符",
              trigger: "blur",
            },
            {validator: validateNewPwd, trigger: "blur"},
          ],
        },
      };
    },
    methods: {
      onCloseDialog() {
        this.$refs.changeForm.resetFields();
        this.dialogFormVisible = false;
        this.updateModel = Object.assign({}, "");
        this.updateModelSubmit = Object.assign({}, "");
      },
      submit() {
        this.$refs.changeForm.validate((valid) => {
          if (valid) {
            this.updateModelSubmit.id = localStorage.getItem("userId");
            this.updateModelSubmit.oldPassword = Md5Util.encrypt(
              this.updateModel.oldPassword, localStorage.getItem("userCode")
            );
            this.updateModelSubmit.newPassword = Md5Util.encrypt(
              this.updateModel.newPassword, localStorage.getItem("userCode")
            );
            this.$axios
            .put(Service.authUrl.changePwd, this.updateModelSubmit, {
              headers: {
                Authorization: localStorage.getItem("token"),
              },
            })
            .then((res) => {
              if (res.status === 200) {
                let responseData = res.data;
                if (responseData.code === 0) {
                  this.$message.success(responseData.msg);
                  this.onCloseDialog();
                } else {
                  this.$message.error(responseData.msg);
                  if (responseData.code === -2) {
                    AuthUtil.clearSession();
                    this.$router.push("/login");
                  }
                }
              } else {
                this.$message.error("系统内部错误");
              }
            });
          } else {
            console.log("请检查参数！");
            return false;
          }
        });
      },
    },
  };
</script>

<style scoped>
</style>
