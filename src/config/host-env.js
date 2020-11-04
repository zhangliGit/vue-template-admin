/**
 * @description 多环境接口配置
 * @author zhangli
 */

const ConfigEnv = process.env.VUE_APP_URL
let uiApi = ''
let errorApi = ''
let cardApi = ''
let videoApi = ''
let miniApi = ''

if (ConfigEnv === 'test') {
  uiApi = '/uiApi'
  videoApi = 'http://canpointtest.com:8090/videoApi'
  errorApi = 'http://canpointtest.com:8090/errorApi'
  cardApi = 'http://canpointtest.com:8090/cardApi'
  miniApi = 'http://canpointtest.com:8090/miniApi'
} else if (ConfigEnv === 'prod') {
  uiApi = '/uiApi'
  videoApi = 'http://canpointtest.com:8090/videoApi'
  errorApi = 'http://canpointtest.com:8090/errorApi'
  cardApi = 'http://canpointtest.com:8090/cardApi'
  miniApi = 'http://canpointtest.com:8090/miniApi'
} else {
  uiApi = '/uiApi'
  videoApi = 'http://canpointtest.com:8090/videoApi'
  errorApi = 'http://canpointtest.com:8090/errorApi'
  cardApi = 'http://canpointtest.com:8090/cardApi'
  miniApi = 'http://canpointtest.com:8090/miniApi'
}

export default {
  uiApi,
  errorApi,
  cardApi,
  videoApi,
  miniApi
}
