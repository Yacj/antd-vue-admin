import { theme } from 'ant-design-vue'
import type { GlobalToken } from 'ant-design-vue/es/theme'

export const useSetAntdToken = createSharedComposable(() => {
  const { token: antdToken } = theme.useToken()
  const token = ref<GlobalToken>(antdToken.value)
  let styleDom: HTMLStyleElement | null = null
  const setToken = (globalToken: GlobalToken) => {
    styleDom = styleDom || document.createElement('style')
    styleDom.innerHTML = `
      :root {
        --primary-color: ${globalToken.colorPrimary};
        --component-background: ${globalToken.colorBgContainer};
        --body-background: ${globalToken.colorBgContainer};
        --site-text-color: ${globalToken.colorText};
        --site-text-color-secondary: ${globalToken.colorTextSecondary};
        --site-border-color-split: ${globalToken.colorSplit};
        --border-radius-base: ${globalToken.borderRadius};
        --font-size-base: ${globalToken.fontSize}px;
        --font-size-max: ${Math.max(globalToken.fontSize - 1, 12)}px;
        --font-family: ${globalToken.fontFamily};

        --border-color-base: ${globalToken.colorBorder};
        --purple-3: ${globalToken['purple-3']};
        --purple-6: ${globalToken['purple-6']};
        --text-color: ${globalToken.colorText};
        --search-icon-color: #ced4d9;
        --ease-in-out-circ: ${globalToken.motionEaseInOutCirc};
        --shadow-2: ${globalToken.boxShadowSecondary};
        --link-color: ${globalToken.colorLink};
        --error-color: ${globalToken.colorError};
        --white: ${globalToken.colorWhite};
        --green-6: ${globalToken['green-6']};
        --magenta-7: ${globalToken['magenta-7']};
        --line-height-base: ${globalToken.lineHeight};
        --screen-md-min: ${globalToken.screenMDMin}px;
        --screen-sm-min: ${globalToken.screenSMMin}px;
        --screen-lg: ${globalToken.screenLG}px;
        --box-shadow-base: ${globalToken.boxShadow}
        --animation-duration-base: ${globalToken.motionDurationSlow};
        --ease-in-out: ${globalToken.motionEaseInOut};
        --box-shadow: ${globalToken.boxShadow};
      }
    `
    if (styleDom && !document.body.contains(styleDom)) {
      document.body.appendChild(styleDom)
    }
    token.value = globalToken
  }
  return {
    token,
    setToken,
  }
})
