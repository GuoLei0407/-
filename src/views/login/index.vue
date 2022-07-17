<template>
  <div>
    <van-nav-bar title="登录" />
    <!-- 表单部分 -->
    <!-- @submit提交事件: 当提交表单时触发 -->
    <van-form @submit="onSubmit">
      <van-field v-model="user.mobile" label="手机号" placeholder="请输入手机号" :rules="rules.mobile" />
      <van-field v-model="user.code" label="验证码" placeholder="请输入验证码" :rules="rules.code" />
      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit" :loading="loading">登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { loginAPI } from '@/api/index.js'
export default {
  data() {
    return {
      user: {
        mobile: '13797224987',
        code: '246810'
      },
      loading: false,
      // 规则对象
      rules: {
        // 手机号的规则
        mobile: [
          // 必填规则
          { required: true, message: '请填写手机号' },
          // 验证手机号规则
          { pattern: /^1[2-9]\d{9}$/, message: '请输入正确的手机号' }
        ],
        code: [
          { required: true, message: '请填写验证码' },
          { pattern: /^\d{6}$/, message: '请输入6位数字验证码' }
        ]
      }
    }
  },
  methods: {
    // 表单提交触发的事件，一定要等表单验证通过才会调用
    async onSubmit() {
      // 将loading改为true，使button按钮变为加载状态
      // console.log(this.user)
      this.loading = true
      // 当这个函数被调用,就意味着用户输入的内容符合规则
      // 那我们就可以发请求做登录了
      // 本接口的处理是:如果登录成功,就会正常响应
      // 如果登录失败则直接给你请求报错,所以要用catch
      // 当catch被触发就代表账号或密码有问题
      // loginAPI(this.user)
      //   .then((res) => {
      //     console.log(res)
      //     // 在vant中导入toast方法，并挂载到vue实例上，这是vant提供的一个提示组件
      //     this.$toast.success('登录成功！！！')
      //   })
      //   .catch((error) => {
      //     // 登录失败
      //     this.$toast.fail('登录失败!')
      //     console.log(error)
      //   })
      //   .finally(() => {
      //     // 这个方法会在loginAPI方法结束后触发（不管是成功或者不成功）
      //     // 将loading改为false以便下次使用
      //     this.loading = false
      //   })
      try {
        const res = await loginAPI(this.user)
        this.$toast.success('登录成功')
        //
        this.$store.commit('setToken', res.data.data)
        console.log(res)
        const back = this.$route.query.back // 这里back就是我们在路由守卫里面 next('/login?back=' + to.fullPath) 携带的参数
        // 意思是：我们从别的页面来到登录页是会路由会携带一个参数back，back的值就表示我们从哪里来到登录页的
        // 通过$route.query.back获取到back的值 然后我们点击登录的时候，有back的值我们就直接去back记载的地址，没有就去home
        this.$router.push(back || '/layout/home')
      } catch {
        // 响应失败。密码账号有问题
        this.$toast.fail('登录失败')
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style></style>
