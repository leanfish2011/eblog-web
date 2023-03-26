<template>
  <div class="mesadd-container">
    <el-form ref="mesForm" :model="mesModel" label-width="80px" :rules="validRule"
             status-icon
             class="mes-page">
      <el-form-item label="留言" prop="content">
        <el-input type="textarea" :rows="3" v-model="mesModel.content"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button v-if="showLogin()" type="primary" size="medium" @click="openLogin">登录发表留言
        </el-button>
        <el-button v-else type="primary" size="medium" @click="onSubmit" :loading="mesing">发布
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import Service from '../../../../config/service'
  import AuthUtil from '../../../../utils/authUtil'

  export default {
    name: "MesBoardAdd",
    data() {
      return {
        userName: '',
        mesing: false,
        mesModel: {
          content: '',
          parentId: this.parentId
        },
        validRule: {
          content: [
            {required: true, message: '请输入留言内容', trigger: 'blur'}
          ]
        }
      }
    },
    props:['parentId'],
    methods: {
      onSubmit(event) {
        event.preventDefault();
        this.$refs.mesForm.validate((valid) => {
          if (valid) {
            this.mesing = true;
            this.$axios.post(Service.systemUrl.message, this.mesModel,
              {
                headers: {
                  'Authorization': localStorage.getItem('token')
                }
              }).then(
              (res) => {
                if (res.status === 200) {
                  let responseData = res.data;
                  if (responseData.code === 0) {
                    this.mesing = false;
                    this.$message({
                      message: responseData.msg,
                      type: 'success'
                    });

                    this.$refs.mesForm.resetFields();
                    this.$emit('refresh');
                  } else {
                    this.mesing = false;
                    this.$message.error(responseData.msg);
                  }
                } else {
                  this.mesing = false;
                  this.$message.error("系统内部错误");
                }
              })
          }
        })
      },
      authCheck() {
        this.$axios.get(Service.authUrl.authCheck, {
          headers: {
            'Authorization': localStorage.getItem('token')
          }
        }).then((res) => {
          if (res.status === 200) {
            let responseData = res.data;
            let code = responseData.code;
            if (code === -1 || code === -2) {
              AuthUtil.clearSession();
            } else {
              let userName = localStorage.getItem('userName');
              this.userName = userName;
            }
          } else {
            this.$message.error("系统内部错误");
          }
        }).catch(function (error) {
          console.error(error);
        });
      },
      openLogin() {
        this.$router.push('/login');
      },
      showLogin() {
        if (this.userName == null || this.userName == '') {
          return true;
        }

        return false;
      },
    },
    mounted() {
      this.authCheck();
    }
  }
</script>

<style scoped>

</style>
