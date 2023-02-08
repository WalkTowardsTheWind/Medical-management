import request from '@/utils/request'

export function getList() {
  return request({
    url: '/user/list',
    method: 'get',
    
  })
}
export function addUser(data) {
  return request({
    url: '/user/add',
    method: 'post',
    data
  })
}

export function getDetail(data) {
  return request({
    url: '/user/detail',
    method: 'get',
    params: data 
  })
}

export function getEdit(data) {
  return request({
    url: '/user/edit',
    method: 'post',
    data
  })
}
export function getDel(data) {
  return request({
    url: '/user/del',
    method: 'post',
    data
  })
}
