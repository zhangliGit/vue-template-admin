import homeApi from './home'
import cardApi from './card'
const apiList = {
  ...homeApi,
  ...cardApi,
  getIcon: 'http://canpointtest.com:8090/file/getFileList#get'
}
export default apiList
