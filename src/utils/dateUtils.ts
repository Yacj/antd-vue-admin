import type { Dayjs } from 'dayjs'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'

dayjs.locale('zh-cn')

/**
 * @description 格式化日期
 * @param date 日期
 * @param format 格式
 * @returns {string} 格式化后的日期
 */
export function formatDay(date: string | number | Date, format = 'YYYY-MM-DD') {
  return dayjs(date).format(format)
}

/**
 * 返回日期的年月日时分秒
 * @param date - 要获取的日期
 * @returns {object} 包含年月日时分秒的对象
 */
export function getDateTime(date: Dayjs): {
  year: number
  month: number
  day: number
  hour: number
  minute: number
  second: number
} {
  return {
    year: date.year(),
    month: date.month(),
    day: date.date(),
    hour: date.hour(),
    minute: date.minute(),
    second: date.second(),
  }
}
