/**
 * auth相关处理函数
 * 1、清除登录记录
 */
var authUtil = {
  clearSession: function () {
    localStorage.removeItem('userCode');
    localStorage.removeItem('userName');
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('photourl');
  }
};

export default authUtil
