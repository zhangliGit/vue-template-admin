<template>
  <div class="home page-layout"></div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'ProtalWeb',
  components: {},
  data() {
    return {}
  },
  computed: {
    ...mapState('home', ['loginInfo'])
  },
  async mounted() {},
  methods: {}
}
</script>
<style lang="less" scoped></style>
