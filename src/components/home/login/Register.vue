<template>
  <div class="register-container">
    <el-container>
      <el-header>
        <el-row>
          <el-col :span="6">
            <p></p>
          </el-col>
          <el-col :span="1">
            <img src="/static/eblog.ico" style="width: 50px; height: 50px"/>
          </el-col>
          <el-col :span="1">
            <span style="font-size: 20px; color: white">爱收藏</span>
          </el-col>
          <el-col :span="8">
            <p></p>
          </el-col>
          <el-col :span="1">
            <el-link style="color: white" href="/" type="primary">首页</el-link>
          </el-col>
          <el-col :span="1">
            <el-link style="color: white" href="/login" type="primary">登录</el-link>
          </el-col>
          <el-col :span="6">
            <p></p>
          </el-col>
        </el-row>
      </el-header>
      <el-main>
        <el-form ref="registerForm" :model="registerModel" label-width="80px" :rules="validRule"
                 status-icon class="register-page">
          <h3 class="title">注册</h3>
          <el-form-item label="用户名" prop="userCode">
            <el-input v-model="registerModel.userCode" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="registerModel.password" placeholder="请输入密码"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input type="password" v-model="registerModel.checkPass" placeholder="请再次输入密码"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="昵称" prop="name">
            <el-input v-model="registerModel.name" placeholder="请输入昵称"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="registerModel.email" placeholder="请输入邮箱地址，可用于找回密码"></el-input>
          </el-form-item>
          <el-form-item label="头像" prop="photourl">
            <el-avatar :size="50" ref="photourlAvatar" :src="randomUrl"></el-avatar>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit" :loading="registering">注册</el-button>
          </el-form-item>
        </el-form>
      </el-main>
    </el-container>
    <bottom-footer></bottom-footer>
  </div>
</template>

<script>
  import Service from "../../../config/service";
  import Footer from "../Footer";
  import RandomUtil from "../../../utils/randomUtil";
  import Md5Util from "../../../utils/md5Util";

  export default {
    name: "register",
    components: {
      bottomFooter: Footer,
    },
    data() {
      var validatePass = (rule, value, callback) => {
        if (value === "") {
          callback(new Error("请输入密码"));
        } else {
          if (this.registerModel.checkPass !== "") {
            this.$refs.registerForm.validateField("checkPass");
          }
          callback();
        }
      };

      var validateCheckPass = (rule, value, callback) => {
        if (value === "") {
          callback(new Error("请再次输入密码"));
        } else if (value !== this.registerModel.password) {
          callback(new Error("两次输入密码不一致!"));
        } else {
          callback();
        }
      };
      return {
        registering: false,
        registerModel: {
          userCode: "",
          password: "",
          checkPass: "",
          name: "",
          email: "",
          photourl: "",
        },
        registerModelSubmit: {
          userCode: "",
          password: "",
          name: "",
          email: "",
          photourl: "",
        },
        randomUrl: "/static/img/face/1.jpg",
        validRule: {
          userCode: [
            {
              required: true,
              message: "请输入用户名",
              trigger: "blur",
            },
            {
              min: 3,
              max: 10,
              message: "长度在 3 到 10 个字符",
              trigger: "blur",
            },
          ],
          password: [
            {required: true, message: "请输入密码", trigger: "blur"},
            {
              min: 5,
              max: 10,
              message: "长度在 5 到 10 个字符",
              trigger: "blur",
            },
            {validator: validatePass, trigger: "blur"},
          ],
          checkPass: [
            {
              required: true,
              message: "请再次输入密码",
              trigger: "blur",
            },
            {validator: validateCheckPass, trigger: "blur"},
          ],
        },
      };
    },
    methods: {
      onSubmit(event) {
        event.preventDefault();
        this.$refs.registerForm.validate((valid) => {
          if (valid) {
            this.registering = true;
            this.registerModel.photourl = this.$refs.photourlAvatar.src;
            // 如果昵称未输入，则用用户名
            if (this.registerModel.name == "") {
              this.registerModel.name = this.registerModel.userCode;
            }

            // 给待提交数据赋值
            this.registerModelSubmit.userCode = this.registerModel.userCode;
            this.registerModelSubmit.password = Md5Util.encrypt(this.registerModel.password,
              this.registerModel.userCode);
            this.registerModelSubmit.name = this.registerModel.name;
            this.registerModelSubmit.email = this.registerModel.email;
            this.registerModelSubmit.photourl = this.registerModel.photourl;
            this.$axios
            .post(Service.authUrl.register, this.registerModelSubmit)
            .then((res) => {
              if (res.status === 200) {
                let responseData = res.data;
                if (responseData.code === 0) {
                  this.registering = false;
                  this.$message({
                    message: responseData.msg,
                    type: "success",
                  });

                  this.$router.push("/login");
                } else {
                  this.registering = false;
                  this.$message.error(responseData.msg);
                }
              } else {
                this.registering = false;
                this.$message.error("系统内部错误");
              }
            });
          }
        });
      },
      randomFace() {
        let faceNum = RandomUtil.getRandomInt(1, 9);
        this.randomUrl = "/static/img/face/" + faceNum + ".jpg";
      },
    },
    mounted() {
      this.randomFace();
    },
  };
</script>

<style scoped>
  .register-container {
    width: 100%;
    height: 100%;
  }

  .register-page {
    width: 600px;
    margin: 10px auto;
  }

  .el-container {
    min-height: calc(100vh - 67px);
  }

  .el-header {
    background-color: #41403d;
    text-align: center;
    line-height: 60px;
  }
</style>
