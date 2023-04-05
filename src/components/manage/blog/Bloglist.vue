<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>后台管理</el-breadcrumb-item>
      <el-breadcrumb-item>博客列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider></el-divider>
    <el-form ref="form" :inline="true" :model="searchForm" label-width="80px" size="mini">
      <el-form-item label="标题">
        <el-input v-model="searchForm.title" placeholder="标题" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSearch">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onAddShow">创建</el-button>
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
          <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除
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
  </div>
</template>

<script>
import Service from '../../../config/service'
import DateUtil from '../../../utils/dateUtil'
import AuthUtil from '../../../utils/authUtil'

export default {
  name: "bloglist",
  data() {
    return {
      perSize: 10,
      totalCount: 1,
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
    onAddShow() {
      this.$router.push('/blogadd');
    },
    handleEdit(index, row) {
      this.$router.push({
        path: '/blogadd',
        query: {id: row.id} // 参数传值
      })
    },
    handleDelete(index, row) {
      this.$confirm('确定删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios.delete(Service.blogUrl.blog + '/' + row.id,
            {
              headers: {
                'Authorization': localStorage.getItem('token')
              }
            }).then((res) => {
          if (res.status === 200) {
            let responseData = res.data;
            if (responseData.code === 0) {
              this.$message.success(responseData.msg);

              this.loadData();
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
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    //时间格式化
    dateFormat(row) {
      return DateUtil.dateFormat(row.createTime);
    },
    loadData() {
      this.$axios.get(Service.blogUrl.blog, {
        params: this.searchForm,
        headers: {
          'Authorization': localStorage.getItem('token')
        }
      }).then((res) => {
        if (res.status === 200) {
          let responseData = res.data;
          if (responseData.code === 0) {
            this.totalCount = responseData.data.allTotal;
            this.dataList = responseData.data.list;
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
