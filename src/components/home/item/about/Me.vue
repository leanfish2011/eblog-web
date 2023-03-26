<template>
  <label>
    <h2>关于我</h2>
    <h4>简介：</h4>
    <ul>
      <li>
        <p>技术爱好者，喜欢折腾各种技术。从前端到后端，深度学习等都有所研究。</p>
      </li>
      <li>
        <p>文学爱好者，喜欢读各种书，尤其是中国古典文学。也喜欢写一些文章。</p>
      </li>
    </ul>
    <h4>联系我：</h4>
    <ul>
      <li>
        <p><img style="margin-right: 5px;" src="../../../../../static/img/email.jpg" height="20" width="20"/>邮箱：leanfish2011@163.com</p>
      </li>
      <li>
        <p><img style="margin-right: 5px;" src="../../../../../static/img/weixin.png" height="20" width="20"/>微信公众号：云山闲人</p>
        <p>或者扫描下面二维码</p>
        <img class="weixinImg" src="../../../../../static/img/weixinsite.jpeg"/>
      </li>
      <li>
        <p><img style="margin-right: 5px;" height="20" width="20" src="../../../../../static/img/weibo.png"/>
        微博：<a href="http://weibo.com/u/1718711654" target="_blank">闯荡南北的鱼</a></p>
      </li>
      <li>
        <p><img style="margin-right: 5px;" src="../../../../../static/img/blog.jpg" height="20" width="20"/>
        博客：<a href="https://www.cnblogs.com/leanfish" target="_blank">云山闲人-博客园</a></p>
      </li>
      <li>
        <p><img style="margin-right: 5px;" src="../../../../../static/img/jian.png" height="20" width="20"/>
        简书：<a href="https://www.jianshu.com/u/bff8cc0b4914" target="_blank">云山闲人-简书</a></p>
      </li>
      <li>
        <p><img style="margin-right: 5px;" src="../../../../../static/img/zhi.png" height="20" width="20"/>
        知乎：<a href="https://www.zhihu.com/people/feige2011" target="_blank">云山闲人-知乎</a></p>
      </li>
    </ul>
  </label>
</template>

<script>
  export default {
    name: "Me"
  }
</script>

<style scoped>
  .weixinImg {
    height: 200px;
    width: 200px;
  }

  a:link, a:visited {
    text-decoration: none;
    color: #2f65ca
  }

  /* 已访问的链接 */
  a:hover {
    color: #5c31ff
  }
</style>
