import request from '@/utils/request'

export function getTypeList() {
  return request({
    url: '/type/list',
    method: 'get',
    
  })
}
export function getTypeAll() {
  return request({
    url: '/type/All',
    method: 'get',
    
  })
}
export function addType(data) {
  return request({
    url: '/type/add',
    method: 'post',
    data
  })
}

export function getTypeDetail(data) {
  return request({
    url: '/type/detail',
    method: 'get',
    params: data 
  })
}

export function getTypeEdit(data) {
  return request({
    url: '/type/edit',
    method: 'post',
    data
  })
}
export function getTypeDel(data) {
  return request({
    url: '/type/del',
    method: 'post',
    data
  })
}
