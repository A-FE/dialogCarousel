/* localstory */
let store = {
  /* 获取name的值 */
  getItem(name) {
    return  localStorage.getItem(name)? JSON.parse(localStorage.getItem(name)):false;
  },
  /* 设置name值为val */
  setItem(name,val) {
    localStorage.setItem(name,JSON.stringify(val))
  },
  /* 删除指定的值name */
  removeItem(name) {
    localStorage.removeItem(name);
  },
  /* 清除所有 */
  clear() {
    localStorage.clear();
  },
  /* 获取所有 */
  getAll() {
    return localStorage
  }
}

export default store
