<template>
  <div id="tool">
    <nav-header></nav-header>
    <div class="toolContent">
      <label v-for="item in toolList" :key="item.id">
        <div class="item">
          <div class="item-hd">
            <h3><a target="_blank" :href=item.url>{{item.name}}</a></h3>
          </div>
          <div class="item-bd">
            <div class="item-desc" :title=item.remark>
              {{item.remark}}
            </div>
          </div>
          <el-divider></el-divider>
        </div>
      </label>
    </div>
    <bottom-footer></bottom-footer>
  </div>
</template>

<script>
  import NavHeader from '../NavHeader'
  import Footer from '../Footer'
  import Service from '../../../config/service'

  export default {
    name: "tool",
    components: {
      "navHeader": NavHeader,
      "bottomFooter": Footer
    },
    data() {
      return {
        toolList: [
          {
            "id": "0",
            "name": "WebPhotoshop",
            "url": Service.otherUrl.webPhotoshop,
            "remark": "在线绘图工具。由作者本人研发"
          },
          {
            "id": "3d3eb99f-f2a5-4fec-98d7-12143bd7eec7",
            "name": "在线工具",
            "url": "https://tool.lu/",
            "remark": "开发类、站长类各种工具"
          },
          {
            "id": "82e5e1bb-ff83-4e44-a0cf-fd1796d3a574",
            "name": "文档及工具",
            "url": "https://tool.oschina.net/",
            "remark": "各种开发文档及工具"
          }
        ]
      }
    }
  }
</script>

<style scoped>
  #tool {
    width: 100%;
    margin-top: 120px;
  }

  .toolContent {
    min-height: calc(100vh - 194px);
    width: 50%;
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
