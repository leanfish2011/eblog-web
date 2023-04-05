<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>后台管理</el-breadcrumb-item>
      <el-breadcrumb-item>博客管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider></el-divider>
    <el-form ref="addForm" :model="addModel" label-width="60px" :rules="validRule"
             status-icon
             class="add-page">
      <el-form-item label="标题" prop="title">
        <el-input v-model="addModel.title" placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item label="内容" prop="content">
        <el-input v-model="addModel.content" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" :loading="submiting">确定</el-button>
        <el-button @click="onClear">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Service from '../../../config/service'
import AuthUtil from '../../../utils/authUtil'

export default {
  name: "blogadd",
  data() {
    return {
      submiting: false,
      addModel: {
        id: "",
        title: "",
        content: ""
      },
      validRule: {
        title: [{required: true, message: '请输入标题', trigger: 'blur'}],
        content: [{required: true, message: '请输入内容', trigger: 'blur'}]
      }
    };
  },
  methods: {
    onSubmit() {
      if (this.addModel.id === "" || this.addModel.id === undefined) {
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
                AuthUtil.clearSession();
                this.$router.push('/login');
              }
            }
          } else {
            this.$message.error("系统内部错误");
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
    onClear() {
      this.addModel = Object.assign({}, "");
    },
    loadData(id) {
      this.$axios.get(Service.blogUrl.blog + '/' + id).then((res) => {
        if (res.status === 200) {
          let responseData = res.data;
          if (responseData.code === 0) {
            this.addModel.title = responseData.data.title;
            this.addModel.content = responseData.data.content;
          } else {
            this.$message.error(responseData.msg);
          }
        } else {
          this.$message.error("系统内部错误");
        }
      }).catch(function (error) {
        console.error(error);
      });
    }
  },
  mounted() {
    let id = this.$route.query.id;
    this.addModel.id = id;
    this.loadData(id);
  }
}
</script>

<style scoped>
.el-divider {
  margin: 10px 0;
}
</style>
