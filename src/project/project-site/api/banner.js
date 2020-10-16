/**
 * @des 模块接口配置
 * @remak 接口路径后面加#{类型} 如 #post  #get #del
 */

import hostEnv from '@config/host-env'

const banner = {
  getBanner: '/getBanner#get', // 获取banner
  delBanner: '/delBanner#post', // 删除banner
  addBanner: '/addBanner#post' // 新增banner
}

for (const val in banner) {
  banner[val] = `${hostEnv.videoApi}${banner[val]}`
}
export default banner
