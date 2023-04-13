<template>
  <header class="header fixed-header">
    <div class="header-container">
      <a class="home-link" href="/">
        <div class="logo"></div>
        <span>Tim's Blog</span>
      </a>
      <ul class="right-list">
        <li class="list-item">
          <a href="/" class="item-link active">主页</a>
        </li>
        <li class="list-item">
          <a href="/archives/" class="item-link">归档</a>
        </li>
        <li class="list-item">
          <a href="/project/" class="item-link">项目</a>
        </li>
        <li class="list-item">
          <a href="/atom" class="item-link">订阅</a>
        </li>
        <li class="list-item">
          <a href="/tool" class="item-link">工具</a>
        </li>
        <li class="list-item">
          <a href="/about/" class="item-link">关于</a>
        </li>
      </ul>
    </div>
  </header>
</template>

<script>
export default {
  name: "Header"
}
</script>

<style scoped>
.header {
  background: none;
  border: none;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 200;
  transition: background 0.5s;
}

.fixed-header {
  position: fixed;
  background-color: rgba(255, 255, 255, 0.98);
  box-shadow: 0 0 3px rgba(14, 14, 14, 0.26);
}

.fixed-header .home-link {
  color: #ff6700;
}

.fixed-header .item-link {
  color: #34495e;
}

.header-container {
  max-width: 1200px;
  height: 40px;
  margin: 0 auto;
  padding: 10px 40px;
  position: relative;
}

@media screen and (max-width: 480px) {
  .header-container {
    padding: 6px 20px;
    position: relative;
  }
}

.logo {
  background: url("../../../static/img/log.jpg");
  background-size: cover;
  width: 40px;
  height: 40px;
  margin-right: 10px;
}

.home-link {
  display: flex;
  align-items: center;
  float: left;
  font-weight: 500;
  color: #fff;
  font-size: 1.5em;
  line-height: 40px;
}

.right-list {
  list-style: none;
  float: right;
  padding: 0;
}

@media screen and (max-width: 480px) {
  .right-list {
    display: none;
  }
}

.list-item {
  display: inline-block;
  margin: 0 8px;
}

.item-link {
  height: 40px;
  line-height: 40px;
  text-decoration: none;
  color: #fff;
  padding-bottom: 3px;
}

.item-link:hover {
  border-bottom: 3px solid #ff6700;
}

.active {
  border-bottom: 3px solid #ff6700;
}
</style>