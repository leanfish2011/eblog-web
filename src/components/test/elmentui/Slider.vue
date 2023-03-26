<template>
  <div>
    <div class="block">
      <span class="demonstration">带快捷选项</span>
      <el-button type="primary" @click="onSearch">查询</el-button>
      <el-date-picker
        v-model="value2"
        type="daterange"
        align="right"
        unlink-panels
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        value-format="yyyy-MM-dd HH:mm:ss"
        :picker-options="pickerOptions">
      </el-date-picker>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        value2: '',
        searchForm: {
          name: '',
          createTimeStart: '',
          createTimeEnd: ''
        },
      };
    },
    methods: {
      onSearch() {
        console.log('submit!');
        console.log(this.value2[0], this.value2[1]);
        this.searchForm.createTimeStart = this.value2[0];
        this.searchForm.createTimeEnd = this.value2[1];
        console.log(this.searchForm);
      }
    }
  };
</script>
