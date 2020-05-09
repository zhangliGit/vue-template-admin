/**
 * @Description 更新组件文件目录
 * @Author 张立
 * @Created 2020-05-06
 */
var request = require('request')
var fs = require('fs')
var adm_zip = require('adm-zip')
const path = 'src/components/common'
/*
 * url 网络文件地址
 * filename 文件名
 * callback 回调函数
 */

function downloadFile(uri, filename, callback, msg) {
  var stream = fs.createWriteStream(filename)
  console.log('\x1b[32m', '*************************************', '\n')
  console.log('\x1b[32m', '您正在更新' + msg + '文件, 请耐心等待...', '\n')
  console.log('\x1b[32m', '*************************************', '\n')
  request(uri)
    .pipe(stream)
    .on('close', callback)
}

var fileUrl = 'http://192.168.2.247:10031/vue-web-component'
var filename = `${path}.zip`
downloadFile(
  fileUrl,
  filename,
  function() {
    var unzip = new adm_zip(`${path}.zip`)
    unzip.extractAllTo(path, /* overwrite */ true)
    // 删除压缩包
    fs.unlink(`${path}.zip`, function() {})
    console.log('\x1b[32m', '更新完毕', '\n')
  },
  'vue-web组件库'
)
