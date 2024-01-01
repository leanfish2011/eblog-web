<template>
  <div>
    <el-dialog
        title="编辑数据字典" :visible.sync="dialogFormVisible" @close='onCloseDialog'>
      <el-form ref="updateForm" :model="updateModel" label-width="100px" :rules="validRule"
               status-icon
               class="register-page">
        <el-form-item label="标题" prop="title">
          <el-input v-model="updateModel.title" :disabled="true"
                    placeholder="请输入标题"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <el-input v-model="updateModel.content" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="updateModel.remark" placeholder="请输入备注"></el-input>
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
  name: "DictUpdateDialog",
  data() {
    return {
      dialogFormVisible: false,
      submiting: false,
      updateModel: {
        id: "",
        title: "",
        content: "",
        remark: ""
      },
      validRule: {
        content: [{required: true, message: '请输入内容', trigger: 'blur'}]
      }
    };
  },
  methods: {
    onSubmit() {
      this.$axios.put(Service.dictUrl.dict, this.updateModel, {
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
    },
    onCloseDialog() {
      this.$refs.updateForm.resetFields();
      this.dialogFormVisible = false;
      this.updateModel = Object.assign({}, "");
    },
    onClose() {
      this.onCloseDialog();
    }
  }
}
</script>

<style scoped>

</style>
