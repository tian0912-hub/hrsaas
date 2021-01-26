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
                      <el-button size="small" type="success">分配权限</el-button>
                      <el-button size="small" type="primary" @click="editRoles(scope.row.id)">编辑</el-button>
                      <el-button size="small" type="danger">删除</el-button>
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
          <el-tab-pane label="公司信息" name="company">公司信息</el-tab-pane>
        </el-tabs>
      </el-card>
      <addRolesDialog ref="addRolesRef" :add-rolesdialog.sync="addRolesdialog" @addRolesSuc="addRolesSuc" />
    </div>
  </div>
</template>

<script>
import { getRolesList } from '@/api/setting'
// 引入新增和修改对话框组件
import addRolesDialog from './components/add-roles'
export default {
  components: {
    addRolesDialog
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
      addRolesdialog: false
    }
  },
  created() {
    this.getRolesList(this.getRolesQuery)
  },
  methods: {
    // 获取所有角色列表
    async getRolesList(params) {
      const { total, rows } = await getRolesList(params)
      this.total = total
      this.tableData = rows
    },

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
      console.log(this.addRolesDialog)
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
    }

  }

}
</script>

<style>

</style>

