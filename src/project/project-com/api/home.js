/**
 * @des 模块接口配置
 * @remak 接口路径后面加#{类型} 如 #post  #get #del
 */

import hostEnv from '@config/host-env'

const homeApi = {
  getUser: '/getUser#get',
  addUser: '/addUser#post',
  updateUser: '/updateUser#post',
  delUser: '/delUser#post'
}
for (const val in homeApi) {
  homeApi[val] = `${hostEnv.uiApi}${homeApi[val]}`
}
export default homeApi
