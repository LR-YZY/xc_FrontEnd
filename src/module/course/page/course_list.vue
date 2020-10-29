<!-- 我的课程主页 -->
<template>
  <section>
    <el-row >
      <el-col :span="8"  :offset=2 >
        <el-card :body-style="{ padding: '10px' }">
          <img src="/static/images/add.jpg" class="image" height="150px">
          <div style="padding: 10px;">
            <span>课程名称</span>
            <div class="bottom clearfix">
              <time class="time"></time>
              <router-link class="mui-tab-item" :to="{path:'/course/add/base'}">
                  <el-button type="text" class="button" >新增课程</el-button>
              </router-link>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8" v-for="(course, index) in courses" :key="course.id" :offset="index > 0 ? 2 : 2">
        <el-card :body-style="{ padding: '10px' }">
          <img :src="course.pic!=null?imgUrl+course.pic:'/static/images/nonepic.jpg'" class="image" height="150px">
          <div style="padding: 10px;">
            <span>{{course.name}}</span>
            <div class="bottom clearfix">
              <time class="time"></time>
              <el-button type="text" class="button" @click="handleManage(course.id)">管理课程</el-button>
            </div>
          </div>
        </el-card>
      </el-col>

      <!--分页-->
      <el-col :span="24" class="toolbar">
        <el-pagination background layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="size"
                       :total="total" :current-page="page"
                       style="float:right;">
        </el-pagination>
      </el-col>
    </el-row>
  </section>
</template>
<script>
  import * as courseApi from '../api/course';
  import utilApi from '../../../common/utils';
  import * as systemApi from '../../../base/api/system';
  let sysConfig = require('@/../config/sysConfig')
  export default {
    data() {
      return {
        page:1,
        size:7,
        total: 0,
        courses: [],
        sels: [],//列表选中列
        imgUrl:sysConfig.imgUrl,
        user:{
                userid:'',
                username: '',
                userpic: ''
        }
      }
    },
    methods: {
        //分页方法
      handleCurrentChange(val) {
        this.page = val;
        this.getCourse();
      },
      //获取课程列表
      getCourse() {
         //从sessionStorage中取出当前用户
        let activeUser= utilApi.getActiveUser();
        //取出cookie中的令牌
        let uid = utilApi.getCookie("uid")
        console.log(activeUser)
        if(activeUser && uid && uid == activeUser.uid){
            this.user = activeUser;
            let activeUser1 = utilApi.getUserInfoFromJwt(activeUser.jwt);
        }else{
            if(!uid){
                return ;
            }
            //请求查询jwt
           systemApi.getjwtbyuid(uid).then((res)  => {
                if(res.success){
                    let jwt = res.jwt;
                    let activeUser = utilApi.getUserInfoFromJwt(jwt)
                    if(activeUser){
                        this.user = activeUser;
                        setUserSession("activeUser",JSON.stringify(activeUser))
                    }
                }
            })
        }
        courseApi.findCourseList(this.page,this.size,{userId:activeUser.userid}).then((res) => {
            this.total = res.total;
            this.courses = res.list;
        });
      },
      handleManage: function (id) {
        console.log(id)
        this.$router.push({ path: '/course/manager/'+id})
      }

    },
    created(){

    },
    mounted() {
      //查询我的课程
      this.getCourse();
    }
  }
</script>
<style scoped>
  .el-col-8{
    width:20%
  }
  .el-col-offset-2{
    margin-left:2%
  }
  .time {
    font-size: 13px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }
</style>
