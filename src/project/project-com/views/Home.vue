<template>
  <div class="page-layout" style="overflow-y:scroll">
    <div class="title-ui">公共UI模块</div>
    <div class="top-btn-group">
      <a-button icon="plus" class="add-btn">新增</a-button>
      <a-button icon="export" class="export-btn">导入</a-button>
      <a-button icon="export" class="export-all-btn">批量导入</a-button>
      <a-button icon="delete" class="del-btn">批量删除</a-button>
    </div>
    <div class="title-ui">表格操作按钮</div>
    <div class="top-btn-group">
      <a-tooltip placement="topLeft" title="详情">
        <a-button size="small" class="detail-action-btn" icon="ellipsis"></a-button>
      </a-tooltip>
      <a-tooltip placement="topLeft" title="权限管理">
        <a-button size="small" class="power-action-btn" icon="lock"></a-button>
      </a-tooltip>
      <a-tooltip placement="topLeft" title="用户列表">
        <a-button size="small" class="user-action-btn" icon="team"></a-button>
      </a-tooltip>
      <a-tooltip placement="topLeft" title="新增">
        <a-button size="small" class="add-action-btn" icon="plus"></a-button>
      </a-tooltip>
      <a-tooltip placement="topLeft" title="编辑">
        <a-button size="small" class="edit-action-btn" icon="form"></a-button>
      </a-tooltip>
      <a-popconfirm placement="left" okText="确定" cancelText="取消">
        <template slot="title">
          您确定删除吗?
        </template>
        <a-tooltip placement="topLeft" title="删除">
          <a-button size="small" class="del-action-btn" icon="delete"></a-button>
        </a-tooltip>
      </a-popconfirm>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  components: {},
  data() {
    return {}
  },
  computed: {},
  async mounted() {},
  methods: {}
}
</script>
<style lang="less" scoped>
.title-ui {
  background-color: #ccc;
  color: #666;
  font-weight: bold;
  padding: 10px;
}
</style>
