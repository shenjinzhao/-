import { FC } from 'react'
import Router from './routes'
import './index.scss'
import { ConfigProvider } from 'antd'
// 汉化
import zhCN from 'antd/locale/zh_CN'
import { HashRouter } from 'react-router-dom'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
dayjs.locale('zh-cn')

const App: FC = () => (
  <HashRouter>
    <ConfigProvider locale={zhCN}>
      <Router />
    </ConfigProvider>
  </HashRouter>
)

export default App
