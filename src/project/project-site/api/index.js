import videoApi from './video'
import solutionApi from './solution'
import caseApi from './case'
import newsApi from './news'
import downFile from './downFile'
import boss from './boss'
import about from './about'
import orgInfo from './orgInfo'
import product from './product'
import banner from './banner'
const apiList = {
  ...newsApi,
  ...caseApi,
  ...videoApi,
  ...solutionApi,
  ...downFile,
  ...boss,
  ...about,
  ...orgInfo,
  ...product,
  ...banner,
  getIcon: 'http://canpointtest.com:8090/file/getFileList#get'
}
export default apiList
