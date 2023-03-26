<template>
  <div id="my">
    <nav-header></nav-header>
    <div class="myContent">
      <el-timeline style="width: 40%">
        <el-timeline-item
          v-for="(item, index) in myDataList"
          :timestamp="dateFormat(item.createTime)"
          :key="index"
          type="primary"
          color="#0bbd87"
          size="large" placement="top">
          <el-card class="siteCard">
            <el-row>
              <el-col :span="6">
                <a :href=item.url target="_blank">
                  <img class="siteIcon" :src="queryIcon(item.iconUrl)"/>
                </a>
              </el-col>
              <el-col :span="18">
                <el-link :href="item.url" target="_blank" class="el-link">{{item.name}}
                </el-link>
                <div class="remark">{{item.remark}}</div>
              </el-col>
            </el-row>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </div>
    <bottom-footer></bottom-footer>
  </div>
</template>

<script>
  import NavHeader from '../NavHeader'
  import Footer from '../Footer'
  import Service from '../../../config/service'
  import AuthUtil from '../../../utils/authUtil'
  import DateUtil from '../../../utils/dateUtil'

  export default {
    name: 'my',
    components: {
      "navHeader": NavHeader,
      "bottomFooter": Footer,
    },
    data() {
      return {
        myDataList: null
      }
    },
    methods: {
      load() {
        this.$axios.get(Service.siteUrl.sitePersonal, {
          headers: {
            'Authorization': localStorage.getItem('token')
          }
        }).then((res) => {
          if (res.status === 200) {
            let responseData = res.data;
            if (responseData.code === 0) {
              this.myDataList = responseData.data.list;
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
      dateFormat(createTimeStamp) {
        return DateUtil.dateFormat(createTimeStamp);
      },
      queryIcon(url) {
        if (url == null || url == "") {
          return "../../../../static/eblog.ico";
        }

        return url;
      }
    },
    created() {
      this.load();
    }
  }
</script>

<style scoped>
  #my {
    width: 100%;
    margin-top: 120px;
  }

  .myContent {
    width: 50%;
    min-height: calc(100vh - 186px);
    margin: 5px auto 5px auto;
  }

  .siteCard {
    width: 120%;
    height: 100px;
  }

  .siteIcon {
    width: 50%;
    height: 50%;
  }

  .el-link{
    font-size: 16px;
  }

  .remark {
    font-size: 14px;
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
