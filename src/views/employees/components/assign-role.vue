<template>
  <el-dialog title="分配角色" :visible="showRoleDialog" :before-close="resetEdit">
    <!-- el-checkbox-group选中的是 当前用户所拥有的角色  需要绑定 当前用户拥有的角色-->
    <!-- 分配角色 -->
    <el-checkbox-group v-model="roleIds">
      <el-checkbox v-for="item in list" :key="item.id" :label="item.id">
        {{
          item.name
        }}
      </el-checkbox>
    </el-checkbox-group>
    <el-row slot="footer" type="flex" justify="center">
      <el-col :span="6">
        <el-button type="primary" size="small" @click="addRoles">确定</el-button>
        <el-button size="small" @click="resetEdit">取消</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import { getRoleList, assignRoles } from '@/api/employee'
import { getUserDetailById } from '@/api/user'
export default {
  props: {
    showRoleDialog: {
      type: Boolean,
      default: false
    },
    // 用户的id 用来查询当前用户的角色信息
    userId: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      roleIds: [],
      list: []
    }
  },
  created() {
    this.getRoleList()
  },
  methods: {
    async getRoleList() {
      const { rows } = await getRoleList()
      this.list = rows
    },
    // 根据ID获取用户角色列表
    async getUserDetailById(id) {
      const { roleIds } = await getUserDetailById(id)
      this.roleIds = roleIds
    },
    resetEdit() {
      this.$emit('update:showRoleDialog', false)
      this.roleIds = []
    },
    async addRoles() {
      await assignRoles({ id: this.userId, roleIds: this.roleIds })
      this.$message.success('为用户添加角色成功')
      this.roleIds = []
      this.$emit('update:showRoleDialog', false)
    }
  }
}
</script>

