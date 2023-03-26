<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'App',
  }
</script>

<style>
  /*全局样式*/
  html {
    /*!*全局灰色样式*!*/
    /*-webkit-filter: grayscale(100%);*/
    /*-moz-filter: grayscale(100%);*/
    /*-ms-filter: grayscale(100%);*/
    /*-o-filter: grayscale(100%);*/
    /*filter: grayscale(100%);*/
    /*filter: progid:DXImageTransform.Microsoft.BasicImage(grayscale=1);*/
  }

  #app {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
</style>
