<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>后台管理</el-breadcrumb-item>
      <el-breadcrumb-item>博客发布</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider></el-divider>
    <el-form ref="addForm" :model="addModel" label-width="60px" :rules="validRule"
             status-icon
             class="add-page" size="small">
      <el-form-item label="标题" prop="title">
        <el-input v-model="addModel.title"
                  placeholder="请输入标题"
                  clearable
                  style="width: 800px;"
                  maxlength="100"
                  show-word-limit
                  size="medium"></el-input>
      </el-form-item>
      <el-form-item label="标签" prop="arrayTag">
        <tag-editor ref="blogTagEditor"></tag-editor>
      </el-form-item>
      <el-form-item label="内容" prop="content">
        <content-editor ref="blogContentEditor"></content-editor>
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
import BlogTmpUtil from "../../../utils/blogTmpUtil";
import ContentEditor from "../../common/ContentEditor";
import TagEditor from "../../common/TagEditor";

export default {
  name: "BlogAdd",
  components: {
    "contentEditor": ContentEditor,
    "tagEditor": TagEditor
  },
  data() {
    return {
      submiting: false,
      isAddStyle: false,
      addModel: {
        id: "",
        title: "",
        arrayTag: "",
        content: ""
      },
      validRule: {
        title: [{required: true, message: '请输入标题', trigger: 'blur'}],
        content: [{required: true, message: '请输入内容', trigger: 'blur'}]
      }
    };
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();
      this.addModel.content = this.$refs.blogContentEditor.editorData;
      this.addModel.arrayTag = this.$refs.blogTagEditor.dynamicTags;

      this.$refs.addForm.validate((valid) => {
        if (valid) {
          if (this.isAddStyle) {
            this.$axios.post(Service.blogUrl.blog, this.addModel,
                {
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
                this.$message.error("系统内部错误");
                this.saveTmp();
              }
            })
          } else {
            this.$axios.put(Service.blogUrl.blog, this.addModel, {
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
        }
      });
    },
    onClear() {
      this.$confirm('将清空当前编辑内容，确定?', '提示', {
        type: 'warning'
      }).then(() => {
        this.addModel = Object.assign({}, "");
        this.$refs.blogContentEditor.editorData = "";
        this.$refs.blogTagEditor.dynamicTags = "";
      }).catch(
          () => {
            this.$message({
              type: 'info',
              message: '已取消'
            });
          }
      );
    },
    loadData(id) {
      this.$axios.get(Service.blogUrl.blog + '/' + id).then((res) => {
        if (res.status === 200) {
          let responseData = res.data;
          if (responseData.code === 0) {
            this.addModel.title = responseData.data.title;
            this.addModel.content = responseData.data.content;
            this.addModel.arrayTag = responseData.data.arrayTag;

            this.$refs.blogContentEditor.editorData = this.addModel.content;
            this.$refs.blogTagEditor.dynamicTags = this.addModel.arrayTag;
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
    getPathData() {
      let id = this.$route.query.id;
      if (id === null || id === "" || id === undefined) {
        this.isAddStyle = true;
      } else {
        this.addModel.id = id;
        this.loadData(id);
      }
    },
    saveTmp() {
      this.addModel.content = this.$refs.blogContentEditor.editorData;
      this.addModel.arrayTag = this.$refs.blogTagEditor.dynamicTags;
      BlogTmpUtil.saveBlogTmp(JSON.stringify(this.addModel));
    },
    restoreTmp() {
      let blogModeObj = BlogTmpUtil.getBlogTmp();
      if (blogModeObj != null) {
        let blogMode = JSON.parse(blogModeObj);
        let storeId = blogMode.id;
        if (this.isAddStyle || storeId === this.addModel.id) {
          this.$confirm('是否恢复上次内容?', '提示', {
            type: 'warning'
          }).then(() => {
            this.addModel.id = storeId;
            this.addModel.title = blogMode.title;
            this.addModel.content = blogMode.content;
            this.addModel.arrayTag = blogMode.arrayTag;

            this.$refs.blogContentEditor.editorData = this.addModel.content;
            this.$refs.blogTagEditor.dynamicTags = this.addModel.arrayTag;
          }).catch(
              () => {
                this.$message({
                  type: 'info',
                  message: '已取消'
                });

                BlogTmpUtil.clearBlogTmp();
              }
          );

        }
      }
    }
  },
  mounted() {
    this.getPathData();
    this.restoreTmp();
  }
}
</script>

<style scoped>
.el-divider {
  margin: 10px 0;
}
</style>
