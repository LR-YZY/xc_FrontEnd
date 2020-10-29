import http from '../../../base/api/public'
import querystring from 'querystring'
let sysConfig = require('@/../config/sysConfig')
let apiUrl = sysConfig.xcApiUrlPre;


//根据userid查询到教育机构的id
export const findcompanyByuserId = (userId) => {
  return http.requestGet(apiUrl+'/ucenter/findcompanyByuserId/'+userId)
}

//根据userid查询教育机构的基本信息
export const findcompany = (userId) => {
  return http.requestGet(apiUrl+'/ucenter/findcompany/'+userId)
}

//添加或者修改教育机构的基本信息
export const updateCompany = (company) => {
  return http.requestPost(apiUrl+'/ucenter/updatecompany',company)
}
