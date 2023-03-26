/**
 * 整个项目的调用的后端API。在用到的component中引用
 */

//1、获取当前网页IP，或者指定IP
const ROOT_PATH = `${window.location.origin.replace(/:\d+/, '')}`;

//2、定义各个模块总的入口
// github登录信息
const githubLoginData = {
  authorize_uri: "https://github.com/login/oauth/authorize",
  client_id: "f2a52e951e10ea966cf9",
  redirect_uri: ROOT_PATH + "/github/auth"
};

//第三方服务
const thirdLoginGate = {
  githubAuth: githubLoginData.authorize_uri + '?client_id='
    + githubLoginData.client_id
    + '&redirect_uri=' + githubLoginData.redirect_uri
};

// 后端微服务入口
const serviceGate = {
  authService: ROOT_PATH + '/api/galaxy/v2/auth',
  siteService: ROOT_PATH + '/api/eblog/v2/site',
  systemService: ROOT_PATH + '/api/eblog/v2/system'
};

//3、各个模块具体接口
// 1、auth模块接口
const authUrl = {
  login: serviceGate.authService + '/access/login',
  register: serviceGate.authService + '/access/register',
  find: serviceGate.authService + '/access/find',
  logout: serviceGate.authService + '/access/logout',
  user: serviceGate.authService + '/user',
  role: serviceGate.authService + '/role',
  authCheck: serviceGate.authService + '/access/check',
  menuAll: serviceGate.authService + '/menu',
  menuRole: serviceGate.authService + '/role/menu',
  roleUser: serviceGate.authService + '/role/user',
  menuUser: serviceGate.authService + '/menu/user',
  changePwd: serviceGate.authService + '/access/password',
  loginByGitHub: serviceGate.authService + '/access/login/github',
};

// 2、site模块接口
const siteUrl = {
  home: serviceGate.siteService + '/index',
  search: serviceGate.siteService + '/index/search',
  sitePersonal: serviceGate.siteService + '/personal',
  siteHome: serviceGate.siteService + '/home',
  siteCheck: serviceGate.siteService + '/check'
};

// 3、系统模块接口
const systemUrl = {
  sub: serviceGate.systemService + '/site/sub',
  subExist: serviceGate.systemService + '/site/sub/exist',
  message: serviceGate.systemService + '/message',
  messageList: serviceGate.systemService + '/message/list'
};

//4、其他类的接口
const otherUrl = {
  githubAuth: thirdLoginGate.githubAuth,
  webPhotoshop: ROOT_PATH + "/webphotoshop/index.html"
};

// 对外暴露接口
export default {
  authUrl,
  siteUrl,
  systemUrl,
  otherUrl
};
