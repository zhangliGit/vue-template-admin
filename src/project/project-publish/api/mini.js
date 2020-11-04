/**
 * @des 模块接口配置
 * @remak 接口路径后面加#{类型} 如 #post  #get #del
 */

import hostEnv from '@config/host-env'

const miniApi = {
  getMini: '/getMini#get', // 获取小程序图标
  updateMini: '/updateMini#post', // 更新小程序图标
  addMini: '/addMini#post' // 新增小程序图标
}

for (const val in miniApi) {
  miniApi[val] = `${hostEnv.miniApi}${miniApi[val]}`
}
export default miniApi
