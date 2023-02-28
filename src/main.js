import Vue from 'vue'
import App from './App.vue'
import 'lib-flexible'
import '@/assets/style/reset.css'
import axios from '@/api/index'
import {Table, TableColumn, Icon, Select, Option} from 'element-ui'

Vue.config.productionTip = false
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Icon)
Vue.use(Select)
Vue.use(Option)

new Vue({
  render: h => h(App),
}).$mount('#app')
