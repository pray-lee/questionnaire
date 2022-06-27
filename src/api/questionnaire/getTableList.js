import axios from '@/api/index'
export const getTableList = userName => axios.request({
    url: '/experSysApi.do?listReport',
    method: 'GET',
    params: {
        userName
    }
})