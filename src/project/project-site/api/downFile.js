/**
 * @des 模块接口配置
 * @remak 接口路径后面加#{类型} 如 #post  #get #del
 */

import hostEnv from '@config/host-env'

const downFile = {
  getDownFile: '/getDownFile#get', // 获取资料
  delDownFile: '/delDownFile#post', // 删除资料
  updateDownFile: '/updateDownFile#post', // 更新资料
  addDownFile: '/addDownFile#post' // 新增视资料
}

for (const val in downFile) {
  downFile[val] = `${hostEnv.videoApi}${downFile[val]}`
}
export default downFile