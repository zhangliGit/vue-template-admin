import videoApi from './video'
import solutionApi from './solution'
import caseApi from './case'
import newsApi from './news'
import downFile from './downFile'
import boss from './boss'
const apiList = {
  ...newsApi,
  ...caseApi,
  ...videoApi,
  ...solutionApi,
  ...downFile,
  ...boss,
  getIcon: 'http://canpointtest.com:8090/file/getFileList#get'
}
export default apiList