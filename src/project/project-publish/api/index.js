import homeApi from './home'
import cardApi from './card'
import miniApi from './mini'
const apiList = {
  ...homeApi,
  ...cardApi,
  ...miniApi,
  getIcon: 'http://canpointtest.com:8090/file/getFileList#get'
}
export default apiList
