<template>
  <div class="page-layout" style="overflow-y:scroll">
    <Functional :data="dataList" title="haha">dsd</Functional>
    <div @click="show('hah',$event)">event事件</div>
    <div>我是可变元素</div>
  </div>
</template>

<script>
import Functional from '../component/Functional'
export default {
  name: 'Demo',
  components: {
    Functional
  },
  data() {
    return {
      obj: {
        list: {
          name: 'zhangli',
          sex: 22
        }
      },
      dataList: '你好'
    }
  },
  watch: {
    obj: {
      handler(n, o) {
        console.log(n)
      },
      deep: true,
      immediate: true
    }
  },
  computed: {},
  async mounted() {},
  methods: {
    show(tag, e) {
      this.obj.list.name = 'chentian'
      console.log(tag, e.target)
    }
  }
}
</script>
<style lang="less" scoped></style>
