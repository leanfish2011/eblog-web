/**
 * 随机数相关处理函数
 * 1、返回随机数
 */

var randomUtil = {
  // 返回 min（包含）～ max（包含）之间的数字：
  getRandomInt: function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
  },

  // 生成1-10的整数
  getMaxTen: function () {
    return this.getRandomInt(1, 10);
  }
};

export default randomUtil
