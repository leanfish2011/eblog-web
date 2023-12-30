<template>
  <div id="link">
    <top-header></top-header>
    <main class="app-body" id="links">
      链接
    </main>
    <bottom-footer></bottom-footer>
  </div>
</template>

<script>
import Header from '../Header'
import Footer from '../Footer'
import Service from "../../../config/service";

export default {
  name: "Link",
  components: {
    "topHeader": Header,
    "bottomFooter": Footer
  }
}
</script>

<style scoped>
#link {
  width: 100%;
  margin-top: 80px;
}
</style>