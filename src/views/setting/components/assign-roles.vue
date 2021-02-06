<template>
  <el-dialog title="分配权限" :visible="assignShowPermDialog" @close="btnPermCancel">
    <!-- 权限是一颗树 -->
    <!-- 将数据绑定到组件上 -->
    <!-- check-strictly 如果为true 那表示父子勾选时  不互相关联 如果为false就互相关联 -->
    <!-- id作为唯一标识 -->
    <el-tree
      ref="permTree"
      :data="permData"
      :props="defaultProps"
      :show-checkbox="true"
      :check-strictly="true"
      :default-expand-all="true"
      :default-checked-keys="selectCheck"
      node-key="id"
    />
    <!-- 确定 取消 -->
    <el-row slot="footer" type="flex" justify="center">
      <el-col :span="6">
        <el-button type="primary" size="small" @click="btnPermOK">确定</el-button>
        <el-button size="small" @click="btnPermCancel">取消</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>
<script>
import { tranListToTreeData } from '@/utils'
import { getPermissionList } from '@/api/permission'
import { getRolesInfoById, assignPerm } from '@/api/setting'
export default {
  props: {
    assignShowPermDialog: {
      type: Boolean,
      requied: true,
      default: false
    }
  },
  data() {
    return {
      permData: [],
      defaultProps: {
        label: 'name'
      },
      userId: null,
      selectCheck: [] // 定义一个数组来接收 已经选中的节点
    }
  },
  methods: {
    async assignRoles(id) {
      this.permData = tranListToTreeData(await getPermissionList(), '0')
      this.userId = id
      // 根据ID获取角色已有的权限
      const { permIds } = await getRolesInfoById(id)
      this.selectCheck = permIds
    },
    btnPermCancel() {
      this.selectCheck = []
      this.$emit('update:assignShowPermDialog', false)
    },
    async btnPermOK() {
      await assignPerm({ id: this.userId, permIds: this.$refs.permTree.getCheckedKeys() })
      this.$message.success('分配权限成功')
      this.$emit('btnOK')
      this.$emit('update:assignShowPermDialog', false)
    }
  }
}
</script>
