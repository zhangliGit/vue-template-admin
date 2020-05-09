<template>
  <div class="grade-tree">
    <a-skeleton v-if="orgData.length == 0 && !noData" active :paragraph="{rows: 10}" />
    <no-data v-if="noData" msg="暂无组织机构~"></no-data>
    <a-tree
      v-if="orgData.length > 0"
      @select="select"
      :treeData="orgData"
      :defaultExpandedKeys="defaultKey"
      :defaultSelectedKeys="defaultKey"
      showLine
    >
    </a-tree>
  </div>
</template>

<script>
import NoData from './NoData'
import $ajax from '@u/ajax-serve'
import { mapState } from 'vuex'
import hostEnv from '@config/host-env'
export default {
  name: 'OrgTree',
  data () {
    return {
      noData: false,
      orgData: [],
      defaultKey: []
    }
  },
  components: {
    NoData
  },
  computed: {
    ...mapState('home', [
      'schoolCode'
    ])
  },
  mounted () {
    this.showList()
  },
  methods: {
    select (selectedKeys, info) {
      this.$emit('select', {
        name: info.node.title,
        code: info.node.eventKey
      })
    },
    async showList () {
      const res = await $ajax.get({
        url: `${hostEnv.lz_user_center}/school/org/getSchoolRoot/${this.schoolCode}`
      })
      if (res.data === null || res.data.length === 0) {
        this.noData = true
        return
      } else {
        this.noData = false
      }
      const data = this.newOrgData([res.data])
      this.defaultKey = [data[0].key]
      this.orgData = data
    },
    // 深层递归
    newOrgData (data) {
      data.forEach(item => {
        item.children = item.orgChilds || null
        item.title = item.name
        item.key = item.code
        if (item.orgChilds && item.orgChilds.length > 0) {
          this.newOrgData(item.orgChilds)
        }
      })
      return data
    }
  }
}
</script>

<style lang="less" scoed>
  .grade-tree {
    padding: 0 10px;
    width: 240px;
    min-height: 600px;
    max-height: 650px;
    overflow-y: auto
  }
</style>
