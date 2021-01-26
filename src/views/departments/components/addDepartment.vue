<template>
  <el-dialog
    :title="title"
    :visible.sync="addDepartdialog"
    width="50%"
    :before-close="handleClose"
  >
    <el-form ref="addDepartFrom" :model="addDepartFrom" label-width="100px" :rules="addDepartRules">
      <el-form-item label="部门名称" prop="name">
        <el-input v-model="addDepartFrom.name" />
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input v-model="addDepartFrom.code" />
      </el-form-item>
      <el-form-item label="部门负责人" prop="menager">
        <el-select v-model="addDepartFrom.manager" placeholder="请选择" @focus="getEmployeeSimple">
          <el-option
            v-for="item in options"
            :key="item.id"
            :value="item.username"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input v-model="addDepartFrom.introduce" />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="addDepart">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { getEmployeeSimple, getDepartmengsList, addDepartment, getParInfo, editParInfo } from '@/api/departments'
export default {

  props: {
    addDepartdialog: {
      required: true,
      type: Boolean
    },
    treeList: {
      type: Object,
      default: null
    },
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    // 添加部门的自定义验证规则
    const checkNameRepeat = async(rule, value, callback) => {
      // 先获取当前最新的组织架构
      const { depts } = await getDepartmengsList()
      const arr = depts.filter(item => item.pid === this.treeList.id).filter(item => item.name === value)

      // console.log(depts)
      if (this.isEdit) {
        // true表示是编辑模式
        arr.length > 1 ? callback(new Error(`你输入的部门名称:"${value}"已被占用`)) : callback()
      } else {
        arr.length ? callback(new Error(`你输入的部门名称:"${value}"已被占用`)) : callback()
      }
    }
    const checkCodeRepeat = async(rule, value, callback) => {
      // 先获取当前最新的组织架构
      const { depts } = await getDepartmengsList()
      // console.log(depts)
      const arr = depts.filter(item => item.code === value)
      if (this.isEdit) {
        // true表示是编辑模式
        arr.length > 1 ? callback(new Error(`你输入的部门编码:"${value}"已被占用`)) : callback()
      } else {
        arr.length ? callback(new Error(`你输入的部门编码:"${value}"已被占用`)) : callback()
      }
    }
    // 编辑部门的自定义验证规则
    return {
      addDepartFrom: {
        name: '',
        code: '',
        manager: '',
        introduce: '',
        pid: ''
      },
      options: [],
      addDepartRules: {
        name: [{
          trigger: 'blur', required: true, message: '请输入部门名称'
        }, {
          trigger: 'blur', min: '1', max: '50', message: '部门名称的长度应在1-50个字符之间'
        }, {
          trigger: 'blur',
          validator: checkNameRepeat // 自定义函数的形式校验
        }
        ],
        code: [{
          trigger: 'blur', required: true, message: '请输入部门编码'
        }, {
          trigger: 'blur', min: '1', max: '50', message: '部门名称的长度应在1-50个字符之间'
        }, {
          trigger: 'blur',
          validator: checkCodeRepeat // 自定义函数的形式校验
        }],
        manager: [{
          trigger: 'blur', required: true, message: '请输入部门编码'
        }],
        introduce: [{
          trigger: 'blur', required: true, message: '请输入部门介绍'
        }, {
          trigger: 'blur', min: '1', max: '300', message: '部门名称的长度应在1-300个字符之间'
        }]
      }
    }
  },
  computed: {
    title() {
      return this.isEdit ? '编辑部门' : '新增部门'
    }
  },
  methods: {
    // 监听对话框的关闭操作
    handleClose() {
      this.$refs.addDepartFrom.resetFields()
      this.$emit('update:addDepartdialog', false)
    },
    async getEmployeeSimple() {
      const result = await getEmployeeSimple()
      // console.log(result)
      this.options = result
    },
    addDepart() {
      this.$refs.addDepartFrom.validate(async valid => {
        if (valid) {
          // console.log(this.isEdit)
          // 通过校验，可以提交了
          if (this.isEdit) {
            console.log(this.addDepartFrom)
            await editParInfo(this.addDepartFrom)
          } else {
            this.addDepartFrom.pid = this.treeList.id
            await addDepartment(this.addDepartFrom)
          }
          this.$emit('update:addDepartdialog', false)
          // 新增成功后要告诉父组件，更新数据
          this.$emit('addDepSuccess')
        }
      })
    },

    async getParInfo(id) {
      // console.log(1)
      this.addDepartFrom = await getParInfo(id)
      // console.log(this.addDepartFrom)
    }
  }
}
</script>
