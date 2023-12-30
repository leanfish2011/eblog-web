<template>
  <div id="about">
    <top-header></top-header>
    <div class="aboutContent">
      <span v-html="DictUtil.findDictItem('aboutMe')"></span>
    </div>
    <bottom-footer></bottom-footer>
  </div>
</template>

<script>
import Header from '../Header'
import Footer from '../Footer'
import DictUtil from "../../../utils/dictUtil";

export default {
  name: 'About',
  computed: {
    DictUtil() {
      return DictUtil
    }
  },
  components: {
    "topHeader": Header,
    "bottomFooter": Footer
  }
}
</script>

<style scoped>
#about {
  width: 100%;
  margin-top: 80px;
}

.aboutContent {
  width: 50%;
  min-height: calc(100vh - 186px);
  margin: 5px auto 5px auto;
}
</style>
