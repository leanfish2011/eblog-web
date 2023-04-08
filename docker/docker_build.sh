# 1、构建vue序，得到静态文件
# 2、将静态文件包拷贝到docker目录中
# 3、构建镜像

#!/bin/bash

version="v1.0"

function build_image()
{
    work_path=$(pwd)
    echo "当前目录："$work_path

    cd ../
    project_path=$(pwd)
    echo "当前项目目录："$project_path

    latest_commit_id=$(git rev-parse --short HEAD)
    branch=$(git symbolic-ref --short -q HEAD)

    rm -rf dist/*
    npm run build
    mkdir docker/web
    rm -rf docker/web/*
    cp -r dist/* docker/web/
    cd docker
    time=$(date "+%Y%m%d_%H%M%S")
    tag=$version"_"$branch"_"$time"_"$latest_commit_id
    docker_name=$1":"$tag

    sudo docker build -t $docker_name .
}

# 根据各个项目修改
project_name="eblog-web"

# 入口
build_image $project_name
