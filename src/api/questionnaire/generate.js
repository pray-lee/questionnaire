import axios from '@/api/index'

export const generateCard = ({userName, assignedPerson, numbers, roleId}) => axios.request({
    url: '/experSysApi.do?doSave',
    method: 'GET',
    params: {
        userName,
        assignedPerson,
        numbers,
        roleId
    }
})

export const getCard = userName => axios.request({
    url: '/experSysApi.do?list',
    method: 'GET',
    params: {
        userName,
        pageSize: 100000,
        curPage: 1
    }
})