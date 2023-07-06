import { useMatchMedia } from '@/composables/useMatchMedia'

export function useTheme() {
  const themeMedia = useMatchMedia('(prefers-color-scheme: light)')
  const theme = ref(themeMedia.value ? 'light' : 'dark')
  return theme.value
}
