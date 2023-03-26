<template>
  <div id="meslist-container">
    <div class="comment-list-title">最新评论 (<span>{{mesList.total}}</span>)</div>
    <label v-for="(mes,index) in mesList.list" :key="index">
      <div class="comment-list">
        <div class="comment-item">
          <div class="comment-item__avatar">
            <el-avatar style="width: 50px; height: 50px" :src="mes.userPhoto" fit="fill"
                      :alt="mes.userName" :title="mes.userName"
            ></el-avatar>
          </div>
          <div class="comment-item__main">
            <div class="comment-item__header">
              #{{mesList.total-index}}楼-{{mes.userName}}
            </div>
            <div v-if="mes.parentId!==null">
              @{{mes.parentUserName}}
            </div>
            <div class="comment-item__content">
              {{mes.content}}
            </div>
            <div class="comment-item__actions">
              <div class="item-list">
                <div class="item">{{dateFormat(mes.createTime)}}</div>
              </div>
              <div class="item-list">
                <!--<div class="item">-->
                <!--<span>赞</span>-->
                <!--</div>-->
                <div class="item">
                  <span>
                  <el-link :underline="false" @click="showResMesAdd(index)">回复</el-link></span>
                </div>
                <!--<div class="item">-->
                <!--<span>举报</span>-->
                <!--</div>-->
              </div>
            </div>
          </div>
        </div>
      </div>
      <res-mes-add v-show="index === showIndex" :parent-id="mes.id"
                   @refresh="getMesList()"></res-mes-add>
    </label>
  </div>
</template>

<script>
  import Service from '../../../../config/service'
  import DateUtil from '../../../../utils/dateUtil'
  import ResMesAdd from './MesBoardAdd'

  export default {
    name: "MesBoardList",
    components: {
      "resMesAdd": ResMesAdd,
    },
    data() {
      return {
        mesList: {
          list: null,
          total: 0
        },
        showIndex: -1
      }
    },
    methods: {
      getMesList() {
        this.$axios.get(Service.systemUrl.messageList).then((res) => {
          if (res.status === 200) {
            this.mesList.list = res.data.data.list;
            this.mesList.total = res.data.data.total;
          } else {
            this.$message.error("系统内部错误");
          }
        }).catch(function (error) {
          console.error(error);
        });
      },
      //时间格式化
      dateFormat(timeStamp) {
        return DateUtil.dateFormat(timeStamp);
      },
      showResMesAdd(index) {
        this.showIndex = index
      }
    },
    mounted() {
      //读取评论
      this.getMesList();
    }
  }
</script>

<style scoped>
  .comment-list-title {
    color: #4a4a4a;
    font-size: 18px;
    line-height: 24px;
    font-weight: 600;
    padding: 16px 0;
  }

  .comment-list {
    position: relative;
    display: block;
  }

  .comment-item {
    margin-top: 0;
    position: relative;
    box-sizing: inherit;
    display: flex;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    flex-direction: row;
  }

  .comment-item__avatar {
    flex-shrink: 0;
    margin-right: 8px;
    box-sizing: inherit;
  }

  .comment-item__main {
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    min-width: 0;
    padding-bottom: 16px;
    border-bottom: 1px solid #ecedee;
  }

  .comment-item__content {
    margin-top: 6px;
    display: block;
    overflow: hidden;
    font-size: 14px;
    line-height: 20px;
    color: #4a4a4a;
  }

  .comment-item__actions {
    margin-top: 10px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    -ms-flex-direction: row;
    flex-direction: row;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
  }

  .item-list {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    -ms-flex-direction: row;
    flex-direction: row;
  }

  .item {
    margin-right: 0;
    color: #999;
    font-size: 13px;
    line-height: 14px;
    margin-right: 16px;
  }
</style>
