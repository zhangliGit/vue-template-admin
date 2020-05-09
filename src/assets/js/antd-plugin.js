/**
 * @description 注册全局组件
 */
import {
  Alert,
  Skeleton,
  Pagination,
  InputNumber,
  Popconfirm,
  Tooltip,
  Row,
  Tree,
  Col,
  Icon,
  Tag,
  Select,
  Table,
  Checkbox,
  Radio,
  DatePicker,
  TimePicker,
  Tabs,
  Button,
  Layout,
  Modal,
  Dropdown,
  Form,
  Input,
  Menu,
  LocaleProvider,
  Popover,
  message,
  upload,
  Cascader,
  Drawer
} from 'ant-design-vue'
const ComList = [
  Alert,
  Skeleton,
  InputNumber,
  Pagination,
  Popconfirm,
  Tooltip,
  Select,
  Checkbox,
  Radio,
  Table,
  Row,
  Col,
  Tree,
  Icon,
  Tag,
  Tabs,
  Button,
  Layout,
  Dropdown,
  DatePicker,
  TimePicker,
  Modal,
  Form,
  Input,
  Menu,
  LocaleProvider,
  Popover,
  message,
  upload,
  Cascader,
  Drawer
]
const install = (Vue) => {
  ComList.forEach(item => {
    Vue.use(item)
  })
  Vue.prototype.$message = message
  Vue.prototype.$Modal = Modal
}

export default {
  install
}
