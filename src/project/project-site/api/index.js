import videoApi from './video'
import solutionApi from './solution'
import caseApi from './case'
import newsApi from './news'
const apiList = {
  ...newsApi,
  ...caseApi,
  ...videoApi,
  ...solutionApi,
  getIcon: 'http://canpointtest.com:8090/file/getFileList#get'
}
export default apiList
