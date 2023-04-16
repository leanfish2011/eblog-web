/**
 * 博客临时存储
 */
var blogTmpUtil = {
  key: 'blogTmp',
  saveBlogTmp: function (model) {
    localStorage.setItem(this.key, model);
  },
  clearBlogTmp: function () {
    localStorage.removeItem(this.key);
  },
  getBlogTmp: function () {
    return localStorage.getItem(this.key);
  }
};

export default blogTmpUtil
