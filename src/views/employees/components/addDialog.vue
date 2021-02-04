<template>
  <el-dialog
    title="提示"
    :visible.sync="addDialogVisible"
    width="50%"
    :before-close="handleClose"
  >
    <el-form ref="addEmployeeRef" :model="addEmployeeForm" :rules="addEmployeeRules" label-width="80px">
      <el-form-item label="姓名" prop="username">
        <el-input v-model="addEmployeeForm.username" />
      </el-form-item>
      <el-form-item label="手机号" prop="mobile">
        <el-input v-model="addEmployeeForm.mobile" />
      </el-form-item>
      <el-form-item label="入职时间" prop="timeOfEntry">
        <el-date-picker
          v-model="addEmployeeForm.timeOfEntry"
          type="date"
          placeholder="选择日期"
        />
      </el-form-item>
      <el-form-item label="聘用形式" prop="formOfEmployment">
        <el-input v-model="addEmployeeForm.formOfEmployment" />
      </el-form-item>
      <el-form-item label="工号" prop="workNumber">
        <el-input v-model="addEmployeeForm.workNumber" />
      </el-form-item>
      <el-form-item label="部门" prop="departmentName">
        <el-input v-model="addEmployeeForm.departmentName" />
      </el-form-item>
      <el-form-item label="转正时间" prop="correctionTime">
        <el-date-picker
          v-model="addEmployeeForm.correctionTime"
          type="date"
          placeholder="选择日期"
        />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="addEmployeeInfo">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { addEmployeeInfo } from '@/api/employee'
export default {
  props: {
    addDialogVisible: {
      default: false,
      type: Boolean
    }
  },
  data() {
    return {
      // 新增表单数据
      addEmployeeForm: {
        username: '',
        mobile: '',
        formOfEmployment: '',
        workNumber: '',
        departmentName: '',
        timeOfEntry: '',
        correctionTime: ''
      },
      // 新增表单校验规则
      addEmployeeRules: {
        username: [
          {
            required: true, message: '用户姓名不能为空', trigger: 'blur'
          },
          {
            min: 1, max: 4, message: '用户姓名为1-4位'
          }],
        mobile: [
          { required: true, message: '手机号不能为空', trigger: 'blur' },
          {
            pattern: /^1[3-9]\d{9}$/, message: '手机号格式不正确', trigger: 'blur'
          }],
        formOfEmployment: [{ required: true, message: '聘用形式不能为空', trigger: 'blur' }],
        workNumber: [{ required: true, message: '工号不能为空', trigger: 'blur' }],
        departmentName: [{ required: true, message: '部门不能为空', trigger: 'change' }],
        timeOfEntry: [{ required: true, message: '入职时间', trigger: 'blur' }]
      }

    }
  },

  methods: {
    // 监听对话框的关闭事件
    handleClose() {
      this.addEmployeeForm = {
        username: '',
        mobile: '',
        formOfEmployment: '',
        workNumber: '',
        departmentName: '',
        timeOfEntry: '',
        correctionTime: ''
      }
      this.$refs.addEmployeeRef.resetFields()
      this.$emit('update:addDialogVisible', false)
    },
    // 监听确定按钮的点击事件
    addEmployeeInfo() {
      this.$refs.addEmployeeRef.validate(async valid => {
      // console.log(this.addEmployeeForm)
      // console.log(valid)
        if (valid) {
          await addEmployeeInfo(this.addEmployeeForm)
          this.addEmployeeForm = {
            username: '',
            mobile: '',
            formOfEmployment: '',
            workNumber: '',
            departmentName: '',
            timeOfEntry: '',
            correctionTime: ''
          }
          this.$emit('update:addDialogVisible', false)
          this.$message.success('新增员工成功')
          this.$emit('addEmployeeInfoSuccess')
        }
      })
    }

  }

}
</script>
