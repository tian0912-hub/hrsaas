<template>
  <div class="dashboard-container">
    <div class="app-container">
      <page-tools :show-before="false">
        <template slot="after">
          <el-button size="small" type="primary" @click="uploadExcel">导入</el-button>
          <el-button size="small" type="warning" @click="exportExcel">导出</el-button>
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
          <el-table-column label="头像" align="center">
            <template slot-scope="{row}">
              <img
                v-imagerror="require('@/assets/common/bigUserHeader.png')"
                :src="row.staffPhoto"
                style="border-radius: 50%; width: 100px; height: 100px; padding: 10px"
                alt=""
                @click="showQrCode(row.staffPhoto)"
              >
            </template>
          </el-table-column>
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
              <el-button type="text" size="small" :disabled="!checkPermission('POINT-USER-UPDATE')" @click="$router.push(`/employees/detail/${scope.row.id}`)">查看</el-button>
              <el-button type="text" size="small">转正</el-button>
              <el-button type="text" size="small">调岗</el-button>
              <el-button type="text" size="small">离职</el-button>
              <el-button type="text" size="small" @click="assignRoles(scope.row.id)">角色</el-button>
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
      <addDialog :add-dialog-visible.sync="addDialogVisible" @addEmployeeInfoSuccess="getEmployeeList" />
      <!-- 显示二维码的对话框 -->
      <el-dialog title="二维码" :visible.sync="showCodeDialog" @opened="showQrCode" @close="imgUrl=''">
        <el-row type="flex" justify="center">
          <canvas ref="myCanvas" />
        </el-row>
      </el-dialog>
      <!-- 分配角色对话框 -->
      <assign-roles ref="assignRolesRef" :show-role-dialog.sync="showRoleDialog" :user-id="userId" />
    </div>
  </div>
</template>

<script>
import { getEmployeeList, delEmployeeById } from '@/api/employee'
import EmployeeEnum from '@/api/constant/employees'
import addDialog from './components/addDialog'
import QrCode from 'qrcode'
import assignRoles from './components/assign-role'
export default {
  components: {
    addDialog,
    assignRoles
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
      addDialogVisible: false,
      // 二维码显示与隐藏
      showCodeDialog: false,
      // 分配角色对话框的显示与隐藏
      showRoleDialog: false,
      userId: null
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
    },
    // 监听导入员工按钮点击事件
    uploadExcel() {
      this.$router.push('/import')
    },
    exportExcel() {
      const headers = {
        '手机号': 'mobile',
        '姓名': 'username',
        '入职日期': 'timeOfEntry',
        '聘用形式': 'formOfEmployment',
        '转正日期': 'correctionTime',
        '工号': 'workNumber',
        '部门': 'departmentName'
      }

      import('@/vendor/Export2Excel').then(async excel => {
        // 导出Excel对象
        // 获取所有员工列表数据，转成数组结构
        const { rows } = await getEmployeeList({ page: 1, size: this.total })
        const data = this.formateJson(headers, rows)
        const multiHeader = [['姓名', '主要信息', '', '', '', '', '部门']]
        const merges = ['A1:A2', 'B1:F1', 'G1:G2']
        excel.export_json_to_excel({
          header: Object.keys(headers),
          data,
          filename: '员工列表',
          autoWidth: true,
          // bookType: 'xlsx'// 默认值，不写
          multiHeader,
          merges
        })
      })
    },
    formateJson(headers, rows) {
      return rows.map(item => {
        return Object.keys(headers).map(key => {
          return item[headers[key]]
        })
      })
    },
    // 头像的点击事件
    showQrCode(url) {
      // 有地址的时候才显示弹窗
      if (url) {
        this.showCodeDialog = true
        this.$nextTick(() => {
          // 只有DOM加载完毕之后才能够获取到
          QrCode.toCanvas(this.$refs.myCanvas, url)
        })
      }
    },
    // 分配角色
    assignRoles(id) {
      this.userId = id
      this.$refs.assignRolesRef.getUserDetailById(id)
      this.showRoleDialog = true
    }
  }

}
</script>

<style>

</style>

