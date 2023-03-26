<template>
  <div class="find-container">
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
          <el-col :span="1">
            <el-link style="color: white" href="/register" type="primary">注册</el-link>
          </el-col>
          <el-col :span="5">
            <p></p>
          </el-col>
        </el-row>
      </el-header>
      <el-main>
        <el-form ref="findForm" :model="findModel" label-width="80px" :rules="validRule" status-icon
                 class="find-page">
          <h3 class="title">找回密码</h3>
          <el-form-item label="用户名" prop="userCode">
            <el-input v-model="findModel.userCode" placeholder="请输入注册时的用户名"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="findModel.email" placeholder="请输入注册时的邮箱，新密码将发送到这个邮箱"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit" :loading="finding">找回</el-button>
          </el-form-item>
          <h5>忘记用户名和邮箱？请联系管理员：<span style="color: #2f65ca;">leanfish2011@163.com</span></h5>
        </el-form>
      </el-main>
    </el-container>
    <bottom-footer></bottom-footer>
  </div>
</template>

<script>
  import Service from "../../../config/service";
  import Footer from "../Footer";

  export default {
    name: "find",
    components: {
      bottomFooter: Footer,
    },
    data() {
      return {
        finding: false,
        findModel: {
          userCode: "",
          email: ""
        },
        validRule: {
          userCode: [
            {
              required: true,
              message: "请输入注册时的用户名",
              trigger: "blur",
            },
            {
              min: 3,
              max: 10,
              message: "长度在 3 到 10 个字符",
              trigger: "blur",
            },
          ],
          email: [
            {
              required: true,
              message: "请输入注册时的邮箱，新密码将发送到这个邮箱",
              trigger: "blur",
            },
            {
              type: 'string',
              message: '邮箱格式不正确',
              trigger: 'blur',
              transform(value) {
                let regex = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
                if (!regex.test(value)) {
                  return false;
                }
              }
            }
          ]
        },
      };
    },
    methods: {
      onSubmit(event) {
        event.preventDefault();
        this.$refs.findForm.validate((valid) => {
          if (valid) {
            this.finding = true;

            this.$axios.post(Service.authUrl.find, this.findModel)
            .then((res) => {
              if (res.status === 200) {
                let responseData = res.data;
                if (responseData.code === 0) {
                  this.finding = false;
                  this.$message({
                    message: responseData.msg + "，请前往邮箱查看密码！",
                    type: "success",
                  });

                  this.$router.push("/login");
                } else {
                  this.finding = false;
                  this.$message.error(responseData.msg);
                }
              } else {
                this.finding = false;
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
  .find-container {
    width: 100%;
    height: 100%;
  }

  .find-page {
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
