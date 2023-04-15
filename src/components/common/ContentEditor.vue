<template>
  <div id="editor">
    <ckeditor ref="refCKEditor"
              @ready="onEditorReady"
              v-model="editorData"
              :config="editorConfig">
    </ckeditor>
  </div>
</template>

<script>

import Service from '../../config/service'
import AuthUtil from '../../utils/authUtil'

export default {
  name: "ContentEditor",
  data() {
    return {
      editorData: '<p>请输入内容</p>',
      imgUploadUrl: '',
      notError: true,
      num: 0,
      editorConfig: {
        width: '100%', // 宽 支持百分比
        height: 600, // 高 支持 '25em'
        // uiColor: '#66AB16', // 编辑器 背景颜色
        // defaultLanguage: '', // 语言
        resize_enabled: true, // 是否可伸缩 高度 或 config.removePlugins = 'resize';
        imgUploadUrl: Service.fileUrl.file,
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
        extraPlugins: 'format,font,colorbutton,justify,image2,uploadimage,notification',
        format_tags: 'p;h1;h2;h3;h4;h5;h6;pre;address;div', // 格式 标题1 2 3 4 段落等 自定义
        // Configure your file manager integration. This example uses CKFinder 3 for PHP.
        // filebrowserBrowseUrl: '/apps/ckfinder/3.4.5/ckfinder.html', //超链接、图片浏览服务地址
        // filebrowserImageBrowseUrl: '/apps/ckfinder/3.4.5/ckfinder.html?type=Images',//图片浏览服务地址，可配置外部图片床地址

        // 超链接、图片上传服务地址
        // filebrowserUploadUrl: '/apps/ckfinder/3.4.5/core/connector/php/connector.php?command=QuickUpload&type=Files',
        filebrowserImageUploadUrl: Service.fileUrl.file,
        // Upload dropped or pasted images to the CKFinder connector (note that the response type is set to JSON).
        uploadUrl: '/apps/ckfinder/3.4.5/core/connector/php/connector.php?command=QuickUpload&type=Files&responseType=json',

        // Reduce the list of block elements listed in the Format drop-down to the most commonly used.
        // Simplify the Image and Link dialog windows. The "Advanced" tab is not needed in most cases.
        removeDialogTabs: 'image:advanced;link:advanced'
      }
    };
  },
  methods: {
    // 触发上传事件
    onEditorReady() {
      const _this = this;
      const editor = _this.$refs.refCKEditor.instance;
      const upload = editor.uploadRepository;
      upload.on("instanceCreated", evt => {
        this.num = 0;
        this.notError = true;
        const {file} = evt.data;
        const isLt1M = file.size / 1024 / 1024 < 1; //小于1M
        const fileType = file.type.substring(
            file.type.lastIndexOf("/") + 1,
            file.type.length
        );
        let type =
            fileType == "jpg" ||
            fileType == "jpeg" ||
            fileType == "png" ||
            fileType == "JPG" ||
            fileType == "JPEG";
        if (!type) {
          _this.$message.error("上传图片只能是jpg、jpeg、png、JPG、JPEG格式!");
        } else if (!isLt1M) {
          _this.$message.error("上传失败，图片不可超过1MB!");
        }
        if (type && isLt1M) {
          this.notError = true;
        } else {
          this.notError = false;
          throw new Error("上传内容不符合条件!"); //手动抛出异常可以解决手动多次上传按钮失效问题
        }
        this.num = 1;
      });

      editor.on("fileUploadRequest", evt => {
        const fileLoader = evt.data.fileLoader;
        const {xhr, file} = fileLoader;
        //阻止混合复制时发送请求
        if (this.notError) {
          const formData = new FormData();
          xhr.open("post", Service.fileUrl.file);
          xhr.setRequestHeader(
              "Authorization",
              localStorage.getItem('token'));
          formData.append("file", file);
          xhr.send(formData);
          evt.stop();
        }
        evt.stop();
        evt.cancel();
      });
      editor.on("fileUploadResponse", evt => {
        evt.stop();
        const xhr = evt.data.fileLoader.xhr;
        const res = JSON.parse(xhr.responseText);
        // 自己处理返回逻辑
        if (res.code == 0) {
          evt.data.url = res.data.url;
          this.$message.success(res.msg);
        } else {
          this.$message.error(res.msg);
          evt.cancel();
          if (res.code === -2) {
            AuthUtil.clearSession();
            this.$router.push('/login');
          }

          //evt.data.message = res.msg;
         // evt.cancel();
        }
      });
    }
  }
}
</script>

<style scoped>

</style>