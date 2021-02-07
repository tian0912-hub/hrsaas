// 该文件负责所有的公共的组件的全局注册   Vue.use
import PageTools from './pagetools'
import UploadExcel from './uploadExcel'
import imageUpload from './imageUpload'
import Print from 'vue-print-nb'
import ScreenFull from './Screenfull'
import ThemePicker from './ThemePicker'
import langSelect from './lang'
import TagsView from './TagsView'
export default {
  install(Vue) {
    //  注册全局的通用栏组件对象
    Vue.component('PageTools', PageTools)
    Vue.component('UploadExcel', UploadExcel) // 注册导入excel组件
    Vue.component('ImageUpload', imageUpload)
    Vue.component('ScreenFull', ScreenFull)
    Vue.component('ThemePicker', ThemePicker)
    Vue.component('langSelect', langSelect)
    Vue.component('TagsView', TagsView)
    Vue.use(Print)
  }
}
