<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs>
          <el-tab-pane label="登录账户与密码">
            <el-form v-model="employeeForm" label-width="120px" style="margin-left: 120px; margin-top:30px">
              <el-form-item label="用户名">
                <el-input v-model="employeeForm.username" style="width:300px" />
              </el-form-item>
              <el-form-item label="密码">
                <el-input v-model="employeeForm.password2" type="password" style="width:300px" />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="saveEmployeeInfo">保存</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="个人详情">
            <el-row type="flex" justify="end">
              <el-tooltip content="打印个人基本信息">
                <router-link :to="`/employees/print/${urlId}?type=personal`">
                  <i class="el-icon-printer" />
                </router-link>
              </el-tooltip>
            </el-row>
            <component :is="userinfo" />

            <!-- <userinfo /> -->
          </el-tab-pane>
          <el-tab-pane label="岗位信息">
            <el-row type="flex" justify="end">
              <el-tooltip content="打印个人基本信息">
                <router-link :to="`/employees/print/${urlId}?type=job`">
                  <i class="el-icon-printer" />
                </router-link>
              </el-tooltip>
            </el-row>
            <component :is="jobinfo" />

          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getUserDetailById } from '@/api/user'
import { saveEmployeeInfo } from '@/api/employees'
import userinfo from './components/user-info'
import jobinfo from './components/job-info'
export default {
  components: {
    userinfo,
    jobinfo
  },
  data() {
    return {
      userinfo,
      jobinfo,
      urlId: this.$route.params.id,
      employeeForm: []
    }
  },
  created() {
    this.getUserDetailById()
  },
  methods: {
    //   获取员工基本信息
    async getUserDetailById() {
      this.employeeForm = await getUserDetailById(this.urlId)
    //   console.log(this.employeeForm)
    },
    async saveEmployeeInfo() {
    //   console.log(this.employeeForm)
      await saveEmployeeInfo({ ...this.employeeForm, password: this.employeeForm.password2 })
      this.$message.success('更新用户基本信息成功')
    }
  }
}
</script>

<style>

</style>

