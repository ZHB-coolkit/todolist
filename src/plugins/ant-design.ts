import 'ant-design-vue/dist/antd.css'
import { App } from 'vue'
import {
  Input,
  Button,
  List,
  Checkbox,
  BackTop,
  Divider,
  Typography,
  Form,
  Tooltip,
  Popconfirm
} from 'ant-design-vue'

export default (app: App<Element>) => {
  app.use(Input)
  .use(Button)
  .use(List)
  .use(Checkbox)
  .use(BackTop)
  .use(Divider)
  .use(Typography)
  .use(Form)
  .use(Tooltip)
  .use(Popconfirm)
}
