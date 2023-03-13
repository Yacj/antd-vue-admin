const localName = 'antd-vue-admin'
/**
 * 本地存储
 */
export const local = {
  /**
   * 获取本地存储
   * @param key
   */
  get: (key: string) => {
    return JSON.parse(localStorage.getItem(localName + key) || 'null')
  },
  /**
   * 设置本地存储
   * @param key
   * @param value
   */
  set: (key: string, value: any) => {
    localStorage.setItem(localName + key, JSON.stringify(value))
  },
  /**
   * 删除本地存储
   * @param key
   */
  remove: (key: string) => {
    localStorage.removeItem(localName + key)
  },
  /**
   * 清空本地存储
   */
  clear: () => {
    localStorage.clear()
  },
}
