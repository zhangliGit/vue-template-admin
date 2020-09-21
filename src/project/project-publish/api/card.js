/**
 * @des 模块接口配置
 * @remak 接口路径后面加#{类型} 如 #post  #get #del
 */

import hostEnv from '@config/host-env'

const cardApi = {
  getCardType: '/getCardType#get', // 获取大版本列表
  updateCardType: '/updateCardType#post', // 更新版本
  addCardType: '/addCardType#post', // 新增版本
  delCardType: '/delCardType#post', // 删除版本
  getCardTypeSchool: '/getCardTypeSchool#get', // 获取关联的学校
  delCardTypeSchool: '/delCardTypeSchool#post', // 删除关联的学校
  addCardTypeSchool: '/addCardTypeSchool#post', // 新增关联的学校
  getCardTypeVersion: '/getCardTypeVersion#get', // 获取关联的版本
  addCardTypeVersion: '/addCardTypeVersion#post', // 新增关联的版本
  updateCardTypeVersion: '/updateCardTypeVersion#post', // 更新关联的版本
  delCardTypeVersion: '/delCardTypeVersion#post', // 删除关联的版本
  getCardList: '/getCardList#get', // 获取班牌信息
  delCardList: '/delCardList#post', // 删除班牌
  getOnLineCard: '/getOnLineCard#get', // 获取在线班牌
  delOnLineCard: '/delOnLineCard#post' // 删除在线班牌
}

for (const val in cardApi) {
  cardApi[val] = `${hostEnv.cardApi}${cardApi[val]}`
}
export default cardApi
