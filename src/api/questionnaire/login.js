import axios from '@/api/index'
export const login = (userName,password) => axios.request({
    url: '/experSysApi.do?login',
    method: 'GET',
    params: {
        userName,
        password
    }  
})