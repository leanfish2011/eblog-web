<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>后台管理</el-breadcrumb-item>
      <el-breadcrumb-item>关于</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider></el-divider>
    <el-form ref="updateForm" :model="updateModel" label-width="60px" :rules="validRule"
             status-icon
             class="add-page" size="small">
      <el-form-item label="标题" prop="title">
        <el-input v-model="updateModel.title" :disabled="true" size="medium"
                  style="width: 100px;"></el-input>
        <label>编辑的内容展示在首页"关于"页面中</label>
      </el-form-item>
      <el-form-item label="内容" prop="content">
        <content-editor ref="meContentEditor"></content-editor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" :loading="submiting">确定</el-button>
        <el-button @click="saveTmp" type="warning">暂存</el-button>
        <el-button @click="onClear" type="danger">清空</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Service from '../../../config/service'
import AuthUtil from '../../../utils/authUtil'
import MeTmpUtil from '../../../utils/meTmpUtil'
import ContentEditor from '../../common/ContentEditor'

export default {
  name: "MeUpdate",
  components: {
    "contentEditor": ContentEditor
  },
  data() {
    return {
      submiting: false,
      isAddStyle: false,
      updateModel: {
        id: "",
        title: "",
        content: ""
      },
      validRule: {
        content: [{required: true, message: '请输入内容', trigger: 'blur'}]
      }
    };
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();
      this.updateModel.content = this.$refs.meContentEditor.editorData;

      this.$refs.updateForm.validate((valid) => {
        if (valid) {
          this.$axios.put(Service.dictUrl.dict, this.updateModel, {
            headers: {
              'Authorization': localStorage.getItem('token')
            }
          }).then((res) => {
            if (res.status === 200) {
              let responseData = res.data;
              if (responseData.code === 0) {
                this.$message.success(responseData.msg);
              } else {
                this.$message.error(responseData.msg);
                if (responseData.code === -2) {
                  this.saveTmp();

                  AuthUtil.clearSession();
                  this.$router.push('/login');
                }
              }
            } else {
              this.saveTmp();

              this.$message.error("系统内部错误");
            }
          })
        }
      });
    },
    onClear() {
      this.$confirm('将清空当前编辑内容，确定?', '提示', {
        type: 'warning'
      }).then(() => {
        this.$refs.meContentEditor.editorData = "";
      }).catch(
          () => {
            this.$message({
              type: 'info',
              message: '已取消'
            });
          }
      );
    },
    loadData(title) {
      this.$axios.get(Service.dictUrl.dict + '/' + title).then((res) => {
        if (res.status === 200) {
          let responseData = res.data;
          if (responseData.code === 0) {
            this.updateModel.id = responseData.data.id;
            this.updateModel.title = responseData.data.title;
            this.updateModel.content = responseData.data.content;

            this.$refs.meContentEditor.editorData = this.updateModel.content;
          } else {
            this.$message.error(responseData.msg);
          }
        } else {
          this.$message.error("系统内部错误");
        }
      }).catch(function (error) {
        console.error(error);
      });
    },
    saveTmp() {
      this.updateModel.content = this.$refs.meContentEditor.editorData;
      MeTmpUtil.saveMeTmp(JSON.stringify(this.updateModel));
    },
    restoreTmp() {
      let meModeObj = MeTmpUtil.getMeTmp();
      if (meModeObj != null) {
        let meMode = JSON.parse(meModeObj);
        let storeTitle = meMode.title;
        //编辑的是上次那个内容才恢复
        if (storeTitle === this.updateModel.title) {
          this.$confirm('是否恢复上次内容?', '提示', {
            type: 'warning'
          }).then(() => {
            this.updateModel.id = meMode.id;
            this.updateModel.title = meMode.title;
            this.updateModel.content = meMode.content;

            this.$refs.meContentEditor.editorData = this.updateModel.content;
          }).catch(
              () => {
                this.$message({
                  type: 'info',
                  message: '已取消'
                });

                MeTmpUtil.clearMeTmp();
              }
          );
        }
      }
    }
  },
  mounted() {
    this.updateModel.title = 'aboutMe';
    this.loadData('aboutMe');
    this.restoreTmp();
  }
}
</script>

<style scoped>
.el-divider {
  margin: 10px 0;
}
</style>
