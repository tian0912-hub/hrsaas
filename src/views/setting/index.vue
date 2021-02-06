<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="角色管理" name="roles">
            <el-row>
              <el-col>
                <el-button type="primary" icon="el-icon-plus" size="small" @click="addRoles">新增角色</el-button>
              </el-col>
            </el-row>
            <!-- 数据表格区域 -->
            <el-table :data="tableData" style="width: 100%">
              <el-table-column type="index" label="序号" width="180" />
              <el-table-column prop="name" label="角色名" width="180" />
              <el-table-column prop="description" label="描述" />
              <el-table-column label="操作" width="250">
                <template slot-scope="scope">
                  <el-row>
                    <el-col>
                      <!-- <div>{{ scope }}</div> -->
                      <el-button size="small" type="success" @click="assignRoles(scope.row.id)">分配权限</el-button>
                      <el-button size="small" type="primary" @click="editRoles(scope.row.id)">编辑</el-button>
                      <el-button size="small" type="danger" @click="delRolesById(scope.row.id)">删除</el-button>
                    </el-col>
                  </el-row>
                </template>
              </el-table-column>
            </el-table>
            <!-- 分页区域 -->
            <el-pagination
              :current-page.sync="getRolesQuery.page"
              layout="total, prev, pager, next"
              :total="total"
              @current-change="handleCurrentChange"
            />
          </el-tab-pane>
          <el-tab-pane label="公司信息" name="company">
            <el-form ref="form" :model="companyForm" label-width="80px" style="width:600px;margin: 10px auto">
              <el-form-item label="企业名称">
                <el-input v-model="companyForm.name" disabled style="width: 400px" />
              </el-form-item>
              <el-form-item label="公司地址">
                <el-input v-model="companyForm.companyAddress" disabled style="width: 400px" />
              </el-form-item>
              <el-form-item label="公司电话">
                <el-input v-model="companyForm.companyPhone" disabled style="width: 400px" />
              </el-form-item>
              <el-form-item label="邮箱">
                <el-input v-model="companyForm.mailbox" disabled style="width: 400px" />
              </el-form-item>
              <el-form-item label="备注">
                <el-input v-model="companyForm.remarks" disabled style="width: 400px" />
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </el-card>
      <addRolesDialog ref="addRolesRef" :add-rolesdialog.sync="addRolesdialog" @addRolesSuc="addRolesSuc" />
      <assign-roles ref="assignRolesRef" :assign-show-perm-dialog.sync="assignShowPermDialog" @btnOK="addRolesSuc" />
    </div>
  </div>
</template>

<script>
import { getRolesList, delRolesById, getCompanyInfoById } from '@/api/setting'
// 引入新增和修改对话框组件
import addRolesDialog from './components/add-roles'
// 引入分配角色对话框组件
import assignRoles from './components/assign-roles'
export default {
  components: {
    addRolesDialog,
    assignRoles
  },
  data() {
    return {
      activeName: 'roles',
      tableData: [{
        name: '',
        description: ''
      }],
      // 获取角色列表查询参数
      getRolesQuery: {
        page: 1,
        pagesize: 10
      },
      // 角色列表总条数
      total: 0,
      // 新增与编辑对话框的显示与隐藏
      addRolesdialog: false,
      // 公司信息部分数据
      companyForm: {},
      // 分配权限对话框显示与隐藏
      assignShowPermDialog: false
    }
  },
  created() {
    this.getRolesList(this.getRolesQuery)
    this.getCompanyInfoById(this.$store.state.user.userInfo.companyId)
  },
  methods: {
    // 获取公司信息
    async getCompanyInfoById(id) {
      this.companyForm = await getCompanyInfoById(id)
    },
    // 获取所有角色列表
    async getRolesList(params) {
      const { total, rows } = await getRolesList(params)
      this.total = total
      this.tableData = rows
    },
    // 监听tabs的触发事件
    handleClick() {

    },
    // 监听页码值得变化
    handleCurrentChange(newpage) {
      this.getRolesQuery.page = newpage
      this.getRolesList(this.getRolesQuery)
    },
    // 新增角色事件
    addRoles() {
      // console.log(1)
      this.addRolesdialog = true
      // console.log(this.addRolesDialog)
    },
    // 子组件添加操作成功，刷新数据
    addRolesSuc() {
      this.getRolesList(this.getRolesQuery)
    },
    // 删除角色
    editRoles(id) {
      // console.log(id)
      this.addRolesdialog = true

      this.$refs.addRolesRef.getRolesInfoById(id)
    },
    // 监听删除角色的点击事件
    async delRolesById(id) {
      const confirmResult = await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      if (confirmResult === 'confirm') {
        await delRolesById(id)
        this.getRolesList(this.getRolesQuery)
        this.$message.success('删除角色成功')
      } else {
        this.$message.info('取消删除角色信息')
      }
    },
    async assignRoles(id) {
      await this.$refs.assignRolesRef.assignRoles(id)
      this.assignShowPermDialog = true
    }

  }

}
</script>

<style>

</style>

