<template>
  <div id="home">
    <nav-header></nav-header>
    <div class="homeContent">
      <label v-for="item in dataList" :key="item.id">
        <el-card shadow="hover" class="siteCard">
          <el-row>
            <el-col :span="2">
              <a :href=item.url target="_blank">
                <img class="siteIcon" :src="queryIcon(item.iconUrl)"/>
              </a>
            </el-col>
            <el-col :span="22">
              <el-link @click="showContent(item.id)" target="_blank" class="el-link">{{
                  item.title
                }}
              </el-link>
              <el-tooltip effect="dark" placement="bottom-end" v-if="isMore(item.content)">
                <div slot="content" v-html="showRemarkTip(item.content)"></div>
                <div class="remark">{{ cutRemark(item.content) }}</div>
              </el-tooltip>
              <div class="remark" v-else>{{ item.content }}</div>
            </el-col>
          </el-row>
        </el-card>
      </label>
    </div>
    <bottom-footer></bottom-footer>
  </div>
</template>

<script>
import NavHeader from '../NavHeader'
import Service from '../../../config/service'
import Footer from '../Footer'

let remarkLength = 60;
export default {
  name: 'home',
  components: {
    "navHeader": NavHeader,
    "bottomFooter": Footer
  },
  data() {
    return {
      dataList: null
    }
  },
  created() {
    this.$axios.get(Service.blogUrl.blog).then((res) => {
      if (res.status === 200) {
        this.dataList = res.data.data.list;
      } else {
        this.$message.error("系统内部错误");
      }
    }).catch(function (error) {
      console.error(error);
    });
  },
  methods: {
    queryIcon(url) {
      if (url == null || url == "") {
        return "../../../../static/eblog.ico";
      }

      return url;
    },
    isMore(remark) {
      if (remark != null && remark.length > remarkLength) {
        return true;
      }

      return false;
    },
    cutRemark(remark) {
      return remark.slice(0, remarkLength);
    },
    showRemarkTip(remark) {
      return remark.replace(/(.{30})/g, "$1<br/>");
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
#home {
  width: 100%;
  margin-top: 120px;
}

.homeContent {
  width: 50%;
  min-height: calc(100vh - 186px);
  margin: 5px auto 5px auto;
}

.siteCard {
  height: 80px;
  margin-top: 5px;
}

.siteIcon {
  width: 50%;
  height: 50%;
}

.remark {
  font-size: 14px;
}

.el-link {
  font-size: 16px;
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
