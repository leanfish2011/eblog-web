/**
 * 日期处理函数
 * 1、计算前多少天
 * 2、时间格式化
 */
var dateUtil = {
  beforeDate: function (before) {
    const end = new Date();
    const start = new Date();
    start.setHours(0);
    start.setMinutes(0);
    start.setSeconds(0);

    end.setHours(23);
    end.setMinutes(59);
    end.setSeconds(59);

    start.setDate(start.getDay() - before);

    let dateRange = new Array(start, end);

    return dateRange;
  },
  dateFormat: function (time) {
    let date = new Date(parseInt(time));
    let Y = date.getFullYear() + '-';
    let M = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) + '-'
      : date.getMonth() + 1
      + '-';
    let D = date.getDate() < 10 ? '0' + date.getDate() + ' ' : date.getDate()
      + ' ';
    let h = date.getHours() < 10 ? '0' + date.getHours() + ':' : date.getHours()
      + ':';
    let m = date.getMinutes() < 10 ? '0' + date.getMinutes() + ':'
      : date.getMinutes() + ':';
    let s = date.getSeconds() < 10 ? '0' + date.getSeconds()
      : date.getSeconds();
    return Y + M + D + h + m + s;
  }
};

export default dateUtil
