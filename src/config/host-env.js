/**
 * @description 多环境接口配置
 * @author zhangli
 */

const ConfigEnv = process.env.VUE_APP_URL
let uiApi = ''

if (ConfigEnv === 'test') {
  uiApi = '/uiApi'
} else if (ConfigEnv === 'prod') {
  uiApi = '/uiApi'
} else {
  uiApi = '/uiApi'
}

export default {
  uiApi
}
