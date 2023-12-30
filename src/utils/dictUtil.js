/**
 * 数据字典存储
 */
function Dict() {
  this.datastore = new Object();
  this.add = add;
}

function add(key, value) {
  this.datastore[key] = value;
}

var dictUtil = {
  key: 'dict',
  saveDictTmp: function (model) {
    let dictDic = new Dict();
    model.forEach(function (element) {
      dictDic.add(element.title, element.content);
    });

    localStorage.setItem(this.key, JSON.stringify(dictDic));
  },
  clearDictTmp: function () {
    localStorage.removeItem(this.key);
  },
  getDictTmp: function () {
    return localStorage.getItem(this.key);
  },
  findDictItem: function (title) {
    let datastoreJson = JSON.parse(localStorage.getItem(this.key)).datastore;
    return datastoreJson['' + title + ''];
  }
};

export default dictUtil
