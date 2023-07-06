export function useMatchMedia(query: string) {
  const themeMedia = matchMedia(query)
  const match = ref(themeMedia.matches)

  const onChange = (e: MediaQueryListEvent) => match.value = e.matches

  watchEffect((onCleanup) => {
    themeMedia.addEventListener('change', onChange)

    onCleanup(() => themeMedia.removeEventListener('change', onChange))
  })

  return match
}
