/**
 * 整个项目的调用的后端API。在用到的component中引用
 */

//1、获取当前网页IP，或者指定IP
// const ROOT_PATH = `${window.location.origin.replace(/:\d+/, '')}`;

// debug
const ROOT_PATH = `${window.location.origin.replace(/:\d+/, '')}` + ':9091';

//2、定义各个模块总的入口

// 后端微服务入口
const serviceGate = {
  postService: ROOT_PATH + '/api/eblog/v1/post'
};

//3、各个模块具体接口
// 1、auth模块接口
const authUrl = {
  login: serviceGate.postService + '/access/login',
  logout: serviceGate.postService + '/access/logout',
  authCheck: serviceGate.postService + '/access/check',
  authProfile: serviceGate.postService + '/access/profile'
};

// 2、blog模块接口
const blogUrl = {
  blog: serviceGate.postService + '/blog'
};

// 3、file模块接口
const fileUrl = {
  file: serviceGate.postService + '/file'
};

// 对外暴露接口
export default {
  authUrl,
  blogUrl,
  fileUrl
};
