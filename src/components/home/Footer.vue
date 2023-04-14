<template>
  <footer>
    <div class="footer">
      <p class="copyright">Copyright © Tim 2016-{{ year }}</p>
    </div>
    <el-backtop></el-backtop>
  </footer>
</template>

<script>
export default {
  name: "Footer",
  data() {
    return {
      year: ''
    }
  },
  methods: {
    getYear() {
      this.year = new Date().getFullYear()
    }
  },
  created() {
    this.getYear()
  }
}
</script>

<style scoped>
.footer {
  padding: 1em 0;
  margin: 0 auto;
  max-width: 800px;
  border-top: 1px solid #e5e5e5;
  background-color: #fff;
  text-align: center;
  font-size: 0.9em;
}

.copyright {
  color: #7f8c8d;
  line-height: 1;
}
</style>
