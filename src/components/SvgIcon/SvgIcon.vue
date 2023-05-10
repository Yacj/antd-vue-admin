<script setup lang="ts">
import { computed } from 'vue'
import { Icon } from '@iconify/vue'

const props = defineProps({
  flip: {
    type: String as () => 'horizontal' | 'vertical' | 'both' | '',
    default: '',
  },
  prefix: {
    type: String,
    default: 'icon',
  },
  size: {
    type: [Number, String],
    default: 16,
  },
  name: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    default: '',
  },
  rotate: {
    type: Number,
    default: 0,
  },
})
const getSize = computed(() => {
  return {
    width: props.size,
    height: props.size,
  }
})

const symbolId = computed(() => `#${props.prefix}-${props.name}`)
const transformStyle = computed(() => {
  const style = []
  if (props.flip !== '') {
    switch (props.flip) {
      case 'horizontal':
        style.push('rotateY(180deg)')
        break
      case 'vertical':
        style.push('rotateX(180deg)')
        break
      case 'both':
        style.push('rotateX(180deg)')
        style.push('rotateY(180deg)')
        break
    }
  }
  if (props.rotate !== 0) {
    style.push(`rotate(${props.rotate}deg)`)
  }
  return `transform: ${style.join(' ')};`
})
</script>

<template>
  <Icon v-if="name.indexOf('ep:') === 0" :icon="name" :style="transformStyle" />
  <svg v-else aria-hidden="true" :style="getSize" class="svg-icon" :class="[$attrs.class]">
    <use :href="symbolId" :fill="color" />
  </svg>
</template>

<style scoped>
.svg-icon {
    display: inline-block;
    vertical-align: middle;
    fill: currentColor;
    overflow: hidden;
}
</style>
