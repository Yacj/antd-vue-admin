import { types } from 'sass'
import Boolean = types.Boolean

/**
 * 判断是否是数字
 * @param num
 * @returns boolean
 */
export function isNumber(num: Number | String): Boolean {
  switch (typeof num) {
    case 'number':
      return num - num === 0
    case 'string':
      if (num.trim() !== '') {
        return Number.isFinite ? Number.isFinite(+num) : Number.isFinite(+num)
      }
      return false
    default:
      return false
  }
}

/**
 * @description 判断是否是偶数
 * @param n
 * @returns boolean
 */
export function isOdd(n: number): Boolean {
  if (!isNumber(n)) {
    return false
  }
  if (!Number.isInteger(n)) {
    return false
  }
  if (!Number.isSafeInteger(n)) {
    return false
  }
  return (n % 2) === 1
}

/**
 * @description 判断是否是奇数
 * @param n
 * @return boolean
 */
export function isEven(n: number): Boolean {
  if (!isNumber(n)) {
    return false
  }
  if (!Number.isInteger(n)) {
    return false
  }
  if (!Number.isSafeInteger(n)) {
    return false
  }
  return !isOdd(n)
}

/**
 * @description 判断是否是对象
 * @param val
 * @returns boolean
 */
export function isObject(val: any): Boolean {
  return val != null && typeof val === 'object' && Array.isArray(val) === false
}

/**
 * @description 判断是否是字符串
 * @param val
 * @returns boolean
 */
export function isString(val: any): boolean {
  return val !== null && Object.prototype.toString.call(val) === '[object String]' && typeof val === 'string'
}
