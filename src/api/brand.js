import request from '@/utils/request'

export function addBrand(data) {
    return request({
      url: '/brand/add',
      method: 'post',
      data
    })
  }
export function getBrandList(data) {
  return request({
    url: '/brand/list',
    method: 'post',
    data
  })
}
export function getBrandDetail(data) {
  return request({
    url: '/brand/detail',
    method: 'post',
    data 
  })
}

export function getBrandEdit(data) {
  return request({
    url: '/brand/edit',
    method: 'post',
    data
  })
}

export function getBrandDel(data) {
  return request({
    url: '/brand/del',
    method: 'post',
    data
  })
}
