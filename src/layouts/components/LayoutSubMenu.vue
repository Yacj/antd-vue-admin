<script setup lang="ts">
import SvgIcon from '@/components/SvgIcon/SvgIcon.vue'

defineProps({
  menuList: {
    type: Object,
    default: () => ({}),
  },
})
</script>

<template>
  <a-sub-menu :key="menuList.path">
    <template #title>
      {{ menuList.meta.title }}
    </template>
    <template v-if="menuList.meta.icon" #icon>
      <SvgIcon class="relative top-[-2px]" :name="menuList.meta.icon" color="#fff" size="17" />
    </template>
    <template v-for="item in menuList.children" :key="item.path">
      <template v-if="!item.meta?.isHidden">
        <template v-if="!item.children">
          <a-menu-item :key="item.path">
            {{ item.meta.title }}
          </a-menu-item>
        </template>
        <template v-else>
          <LayoutSubMenu :menu-list="item" />
        </template>
      </template>
    </template>
  </a-sub-menu>
</template>

<style lang="scss" scoped>

</style>
