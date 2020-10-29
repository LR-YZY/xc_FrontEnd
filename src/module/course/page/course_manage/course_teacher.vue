<template>
  <div>
      <el-form :model="company" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="联系名称" prop="name">
          <el-input v-model="company.linkname"></el-input>
        </el-form-item>
        <el-form-item label="称呼" prop="name">
          <el-input v-model="company.name"></el-input>
        </el-form-item>
        <el-form-item label="手机号码" prop="name">
          <el-input v-model="company.mobile"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="name">
          <el-input v-model="company.email"></el-input>
        </el-form-item>
        <el-form-item label="个人简介" prop="desc">
          <el-input type="textarea" v-model="company.intro"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm()">立即创建</el-button>
          <el-button @click="resetForm(company)">重置</el-button>
        </el-form-item>
      </el-form>
    
  </div>
</template>
<script>
  import * as sysConfig from '@/../config/sysConfig';
  import * as courseApi from '../../api/course';
  import * as teacherApi from '../../api/teacher';
  import * as userApi from '../../api/user';
  import utilApi from '../../../../common/utils';
  import * as systemApi from '../../../../base/api/system';
 export default {
    data() {
      return {
        company: {
          linkname: '',
          name: '',
          mobile: '',
          email: '',
          intro: ''
        },
        rules: {
          linkname: [
            { required: true, message: '请输入联系称呼', trigger: 'blur' },
          ],
          name: [
            { required: true, message: '请输入称呼', trigger: 'blur' },
          ],
          mobile: [
            { required: true, message: '请输入手机号码', trigger: 'blur' },
          ],
          intro: [
            { required: true, message: '请填写个人简介', trigger: 'blur' }
          ],
          descresume: [
            { required: true, message: '请填写个人简历', trigger: 'blur' }
          ]
        },
        user:{
                userid:'',
                username: '',
                userpic: ''
        }
      };
    },
    methods: {
     submitForm() {
        var companyfrom  = this.company;
        userApi.updateCompany(companyfrom).then(res =>{
              if(res.success){
                 this.$message.success('提交成功');
               }else{
                 this.$message.error('提交失败');
               }
        }) 
         return false;
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    },
    mounted() {
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

        let id = this.user.userid;
        //根据userId查询数据并显示在页面
        userApi.findcompany(id).then(res =>{
          if(res!=""){
            this.company = res;
          } 
        })
    }
  }
</script>
<style>

</style>
