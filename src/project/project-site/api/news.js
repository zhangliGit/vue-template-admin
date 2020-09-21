/**
 * @des 模块接口配置
 * @remak 接口路径后面加#{类型} 如 #post  #get #del
 */

import hostEnv from '@config/host-env'

const newsApi = {
  getNews: '/getNews#get', // 获取解决方案
  delNews: '/delNews#post', // 删除解决方案
  updateNews: '/updateNews#post', // 更新解决方案
  addNews: '/addNews#post' // 新增解决方案
}

for (const val in newsApi) {
  newsApi[val] = `${hostEnv.videoApi}${newsApi[val]}`
}
export default newsApi
