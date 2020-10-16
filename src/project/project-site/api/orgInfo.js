/**
 * @des 模块接口配置
 * @remak 接口路径后面加#{类型} 如 #post  #get #del
 */

import hostEnv from '@config/host-env'

const orgInfo = {
  getOrgInfo: '/getOrgInfo#get', // 获取职位
  delOrgInfo: '/delOrgInfo#post', // 删除职位
  updateOrgInfo: '/updateOrgInfo#post', // 更新职位
  addOrgInfo: '/addOrgInfo#post' // 新增职位
}

for (const val in orgInfo) {
  orgInfo[val] = `${hostEnv.videoApi}${orgInfo[val]}`
}
export default orgInfo
