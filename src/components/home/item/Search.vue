<template>
  <div id="search">
    <search-header @search="onSearch"></search-header>
    <div class="searchContent">
      <el-row :gutter="8">
        <label v-for="item in myDataList" :key="item.id">
          <el-col :span="4">
            <el-card shadow="hover" class="siteCard">
              <el-row>
                <el-col :span="6">
                  <a :href=item.url target="_blank">
                    <img class="siteIcon" :src="queryIcon(item.iconUrl)"/>
                  </a>
                </el-col>
                <el-col :span="18">
                  <el-link :href="item.url" target="_blank" style="font-size: 16px;"
                           v-html="highlight(item.name)">
                  </el-link>
                  <div class="remark" v-html="highlight(item.remark)"></div>
                </el-col>
              </el-row>
            </el-card>
          </el-col>
        </label>
      </el-row>
    </div>
    <bottom-footer></bottom-footer>
  </div>
</template>

<script>
  import SearchHeader from '../SearchHeader'
  import Service from '../../../config/service'
  import Footer from '../Footer'

  export default {
    name: 'search',
    components: {
      "SearchHeader": SearchHeader,
      "bottomFooter": Footer
    },
    data() {
      return {
        myDataList: null,
        searchForm: {
          keyword: ''
        }
      }
    },
    created() {
      //从url中获取参数
      let keyword = this.$route.query.keyword.trim();

      this.onSearch(keyword);
    },
    methods: {
      queryIcon(url) {
        if (url == null || url == "") {
          return "../../../../static/eblog.ico";
        }

        return url;
      },
      onSearch(keyword) {
        this.searchForm.keyword = keyword;
        this.$axios.get(Service.siteUrl.search, {
          params: this.searchForm
        }).then((res) => {
          if (res.status === 200) {
            let responseData = res.data;
            if (responseData.code === 0) {
              this.myDataList = responseData.data;
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
      highlight(content) {
        if (content == null || content == "") {
          return;
        }

        let keyword = this.searchForm.keyword;
        // 匹配关键字正则
        let replaceReg = new RegExp(keyword, 'g');
        // 高亮替换v-html值
        let replaceString = '<span style="color: red;">' + keyword + '</span>';
        // 开始替换
        return content.replace(replaceReg, replaceString);
      }
    }
  }
</script>

<style scoped>
  #search {
    width: 100%;
    margin-top: 70px;
  }

  .searchContent {
    width: 99%;
    min-height: calc(100vh - 136px);
    margin-left: 10px;
  }

  .siteCard {
    height: 80px;
  }

  .siteIcon {
    width: 50%;
    height: 50%;
  }

  .remark {
    font-size: 14px;
  }
</style>
