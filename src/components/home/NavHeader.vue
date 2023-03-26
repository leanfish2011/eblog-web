<template>
  <div>
    <div id="topMenu">
      <div id="top">
        <div id="log" @click="goHome()">
          <img src="../../../static/img/log.jpg">
        </div>
        <div id="logTitle" @click="goHome()">
          Tim's Blog
        </div>
        <div id="midSearch">
          <el-form :model="searchForm">
            <el-input v-model="searchForm.keyword" size="medium" class="searchInput"
                      placeholder="请输入关键词"></el-input>
            <el-button type="primary" plain size="medium" @click="search()">搜索一下</el-button>
          </el-form>
        </div>
        <div id="toolInfo">
          <el-row type="flex" justify="center" align="middle">
            <el-col :span="22">
              <el-link type="primary" icon="el-icon-message" @click="openSub()">订阅</el-link>
            </el-col>
          </el-row>
        </div>
      </div>
      <div id="divMenu">
        <ul>
          <label v-for="item in menuData">
            <li>
              <router-link :to=item.route exact>{{ item.name }}</router-link>
            </li>
          </label>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NavHeader",
  data() {
    return {
      userName: "",
      userPhotoUrl: "",
      menuData: [
        {
          id: "1",
          name: "主页",
          route: "/",
        },
        {
          id: "2",
          name: "工具",
          route: "/tool",
        },
        {
          id: "3",
          name: "留言",
          route: "/message",
        },
        {
          id: "4",
          name: "关于",
          route: "/about",
        },
      ],
      searchForm: {
        keyword: "",
      },
    };
  },
  methods: {
    search() {
      let keyword = this.searchForm.keyword.trim();
      if (keyword == "") {
        this.$message.warning("请输入关键词！");
        return;
      }

      //url中传递参数
      this.$router.push({path: "/search", query: {keyword: keyword}});
    },
    openSub() {
      this.$router.push("/sub");
    },
    goHome() {
      this.$router.push("/");
    },
  }
};
</script>

<style scoped>
#topMenu {
  width: 100%;
  top: 0;
  background: white;
  z-index: 100;
  margin: 0 auto 0 auto;
  position: fixed;
}

#top {
  border: 1px solid #d8dfea;
  margin: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

#log {
  width: 4%;
}

#logTitle {
  font-size: 25px;
  color: #e33e06;
  width: 10%;
}

#midSearch {
  width: 60%;
  margin-left: 50px;
}

.searchInput {
  width: 400px;
  height: 30px;
  font-size: 15px;
}

#toolInfo {
  width: 30%;
  text-align: right;
  margin-left: 20px;
}

#toolInfo .el-col {
  display: flex;
  justify-content: end;
  align-items: center;
}

#divMenu {
  line-height: 40px;
  height: 40px;
  top: 0px;
  background: #3a8ee6;
  margin-left: 5px;
  margin-right: 5px;
  z-index: 100;
}

#divMenu ul {
  list-style: none;
  line-height: 40px;
  margin: 0 auto 0 auto;
  width: 50%;
}

#divMenu ul li {
  display: block;
  float: left;
}

#divMenu ul li a {
  text-decoration: none;
  color: #fff;
  display: block;
  padding-left: 30px;
  padding-right: 30px;
}

#divMenu ul li:hover {
  background: #3787ee;
}

/*路由激活样式，router自带属性*/
.router-link-active {
  background-color: #2283ee;
  color: #fff;
}
</style>
