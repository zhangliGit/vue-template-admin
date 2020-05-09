/**
 * @des 模块接口配置
 * @remak 接口路径后面加#{类型} 如 #post  #get #del
 */

import hostEnv from '@config/host-env'

const homeApi = {
  'userLogin': '/account/info/accountLogin#postJsonQuery', // 用户登录
  'getOrgList': '/org/info/queryOrgInfos#post', // 获取机构列表
  'addOrg': '/org/info/addOrgInfo#post', // 新增机构信息
  'updateOrg': '/org/info/updateOrgInfo#post', // 更新机构信息
  'delOrg': '/org/info/delOrgInfo#postJsonQuery', // 删除机构列表
  'addAccount': '/account/info/addAccountInfo#post', // 新增账号
  'getAccountList': '/account/info/queryAccountInfos#post', // 获取账号列表
  'delAccount': '/account/info/delAccountInfo#postJsonQuery', // 删除账号
  'updateAccount': '/account/info/updateAccountInfo#post', // 更新账号账号
  'addDevice': '/devices/info/addDeviceInfo#post', //新增设备
  'updateDevice': '/devices/info/updateDeviceInfo#post', // 更新设备信息
  'delDevice': '/devices/info/delDeviceInfo#postJsonQuery', // 删除设备信息
  'getDeviceList': '/devices/info/queryDeviceInfos#post', // 获取设备列表
  'addUser': '/user/info/addUserInfo#post', // 新增人员信息
  'delUser': '/user/info/delUserInfo#postJsonQuery', // 删除人员信息
  'updateUser': '/user/info/updateUserInfo#post', // 更新人员信息
  'getUserList': '/user/info/queryUserInfos#post', // 获取人员信息列表
  'getRecordList': '/door/record/info/queryDoorRecordInfos#post', // 门口记录
  'queryDay': '/statistic/info/queryDayStatisticInfos#post', // 获取统计天
  'queryMonth': '/statistic/info/queryMonthStatisticInfos#post', // 获取统计月
  'queryUser': '/statistic/info/queryUserStatisticInfos#post' // 获取人员统计
}
for (const val in homeApi) {
  homeApi[val] = `${hostEnv.wxz_guiyang}${homeApi[val]}`
}
export default homeApi
