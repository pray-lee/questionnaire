import Vue from 'vue'
import App from './App.vue'
import 'lib-flexible'
import '@/assets/style/reset.css'
import axios from '@/api/index'
import {Table, TableColumn, Icon} from 'element-ui'

Vue.config.productionTip = false
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Icon)

new Vue({
  render: h => h(App),
}).$mount('#app')
