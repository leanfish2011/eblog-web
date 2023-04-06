<template>
  <div id="blogView">
    <nav-header></nav-header>
    <div class="blogViewContent">
      <p>{{ viewModel.title }}</p>
      <p>发布时间：{{ dateFormat(viewModel.createTime) }}</p>
      <span v-html="viewModel.content"></span>
    </div>
    <bottom-footer></bottom-footer>
  </div>
</template>

<script>
import NavHeader from '../NavHeader'
import Service from '../../../config/service'
import Footer from '../Footer'
import DateUtil from "../../../utils/dateUtil";

export default {
  name: 'blogView',
  components: {
    "navHeader": NavHeader,
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
  margin-top: 120px;
}

.blogViewContent {
  width: 50%;
  min-height: calc(100vh - 186px);
  margin: 5px auto 5px auto;
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
