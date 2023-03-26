<template>
  <div>
    <el-row type="flex" justify="bettwen">
      <el-col :span="15">
        <!-- 表单 -->
        <el-form :model="tempForm" ref="tempForms">
          <el-form-item label="请选择人员">
            <!-- 多选人员 -->
            <el-checkbox-group v-model="tempForm.checkboxGroup5" size="small">
              <el-checkbox border v-for="(item,index) in checkBox" @change="perChange(item)"
                           :label="item.id" :key="index">{{item.name}}
              </el-checkbox>
            </el-checkbox-group>
            <!-- 多选人员 end-->
          </el-form-item>
        </el-form>
        <!-- 表单 end-->
        <!-- tag展示区 -->
        <el-row>
          <el-tag class="tagClass" v-for="(tag,index) in tags" :key="index" closable
                  @close="handleClose(tag)" :type="tag.id">
            {{tag.name}}
          </el-tag>
          <el-button v-if="tags.length>0" @click="clearAll" plain>全部删除</el-button>
        </el-row>
        <!-- tag展示区 end-->
      </el-col>

    </el-row>
  </div>
</template>
<script>
  export default {
    name: 'kk',
    mounted() {
    },
    data() {
      return {
        msg: 'Welcome to Your Vue.js App',
        tags: [],
        tempForm: {
          checkboxGroup5: [], //选择的人员
        },
        detailData: [],
        checkBox: [{
          name: '小红',
          id: '101'
        },
          {
            name: '小黄',
            id: '100'

          }, {
            name: '小明',
            id: '102'

          }, {
            name: '小明',
            id: '102'

          }
        ],

      }
    },
    methods: {
      clearAll() { //全部清空数据
        this.tags = []
        this.tempForm.checkboxGroup5 = []
      },
      perChange(item) {
        this.detailData.push(item)
      },
      handleClose(tag) { //标签的删除事件
        // 去掉当前删除的tag
        let yourChoseTags = this.tempForm.checkboxGroup5

        this.tempForm.checkboxGroup5 = yourChoseTags.filter(item => {
          if (tag.id !== item) {
            return true
          }
        })

      },
      delRepeat(arr) { //数组对象去重
        return Object.values(
          arr.reduce((obj, next) => {
            var key = JSON.stringify(next);
            return (obj[key] = next), obj;
          }, {}),
        );
      },
      moreArr() {
        let yourChose = this.tempForm.checkboxGroup5
        let tempTags = []

        tempTags = this.baseDataDetail(yourChose, this.checkBox, tempTags)
        this.detailData = tempTags
      },
      baseDataDetail(yourChose, baseData, callBack) { //封装的数组方法
        let temp = callBack
        // 循环两个数据拿到选择的checkbox的id对应的初始数据
        yourChose.forEach(item => {
          baseData.forEach(itemSecond => {
            if (item === itemSecond.id) {
              temp.push(itemSecond)
            }
          })
        })
        return temp
      },

    },
    watch: {
      detailData() {
        let tempArr = Object.assign([], this.detailData)
        tempArr = this.delRepeat(tempArr)
        // console.log(tempArr)
        this.tags = tempArr
      },
      "tempForm.checkboxGroup5"() {
        this.moreArr()
      },
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .tempArea {
    /*width: 100%;*/
  }

  .tagClass {
    margin-right: 10px;
  }

</style>
