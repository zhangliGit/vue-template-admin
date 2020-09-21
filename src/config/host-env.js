/**
 * @description 多环境接口配置
 * @author zhangli
 */

const ConfigEnv = process.env.VUE_APP_URL
let uiApi = ''
let errorApi = ''
let cardApi = ''
let videoApi = ''

if (ConfigEnv === 'test') {
  uiApi = '/uiApi'
  videoApi = 'http://canpointtest.com:8090/videoApi'
  errorApi = 'http://canpointtest.com:8090/errorApi'
  cardApi = 'http://canpointtest.com:8090/cardApi'
} else if (ConfigEnv === 'prod') {
  uiApi = '/uiApi'
  videoApi = 'http://canpointtest.com:8090/videoApi'
  errorApi = 'http://canpointtest.com:8090/errorApi'
  cardApi = 'http://canpointtest.com:8090/cardApi'
} else {
  uiApi = '/uiApi'
  videoApi = 'http://canpointtest.com:8090/videoApi'
  errorApi = 'http://canpointtest.com:8090/errorApi'
  cardApi = 'http://canpointtest.com:8090/cardApi'
}

export default {
  uiApi,
  errorApi,
  cardApi,
  videoApi
}
