<template>
  <div class="sub-container">
    <el-container>
      <el-header>
        <el-row>
          <el-col :span="6">
            <p></p>
          </el-col>
          <el-col :span="1">
            <img src="/static/eblog.ico" style="width: 50px;height: 50px;">
          </el-col>
          <el-col :span="1">
            <span style="font-size: 20px;color: white">爱收藏</span>
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
        <el-form ref="subForm" :model="subModel" label-width="80px" :rules="validRule"
                 status-icon
                 class="sub-page">
          <p>「爱收藏-每周经典网站」，是爱收藏网站推出的免费订阅服务，旨在为不愿错过好网站的你，推荐每周最新的网站收藏。</p>
          <h3 class="title">订阅</h3>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="subModel.email" placeholder="请输入邮箱地址"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit" :loading="subing">立即订阅</el-button>
          </el-form-item>
        </el-form>
      </el-main>
    </el-container>
    <bottom-footer></bottom-footer>
  </div>
</template>

<script>
  import Service from '../../config/service'
  import Footer from '../home/Footer'

  export default {
    name: "Subscribe",
    components: {
      "bottomFooter": Footer
    },
    data() {
      return {
        subing: false,
        subModel: {
          email: ''
        },
        validRule: {
          email: [
            {required: true, message: '请输入邮箱地址', trigger: 'blur'},
            {type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change']}
          ]
        }
      }
    },
    methods: {
      onSubmit(event) {
        event.preventDefault();
        this.$refs.subForm.validate((valid) => {
          if (valid) {
            this.subing = true;
            //校验是否已经订阅过
            this.$axios.post(Service.systemUrl.subExist, this.subModel).then(
              (res) => {
                if (res.status === 200) {
                  let responseData = res.data;
                  if (responseData.code === 0) {
                    this.subing = false;

                    if (responseData.data === true) {
                      this.$message({
                        message: "此邮箱已经订阅过，请更换邮箱！",
                        type: 'error'
                      });
                    } else {
                      this.onSub();
                    }
                  } else {
                    this.subing = false;
                    this.$message.error(responseData.msg);
                  }
                } else {
                  this.subing = false;
                  this.$message.error("系统内部错误");
                }
              })
          }
        })
      },
      onSub() {
        this.$axios.post(Service.systemUrl.sub, this.subModel).then(
          (res) => {
            if (res.status === 200) {
              let responseData = res.data;
              if (responseData.code === 0) {
                this.subing = false;
                this.$message({
                  message: responseData.msg,
                  type: 'success'
                });

                this.$refs.subForm.resetFields();
              } else {
                this.subing = false;
                this.$message.error(responseData.msg);
              }
            } else {
              this.subing = false;
              this.$message.error("系统内部错误");
            }
          })
      }
    }
  }
</script>

<style scoped>
  .sub-container {
    width: 100%;
    height: 100%;
  }

  .sub-page {
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
