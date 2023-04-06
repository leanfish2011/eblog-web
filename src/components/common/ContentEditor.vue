<template>
  <div id="editor">
    <ckeditor v-model="editorData" :config="editorConfig"></ckeditor>
  </div>
</template>

<script>
export default {
  name: "ContentEditor",
  data() {
    return {
      editorData: '<p>请输入内容</p>',
      editorConfig: {
        width: '100%', // 宽 支持百分比
        height: 600, // 高 支持 '25em'
        // uiColor: '#66AB16', // 编辑器 背景颜色
        // defaultLanguage: '', // 语言
        resize_enabled: true, // 是否可伸缩 高度 或 config.removePlugins = 'resize';
        // 操作栏配置
        toolbar: [
          // 源码
          {
            name: 'document',
            items: ['Source']
          },
          // 撤销 重新编辑
          {
            name: 'clipboard',
            items: ['Undo', 'Redo']
          },
          {
            name: 'styles',
            items: ['Format', 'Font', 'FontSize'] // 格式 字体 大小
          },
          // 文本颜色 文本背景颜色
          {
            name: 'colors',
            items: ['TextColor', 'BGColor']
          },
          // 对齐方式
          {
            name: 'align',
            items: ['JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock']
          },
          // 文本样式操作 加粗等功能
          {
            name: 'basicstyles',
            items: ['Bold', 'Italic', 'Underline', 'Strike', 'RemoveFormat', 'CopyFormatting']
          },
          // 超链接
          {
            name: 'links',
            items: ['Link', 'Unlink']
          },
          // 编号列表 项目列表等功能
          {
            name: 'paragraph',
            items: ['NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote']
          },
          // 插入 图片 表格
          {
            name: 'insert',
            items: ['Image', 'Table']
          },
          // 工具 全屏等功能
          {
            name: 'tools',
            items: ['Maximize']
          },
          // 即时拼写检查
          {
            name: 'editing',
            items: ['Scayt']
          }
        ],
        // toolbar 中的一些配置功能 需要在这里添加一下才可以用 例如 print colorbutton
        extraPlugins: 'format,font,colorbutton,justify,uploadimage,notification',
        format_tags: 'p;h1;h2;h3;h4;h5;h6;pre;address;div', // 格式 标题1 2 3 4 段落等 自定义
      }
    };
  }
}
</script>

<style scoped>

</style>