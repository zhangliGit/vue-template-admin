<template>
  <div class="grade-tree">
    <a-skeleton v-if="treeData.length == 0 && !noData" active :paragraph="{rows: 10}" />
    <no-data v-if="noData" msg="暂无数据~"></no-data>
    <a-tree
      v-if="treeData.length > 0"
      @select="select"
      :loadData="onLoadData"
      :treeData="treeData"
      :defaultSelectedKeys="defaultSelectedKeys"
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
  name: 'GradeTree',
  props: {
  },
  data () {
    return {
      noData: false,
      treeData: [],
      gradeId: '',
      classId: '',
      gradeList: [],
      defaultSelectedKeys: [],
      schoolYear: '',
      isNewYear: true
    }
  },
  components: {
    NoData
  },
  computed: {
    ...mapState('home', ['schoolCode'])
  },
  mounted () {
    this.initMenu()
  },
  methods: {
    onExpand () {},
    // 点击节点
    select (obj, tree) {
      const gradeIds = []
      this.gradeList.forEach(el => {
        return gradeIds.push(el.gradeId)
      })
      if (gradeIds.indexOf(obj[0]) === -1) {
        this.classId = obj[0]
      } else {
        this.gradeId = obj[0]
        this.classId = ''
      }
      if (tree.selectedNodes.length === 0) return
      const selectObj = {
        schoolYearId: tree.selectedNodes[0].data.props.schoolYearId,
        title: tree.selectedNodes[0].data.props.title,
        gradeCode: tree.selectedNodes[0].data.props.gradeCode,
        classCode: tree.selectedNodes[0].data.props.classCode,
        isNewYear: tree.selectedNodes[0].data.props.schoolYearId === this.schoolYear
      }
      this.$emit('select', selectObj)
    },
    async initMenu () {
      const req = {
        schoolCode: this.schoolCode
      }
      const res = await $ajax.postForm({
        url: `${hostEnv.lz_user_center}/schoolYearSemester/list`,
        params: req
      })
      if (res.data.list === null || res.data.list.length === 0) {
        this.noData = true
        return
      } else {
        this.noData = false
      }
      this.gradeList = res.data.list.filter(item => {
        return item.semester === '下学期'
      })
      if (res.data.list[0].semester === '上学期') {
        this.gradeList.unshift({
          id: res.data.list[0].id,
          semester: res.data.list[0].semester,
          schoolYear: res.data.list[0].schoolYear
        })
      }
      this.schoolYear = this.gradeList[0].id
      const selectObj = {
        schoolYearId: this.gradeList[0].id,
        title: this.gradeList[0].schoolYear,
        gradeCode: this.gradeList[0].gradeCode,
        classCode: this.gradeList[0].classCode,
        isNewYear: true
      }
      this.defaultSelectedKeys = [this.gradeList[0].id]
      this.treeData = this.gradeList
        .map(item => {
          return {
            title: item.schoolYear + '学年',
            code: item.id,
            key: item.id,
            schoolYearId: item.id
          }
        })
      /* this.onLoadData({
        dataRef: {
          schoolYearId: this.treeData[0].code
        }
      }) */
      this.$emit('select', selectObj)
    },
    async onLoadData (treeNode) {
      return new Promise((resolve) => {
        if (treeNode.dataRef.children) {
          resolve()
          return
        }
        const req = {
          schoolCode: this.schoolCode
        }
        $ajax.postForm({
          url: `${hostEnv.lz_user_center}/grade/manage/list`,
          params: req
        }).then(res => {
          treeNode.dataRef.children = res.data.list.map(item => {
            return {
              title: item.name,
              schoolYearId: treeNode.dataRef.schoolYearId,
              isLeaf: false,
              gradeCode: item.code
            }
          })
          treeNode.dataRef.children.forEach(item => {
            const data = {
              schoolCode: this.schoolCode,
              schoolYearId: treeNode.dataRef.schoolYearId,
              gradeCode: item.gradeCode
            }
            $ajax.post({
              url: `${hostEnv.lz_user_center}/classManage/list`,
              params: data
            }).then(res => {
              item.children = res.data.list.map(ele => {
                return {
                  title: ele.className,
                  schoolYearId: item.schoolYearId,
                  gradeCode: item.gradeCode,
                  classCode: ele.classCode,
                  isLeaf: true
                }
              })
              this.treeData = [...this.treeData]
            })
          })
          this.treeData = [...this.treeData]
          resolve()
        })
      })
    }
  }
}
</script>

<style lang="less" scoed>
  .grade-tree {
    width: 200px;
    min-height: 400px;
    max-height: 800px;
    overflow-y: auto
  }
</style>
