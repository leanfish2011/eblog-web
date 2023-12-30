<template>
  <div id="home">
    <top-header></top-header>
    <main class="app-body">
      <label v-for="item in dataList" :key="item.id">
        <article class="article-card">
          <h2 class="article-head">
            <a @click="showContent(item.id)">{{ item.title }}</a>
          </h2>
          <p class="article-date">{{ dateFormat(item.createTime) }}</p>
          <label v-for="tag in item.arrayTag">
            <span class="tag-code">{{ tag }}</span>
          </label>
          <div class="article-summary">
            {{ item.remark }}
          </div>
          <a class="more" @click="showContent(item.id)">阅读更多</a>
        </article>
      </label>
      <div class="list-page">
        <el-pagination
            ref="page"
            @current-change="handleCurrentChange"
            background
            :current-page="currentPage"
            layout="prev,pager,next"
            :total="totalCount">
        </el-pagination>
      </div>
    </main>
    <bottom-footer></bottom-footer>
  </div>
</template>

<script>
import Header from '../Header'
import Footer from '../Footer'
import Service from '../../../config/service'
import DateUtil from '../../../utils/dateUtil'
import DictUtil from '../../../utils/dictUtil'

export default {
  name: 'Home',
  components: {
    "topHeader": Header,
    "bottomFooter": Footer
  },
  data() {
    return {
      dataList: null,
      totalCount: 0,
      currentPage: 1,
      searchForm: {
        pageNo: 1,
        pageSize: 10
      },
      dict: null
    }
  },
  created() {
    this.getList();
    this.getDict();
  },
  methods: {
    getList() {
      this.searchForm.pageNo = this.currentPage;

      this.$axios.get(Service.blogUrl.blog, {
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
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getList();
    },
    showContent(id) {
      this.$router.push({
        path: '/blogview',
        query: {id: id} // 参数传值
      })
    },
    //时间格式化
    dateFormat(createTime) {
      return DateUtil.dateFormat(createTime);
    },
    getDict() {
      this.$axios.get(Service.dictUrl.dict).then((res) => {
        if (res.status === 200) {
          let responseData = res.data;
          if (responseData.code === 0) {
            this.dict = responseData.data;

            // 存储数据字典
            DictUtil.saveDictTmp(this.dict);
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
  }
}
</script>

<style scoped>
#home {
  width: 100%;
  margin-top: 20px;
}

.article-card {
  padding-bottom: 2px;
}

.article-card:first-child {
  margin-top: 40px;
}

h2.article-head {
  font-size: 1.6em;
  margin-bottom: 0;
}

.article-head > a {
  color: #34495e;
}

.article-head > a:hover {
  border-bottom: 2px solid #ff6700;
}

.article-date {
  color: #7f8c8d;
  margin: 10px 0;
  font-size: 0.9em;
}

.article-summary {
  margin: 10px 0;
  color: #34495e;
}

.tag-code {
  font-family: 'Roboto Mono', Monaco, courier, monospace;
  font-size: 0.8em;
  display: inline-block;
  background-color: #f8f8f8;
  color: #e96900;
  padding: 3px 5px;
  margin: 0 2px 5px 0;
  border-radius: 2px;
  white-space: nowrap;
}

.more {
  font-weight: 600;
  display: inline-block;
  transition: all 0.3s;
}

.more:hover {
  transform: translateX(10px);
}

.list-page {
  margin: 30px 0;
}
</style>
