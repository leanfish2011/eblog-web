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
      editorData: '<p>Content of the editor.</p>',
      editorConfig: {
        width: '50%', // 宽 支持百分比
        height: 300, // 高 支持 '25em'
        // uiColor: '#66AB16', // 编辑器 背景颜色
        // defaultLanguage: '', // 语言
        editorplaceholder: 'hello', // 输入框提示
        resize_enabled: false, // 是否可伸缩 高度 或 config.removePlugins = 'resize';
        // wordCount: true,
        // 操作栏配置
        toolbar: [
          // 打印
          {
            name: 'document',
            items: ['Source', 'Print'] // Source 源码输入
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
          // 操作栏 是否换行
          // '/',
          // 文本样式操作 加粗等功能
          {
            name: 'basicstyles',
            items: ['Bold', 'Italic']
            // items: ['Bold', 'Italic', 'Underline', 'Strike', 'RemoveFormat', 'CopyFormatting']
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
            // items: ['Table']
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
        extraPlugins: 'print,format,font,colorbutton,justify,uploadimage,notification',
        // plugins: 'wordcount',
        format_tags: 'p;h1;h2;h3;h4;h5;h6;pre;address;div', // 格式 标题1 2 3 4 段落等 自定义
        // colorButton_colors: 'CF5D4E,454545,FFF,DDD,CCEAEE,66AB16', // 自定义 文本 背景颜色列表
      }
    };
  }
}
</script>

<style scoped>

</style>