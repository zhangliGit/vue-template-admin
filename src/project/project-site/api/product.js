/**
 * @des 模块接口配置
 * @remak 接口路径后面加#{类型} 如 #post  #get #del
 */

import hostEnv from '@config/host-env'

const productApi = {
  getProduct: '/getProduct#get', // 获取解决方案
  delProduct: '/delProduct#post', // 删除解决方案
  updateProduct: '/updateProduct#post', // 更新解决方案
  addProduct: '/addProduct#post' // 新增解决方案
}

for (const val in productApi) {
  productApi[val] = `${hostEnv.videoApi}${productApi[val]}`
}
export default productApi
