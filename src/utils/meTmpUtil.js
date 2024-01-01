/**
 * 个人简介临时存储
 */
var meTmpUtil = {
  key: 'meTmp',
  saveMeTmp: function (model) {
    localStorage.setItem(this.key, model);
  },
  clearMeTmp: function () {
    localStorage.removeItem(this.key);
  },
  getMeTmp: function () {
    return localStorage.getItem(this.key);
  }
};

export default meTmpUtil
