import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'

dayjs.locale('zh-cn')

/**
 * @description 格式化日期
 * @param date 日期
 * @param format 格式
 */
function formatDay(date: string | number | Date, format = 'YYYY-MM-DD') {
  return dayjs(date).format(format)
}

export const days = {
  formatDay,
}
