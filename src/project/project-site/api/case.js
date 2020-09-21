/**
 * @des 模块接口配置
 * @remak 接口路径后面加#{类型} 如 #post  #get #del
 */

import hostEnv from '@config/host-env'

const caseApi = {
  getCase: '/getCase#get', // 获取解决方案
  delCase: '/delCase#post', // 删除解决方案
  updateCase: '/updateCase#post', // 更新解决方案
  addCase: '/addCase#post' // 新增解决方案
}

for (const val in caseApi) {
  caseApi[val] = `${hostEnv.videoApi}${caseApi[val]}`
}
export default caseApi
