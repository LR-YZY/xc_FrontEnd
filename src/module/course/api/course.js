import http from './../../../base/api/public'
import querystring from 'querystring'
let sysConfig = require('@/../config/sysConfig')
let apiUrl = sysConfig.xcApiUrlPre;

//查询课程列表
//我的课程列表
export const findCourseList = (page,size,params) => {
//使用工具类将json对象转成key/value
  let queries = querystring.stringify(params)
  return http.requestQuickGet(apiUrl+"/course/coursebase/list/"+page+"/"+size+"?"+queries)
}
//根据id查询coursebase表的数据
export const getCoursebaseById = (courseid) => {
    return http.requestQuickGet(apiUrl+"/course/coursebase/courseByid/"+courseid)
}
//更新coursebase表的数据
export const updateCoursebase = (courseForm) => {
  return http.requestPut(apiUrl+"/course/coursebase/updateCourseBase",courseForm)
}
//查询课程分类
export const category_findlist= () => {
  return http.requestQuickGet(apiUrl+'/category/list')
}
/*添加课程基础信息*/
export const addCourseBase = params => {
  return http.requestPost(apiUrl+'/course/coursebase/add',params)
}
//根据id查询课程营销
export const getCourseMarketById = (courseid) => {
  return http.requestQuickGet(apiUrl+"/course/coursemarket/courseMarketByid/"+courseid)
}
//跟新或者添加课程营销
export const updateCourseMarket= (courseMarketForm) => {
  return http.requestPost(apiUrl+"/course/coursemarket/addAndupdateMarket",courseMarketForm)
}
/*查询课程计划*/
export const findTeachplanList = courseid => {
  return http.requestQuickGet(apiUrl+'/course/teachplan/list/'+courseid)
}
/*添加课程计划*/
export const addTeachplan = teachplah => {
  return http.requestPost(apiUrl+'/course/teachplan/add',teachplah)
}

//根据根节点的id查询所有的子节点
export const findTeachplanBytesPoint = id => {
  return http.requestQuickGet(apiUrl+'/course/teachplan/TeachplanBytesPoint/'+id)
}

//删除课程计划
export const deleteTeachplan = (data) => {
  return http.requestPost(apiUrl+'/course/teachplan/deleteteachplan',data)
}


//保存课程图片地址到课程数据 库
export const addCoursePic= (courseId,pic) => {
  return http.requestPost(apiUrl+'/course/coursepic/add?courseId='+courseId+"&pic="+pic)
}
//查询课程图片
export const findCoursePicList = courseId => {
  return http.requestQuickGet(apiUrl+'/course/coursepic/list/'+courseId)
}

//删除课程图片
export const deleteCoursePic= courseId => {
  return http.requestDelete(apiUrl+'/course/coursepic/delete?courseId='+courseId)
}
/*预览课程*/
export const preview = id => {
  return http.requestPost(apiUrl+'/course/preview/'+id);
}
/*发布课程*/
export const publish = id => {
  return http.requestPost(apiUrl+'/course/publish/'+id);
}
//查询课程信息
export const findCourseView = courseId => {
  return http.requestQuickGet(apiUrl+'/course/courseview/'+courseId)
}

/*保存媒资信息*/
export const savemedia = teachplanMedia => {
  return http.requestPost(apiUrl+'/course/savemedia',teachplanMedia);
}
