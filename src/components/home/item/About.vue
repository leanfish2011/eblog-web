<template>
  <div id="about">
    <nav-header></nav-header>
    <div class="aboutContent">
      <el-tabs tab-position="left">
        <el-tab-pane label="关于我">
          <about-me></about-me>
        </el-tab-pane>
        <el-tab-pane label="关于网站">
          <about-site></about-site>
        </el-tab-pane>
        <el-tab-pane label="更新日志">
          <about-update></about-update>
        </el-tab-pane>
      </el-tabs>
    </div>
    <bottom-footer></bottom-footer>
  </div>
</template>

<script>
  import NavHeader from '../NavHeader'
  import Footer from '../Footer'
  import AboutMe from './about/Me'
  import AboutUpdate from './about/Update'
  import AboutSite from './about/Site'

  export default {
    name: 'about',
    components: {
      "navHeader": NavHeader,
      "bottomFooter": Footer,
      "aboutMe": AboutMe,
      "aboutUpdate": AboutUpdate,
      "aboutSite": AboutSite
    }
  }
</script>

<style scoped>
  #about {
    width: 100%;
    margin-top: 120px;
  }

  .aboutContent {
    width: 50%;
    min-height: calc(100vh - 186px);
    margin: 5px auto 5px auto;
  }
</style>
