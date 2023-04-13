/**
 * 前端各个模块的路由。在main.js中使用
 */

// 1、引入各个组件
import Home from '../components/home/item/Home'
import BlogView from '../components/home/item/BlogView.vue'
import About from '../components/home/item/About'
import Login from '../components/home/login/Login'
import Tool from '../components/home/item/Tool'
import Manage from '../components/manage/Manage'
import BlogList from '../components/manage/blog/BlogList.vue'
import BlogAdd from '../components/manage/blog/BlogAdd.vue'

// 2、设置路由路径
export default [
  {path: "/", component: Home},
  {path: "/blogview", component: BlogView},
  {path: "/about", component: About},
  {path: "/login", component: Login},
  {path: "/tool", component: Tool},
  {
    path: "/manage",
    component: Manage,
    children: [
      {path: "/bloglist", component: BlogList},
      {path: "/blogadd", component: BlogAdd}
    ]
  }
]
