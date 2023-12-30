/**
 * 前端各个模块的路由。在main.js中使用
 */

// 1、引入各个组件
import Home from '../components/home/item/Home'
import BlogView from '../components/home/item/BlogView'
import About from '../components/home/item/About'
import Login from '../components/home/login/Login'
import Tag from '../components/home/item/Tag'
import Archive from '../components/home/item/Archive';
import Manage from '../components/manage/Manage'
import BlogList from '../components/manage/blog/BlogList'
import BlogAdd from '../components/manage/blog/BlogAdd'

// 2、设置路由路径
export default [
  {path: "/", component: Home},
  {path: "/blogview", component: BlogView},
  {path: "/about", component: About},
  {path: "/login", component: Login},
  {path: "/tag", component: Tag},
  {path: "/archive", component: Archive},
  {
    path: "/manage",
    component: Manage,
    children: [
      {path: "/bloglist", component: BlogList},
      {path: "/blogadd", component: BlogAdd}
    ]
  }
]
