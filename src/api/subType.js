import request from '@/utils/request'

export function addSubType(data) {
    return request({
      url: '/subType/add',
      method: 'post',
      data
    })
  }
export function getSubTypeAll(data) {
  return request({
    url: '/subType/all',
    method: 'post',
    data
  })
}
export function getSubTypeDetail(data) {
  return request({
    url: '/subType/detail',
    method: 'post',
    data 
  })
}

export function getSubTypeEdit(data) {
  return request({
    url: '/subType/edit',
    method: 'post',
    data
  })
}

export function getSubTypeDel(data) {
  return request({
    url: '/subType/del',
    method: 'post',
    data
  })
}
