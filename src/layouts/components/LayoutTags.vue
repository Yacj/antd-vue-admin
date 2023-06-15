<script setup>
import {
  CloseOutlined,
  MinusOutlined,
  ReloadOutlined,
  VerticalLeftOutlined,
  VerticalRightOutlined,
} from '@ant-design/icons-vue'
import { useAppStore } from '@/store/modules/app'
import ScrollX from '@/components/ScrollX/ScrollX.vue'
import { useTagsStore } from '@/store/modules/tags'

const tagsStore = useTagsStore()
const scrollXRef = ref(null)
const tabRefs = ref([])
const route = useRoute()
const router = useRouter()
const appStore = useAppStore()
const currentPath = ref('')
const { height } = useElementSize(scrollXRef)
console.log(height)
function handleTagClick(path) {
  tagsStore.setActiveTag(path)
  router.push(path)
}
function handleContextMenu(tagItem) {
  currentPath.value = tagItem.path
}

function handleMenuClick(val) {
  const index = +val
  switch (index) {
    case 1:
      if (route.meta?.keepAlive) {
        // 重置keepAlive
        appStore.setAliveKeys(route.name, +new Date())
      }
      appStore.reloadPage()
      break
    case 2:
      tagsStore.removeTag(currentPath.value)
      break
    case 3:
      tagsStore.removeOther(currentPath.value)
      break
    case 4:
      tagsStore.removeLeft(currentPath.value)
      break
    case 5:
      tagsStore.removeRight(currentPath.value)
  }
}

watch(
  () => route.path,
  () => {
    const {
      name,
      fullPath: path,
    } = route
    const title = route.meta?.title
    tagsStore.addTag({
      name,
      path,
      title,
    })
  },
  { immediate: true },
)

watch(
  () => tagsStore.activeIndex,
  async (activeIndex) => {
    await nextTick()
    const activeTabElement = tabRefs.value[activeIndex]?.$el
    if (!activeTabElement) {
      return
    }
    const {
      offsetLeft: x,
      offsetWidth: width,
    } = activeTabElement
    scrollXRef.value?.handleScroll(x + width, width)
  },
  { immediate: true },
)
</script>

<template>
  <div
    :style="{
      height: `${appStore.headerHeight}px`,
      marginTop: `${appStore.headerHeight - 4}px`,
    }"
  />
  <div
    class="!fixed z-50 w-full"
    :style="{
      top: `${appStore.headerHeight}px`,
      transition: 'background-color 0.3s ease 0s, min-width 0.3s ease 0s, max-width 0.3s cubic-bezier(0.645, 0.045, 0.355, 1) 0s',
    }"
  >
    <ScrollX
      ref="scrollXRef"
      class="tags h-13 dark:bg-[#18181c] dark:text-white dark:text-opacity-82 bg-white text-[#333639]"
    >
      <a-dropdown :trigger="['contextmenu']">
        <a-tabs
          :active-key="tagsStore.activeTag"
          type="card"
          class="w-full pt-5"
          :tab-bar-gutter="5"
          @update:active-key="handleTagClick"
        >
          <a-tab-pane
            v-for="tag in tagsStore.tags" :key="tag.path"
          >
            <template #tab>
              <div @contextmenu.prevent="handleContextMenu(tag)">
                {{ tag.title }}
                <button v-if="tagsStore.tags.length > 1" class="ant-tabs-tab-remove" style="margin: 0;" @click.stop="tagsStore.removeTag(tag.path)">
                  <CloseOutlined class="!ml-2" />
                </button>
                <button v-if="tagsStore.activeTag === tag.path" class="ant-tabs-tab-remove" style="margin: 0;" @click.stop="handleMenuClick('1')">
                  <ReloadOutlined class="!ml-2" />
                </button>
              </div>
            </template>
          </a-tab-pane>
        </a-tabs>
        <template #overlay>
          <a-menu>
            <a-menu-item key="1" :disabled="currentPath !== tagsStore.activeTag" @click="handleMenuClick('1')">
              <div class="flex-center">
                <ReloadOutlined class="mr-2 text-base" />
                重新加载
              </div>
            </a-menu-item>
            <a-menu-item key="3" :disabled="tagsStore.tags.length <= 1" @click="handleMenuClick('3')">
              <div class="flex-center">
                <MinusOutlined class="mr-2 text-base" />
                关闭其他
              </div>
            </a-menu-item>
            <a-menu-item
              key="4" :disabled=" tagsStore.tags.length <= 1 || currentPath === tagsStore.tags[0].path"
              @click="handleMenuClick('4')"
            >
              <div class="flex-center">
                <VerticalLeftOutlined class="mr-2 text-base" />
                关闭左侧
              </div>
            </a-menu-item>
            <a-menu-item
              key="5"
              :disabled="tagsStore.tags.length <= 1 || currentPath === tagsStore.tags[tagsStore.tags.length - 1].path"
              @click="handleMenuClick('5')"
            >
              <div class="flex-center">
                <VerticalRightOutlined class="mr-2 text-base" />
                关闭右侧
              </div>
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </ScrollX>
  </div>
</template>

<style lang="scss" scoped>
:deep(.ant-tag) {
  font-size: 14px;
  line-height: 27px;
}
.tags{
  border-color: var(--border-color-base) !important;
}
</style>
