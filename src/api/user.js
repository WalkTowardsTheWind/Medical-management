import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

export function getInfo(data) {
  return request({
    url: '/user/login',
    method: 'get',
    params: data 
  })
}

export function logout() {
  return request({
    url: '/user/login',
    method: 'post'
  })
}
