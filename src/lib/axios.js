import axios from 'axios'
import { baseURL } from '@/config'
import {Loading, Notification} from 'element-ui'

let loading = null
const startLoading = () => {
    loading = Loading.service({
        lock: true,
        background: 'rgba(255,255,255, .7)'
    })
}
const endLoading = () => {
    loading.close()
}

// @httpRequest axios
class HttpRequest {
    constructor(baseUrl = baseURL) {
        this.baseUrl = baseUrl
    }
    getInsideConfig() {
        const config = {
            baseURL: this.baseUrl,
            headers: {}
        }
        return config
    }
    // 拦截器
    interceptors(instance) {
        instance.interceptors.request.use(config => {
            // loading ........
            startLoading()
            return config
        })
        instance.interceptors.response.use(response => {
            // end loading ......
            endLoading()
            return response
        }, err => {
            // end Loading.....
            console.log(err, 'err')
            Notification.error({
                message: '请求异常',
                position: 'top-left',
                duration: 1500
            })
            endLoading()
        })
    }
    request(options) {
        const instance = axios.create()
        this.interceptors(instance)
        options = Object.assign({}, this.getInsideConfig(), options)
        return instance(options)
    }
}

export default HttpRequest