import request from '@/utils/request'

export function addPatient(data) {
    return request({
      url: '/patient/add',
      method: 'post',
      data
    })
  }
export function getPatientAll() {
  return request({
    url: '/patient/all',
    method: 'get',
  })
}
export function getPatientList(data) {
  return request({
    url: '/patient/list',
    method: 'post',
    data
  })
}
export function getPatientDetail(data) {
  return request({
    url: '/patient/detail',
    method: 'post',
    data 
  })
}

export function getPatientEdit(data) {
  return request({
    url: '/patient/edit',
    method: 'post',
    data
  })
}
export function getPatientChangeStatus(data) {
  return request({
    url: '/patient/changeStatus',
    method: 'post',
    data
  })
}
export function getPatientDel(data) {
  return request({
    url: '/patient/del',
    method: 'post',
    data
  })
}
