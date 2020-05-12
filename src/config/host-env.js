/**
 * @description 多环境接口配置
 * @author zhangli
 */

const ConfigEnv = process.env.VUE_APP_URL
let uiApi = ''
let errorApi = ''

if (ConfigEnv === 'test') {
  uiApi = '/uiApi'
  errorApi = 'http://canpointtest.com:8090/errorApi'
} else if (ConfigEnv === 'prod') {
  uiApi = '/uiApi'
  errorApi = 'http://canpointtest.com:8090/errorApi'
} else {
  uiApi = '/uiApi'
  errorApi = 'http://canpointtest.com:8090/errorApi'
}

export default {
  uiApi,
  errorApi
}
