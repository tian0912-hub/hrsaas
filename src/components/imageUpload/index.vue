<template>
  <div>
    <!-- limit 允许上传的最大个数 -->
    <el-upload
      :on-preview="preview"
      :on-remove="handleRemove"
      :file-list="fileList"
      :on-change="updateImg"
      :before-upload="beforeUpload"
      :http-request="upload"
      list-type="picture-card"
      action="#"
      :limit="1"
      :class="{disabled: fileComputed }"
    >
      <i class="el-icon-plus" />
    </el-upload>
    <el-progress v-if="showPercent" style="width: 180px" :percentage="percent" />

    <el-dialog :visible.sync="showDialog">
      <img width="100%" :src="imgUrl" alt="">
    </el-dialog>
  </div>
</template>
<script>
import COS from 'cos-js-sdk-v5'
const cos = new COS({
  SecretId: 'AKIDXAe0HPyzQc0FI9NlaChMIMAmFbv5nxNb', // 身份识别 ID
  SecretKey: '7Cm9F9pRAqKejANWWaQzJYKo6LlFRa3K' // 身份密钥
})
export default {
  data() {
    return {
      fileList: [], // 图片地址设置为数组
      showDialog: false, // 控制显示弹层
      imgUrl: '',
      currentUid: null, // 保存要上传的文件UID
      showPercent: false,
      percent: null
    }
  },
  computed: {
    fileComputed() {
      return this.fileList.length === 1
    }
  },
  methods: {
    preview(file) {
      // 这里应该弹出一个层 层里是点击的图片地址
      this.imgUrl = file.url
      this.showDialog = true
    },
    handleRemove(file, fileList) {
      // console.log(file)
      // console.log(fileList)
      //   this.fileList = fileList
      this.fileList = this.fileList.filter(item => item.uid !== file.uid)
    },
    updateImg(file, fileList) {
    //   console.log(file)
      //   this.fileList = fileList.map(item => item)
      if (fileList.length === 1) {
        this.fileList = fileList
      }
    //   console.log(this.fileList)
    },
    // 上传前的钩子
    beforeUpload(file) {
    //   console.log(file)
      // 要开始做文件上传的检查了
      // 文件类型 文件大小
      const types = ['image/jpeg', 'image/gif', 'image/bmp', 'image/png']
      if (!types.some(item => item === file.type)) {
        this.$message.error('选中的图片不符合')
        return false
      }
      // 文件大小，不能超过5M
      const maxSize = 5 * 1024 * 1024
      if (file.size > maxSize) {
        this.$message.error('所选图片过大')
        return false
      }
      this.showPercent = true
      this.currentUid = file.uid // 记录UID
      return true
    },
    // 上传操作
    upload(params) {
      if (params.file) {
        cos.putObject({
          Bucket: 'vuexihrssa-001-1304928320',
          Region: 'ap-shanghai',
          Key: params.file.name,
          StorageClass: 'STANDARD',
          Body: params.file,
          onProgress: (params) => {
            this.percent = params.percent * 100
          }
        }, (err, data) => {
          console.log(err || data)
          if (!err && data.statusCode === 200) {
            // 此时才说明上传成功，
            this.fileList = this.fileList.map(item => {
              if (item.uid === this.currentUid) {
                return { url: 'http://' + data.Location, upload: true }
              }
              return item
            })
            setTimeout(() => {
              this.showPercent = false
              this.percent = 0
            }, 2000)
          }
        })
      }
    }
  }
}
</script>
<style>
.disabled .el-upload--picture-card {
  display: none
}
</style>
