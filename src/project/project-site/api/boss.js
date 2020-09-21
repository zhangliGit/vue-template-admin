/**
 * @des 模块接口配置
 * @remak 接口路径后面加#{类型} 如 #post  #get #del
 */

import hostEnv from '@config/host-env'

const boss = {
  getBoss: '/getBoss#get', // 获取职位
  delBoss: '/delBoss#post', // 删除职位
  updateBoss: '/updateBoss#post', // 更新职位
  addBoss: '/addBoss#post' // 新增职位
}

for (const val in boss) {
  boss[val] = `${hostEnv.videoApi}${boss[val]}`
}
export default boss