# 来源镜像
FROM alpine:20200330_212034

ENV TZ=Asia/Shanghai

# 将vue生成后的静态文件拷贝到临时目录中
ADD web /tmp/web

# 将之前的静态文件清理掉，再将临时目录中的静态文件移动到project目录中
# 不能直接清理掉web目录，已经挂载了
CMD rm -rf /opt/project/web/index.html && rm -rf /opt/project/web/static && mv /tmp/web/* /opt/project/web/
