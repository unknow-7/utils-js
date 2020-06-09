/**
 * 本地存储，支持生存时间
 */
class Storage {
    /**
     * 本地存储
     * @param {string} namespace 命名空间
     * @param {number} expire 超时时间 ms
     */
    constructor(namespace, expire) {
      this.namespace = `${String(namespace).toUpperCase()}_CACHE`;
  
      let cache;
      try {
        cache = JSON.parse(localStorage.getItem(this.namespace));
      } catch (e) {
        cache = null;
      }
      if (cache) {
        if (cache.timestamp + expire < new Date().getTime()) {
          localStorage.removeItem(this.namespace);
        }
      }
    }
  
    /**
     * 存储键值对
     * @param {string} key
     * @param {*} value
     */
    set(key, value) {
      let cache = this.get();
  
      localStorage.setItem(
        this.namespace,
        JSON.stringify({
          timestamp: new Date().getTime(),
          value: {
            ...(cache === null ? {} : cache),
            [key]: value
          }
        })
      );
    }
  
    /**
     * 取出键值
     * @param {string} [key]
     * @return {*}
     */
    get(key) {
      let res = null;
      let cache;
  
      try {
        cache = JSON.parse(localStorage.getItem(this.namespace));
      } catch (e) {
        cache = null;
      }
      if (cache && cache.value) {
        if (key === void 0) {
          res = cache.value;
        } else {
          res = cache.value[key];
        }
      }
  
      return res;
    }
  }
  
  // export default new Storage("APP", 1000 * 60 * 60 * 24 * 30);
  module.exports = { Storage }
  