<template>
  <div class="page-layout qui-fx-ver">
    <div class="top-btn-group qui-fx-ac">
      <a href="javascript:;" class="a-upload">
        <input @change="chooseNewFile($event)" type="file" name id />点击这里上传文件
      </a>
      <a-tag color="#666">共{{ iconList.length }}张图片</a-tag>
    </div>
    <div class="qui-fx-f1">
      <div class="pos-box" style="overflow-y: scroll;padding-bottom: 100px">
        <div class="icon-list qui-fx-ac-jc" v-for="(icon, index) in iconList" :key="index">
          <div class="top">{{ icon.substr(icon.lastIndexOf('/') + 1) }}</div>
          <div class="bottom">
            <a href="javascript:;" class="a-upload">
              <input @change="chooseFile($event, icon, index)" type="file" name id />更新图片
            </a>
          </div>
          <img :id="'img' + index" :src="icon" alt />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import axios from 'axios'
export default {
  name: 'IconManage',
  components: {},
  data() {
    return { iconList: [] }
  },
  computed: {},
  async mounted() {
    this.getIconList()
  },
  methods: {
    ...mapActions('home', ['getIcon']),
    chooseNewFile(event) {
      const file = event.target.files[0]
      const pathProd = '/usr/local/openresty/nginx/html/mobile-protal/mobile-img/'
      const paramProd = new FormData()
      paramProd.append('file', file)
      paramProd.append('uploadPath', pathProd)
      const pathTest = '/usr/local/openresty/nginx/html/mobile-protal/mobile-img/'
      const paramTest = new FormData()
      paramTest.append('file', file)
      paramTest.append('uploadPath', pathTest)
      const config = {
        headers: { 'Content-Type': 'multipart/form-data' }
      }
      axios.post(`http://canpointtest.com:8090/file/upload-file`, paramProd, config).then(response => {
        this.iconList.unshift('http://canpointtest.com/mobile-img/' + file.name)
        this.$message.success('测试环境上传成功')
      })
      axios.post(`http://canpointlive.com:8090/file/upload-file`, paramTest, config).then(response => {
        this.$message.success('正式上传成功')
      })
    },
    chooseFile(event, name, index) {
      const file = event.target.files[0]
      const pathProd = '/usr/local/openresty/nginx/html/mobile-protal/mobile-img/'
      const paramProd = new FormData()
      paramProd.append('file', file)
      paramProd.append('uploadPath', pathProd)
      paramProd.append('fileName', name.substr(name.lastIndexOf('/') + 1))
      const pathTest = '/usr/local/openresty/nginx/html/mobile-protal/mobile-img/'
      const paramTest = new FormData()
      paramTest.append('file', file)
      paramTest.append('uploadPath', pathTest)
      paramTest.append('fileName', name.substr(name.lastIndexOf('/') + 1))
      const config = {
        headers: { 'Content-Type': 'multipart/form-data' }
      }
      axios.post(`http://canpointtest.com:8090/file/upload-new-file`, paramProd, config).then(response => {
        const readFile = new FileReader()
        readFile.onload = () => {
          document.querySelector('#img' + index).src = readFile.result
        }
        readFile.readAsDataURL(file)
        this.$message.success('测试环境上传成功')
      })
      axios.post(`http://canpointlive.com:8090/file/upload-new-file`, paramTest, config).then(response => {
        this.$message.success('正式环境上传成功')
      })
    },
    async getIconList() {
      const res = await this.getIcon()
      this.iconList = res.data.map(item => {
        return 'http://canpointtest.com/mobile-img/' + item
      })
    }
  }
}
</script>
<style lang="less" scoped>
.a-upload {
  margin-right: 20px;
  padding: 0 15px;
  height: 30px;
  line-height: 30px;
  position: relative;
  cursor: pointer;
  color: #888;
  background: #fafafa;
  border: 1px solid #ddd;
  border-radius: 4px;
  overflow: hidden;
  display: inline-block;
  *display: inline;
  *zoom: 1;
}

.a-upload input {
  position: absolute;
  font-size: 100px;
  right: 0;
  top: 0;
  opacity: 0;
  filter: alpha(opacity=0);
  cursor: pointer;
}

.a-upload:hover {
  color: #444;
  background: #eee;
  border-color: #ccc;
  text-decoration: none;
}
.icon-list {
  width: 180px;
  height: 180px;
  position: relative;
  border: 1px #f5f5f5 solid;
  border-radius: 2px;
  float: left;
  margin-left: 20px;
  margin-top: 20px;
  img {
    max-width: 100%;
    max-height: 100%;
  }
  .top {
    width: 100%;
    height: 20px;
    line-height: 20px;
    text-align: center;
    color: #fff;
    top: 0;
    position: absolute;
    background: rgba(0, 0, 0, 0.2);
  }
  .bottom {
    width: 100%;
    height: 30px;
    line-height: 30px;
    text-align: center;
    color: #fff;
    position: absolute;
    bottom: 0;
    background: rgba(0, 0, 0, 0.6);
  }
}
</style>
