<template>
  <div class="login-container">
    <el-form :model="loginModel" :rules="validRule" status-icon ref="loginForm"
             label-position="left" class="login-page">
      <h2 class="title">博客管理 - 登录</h2>
      <el-form-item prop="userCode">
        <el-input v-model="loginModel.userCode" placeholder="请输入用户名">
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" v-model="loginModel.password" placeholder="请输入密码">
        </el-input>
      </el-form-item>
<!--      <el-checkbox v-model="checked" class="rememberme">记住密码-->
<!--      </el-checkbox>-->
      <el-form-item style="width:100%;margin-top: 10px;">
        <el-button type="primary" style="width:100%;" @click="onSubmit" :loading="logining">登录
        </el-button>
      </el-form-item>
      <el-link href="/" type="primary">回到首页</el-link>
    </el-form>
  </div>
</template>

<script>
  import Service from "../../../config/service";
  import Md5Util from "../../../utils/md5Util";

  export default {
    data() {
      return {
        logining: false,
        loginModel: {
          userCode: "",
          password: "",
        },
        loginModelSubmit: {
          userCode: "",
          password: "",
        },
        validRule: {
          userCode: [
            {required: true, message: "请输入用户名", trigger: "blur"},
          ],
          password: [{required: true, message: "请输入密码", trigger: "blur"}],
        },
        checked: false,
      };
    },
    created() {
      document.onkeydown = (e) => {
        let key = window.event.keyCode;
        if (key === 13) {
          this.onSubmit(event);
        }
      };
    },
    methods: {
      onSubmit(event) {
        event.preventDefault();
        this.$refs.loginForm.validate((valid) => {
          if (valid) {
            this.logining = true;
            this.loginModelSubmit.userCode = this.loginModel.userCode;
            this.loginModelSubmit.password = Md5Util.encrypt(this.loginModel.password,
              this.loginModel.userCode);
            this.$axios
            .post(Service.authUrl.login, this.loginModelSubmit)
            .then((res) => {
              if (res.status === 200) {
                let responseData = res.data;
                if (responseData.code === 0) {
                  this.logining = false;
                  let userData = responseData.data;
                  localStorage.setItem("userCode", userData.userCode);
                  localStorage.setItem("token", userData.token);

                  this.$router.push({path: "/bloglist"});
                } else {
                  this.logining = false;
                  this.$message.error(responseData.msg);
                }
              } else {
                this.logining = false;
                this.$message.error("系统内部错误");
              }
            });
          }
        });
      }
    }
  };
</script>

<style scoped>
  .login-container {
  }

  .login-page {
    -webkit-border-radius: 5px;
    border-radius: 5px;
    margin: 10% auto;
    width: 350px;
    padding: 35px 35px 15px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }

  label.el-checkbox.rememberme {
    margin: 0px 0px 15px;
    text-align: left;
  }

  .title {
    text-align: center;
  }
</style>
