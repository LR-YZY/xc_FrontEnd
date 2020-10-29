import http from '../../../base/api/public'
import querystring from 'querystring'
let sysConfig = require('@/../config/sysConfig')
let apiUrl = sysConfig.xcApiUrlPre;


//根据userid查询到教育机构的id
export const findcompanyByuserId = (userId) => {
  return http.requestGet(apiUrl+'/teacher/teacherByuserId/'+userId)
}

//跟老师有关的页面所有请求
export const findTeacherByuserId = (userId) => {
  return http.requestGet(apiUrl+'/teacher/teacherByuserId/'+userId)
}

//查询老师图片
export const findteacherPicList = teacherId => {
  return http.requestQuickGet(apiUrl+'/teacher/teacherpic/list/'+teacherId)
}

//添加或者修改老师的基本信息
export const updateTeacher= (teacher) => {
  return http.requestPut(apiUrl+'/teacher/updateteacher/update',teacher)
}

//保存课程图片地址到teacher数据库
export const addTeacherPic= (userId,pic) => {
  return http.requestPost(apiUrl+'/teacher/teacherpic/add?userId='+userId+"&pic="+pic)
}

//删除老师图片
export const deleteTeacherPic= (userId,pic) => {
  return http.requestDelete(apiUrl+'/teacher/Deleteteacherpic/Delete?userId='+userId+"&pic="+pic)
}
