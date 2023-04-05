<template>
  <div>
    <div id="topMenu">
      <div id="top">
        <div id="log">
          <img src="../../../static/img/log.jpg">
        </div>
        <div id="logTitle">
          Tim's Blog
        </div>
        <div id="midSearch">
          <el-form :model="searchForm">
            <el-input v-model="searchForm.keyword" size="medium" class="searchInput"
                      placeholder="请输入关键词"></el-input>
            <el-button type="primary" plain size="medium" @click="search()">搜索一下</el-button>
            <el-link href="/" type="primary" icon="el-icon-back">回到首页</el-link>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchHeader",
  data() {
    return {
      searchForm: {
        keyword: ''
      }
    }
  },
  methods: {
    search() {
      let keyword = this.searchForm.keyword.trim();
      if (keyword == "") {
        this.$message.warning("请输入关键词！");
        return;
      }

      //子组件调用父组件方法
      this.$emit('search', keyword);
    }
  },
  mounted() {
    //搜索框显示主页传递过来的关键词
    let keyword = this.$route.query.keyword;
    this.searchForm.keyword = keyword;
  }
}
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
  border: 1px solid #D8DFEA;
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
  color: #E33E06;
  width: 10%;
}

#midSearch {
  width: 90%;
  margin-left: 50px;
}

.searchInput {
  width: 400px;
  height: 30px;
  font-size: 15px;
}
</style>
