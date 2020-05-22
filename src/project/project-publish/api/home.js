/**
 * @des 模块接口配置
 * @remak 接口路径后面加#{类型} 如 #post  #get #del
 */

import hostEnv from '@config/host-env'

const homeApi = {
  getErrorApi: '/getErrorApi#get', // 获取错误api列表
  updateErrorApi: '/updateErrorApi#post',
  getVersionApi: '/getVersion#get', // 获取版本信息
  delVersionApi: '/delVersion#post', // 获取版本信息
  getUserApi: '/getUser#get',
  updateUserApi: '/updateUser#post',
  addUserApi: '/addUser#post',
  delUserApi: '/delUser#post'
}

for (const val in homeApi) {
  homeApi[val] = `${hostEnv.errorApi}${homeApi[val]}`
}
export default homeApi
