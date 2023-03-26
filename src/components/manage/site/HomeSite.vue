<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>后台管理</el-breadcrumb-item>
      <el-breadcrumb-item>主页网址管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider></el-divider>
    <el-form ref="form" :inline="true" :model="searchForm" label-width="80px" size="mini">
      <el-form-item label="标题">
        <el-input v-model="searchForm.name" placeholder="标题" clearable></el-input>
      </el-form-item>
      <el-form-item label="创建时间">
        <el-date-picker
          v-model="value2"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd HH:mm:ss"
          :default-time="['00:00:00', '23:59:59']"
          :picker-options="pickerOptions">
        </el-date-picker>
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
      :data="siteData"
      stripe
      style="width: 100%">
      <el-table-column
        prop="name"
        label="标题"
        width="180">
      </el-table-column>
      <el-table-column
        prop="url"
        label="链接"
        width="500">
        <template slot-scope="scope">
          <a :href="scope.row.url"
             target="_blank"
             class="buttonText">{{scope.row.url}}</a>
        </template>
      </el-table-column>
      <el-table-column
        prop="remark"
        label="备注">
      </el-table-column>
      <el-table-column
        prop="tag"
        label="标签">
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
    <home-site-add-dialog ref="addDialog" @refresh="load()"></home-site-add-dialog>
  </div>
</template>

<script>
  import HomeSiteAddDialog from './HomeSiteAddDialog'
  import Service from '../../../config/service'
  import DateUtil from '../../../utils/dateUtil'
  import AuthUtil from '../../../utils/authUtil'

  export default {
    name: "HomeSite",
    components: {
      "homeSiteAddDialog": HomeSiteAddDialog
    },
    data() {
      return {
        perSize: 10,
        totalCount: 1,
        currentPage: 1,
        searchForm: {
          name: null,
          createTimeStart: null,
          createTimeEnd: null,
          pageNo: 1,
          pageSize: 10
        },
        value2: '',
        siteData: null,
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              picker.$emit('pick', DateUtil.beforeDate(7));
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              picker.$emit('pick', DateUtil.beforeDate(30));
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              picker.$emit('pick', DateUtil.beforeDate(90));
            }
          }]
        },
      }
    },
    methods: {
      onSearch() {
        if (this.value2 != null) {
          this.searchForm.createTimeStart = this.value2[0];
          this.searchForm.createTimeEnd = this.value2[1];
        } else {
          this.searchForm.createTimeStart = null;
          this.searchForm.createTimeEnd = null;
        }

        if (this.searchForm.name == '') {
          this.searchForm.name = null;
        }

        this.searchForm.pageNo = this.currentPage;
        this.searchForm.pageSize = this.perSize;

        this.$axios.get(Service.siteUrl.siteHome, {
          params: this.searchForm,
          headers: {
            'Authorization': localStorage.getItem('token')
          }
        }).then((res) => {
          if (res.status === 200) {
            let responseData = res.data;
            if (responseData.code === 0) {
              this.totalCount = responseData.data.allTotal;
              this.siteData = responseData.data.list;
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
      handleCurrentChange(val) {
        this.currentPage = val;
        this.onSearch();
      },
      handleSizeChange(val) {
        this.perSize = val;
        this.onSearch();
      },
      onAddShow() {
        this.$refs.addDialog.dialogFormVisible = true;
      },
      handleEdit(index, row) {
        this.$refs.addDialog.dialogFormVisible = true;
        this.$refs.addDialog.addModel = Object.assign({}, row);//将数据传入dialog页面
      },
      handleDelete(index, row) {
        this.$confirm('确定删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios.delete(Service.siteUrl.siteHome + '/' + row.id,
            {
              headers: {
                'Authorization': localStorage.getItem('token')
              }
            }).then((res) => {
            if (res.status === 200) {
              let responseData = res.data;
              if (responseData.code === 0) {
                this.$message.success(responseData.msg);
                this.load();
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
      load() {
        this.$axios.get(Service.siteUrl.siteHome, {
          params: this.searchForm,
          headers: {
            'Authorization': localStorage.getItem('token')
          }
        }).then((res) => {
          if (res.status === 200) {
            let responseData = res.data;
            if (responseData.code === 0) {
              this.totalCount = responseData.data.allTotal;
              this.siteData = responseData.data.list;
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
      this.load();
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
