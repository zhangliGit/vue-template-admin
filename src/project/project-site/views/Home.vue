<template>
  <div class="banner-list page-layout qui-fx-ver">
    <div style="margin: 20px 0 20px 30px">
      <a href="javascript:;" class="a-upload"> <input @change="chooseFile($event)" type="file" name id />上传封面 </a>
    </div>
    <div class>
      <div class="banner-item" v-for="(item, index) in bannerList" :key="index">
        <img :src="item.url" alt />
        <div class="del" @click="_delBanner(item._id)">删除</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'Home',
  components: {},
  computed: {},
  data() {
    return {
      bannerList: []
    }
  },
  mounted() {
    this._getBanner()
  },
  beforeDestroy() {},
  methods: {
    ...mapActions('home', ['addBanner', 'delBanner', 'getBanner']),
    async _getBanner() {
      const res = await this.getBanner()
      this.bannerList = res.data
    },
    async _delBanner(id) {
      await this.delBanner({
        _id: id
      })
      this.$message.success('删除成功')
      this.$tools.goNext(() => {
        this._getBanner()
      })
    },
    // 上传图片
    chooseFile(event) {
      this.$tools.chooseNewFile(event, async data => {
        await this.addBanner({
          url: data
        })
        this.$message.success('上传成功')
        this.$tools.goNext(() => {
          this._getBanner()
        })
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
.banner-item {
  border: 1px #f5f5f5 solid;
  width: 22.5%;
  float: left;
  margin-left: 2%;
  height: 260px;
  img {
    width: 100%;
    height: 220px;
  }
  .del {
    height: 40px;
    cursor: pointer;
    line-height: 40px;
    text-align: center;
    background-color: #eee;
    color: #444;
  }
}
</style>
