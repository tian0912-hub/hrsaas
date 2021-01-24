<template>
  <el-dialog
    title="编辑部门"
    :visible.sync="addDepartdialog"
    width="50%"
    :before-close="handleClose"
  >
    <el-form ref="addDepartFrom" :model="addDepartFrom" label-width="80px" :rules="addDepartRules">
      <el-form-item label="部门名称" prop="name">
        <el-input v-model="addDepartFrom.name" />
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input v-model="addDepartFrom.code" />
      </el-form-item>
      <el-form-item label="部门负责人" prop="menager">
        <el-select v-model="addDepartFrom.menager" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input v-model="addDepartFrom.introduce" />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  props: {
    addDepartdialog: {
      required: true,
      type: Boolean
    },
    options: {
      required: false,
      type: Boolean
    }
  },
  data() {
    return {
      addDepartFrom: {
        name: '',
        code: '',
        manager: '',
        introduce: '',
        pid: ''
      },
      addDepartRules: {
        name: [{
          trigger: 'blur', required: true, message: '请输入部门名称'
        }],
        code: [{
          trigger: 'blur', required: true, message: '请输入部门编码'
        }],
        introduce: [{
          trigger: 'blur', required: true, message: '请输入部门介绍'
        }]
      }
    }
  },
  methods: {
    handleClose() {

    }
  }
}
</script>
