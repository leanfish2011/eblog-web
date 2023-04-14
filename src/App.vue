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

::selection {
  background: #ff6700;
  color: #fff;
}

body {
  font-family: 'Source Sans Pro', 'Helvetica Neue', Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-text-size-adjust: none;
  position: relative;
  height: 100%;
  margin: 0;
  color: #34495e;
  font-size: 16px;
}

.app-body {
  padding: 2em 1em;
  margin: 0 auto;
  height: 100%;
  max-width: 980px;
  position: relative;
  transform: translateY(-20px);
  transition: all 0.4s;
}

@media screen and (max-width: 480px) {
  body {
    font-size: 15px;
  }
}

ol,
ul,
form,
p {
  margin: 0;
}

a {
  text-decoration: none;
  color: #ff6700;
  cursor: pointer;
}

p {
  word-spacing: 0.05em;
  margin: 15px 0;
}

pre {
  overflow-x: auto;
}
</style>
