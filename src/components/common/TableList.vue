<template>
  <div class="qui-fx-f1" style="min-height: 400px">
    <div id="tableList" :style="{overflow: overFlow ? 'auto' : 'hidden', position: 'absolute', zIndex: 1, width: '100%', height: '100%'}">
      <a-table
        style="height: 400px"
        :scroll="{y: scrollH || this.$tools.setScroll('tableList')}"
        :customRow="customRow"
        :pagination="false"
        :rowKey="(record) => record.id"
        :rowSelection="selectObj"
        :columns="columns"
        :dataSource="tableList">
        <template v-if="isIndex" slot="index" slot-scope="text, record, index">
          {{ index | getPageIndex(pageList) }}
        </template>
        <template slot="photoPic" slot-scope="text">
          <a-popover placement="left" v-if="isZoom">
            <template slot="content">
              <img :src="text" style="max-width: 200px; max-height: 220px; display: block; " alt="">
            </template>
            <img :src="text||noImg" :style="{width: `${width}px`, height: `${height}px`, display: 'block', backgroundColor: '#f5f5f5'}" alt="">
          </a-popover>
          <img v-if="!isZoom" :src="text||noImg" :style="{width: `${width}px`, height: `${height}px`, display: 'block', backgroundColor: '#f5f5f5'}" alt="">
        </template>
        <template slot="snapPic" slot-scope="text">
          <a-popover placement="left" v-if="isZoom">
            <template slot="content">
              <img :src="text||noImg" style="max-width: 200px; max-height: 220px; display: block;" alt="">
            </template>
            <img :src="text||noImg" :style="{width: `${width}px`, height: `${height}px`, display: 'block', backgroundColor: '#f5f5f5'}" alt="">
          </a-popover>
          <img v-if="!isZoom" :src="text||noImg" :style="{width: `${width}px`, height: `${height}px`, display: 'block', backgroundColor: '#f5f5f5'}" alt="">
        </template>
        <template slot="totalNum" slot-scope="text, record">
          <slot name="totalNums" :record="record"></slot>
        </template>
        <template slot="other1" slot-scope="text, record">
          <slot name="other1" :record="record"></slot>
        </template>
        <template slot="other2" slot-scope="text, record">
          <slot name="other2" :record="record"></slot>
        </template>
        <template slot="other3" slot-scope="text, record">
          <slot name="other3" :record="record"></slot>
        </template>
        <template slot="other4" slot-scope="text, record">
          <slot name="other4" :record="record"></slot>
        </template>
        <template slot="other5" slot-scope="text, record">
          <slot name="other5" :record="record"></slot>
        </template>
        <template slot="action" slot-scope="text, record">
          <slot name="actions" :record="record"></slot>
        </template>
      </a-table>
    </div>

  </div>
</template>

<script>
import noImg from './img/no_img.png'
export default {
  name: 'TableList',
  props: {
    overFlow: {
      type: Boolean,
      default: false
    },
    width: {
      type: Number,
      default: 60
    },
    height: {
      type: Number,
      default: 60
    },
    scrollH: {
      type: Number,
      required: false,
      default: 0
    },
    isZoom: {
      type: Boolean,
      default: false
    },
    isIndex: {
      type: Boolean,
      default: true
    },
    isRadio: {
      type: Boolean,
      default: false
    },
    isCheck: {
      type: Boolean,
      default: false
    },
    columns: {
      type: Array,
      default: () => {
        return []
      }
    },
    tableList: {
      type: Array,
      default: () => {
        return []
      }
    },
    pageList: {
      type: Object,
      default: () => {
        return {
          page: 1,
          size: 200
        }
      }
    },
    // 选中项
    value: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  filters: {
    // 获取表格索引
    getPageIndex: (val, obj) => {
      if (JSON.stringify(obj) === '{}') {
        return val + 1
      } else {
        return (obj.page - 1) * obj.size + val + 1
      }
    }
  },
  computed: {
    typeForm () {
      if (this.isRadio) {
        return 'radio'
      } else if (this.isCheck) {
        return 'checkbox'
      } else {
        return 'checkbox'
      }
    },
    selectedRowKeys: {
      get () {
        return this.value
      },
      set (val) {
        this.$emit('input', val)
      }
    },
    selectObj () {
      if (!this.isRadio && !this.isCheck) return null
      return { type: this.typeForm, onSelectAll: this.onSelectAll, selectedRowKeys: this.selectedRowKeys, onSelect: this.selectChange, onChange: this.onSelectChange }
    }
  },
  data () {
    return {
      noImg
    }
  },
  methods: {
    onSelectAll (type, selectedRows, changeRows) {
      const data = changeRows.map(item => {
        return {
          id: item.id,
          userName: item.userName,
          ...item
        }
      })
      this.$emit('selectAll', data, type)
    },
    // 点击单行表格
    customRow (record, index) {
      return {
        on: {
          click: () => {
            if (this.isRadio) {
              this.selectedRowKeys = [record.id]
              this.$emit('clickRow', record, true)
            } else if (this.isCheck) {
              const index = this.selectedRowKeys.indexOf(record.id)
              if (index > -1) {
                this.selectedRowKeys.splice(index, 1)
                this.$emit('clickRow', record, false)
              } else {
                this.$emit('clickRow', record, true)
                this.selectedRowKeys.push(record.id)
              }
            }
          }
        }
      }
    },
    // 点击单选框
    selectChange (record, type) {
      if (this.isRadio) {
        this.selectedRowKeys = [record.id]
      } else {
        const index = this.selectedRowKeys.indexOf(record.id)
        if (index > -1) {
          this.selectedRowKeys.splice(index, 1)
        } else {
          this.selectedRowKeys.push(record.id)
        }
      }
      this.$emit('clickRow', record, type)
    },
    // 点击复选框
    onSelectChange (record) {
      if (this.isCheck) this.selectedRowKeys = record
    }
  }
}
</script>

<style lang="less" scoped>
</style>
