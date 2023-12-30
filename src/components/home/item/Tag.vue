<template>
  <div id="tag">
    <top-header></top-header>
    <main class="app-body" id="tags">
      <div class="tags-clouds">
        <label v-for="tag in tags">
          <a :href="'#'+tag">{{ tag }}</a>
        </label>
      </div>
      <div class="blog">
        <label v-for="blogData in blogDatas">
          <div class="tags-item" :id="blogData.tag">
            <i class="el-icon-document"></i>
            <h3 class="tags-item-label">{{ blogData.tag }}</h3>
            <label v-for="blog in blogData.tagBlogList">
              <a class="tags-post" @click="showContent(blog.id)">
                <div>
                  <span class="tags-post-title">{{ blog.title }}</span>
                  <div class="tags-post-line"></div>
                </div>
                <span class="tags-post-meta">{{ dateFormat(blog.createTime) }}</span>
              </a>
            </label>
          </div>
        </label>
      </div>
    </main>
    <bottom-footer></bottom-footer>
  </div>
</template>

<script>
import Header from '../Header'
import Footer from '../Footer'
import Service from "../../../config/service";
import DateUtil from "../../../utils/dateUtil";

export default {
  name: "Tag",
  components: {
    "topHeader": Header,
    "bottomFooter": Footer
  },
  data() {
    return {
      tags: {},
      blogDatas: {}
    }
  },
  created() {
    this.getTag();
    this.getBlogs();
  },
  methods: {
    getTag() {
      this.$axios.get(Service.blogUrl.tag).then((res) => {
        if (res.status === 200) {
          let responseData = res.data;
          if (responseData.code === 0) {
            this.tags = responseData.data;
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
    getBlogs() {
      this.$axios.get(Service.blogUrl.tag + "/blog").then((res) => {
        if (res.status === 200) {
          let responseData = res.data;
          if (responseData.code === 0) {
            this.blogDatas = responseData.data;
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
    },
    showContent(id) {
      this.$router.push({
        path: '/blogview',
        query: {id: id} // 参数传值
      })
    }
  }
}
</script>

<style scoped>
#tag {
  width: 100%;
  margin-top: 80px;
}

.tags-clouds {
  text-align: center;
  font-family: "Helvetica Neue", "Segoe UI", Helvetica, Arial, sans-serif;
}

.tags-clouds a {
  display: inline-block;
  margin: 0 0.1rem 0.2rem;
  padding: 0.2rem 0.5rem;
  background: #07e7ef0d;
  border-radius: 5px;
  color: #34495e;
  text-decoration: none;
}

.tags-item-label {
  display: inline-block;
  margin: 2rem 0 0.5rem;
  font-family: "Helvetica Neue", "Segoe UI", Helvetica, Arial, sans-serif;
  color: #34495e;
}

.tags-post {
  display: flex;
  justify-content: space-between;
  padding: 5px 0;
}
</style>