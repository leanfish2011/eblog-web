<template>
  <div class="unsub-container">
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
        <el-form ref="unsubForm" :model="unSubModel" label-width="80px"
                 status-icon
                 class="unsub-page">
          <p>您确定要取消「爱收藏-每周经典网站」吗？</p>
          <h3 class="title">取消订阅原因：</h3>
          <!--<el-checkbox-group v-model="checkList">-->
          <!--<el-checkbox label="复选框 A"></el-checkbox>-->
          <!--<el-checkbox label="复选框 B"></el-checkbox>-->
          <!--<el-checkbox label="复选框 C"></el-checkbox>-->
          <!--<el-checkbox label="禁用"></el-checkbox>-->
          <!--<el-checkbox label="选中且禁用"></el-checkbox>-->
          <!--</el-checkbox-group>-->
          <el-form-item label="其他原因">
            <el-input v-model="unSubModel.remark"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit" :loading="unsubing">确定</el-button>
            <el-button @click="onCancel">取消</el-button>
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
    name: "UnSubscribe",
    components: {
      "bottomFooter": Footer
    },
    data() {
      return {
        unsubing: false,
        subid: '',
        unSubModel: {
          remark: ''
        },
        checkList: ['选中且禁用', '复选框 A']
      }
    },
    methods: {
      onSubmit(event) {
        event.preventDefault();
        if (this.subid === '') {
          this.$message({
            message: "未找到订阅id",
            type: 'error'
          });

          this.unsubing = false;
          return;
        }
        this.unsubing = true;
        this.$axios.delete(Service.systemUrl.sub + "/" + this.subid).then(
          (res) => {
            if (res.status === 200) {
              let responseData = res.data;
              if (responseData.code === 0) {
                this.unsubing = false;
                this.$message({
                  message: responseData.msg,
                  type: 'success'
                });
              } else {
                this.unsubing = false;
                this.$message.error(responseData.msg);
              }
            } else {
              this.unsubing = false;
              this.$message.error("系统内部错误");
            }
          })
      },
      onCancel() {
        this.$refs.unsubForm.resetFields();
      }
    },
    created() {
      //从url中获取参数
      let subid = this.$route.query.subid.trim();
      this.subid = subid;
    },
  }
</script>

<style scoped>
  .unsub-container {
    width: 100%;
    height: 100%;
  }

  .unsub-page {
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
