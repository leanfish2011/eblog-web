<template>
  <div id="project">
    <top-header></top-header>
    <main class="app-body project-app">
      <div class="card-container" id="all-project">
        <label v-for="item in projectList" :key="item.id">
          <section class="project-card">
            <a class="card-wrap" :href=item.html_url target="_blank">
              <div class="card-header" :data-name=item.name
                   :style="{backgroundColor: item['background-color'] }"></div>
              <h3 class="card-title">{{ item.name }}</h3>
              <p class="card-description">{{ item.description }}</p>
              <div class="card-footer">
                <span><i class="fa"></i>&#9734&nbsp;{{ item.stargazers_count }}</span>
                <span><i class="fa"></i>&#936&nbsp;{{ item.forks_count }}</span>
              </div>
            </a>
          </section>
        </label>
      </div>
    </main>
    <bottom-footer></bottom-footer>
  </div>
</template>

<script>
import Header from '../Header'
import Footer from '../Footer'

export default {
  name: "Project",
  components: {
    "topHeader": Header,
    "bottomFooter": Footer
  },
  data() {
    return {
      projectList: [
        {
          "id": "0",
          "name": "WebPhotoshop",
          "html_url": "https://github.com/leanfish2011/WebPhotoshop-Simple",
          "description": "HTML5实现的图形图像处理平台，可进行：图形绘制、图像处理、图像操作",
          "stargazers_count": 108,
          "forks_count": 59,
          "background-color": "#5daf34"
        },
        {
          "id": "1",
          "name": "MyEcharts",
          "html_url": "https://github.com/leanfish2011/MyEcharts",
          "description": "对Echarts的封装，使用更加方便",
          "stargazers_count": 18,
          "forks_count": 9,
          "background-color": "#2a239a"
        },
        {
          "id": "2",
          "name": "爱收藏",
          "html_url": "https://leanfish2011.github.io/ishou-resource",
          "description": "一个用于收藏网址的平台",
          "stargazers_count": 0,
          "forks_count": 0,
          "background-color": "#830973"
        }
      ]
    }
  }
}
</script>

<style scoped>
#project {
  width: 100%;
  margin-top: 80px;
}

.project-app {
  max-width: 1020px;
  min-width: 300px;
  padding: 1em 0;
}

.card-container {
  margin: 30px auto;
  display: -webkit-flex;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

@media screen and (max-width: 960px) {
  .card-container {
    width: 660px;
  }
}

@media screen and (max-width: 660px) {
  .card-container {
    width: 320px;
  }
}

.card-container .project-card {
  width: 320px;
  height: 160px;
  margin-bottom: 20px;
  position: relative;
}

.card-container .project-card .card-wrap {
  box-sizing: border-box;
  height: 100%;
  display: block;
  padding: 20px;
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  color: #34495e;
  transition: border-color 0.1s ease-in-out, box-shadow 0.1s ease-in-out;
}

.card-container .project-card .card-wrap:hover {
  border-color: rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.15);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05), 0 4px 12px rgba(0, 0, 0, 0.1);
}

.card-container .project-card .card-wrap .card-header {
  position: absolute;
  width: 100%;
  height: 20px;
  top: 0;
  left: 0;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
}

.card-container .project-card .card-wrap .card-title {
  margin-top: 10px;
  margin-bottom: 5px;
  font-size: 1em;
}

.card-container .project-card .card-wrap .card-footer {
  box-sizing: border-box;
  position: absolute;
  width: 100%;
  padding: 0 20px;
  bottom: 20px;
  left: 0;
}

.card-container .project-card .card-wrap .card-footer span:first-child {
  padding-right: 20px;
}

.card-container .project-card .card-wrap .card-footer span .fa {
  padding-right: 5px;
}
</style>