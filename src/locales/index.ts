// @ts-expect-error this is vue-i18n bug
import { createI18n } from 'vue-i18n'
import zhCN from './lang/zh-CN'

export const defaultLocale = 'zh-CN'

const i18n = createI18n({
  legacy: false,
  locale: defaultLocale,
  missingWarn: false,
  fallbackLocale: defaultLocale,
  messages: {
    'zh-CN': zhCN,
  },
})

/**
 * 异步加载其他多语言
 * @param locale 语言类型
 * @returns 返回参数
 */

export const loadLanguageAsync = async (locale: string) => {
  const current = i18n.global.locale.value
  try {
    if (current === locale) return nextTick()

    const messages = await import(`./lang/${locale}.ts`)
    if (messages) i18n.global.setLocaleMessage(locale, messages.default)
  }
  catch (e) {
    console.warn('load language error', e)
  }
  return nextTick()
}

export default i18n
