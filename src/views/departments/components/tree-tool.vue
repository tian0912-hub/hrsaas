<template>
  <el-row type="flex" justify="space-between" align="middle" style="height: 40px; width: 100%">
    <el-col>
      {{ treeList.name }}
    </el-col>
    <el-col :span="4">
      <el-row type="flex" justify="end">
        <el-col>{{ treeList.manager }}</el-col>
        <el-col>
          <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
              操作<i class="el-icon-arrow-down el-icon--right" />
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="add">添加子部门</el-dropdown-item>
              <el-dropdown-item v-if="!isRoot" command="edit">编辑部门</el-dropdown-item>
              <el-dropdown-item v-if="!isRoot" command="del">删除部门</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>
<script>
import { deleteNode } from '@/api/departments'
export default {
  props: {
    treeList: {
      type: Object,
      required: true
    },
    isRoot: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleCommand(command) {
      if (command === 'add') {
        // 添加功能直接做到主页面上
        this.$emit('addDepartment', this.treeList)
        // 执行添加操作
      } else if (command === 'del') {
        // 执行删除操作
        // 弹起询问窗口
        this.$confirm('你确定要删除部门吗？').then(() => {
          return deleteNode(this.treeList.id)
        }).then(() => {
          // 通知父组件，已经删除，需要更新数据
          // 通过自定义事件通知父组件
          this.$emit('delDepts')
          this.$message.success('删除部门成功')
        })
      } else {
        // 执行编辑操作
        this.$emit('editDepartment', this.treeList)
      }
    }
  }
}
</script>
