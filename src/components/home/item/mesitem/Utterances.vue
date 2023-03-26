<template>
  <div id="comment"></div>
</template>
<script>
  export default {
    name: 'Utterances',
    props: {
      // 传入的 issue-number
      id: Number
    },
    methods: {
      initValine() {
        // 建立脚本以及属性
        const utterances = document.createElement('script');
        utterances.type = 'text/javascript';
        utterances.async = true;
        utterances.setAttribute('issue-number', this.id);
        utterances.setAttribute('theme', 'github-light');
        utterances.setAttribute('repo', 'leanfish2011/eblog_message');
        utterances.crossorigin = 'anonymous';
        utterances.src = 'https://utteranc.es/client.js';

        // comment 是要插入评论的地方
        window.document.getElementById('comment').appendChild(utterances);
      }
    },
    mounted: function () {
      // 每次挂载时候，进行初始化
      this.initValine()
    }
  }
</script>
