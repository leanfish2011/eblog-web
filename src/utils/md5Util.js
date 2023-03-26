/**
 * @author：tim
 * @date：2022-12-24 5:11 PM
 * @description：加密
 */
import md5 from "js-md5";

const md5Util = {
  encrypt: function (origin, salt) {
    return md5(origin.concat(salt));
  }
};

export default md5Util
