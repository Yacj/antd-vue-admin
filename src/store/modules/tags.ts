import { defineStore } from 'pinia'
import { cache } from '@/utils/cache'
import router from '@/router'
const WITHOUT_TAG_PATHS = ['/404', '/login']
interface addTag {
  title: any
  name: string | symbol | null | undefined
  path: string
}
export const useTagsStore = defineStore({
  id: 'Tags',
  state: () => ({
    tags: cache.get('tags') || [],
    activeTag: cache.get('activeTag') || '',
  }),
  getters: {
    activeIndex() {
      const tags: any = this.tags
      return tags.findIndex(item => item.path === this.activeTag)
    },
  },
  actions: {
    setActiveTag(path) {
      this.activeTag = path
      cache.set('activeTag', path)
    },
    setTags(tags) {
      this.tags = tags
      cache.set('tags', tags)
    },
    addTag(tag: addTag) {
      this.setActiveTag(tag.path)
      if (WITHOUT_TAG_PATHS.includes(tag.path) || this.tags.some(item => item.path === tag.path)) { return }
      this.setTags([...this.tags, tag])
    },
    removeTag(path) {
      if (path === this.activeTag) {
        if (this.activeIndex > 0) {
          router.push(this.tags[this.activeIndex - 1].path)
        }
        else {
          router.push(this.tags[this.activeIndex + 1].path)
        }
      }
      this.setTags(this.tags.filter(tag => tag.path !== path))
    },
    removeOther(curPath) {
      const path = curPath || this.activeTag
      this.setTags(this.tags.filter(tag => tag.path === path))
      if (path !== this.activeTag) {
        router.push(this.tags[this.tags.length - 1].path)
      }
    },
    removeLeft(curPath) {
      const curIndex = this.tags.findIndex(item => item.path === curPath)
      const filterTags = this.tags.filter((item, index) => index >= curIndex)
      this.setTags(filterTags)
      if (!filterTags.find(item => item.path === this.activeTag)) {
        router.push(filterTags[filterTags.length - 1].path)
      }
    },
    removeRight(curPath) {
      const curIndex = this.tags.findIndex(item => item.path === curPath)
      const filterTags = this.tags.filter((item, index) => index <= curIndex)
      this.setTags(filterTags)
      if (!filterTags.find(item => item.path === this.activeTag)) {
        router.push(filterTags[filterTags.length - 1].path)
      }
    },
    resetTags() {
      this.setTags([])
      this.setActiveTag('')
    },
  },
})
