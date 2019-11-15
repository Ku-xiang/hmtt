<template>
  <div class="login">
      <!-- elementUI card 卡片组件-->
      <el-card class='login-card'>
          <div class="title">
              <img src="../../assets/logo_index.png" alt="">
          </div>
          <!-- 表单 -->
          <!-- model 属性绑定表单数据对象 rules表示绑定的校验规则对象-->
          <el-form ref="loginForm" style="margin-top:30px" :model="loginForm" :rules="loginRules">
              <!-- 一个表单域就是一个form-item -->
              <el-form-item prop="mobile">
                  <!-- 放置表单组件 -->
                  <!-- 手机号 -->
                  <el-input v-model="loginForm.mobile"></el-input>
              </el-form-item>
              <el-form-item prop="code">
                  <!-- 验证码 和发送验证码 -->
                  <el-input v-model="loginForm.code" style="width:230px" ></el-input>
                  <el-button plain style="float:right">获取验证码</el-button>
              </el-form-item>
              <el-form-item prop="checked">
                  <!-- 勾选同意 -->
                  <el-checkbox v-model="loginForm.checked">我已阅读并同意用户协议及隐私条款</el-checkbox>
              </el-form-item>
              <el-form-item>
                  <el-button type="primary" style="width:100%" @click='login'>立即登录</el-button>
              </el-form-item>
          </el-form>
      </el-card>
      <div ref="div"></div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 要验证整个表单的数据
      loginForm: {
        mobile: '', // 手机号
        code: '', // 验证码
        checked: false // 是否勾选
      },
      //   校验规则对象
      loginRules: {
        mobile: [{ required: true, message: '请输入您的手机号' }, {
          pattern: /^1[3456789]\d{9}$/, message: '请输入正确的手机号'
        }],
        code: [{ required: true, message: '请输入您的验证码' }, {
          pattern: /^\d{6}$/, message: '请输入六位数字'
        }],
        checked: [{ validator: function (rules, value, callback) {
          // rule代表当前的规则
          // value代表当前的值 =>表单字段checked的值
          // callback回调函数
          if (value) {
            // 如果是true 就是选中了 通过校验
            callback()// 直接执行callBack 表示直接通过
          } else {
            callback(new Error('您还没有同意勾选条款'))
          }
        } }]
      }
    }
  },
  methods: {
    login () {
      // this.$refs.div 获取DOM节点
      this.$refs.loginForm.validate(function (isOK) {
        if (isOK) {

        }
      })
    }
  }
}
</script>

<style lang="less">
    .login{
        color:red;
        background-image: url('../../assets/login_bg.jpg');
        height: 100vh;
        background-size:cover;
        display: flex;
        justify-content: center;
        align-items: center;
        .login-card{
            width: 400px;
            height: 360px;
            .title{
                text-align: center;
                img{
                    height: 45px;
                }
            }
        }
    }
</style>
