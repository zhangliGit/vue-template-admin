/**
 * @des 模块接口配置
 * @remak 接口路径后面加#{类型} 如 #post  #get #del
 */

import hostEnv from '@config/host-env'

const about = {
  getAbout: '/getAbout#get', // 获取职位
  delAbout: '/delAbout#post', // 删除职位
  updateAbout: '/updateAbout#post', // 更新职位
  addAbout: '/addAbout#post' // 新增职位
}

for (const val in about) {
  about[val] = `${hostEnv.videoApi}${about[val]}`
}
export default about
