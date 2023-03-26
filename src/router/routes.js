/**
 * 前端各个模块的路由。在main.js中使用
 */

// 1、引入各个组件
import Home from '../components/home/item/Home'
import My from '../components/home/item/My'
import Search from '../components/home/item/Search'
import Message from '../components/home/item/Message'
import About from '../components/home/item/About'
import Login from '../components/home/login/Login'
import GitHubLogin from '../components/home/login/GithubLogin'
import Register from '../components/home/login/Register'
import FindLogin from '../components/home/login/FindLogin'
import Manage from '../components/manage/Manage'
import Site from '../components/manage/site/Site'
import HomeSite from '../components/manage/site/HomeSite'
import User from '../components/manage/user/User'
import Role from '../components/manage/user/Role'
import Table from '../components/test/elmentui/Table'
import Slider from '../components/test/elmentui/Slider'
import Tree from '../components/test/elmentui/Tree'
import TreeData from '../components/test/elmentui/TreeData'
import Tag from '../components/test/elmentui/Tag'
import BackTop from '../components/test/elmentui/BackTop'
import Container from '../components/test/elmentui/Container'
import Subscribe from '../components/sub/Subscribe'
import UnSubscribe from '../components/sub/UnSubscribe'
import Tool from '../components/home/item/Tool'

// 2、设置路由路径
export default [
  {path: "/", component: Home},
  {path: "/my", component: My},
  {path: "/search", component: Search},
  {path: "/message", component: Message},
  {path: "/about", component: About},
  {path: "/login", component: Login},
  {path: "/github/auth", component: GitHubLogin},
  {path: "/register", component: Register},
  {path: "/find", component: FindLogin},
  {path: "/table", component: Table},
  {path: "/slider", component: Slider},
  {path: "/tree", component: Tree},
  {path: "/treeData", component: TreeData},
  {path: "/tag", component: Tag},
  {path: "/top", component: BackTop},
  {path: "/con", component: Container},
  {path: "/sub", component: Subscribe},
  {path: "/unsub", component: UnSubscribe},
  {path: "/tool", component: Tool},
  {
    path: "/manage",
    component: Manage,
    children: [
      {path: "/site", component: Site},
      {path: "/homesite", component: HomeSite},
      {path: "/user", component: User},
      {path: "/role", component: Role}
    ]
  }
]
