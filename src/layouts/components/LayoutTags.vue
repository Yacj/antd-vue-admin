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
const handleTagClick = (path) => {
  tagsStore.setActiveTag(path)
  router.push(path)
}
const handleContextMenu = (e, tagItem) => {
  currentPath.value = tagItem.path
}

const handleMenuClick = (val) => {
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
  <ScrollX
    ref="scrollXRef"
    class="tags h-13 dark:bg-[#18181c] dark:text-white dark:text-opacity-82 bg-white text-[#333639]"
  >
    <template v-for="tag in tagsStore.tags" :key="tag.path">
      <a-dropdown :trigger="['contextmenu']">
        <a-tag
          ref="tabRefs"
          :color="tagsStore.activeTag === tag.path ? 'blue' : ''"
          class="px-5 mx-1 rounded-1 cursor-pointer hover:color-primary"
          :closable="tagsStore.tags.length > 1"
          @click="handleTagClick(tag.path)"
          @close.stop="tagsStore.removeTag(tag.path)"
          @contextmenu.prevent="handleContextMenu($event, tag)"
        >
          {{ tag.title }}
        </a-tag>
        <template #overlay>
          <a-menu>
            <a-menu-item key="1" :disabled="currentPath !== tagsStore.activeTag" @click="handleMenuClick('1')">
              <div class="flex-center">
                <ReloadOutlined class="mr-2 text-base" />
                重新加载
              </div>
            </a-menu-item>
            <a-menu-item key="2" :disabled="tagsStore.tags.length <= 1" @click="handleMenuClick('2')">
              <div class="flex-center">
                <CloseOutlined class="mr-2 text-base" />
                关闭其他
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
    </template>
  </ScrollX>
</template>

<style lang="scss" scoped>
:deep(.ant-tag) {
  font-size: 14px;
  line-height: 27px;
}
</style>
