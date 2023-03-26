<template>
  <div class="wraper">
    <template>
      Scroll down to see the bottom-right button.
      <el-backtop target=".wraper">
        <div class="back-ball">
          回到顶部
        </div>
      </el-backtop>
    </template>
    <h1>滚动内容部分</h1>
    <h1>滚动内容部分</h1>
    <h1>滚动内容部分</h1>
    <h1>滚动内容部分</h1>
    <h1>滚动内容部分</h1>
    <h1>滚动内容部分</h1>
    <h1>滚动内容部分</h1>
    <h1>滚动内容部分</h1>
    <h1>滚动内容部分</h1>
    <h1>滚动内容部分</h1>
    <h1>滚动内容部分</h1>
    <h1>滚动内容部分</h1>
    <h1>滚动内容部分</h1>
    <h1>滚动内容部分</h1>
    <h1>滚动内容部分</h1>
    <h1>滚动内容部分</h1>
    <h1>滚动内容部分</h1>
    <h1>滚动内容部分</h1>
    <h1>滚动内容部分</h1>
    <h1>滚动内容部分</h1>
    <h1>滚动内容部分</h1>
    <h1>滚动内容部分</h1>
    <h1>滚动内容部分</h1>
    <h1>滚动内容部分</h1>
    <h1>滚动内容部分</h1>
  </div>
</template>

<script>
  export default {
    name: "BackTop"
  }
</script>

<style scoped>
  * {
    box-sizing: border-box;
  }

  html,
  body {
    margin: 0;
    padding: 0;
  }

  .wraper {
    border: 4px solid red;
    height: 500px;
    overflow: hidden;
    overflow-x: hidden;
    overflow-y: scroll;
  }

  .back-ball {
    background-color: tomato;
    color: #fff;
    border-radius: 22px;
    padding: 10px;
  }
</style>
