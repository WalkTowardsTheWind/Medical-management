import request from '@/utils/request'

export function addProduct(data) {
    return request({
      url: '/product/add',
      method: 'post',
      data
    })
  }
export function getProductAll() {
  return request({
    url: '/product/all',
    method: 'get',
  })
}
export function getProductList(data) {
  return request({
    url: '/product/list',
    method: 'post',
    data
  })
}
export function getProductDetail(data) {
  return request({
    url: '/product/detail',
    method: 'post',
    data 
  })
}

export function getProductEdit(data) {
  return request({
    url: '/product/edit',
    method: 'post',
    data
  })
}
export function getProductChangeStatus(data) {
  return request({
    url: '/product/changeStatus',
    method: 'post',
    data
  })
}
export function getProductDel(data) {
  return request({
    url: '/product/del',
    method: 'post',
    data
  })
}
