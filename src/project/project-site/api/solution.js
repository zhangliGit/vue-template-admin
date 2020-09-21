/**
 * @des 模块接口配置
 * @remak 接口路径后面加#{类型} 如 #post  #get #del
 */

import hostEnv from '@config/host-env'

const solutionApi = {
  getSolution: '/getSolution#get', // 获取解决方案
  delSolution: '/delSolution#post', // 删除解决方案
  updateSolution: '/updateSolution#post', // 更新解决方案
  addSolution: '/addSolution#post' // 新增解决方案
}

for (const val in solutionApi) {
  solutionApi[val] = `${hostEnv.videoApi}${solutionApi[val]}`
}
export default solutionApi
