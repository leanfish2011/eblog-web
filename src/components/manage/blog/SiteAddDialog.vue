<template>
  <div>
    <el-dialog
      title="新增网页收藏" :visible.sync="dialogFormVisible" @close='onCloseDialog'>
      <el-form ref="addForm" :model="addModel" label-width="100px" :rules="validRule"
               status-icon
               class="register-page">
        <el-form-item label="链接" prop="url">
          <el-input v-model="addModel.url" placeholder="请输入链接" @blur="checkContent"></el-input>
        </el-form-item>
        <el-form-item label="标题" prop="name">
          <el-input v-model="addModel.name" placeholder="请输入标题"></el-input>
        </el-form-item>
        <el-form-item label="标签" prop="tag">
          <el-input v-model="addModel.tag" placeholder="请输入标签"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="addModel.remark" placeholder="请输入备注"></el-input>
        </el-form-item>
        <el-form-item label="发布到首页" prop="isPost">
          <el-switch v-model="addModel.isPost"></el-switch>
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
    name: "siteAddDialog",
    data() {
      return {
        dialogFormVisible: false,
        submiting: false,
        addModel: {
          id: "",
          name: "",
          remark: "",
          tag: "",
          url: "",
          isPost: false
        },
        checkContentModel: {
          url: ""
        },
        checkContentResp: {
          isPass: false,
          webContentVO: {
            description: "",
            keyWords: "",
            title: ""
          }
        },
        validRule: {
          name: [{required: true, message: '请输入标题', trigger: 'blur'}],
          url: [{required: true, message: '请输入链接', trigger: 'blur'}]
        }
      };
    },
    methods: {
      onSubmit() {
        if (this.addModel.id === "" || this.addModel.id === undefined) {
          this.$axios.post(Service.siteUrl.sitePersonal, this.addModel,
            {
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
          this.$axios.put(Service.siteUrl.sitePersonal, this.addModel, {
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
        this.addModel = Object.assign({}, "");
        this.checkContentModel = Object.assign({}, "");
        this.checkContentResp = Object.assign({}, "");
      },
      onClose() {
        this.onCloseDialog();
      },
      checkContent() {
        let url = this.addModel.url;
        if (url == null || url == "") {
          return;
        }
        this.checkContentModel.url = url;
        this.$axios.post(Service.siteUrl.siteCheck, this.checkContentModel).then((res) => {
          if (res.status === 200) {
            let responseData = res.data;
            if (responseData.code === 0) {
              this.checkContentResp = responseData.data;
              if (this.checkContentResp.isPass) {
                this.addModel.name = this.checkContentResp.webContentVO.title;
                this.addModel.tag = this.checkContentResp.webContentVO.keyWords;
                this.addModel.remark = this.checkContentResp.webContentVO.description;
              } else {
                this.$message.error("该网站存在不合规内容！");
                this.$refs.addForm.resetFields();
                this.addModel = Object.assign({}, "");
                this.checkContentModel = Object.assign({}, "");
                this.checkContentResp = Object.assign({}, "");
              }
            } else {
              this.$message.error(responseData.msg);
            }
          } else {
            this.$message.error("系统内部错误");
          }
        });
      }
    }
  }
</script>

<style scoped>

</style>
