<template>
  <div>
    <el-row type="flex" justify="end">
      <!-- 年 -->
      <el-select v-model="currentYear" size="small" style="width:120px;margin-right:15px" @change="changeDate">
        <el-option v-for="item in yearList" :key="item" :label="item" :value="item" />
      </el-select>
      <!-- 月 -->
      <el-select v-model="currentMonth" size="small" style="width:120px" @change="changeDate">
        <el-option v-for="item in 12" :key="item" :label="item" :value="item" />
      </el-select>

    </el-row>
    <!-- 日历 -->
    <el-calendar v-model="startDate">
      <template
        slot="dateCell"
        slot-scope="{date, data}"
        class="content"
      >
        <div class="date-content">
          <span class="text"> {{ data.day | getDay }}</span>
          <span v-if="isWeek(date)" class="rest">休</span>
        </div>
      </template>
    </el-calendar>
  </div>
</template>
<script>
export default {
  filters: {
    getDay(value) {
      const day = value.split('-')[2]
      return day.startsWith('0') ? day.substr(1) : day
    }
  },
  props: {
    startDate: {
      type: Date,
      default: () => new Date()
    }
  },
  data() {
    return {
      currentYear: null, // 当前年
      currentMonth: null, // 当前月份
      currentDate: null,
      yearList: []
    }
  },
  created() {
    this.currentYear = this.startDate.getFullYear()
    this.currentMonth = this.startDate.getMonth() + 1
    this.yearList = Array.from(Array(11), (v, i) => {
      return this.currentYear + i - 5
    })
    this.changeDate()
  },
  methods: {
    // 是否是休息日
    isWeek(value) {
      return value.getDay() === 6 || value.getDay() === 0
    },
    changeDate() {
      const startDate = new Date(`${this.currentYear}-${this.currentMonth}-1`)
      this.$emit('update:startDate', startDate)
    }
  }
}
</script>
<style  scoped>
 ::v-deep .el-calendar-day {
  height:  auto;
 }
 ::v-deep .el-calendar-table__row td,::v-deep .el-calendar-table tr td:first-child,  ::v-deep .el-calendar-table__row td.prev{
  border:none;
 }
.date-content {
  height: 40px;
  text-align: center;
  line-height: 40px;
  font-size: 14px;
}
.date-content .rest {
  color: #fff;
  border-radius: 50%;
  background: rgb(250, 124, 77);
  width: 20px;
  height: 20px;
  line-height: 20px;
  display: inline-block;
  font-size: 12px;
  margin-left: 10px;
}
.date-content .text{
  width: 20px;
  height: 20px;
  line-height: 20px;
 display: inline-block;

}
  ::v-deep .el-calendar-table td.is-selected .text{
   background: #409eff;
   color: #fff;
   border-radius: 50%;
 }
  ::v-deep .el-calendar__header {
   display: none
 }
</style>
