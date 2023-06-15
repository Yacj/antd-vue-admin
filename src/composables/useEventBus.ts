import mitt from 'mitt'
import { onUnmounted } from 'vue'

interface UseEventBus {
  customEmit: (event: string, ...args: any[]) => void
  customOn: (event: string, callback: (...args: any[]) => void) => void
}

const emitter = mitt()

/**
 *
 * @description: 自定义事件监听
 * @param eventName 事件名称
 */
function customEmit(eventName: string) {
  emitter.emit(eventName)
}

/**
 * @description: 自定义事件触发
 * @param eventName 事件名称
 * @param callback 回调函数
 */
function customOn(eventName: string, callback: () => void) {
  emitter.on(eventName, () => callback())
}

/**
 * @description: 数据监听函数
 * @example 发送 onMounted(() => {
 * useEventBus().customOn('test', () => {
 * void()
 * })
 * @example 接收 useEventBus().customEmit('test')
 */
export function useEventBus(): UseEventBus {
  //   销毁事件监听
  onUnmounted(() => {
    emitter.all.clear()
  })
  return {
    customEmit,
    customOn,
  }
}
