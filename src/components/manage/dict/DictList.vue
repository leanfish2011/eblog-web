<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>后台管理</el-breadcrumb-item>
      <el-breadcrumb-item>数据字典列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider></el-divider>
    <el-form ref="form" :inline="true" :model="searchForm" label-width="80px" size="small">
      <el-form-item label="标题">
        <el-input v-model="searchForm.title"
                  placeholder="按照标题查询"
                  clearable
                  style="width: 500px;"
                  maxlength="50"
                  show-word-limit></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSearch">查询</el-button>
      </el-form-item>
    </el-form>
    <el-divider></el-divider>
    <el-table
        size="medium"
        :data="dataList"
        stripe
        style="width: 100%">
      <el-table-column
          prop="title"
          label="标题"
          width="180">
      </el-table-column>
      <el-table-column
          prop="content"
          label="内容">
      </el-table-column>
      <el-table-column
          prop="remark"
          label="备注">
      </el-table-column>
      <el-table-column
          prop="createTime"
          label="创建时间" :formatter="dateFormat">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
        ref="sitepage"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
        background
        :page-sizes="[10, 20, 50]"
        :page-size="perSize"
        :current-page="currentPage"
        layout="prev, pager, next, total, sizes"
        :total="totalCount">
    </el-pagination>
    <dict-update-dialog ref="updateDialog" @refresh="loadData()"></dict-update-dialog>
  </div>
</template>

<script>
import Service from '../../../config/service'
import DateUtil from '../../../utils/dateUtil'
import DictUpdateDialog from './DictUpdateDialog.vue'

export default {
  name: "DictList",
  components: {
    "dictUpdateDialog": DictUpdateDialog
  },
  data() {
    return {
      perSize: 10,
      totalCount: 0,
      currentPage: 1,
      searchForm: {
        title: null,
        pageNo: 1,
        pageSize: 10
      },
      dataList: null
    }
  },
  methods: {
    onSearch() {
      if (this.searchForm.title == '') {
        this.searchForm.title = null;
      }

      this.searchForm.pageNo = this.currentPage;
      this.searchForm.pageSize = this.perSize;

      this.loadData();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.onSearch();
    },
    handleSizeChange(val) {
      this.perSize = val;
      this.onSearch();
    },
    handleEdit(index, row) {
      this.$refs.updateDialog.dialogFormVisible = true;
      this.$refs.updateDialog.updateModel = Object.assign({}, row);//将数据传入dialog页面
    },
    //时间格式化
    dateFormat(row) {
      return DateUtil.dateFormat(row.createTime);
    },
    loadData() {
      this.$axios.get(Service.dictUrl.dict + '/search', {
        params: this.searchForm
      }).then((res) => {
        if (res.status === 200) {
          let responseData = res.data;
          if (responseData.code === 0) {
            this.totalCount = responseData.data.allTotal;
            this.dataList = responseData.data.list;
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
  },
  created() {
    this.loadData();
  }
}
</script>

<style scoped>
.el-divider {
  margin: 10px 0;
}

a:link, a:visited {
  color: #2f65ca
}

/* 已访问的链接 */
a:hover {
  color: #5c31ff
}
</style>
