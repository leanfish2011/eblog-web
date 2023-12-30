<template>
  <div id="tag">
    <top-header></top-header>
    <main class="app-body" id="tags">
      标签
    </main>
    <bottom-footer></bottom-footer>
  </div>
</template>

<script>
import Header from '../Header'
import Footer from '../Footer'
import Service from "../../../config/service";

export default {
  name: "Tag",
  components: {
    "topHeader": Header,
    "bottomFooter": Footer
  }
}
</script>

<style scoped>
#tag {
  width: 100%;
  margin-top: 80px;
}
</style>