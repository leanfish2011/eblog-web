<template>
  <div id="archive">
    <top-header></top-header>
    <main class="app-body" id="archives">
      <label v-for="item in archiveSumList">
        <section class="time-section">
          <h1 class="section-year" :class="disableList['disable-'+item.year]?'click-disable':''"
              @click="getArchiveList(item.year)">
            {{ item.year }}<span class="count">（{{ item.count }}篇）</span>
          </h1>
          <div class="section-list">
            <label v-for="archive in archiveList['archiveList-'+item.year]">
              <div class="section-list-item">
                <a @click="showContent(archive.id)" class="archive-title">{{ archive.title }}</a>
                <p class="archive-date">{{ archive.date }}</p>
              </div>
            </label>
          </div>
        </section>
      </label>
    </main>
    <bottom-footer></bottom-footer>
  </div>
</template>

<script>
import Header from '../Header'
import Footer from '../Footer'
import Service from "../../../config/service";

export default {
  name: "Archive",
  components: {
    "topHeader": Header,
    "bottomFooter": Footer
  },
  data() {
    return {
      archiveSumList: null,
      archiveList: {},
      disableList: {}
    }
  },
  created() {
    this.getArchiveSumList();
  },
  methods: {
    getArchiveSumList() {
      this.$axios.get(Service.blogUrl.archive).then((res) => {
        if (res.status === 200) {
          let responseData = res.data;
          if (responseData.code === 0) {
            this.archiveSumList = responseData.data.archiveSumList;
          } else {
            this.$message.error(responseData.msg);
          }
        } else {
          this.$message.error("系统内部错误");
        }
      }).catch(function (error) {
        console.error(error);
      });
    },
    getArchiveList(year) {
      this.$axios.get(Service.blogUrl.archive + "/" + year).then((res) => {
        if (res.status === 200) {
          let responseData = res.data;
          if (responseData.code === 0) {
            let archiveListYear = responseData.data.archiveList;
            this.$set(this.archiveList, 'archiveList-' + year, archiveListYear)
          } else {
            this.$message.error(responseData.msg);
          }
        } else {
          this.$message.error("系统内部错误");
        }
      }).catch(function (error) {
        console.error(error);
      });

      //点击一次后不可再点击
      this.$set(this.disableList, 'disable-' + year, true);
    },
    showContent(id) {
      this.$router.push({
        path: '/blogview',
        query: {id: id} // 参数传值
      })
    }
  }
}
</script>

<style scoped>
#archive {
  width: 100%;
  margin-top: 80px;
}

#archives:before {
  position: absolute;
  top: 2em;
  bottom: 1em;
  left: 30px;
  height: auto;
  content: '';
  background-color: #ff6700;
  width: 4px;
}

.time-section {
  padding-left: 30px;
  position: relative;
}

.time-section .section-year {
  cursor: pointer;
  font-size: 1.8em;
  margin-left: 10px;
}

.time-section .section-year:before {
  position: absolute;
  left: 8px;
  top: 11px;
  content: '';
  background-color: #fff;
  width: 12px;
  height: 12px;
  border: 2px solid #ff6700;
  border-radius: 50%;
}

.time-section .section-list .section-list-item {
  margin: 20px 0 20px 10px;
  position: relative;
}

.time-section .section-list .section-list-item:before {
  position: absolute;
  left: -29px;
  top: 7px;
  content: '';
  background-color: #ff6700;
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.time-section .section-list .section-list-item .archive-title {
  color: #34495e;
  transition: all 0.3s ease;
  font-size: 1.1em;
}

.time-section .section-list .section-list-item .archive-title:hover {
  color: #ff6700;
  padding-left: 10px;
}

.time-section .section-list .section-list-item .archive-date {
  color: #7f8c8d;
  font-size: 0.9em;
  margin: 5px 0;
}

.count {
  color: #7f8c8d;
  font-size: 0.5em;
}

.click-disable {
  pointer-events: none;
}
</style>