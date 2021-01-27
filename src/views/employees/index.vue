<template>
  <div class="dashboard-container">
    <div class="app-container">
      <page-tools :show-before="false">
        <template slot="after">
          <el-button size="small" type="primary">导入</el-button>
          <el-button size="small" type="primary" icon="el-icon-plus" @click="addEmployeeInfo">新增员工</el-button>
        </template>
      </page-tools>
      <!-- 表格区域 -->
      <el-card>
        <el-table
          :data="employeeList"
          style="width: 100%"
          border
        >
          <el-table-column type="index" label="序号" width="50" />
          <el-table-column prop="username" label="姓名" sortable />
          <el-table-column prop="mobile" label="手机号" sortable />
          <el-table-column prop="workNumber" label="工号" sortable />
          <el-table-column prop="formOfEmployment" label="聘用形式" sortable>
            <template slot-scope="scope">
              <el-tag v-if="scope.row.formOfEmployment === '1'" type="success">正式</el-tag>
              <el-tag v-if="scope.row.formOfEmployment !== '1'" type="warning">非正式</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="departmentName" label="部门" sortable />
          <el-table-column prop="enableState" label="账户状态" sortable :formatter="formateEnableState" />
          <el-table-column prop="date" label="操作" width="250" align="center">
            <template slot-scope="scope">
              <el-button type="text" size="small">查看</el-button>
              <el-button type="text" size="small">转正</el-button>
              <el-button type="text" size="small">调岗</el-button>
              <el-button type="text" size="small">离职</el-button>
              <el-button type="text" size="small">角色</el-button>
              <el-button type="text" size="small" @click="delEmployee(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>

        </el-table>
        <!-- 分页区域、 -->
        <el-row type="flex" justify="end">
          <el-pagination
            :current-page.sync="employeeQuery.page"
            layout="total, prev, pager, next"
            :total="total"
            @current-change="handleCurrentChange"
          />
        </el-row>

      </el-card>
      <addDialog :add-dialog-visible="addDialogVisible" @addEmployeeInfoSuccess="getEmployeeList" />
    </div>
  </div>
</template>

<script>
import { getEmployeeList, delEmployeeById } from '@/api/employee'
import EmployeeEnum from '@/api/constant/employees'
import addDialog from './components/addDialog'
export default {
  components: {
    addDialog
  },
  data() {
    return {
      employeeList: [],
      // 获取员工列表请求参数
      employeeQuery: {
        page: 1,
        size: 10
      },
      // 员工总数
      total: 0,
      // 新郑对话框的显示与隐藏
      addDialogVisible: false
    }
  },
  created() {
    this.getEmployeeList()
  },
  methods: {
    // 获取员工列表
    async getEmployeeList() {
      const { rows, total } = await getEmployeeList(this.employeeQuery)
      this.total = total
      this.employeeList = rows
    },
    // 监听分页变化
    handleCurrentChange(newpage) {
      this.employeeQuery.page = newpage
      this.getEmployeeList()
    },
    // 格式化账户状态
    formateEnableState(row, column, cellValue, index) {
      const obj = EmployeeEnum.enableState.find(item => item.id === cellValue)
      return obj ? obj.value : '未知'
    },
    // 监听删除员工事件
    async delEmployee(id) {
      const confirmResult = await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      if (confirmResult === 'confirm') {
        delEmployeeById(id)
        this.getEmployeeList()
      }
    },
    // 监听新增员工点击事件
    addEmployeeInfo() {
      this.addDialogVisible = true
    }

  }

}
</script>

<style>

</style>

