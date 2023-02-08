import request from '@/utils/request'

export function getCountAll() {
  return request({
    url: '/count/all',
    method: 'get',
    
  })
}

