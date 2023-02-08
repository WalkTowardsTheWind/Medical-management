import request from '@/utils/request'

export function addProject(data) {
    return request({
      url: '/project/add',
      method: 'post',
      data
    })
  }
export function getProjectAll() {
  return request({
    url: '/project/all',
    method: 'get',
  })
}
export function getProjectList(data) {
  return request({
    url: '/project/list',
    method: 'post',
    data
  })
}
export function getProjectDetail(data) {
  return request({
    url: '/project/detail',
    method: 'post',
    data 
  })
}

export function getProjectEdit(data) {
  return request({
    url: '/project/edit',
    method: 'post',
    data
  })
}
export function getProjectChangeStatus(data) {
  return request({
    url: '/project/changeStatus',
    method: 'post',
    data
  })
}
export function getProjectDel(data) {
  return request({
    url: '/project/del',
    method: 'post',
    data
  })
}
