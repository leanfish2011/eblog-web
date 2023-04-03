/**
 * 前端各个模块的路由。在main.js中使用
 */

// 1、引入各个组件
import Home from '../components/home/item/Home'
import Search from '../components/home/item/Search'
import About from '../components/home/item/About'
import Login from '../components/home/login/Login'
import Manage from '../components/manage/Manage'
import Blog from '../components/manage/blog/blog.vue'
import Tool from '../components/home/item/Tool'

// 2、设置路由路径
export default [
  {path: "/", component: Home},
  {path: "/search", component: Search},
  {path: "/about", component: About},
  {path: "/login", component: Login},
  {path: "/tool", component: Tool},
  {
    path: "/manage",
    component: Manage,
    children: [
      {path: "/blog", component: Blog}
    ]
  }
]
