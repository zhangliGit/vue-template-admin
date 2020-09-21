/**
 * @des 模块接口配置
 * @remak 接口路径后面加#{类型} 如 #post  #get #del
 */

import hostEnv from '@config/host-env'

const homeApi = {
  getVideo: '/getVideo#get', // 获取视频
  delVideo: '/delVideo#post', // 删除视频
  updateVideo: '/updateVideo#post', // 更新视频
  addVideo: '/addVideo#post' // 新增视频
}

for (const val in homeApi) {
  homeApi[val] = `${hostEnv.videoApi}${homeApi[val]}`
}
export default homeApi
