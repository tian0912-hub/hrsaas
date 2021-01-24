<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <!-- 头部标签 -->
        <div slot="header" class="clearfix">
          <span>组织架构</span>
        </div>
        <!-- 内容区域 -->
        <div class="content">
          <!-- 表头部分 -->
          <TreeTools :tree-list="company" :is-root="true" />
          <hr>
          <!-- 主体树形组织架构部分 -->
          <el-tree
            :data="departs"
            show-checkbox
            node-key="id"
            default-expand-all
            :expand-on-click-node="false"
            :props="defaultProps"
          >
            <TreeTools slot-scope="{ data }" :tree-list="data" @delDepts="getDepartmengsList" @addDepartment="addDepartment($event)" />
          </el-tree>

        </div>
      </el-card>
      <addDepartment :add-departdialog="addDepartdialog" />
    </div>
  </div>
</template>

<script>
import TreeTools from './components/tree-tool'
import addDepartment from './components/addDepartment'
import { getDepartmengsList } from '@/api/departments'
import { tranListToTreeData } from '@/utils/index'
export default {
  components: {
    TreeTools,
    addDepartment
  },
  data() {
    return {
      company: { },
      departs: [],
      defaultProps: {
        label: 'name' // 表示 从这个属性显示内容
      },
      // 添加组件中对话框的显示与隐藏
      addDepartdialog: false
    }
  },
  created() {
    this.getDepartmengsList()
  },
  methods: {
    async getDepartmengsList() {
      const results = await getDepartmengsList()
      this.company = { name: '江苏传智播客教育科技股份有限公司', manager: '' }
      this.departs = tranListToTreeData(results.depts, '')
      console.log(this.departs)
    },
    // 监听添加部门的点击事件
    addDepartment(id) {
      this.addDepartdialog = true
      console.log(id)
    }

  }
}
</script>

<style lang="scss" scoped>
.el-card {
  padding: 20px;
  // width: 500;
  // height: 100%;
  background-color: #fff;
}
.content {
  padding: 0 140px;
}
</style>
