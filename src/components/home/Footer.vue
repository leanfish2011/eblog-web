<template>
  <div>
    <div class="footer">
      <div class="rightInfo">
        <p>Copyright © Tim 2016-{{year}}</p>
      </div>
    </div>
    <el-backtop></el-backtop>
  </div>
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
    height: 50px;
    background-color: #e5e8eb;
    text-align: center;
  }

  .rightInfo {
    height: 10px;
    width: 100%;
    position: relative;
    top: 30%;
    color: #41403d;
  }
</style>
