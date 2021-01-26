<template>
  <el-dialog
    :title="title"
    :visible.sync="addRolesdialog"
    width="50%"
    :before-close="handleClose"
  >
    <!-- 表单区域 -->
    <el-form ref="addFormRef" :model="addForm" label-width="80px">
      <el-form-item label="角色名称">
        <el-input v-model="addForm.name" />
      </el-form-item>
      <el-form-item label="角色描述">
        <el-input v-model="addForm.description" />
      </el-form-item>
    </el-form>
    <!-- 底部 -->
    <span slot="footer" class="dialog-footer">
      <el-button @click="addRolesdialog = false">取 消</el-button>
      <el-button type="primary" @click="addRoles">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { addRoles, getRolesInfoById, editRolesInfoById } from '@/api/setting'
export default {
  props: {
    addRolesdialog: {
      requied: true,
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      addForm: {
        name: '',
        description: ''
      }
    }
  },
  computed: {
    title() {
      if (this.addForm.id) {
        return '编辑角色'
      }
      return '新增角色'
    }
  },
  methods: {
    async getRolesInfoById(id) {
      this.addForm = await getRolesInfoById(id)
    },

    // 监听对话框的关闭时间
    handleClose() {
      this.$refs.addFormRef.resetFields()
      this.$emit('update:addRolesdialog', false)
    },
    async addRoles() {
      if (this.addForm.id) {
        await editRolesInfoById(this.addForm)
      } else {
        await addRoles(this.addForm)
      }
      // 添加成功后要通知父组件，更新数据
      this.$emit('addRolesSuc')
      this.$emit('update:addRolesdialog', false)
    }
  }
}
</script>
