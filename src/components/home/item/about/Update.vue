<template>
  <label>
    <h2>更新日志</h2>
    <el-timeline>
      <el-timeline-item
        v-for="(activity, index) in activities"
        :timestamp="activity.timestamp"
        :key="index"
        :icon="activity.icon"
        :type="activity.type"
        :color="activity.color"
        size="large" placement="top">
        <el-card>
          <h4>{{activity.title}}</h4>
          <p>{{activity.content}}</p>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </label>
</template>

<script>
  export default {
    name: "Update",
    data() {
      return {
        activities: [
          {
            timestamp: '2021-08-19',
            title: '增加在线绘图板功能',
            content: '在线绘图板，又名WebPhotoshop，是本网站作者自主研发的在线绘图和图像处理系统，实现了桌面版绘图和图像处理软件的大部分功能，且功能还在持续完善中。',
            type: 'primary',
            icon: 'el-icon-more'
          },
          {
            timestamp: '2020-12-27',
            title: '增加留言板功能',
            content: '增加留言板功能，用户用网站账号登录后可以留言和回复留言。原有的github登录方式留言功能保留',
            color: '#8d75bd'
          },
          {
            timestamp: '2020-07-26',
            title: '增加订阅功能',
            content: '增加订阅功能，用户可以订阅首页网站，以邮件的形式获取每周最新的网站收藏',
            color: '#b9bd3e'
          },
          {
            timestamp: '2020-05-23',
            title: '完成站内搜索',
            content: '替换之前的百度搜索，实现在站内搜索主页收藏的网站。',
            color: '#BD5444'
          },
          {
            timestamp: '2020-04-12',
            title: '集成github',
            content: '集成github评论系统。集成github登录',
            color: '#bd91a3'
          },
          {
            timestamp: '2020-03-29',
            title: '爱收藏网站上线',
            content: '之前的博客系统停用，打造用于收藏网站的系统。',
            color: '#bdb72f'
          },
          {
            timestamp: '2018-05-03',
            title: '基于spring cloud博客系统',
            content: '使用spring cloud重新实现了博客系统。拆分了各个服务，前后端分离',
            color: '#0bbd87'
          },
          {
            timestamp: '2018-02-09',
            title: '多人博客系统上线',
            content: '打造了可以多人注册使用的博客系统。界面美观，操作方便。支持全文检索，支持中英文切换。',
            color: '#bd6d8e'
          },
          {
            timestamp: '2014-11-04',
            title: '个人博客上线',
            content: '基于免费的云服务器，上线个人博客系统，主要功能包括：个人简介、个人文章、个人网站链接、留言等。',
            color: '#8f85bd'
          }]
      }
    }
  }
</script>

<style scoped>

</style>
