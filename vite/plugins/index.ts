import Unocss from 'unocss/vite'
import type { PluginOption } from 'vite'
import Pages from 'vite-plugin-pages'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import visualizer from 'rollup-plugin-visualizer'
import Vue from '@vitejs/plugin-vue'

export default function createVitePlugins(viteEnv: Object, isBuild = false) {
  const vitePlugins: (PluginOption | PluginOption[])[] = [
    Vue(),
    // https://github.com/hannoeru/vite-plugin-pages
    Pages(),
    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      imports: [
        'vue',
        'vue-router',
        '@vueuse/core',
      ],
      dts: true,
      dirs: [
        './src/composables',
      ],
      vueTemplate: true,
    }),
    // https://github.com/antfu/vite-plugin-components
    Components({
      dts: true,
      dirs: ['src/components'], // 配置需要默认导入的自定义组件文件夹，该文件夹下的所有组件都会自动 import
      resolvers: [
        AntDesignVueResolver({
          importStyle: true, // 是否需要自动随引入加载对应的组件样式，禁用，因为某些二级组件（比如 DateRangePicker）没办法准确地识别正确路径，手动引入全局样式
          resolveIcons: true, // 可使用@ant-design/icons-vue图标库
        }),
      ],
    }),
    // https://github.com/antfu/unocss
    Unocss(),
  ]
  if (isBuild) {
    vitePlugins.push(
      visualizer({
        open: true,
        gzipSize: true,
        brotliSize: true,
      }) as PluginOption,
    )
  }
  return vitePlugins
}
