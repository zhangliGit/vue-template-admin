/**
 * @description 多环境接口配置
 * @author zhangli
 */

const ConfigEnv = process.env.VUE_APP_URL
let wxz_guiyang = ''

if (ConfigEnv === 'test') {
  wxz_guiyang = '/wxz_guiyang'
} else if (ConfigEnv === 'prod') {
  wxz_guiyang = '/wxz_guiyang'
} else {
  wxz_guiyang = '/wxz_guiyang'
}

export default {
  wxz_guiyang
}
