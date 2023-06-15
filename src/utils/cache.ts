type localType = 'localStorage' | 'sessionStorage'
const defaultExpire = 1000 * 60 * 60 * 24 * 365 // 过期时间为1年
interface globalConfig {
  type: localType
  prefix: string
  expire: number
}

const config: globalConfig = {
  type: 'localStorage',
  prefix: 'antd-vue-admin',
  expire: defaultExpire,
}
function removeStorageFromKey(key: string) {
  // 删除值
  if (config.prefix) {
    key = autoAddPreFix(key)
  }
  window[config.type].removeItem(key)
}

function autoAddPreFix(key: string) {
  const prefix = config.prefix || ''
  return `${prefix}_${key}`
}
function autoRemovePreFix(key: string) {
  // 删除前缀，进行增删改查
  const lineIndex = config.prefix.length + 1
  return key.slice(lineIndex)
}

const storageUtil = {
  getItem(key: string) {
    // 获取指定值
    if (config.prefix) {
      key = autoAddPreFix(key)
    }
    if (!window[config.type].getItem(key)) {
      // 不存在判断
      return null
    }
    const data = JSON.parse(window[config.type].getItem(key) as string)
    const now = Date.now()
    if (now >= data.expire) {
      // 过期判断
      removeStorageFromKey(key)
      return null
    }
    else {
      return data.value
    }
  },
  setItem(key: string, value: any, expire: number = defaultExpire) {
    // 设定值
    if (value === '' || value === null || value === undefined) {
      // 空值重置
      value = null
    }
    if (Number.isNaN(expire) || expire < 0) {
      // 过期时间值合理性判断
      throw new Error('expire must be a positive number')
    }
    const data = {
      value,
      expire: Date.now() + expire,
      time: Date.now(),
    }
    window[config.type].setItem(autoAddPreFix(key), JSON.stringify(data))
    return true
  },
  getAllItem() {
    const storageList: any = {}
    const keys = Object.keys(window[config.type])
    keys.forEach((key) => {
      const value = this.getItem(autoRemovePreFix(key))
      if (value !== null) {
        // 如果值没有过期，加入到列表中
        storageList[autoRemovePreFix(key)] = value
      }
    })
    return storageList
  },
  getItemLength() {
    return window[config.type].length
  },
  removeItem(key: string) {
    if (config.prefix) {
      key = autoAddPreFix(key)
    }
    window[config.type].removeItem(key)
  },
  clearItem() {
    window[config.type].clear()
  },
}
export default storageUtil
