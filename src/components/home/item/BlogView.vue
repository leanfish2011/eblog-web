<template>
  <div id="blogView">
    <top-header></top-header>
    <div class="blogViewContent">
      <h2 class="title">{{ viewModel.title }}</h2>
      <p class="createTime">发布于：{{ dateFormat(viewModel.createTime) }}</p>
      <div class="content" v-html="viewModel.content"></div>
    </div>
    <bottom-footer></bottom-footer>
  </div>
</template>

<script>
import Header from '../Header'
import Footer from '../Footer'
import Service from '../../../config/service'
import DateUtil from '../../../utils/dateUtil'

export default {
  name: 'blogView',
  components: {
    "topHeader": Header,
    "bottomFooter": Footer
  },
  data() {
    return {
      viewModel: {
        id: "",
        title: "",
        createTime: "",
        content: ""
      }
    }
  },
  methods: {
    loadData(id) {
      this.$axios.get(Service.blogUrl.blog + '/' + id).then((res) => {
        if (res.status === 200) {
          let responseData = res.data;
          if (responseData.code === 0) {
            this.viewModel.title = responseData.data.title;
            this.viewModel.createTime = responseData.data.createTime;
            this.viewModel.content = responseData.data.content;
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
    //时间格式化
    dateFormat(createTime) {
      return DateUtil.dateFormat(createTime);
    }
  },
  mounted() {
    let id = this.$route.query.id;
    this.loadData(id);
  }
}
</script>

<style scoped>
#blogView {
  width: 100%;
  margin-top: 80px;
}

.blogViewContent {
  width: 50%;
  min-height: calc(100vh - 186px);
  margin: 5px auto 5px auto;
}

.title {
  font-size: 1.6em;
  margin-bottom: 0;
}

.createTime {
  font-size: 0.8em;
}

.content {
  border-top: 1px solid #e5e5e5;
}

a:link, a:visited {
  text-decoration: none;
  color: #2f65ca
}

/* 已访问的链接 */
a:hover {
  color: #5c31ff
}
</style>
