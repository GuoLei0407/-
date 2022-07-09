<template>
  <div>
    <!-- 顶部头像栏区域 -->
    <div class="profile">
      <van-image round class="avatar" fit="cover" :src="info.photo" />
      <div class="info">
        <h4>{{ info.name }}</h4>
        <span>{{ info.birthday }}</span>
      </div>
    </div>
    <!-- 中部快捷功能区域 -->
    <div class="middle">
      <div class="item">
        <van-icon name="newspaper-o" />
        <h3>我的作品</h3>
      </div>
      <div class="item">
        <van-icon name="star-o" />
        <h3>我的收藏</h3>
      </div>
      <div class="item">
        <van-icon name="tosend" />
        <h3>我的作品</h3>
      </div>
    </div>
    <!-- 功能列表区域 -->
    <van-cell-group>
      <van-cell icon="edit" title="编辑资料" is-link to="edit" />
      <van-cell icon="chat-o" title="小智同学" is-link />
      <van-cell icon="setting-o" title="系统设置" is-link />
      <van-cell icon="info-o" title="退出登录" is-link @click="logout" />
    </van-cell-group>
  </div>
</template>

<script>
// import { userinfoAPI } from '@/api/index.js'
export default {
  data() {
    return {
      // info: {}
    }
  },
  // async created() {
  //   // 发起用户信息请求
  //   // 对用户信息进行一个判断，如果没有就请求
  //   if (!this.info.name) {
  //     const res = await userinfoAPI()
  //     // 将请求到的用户信息存到vuex里面作为全局数据给所有组件使用
  //     // this.info = res.data.data
  //     console.log(res)
  //     this.$store.commit('setUserInfos', res.data.data)
  //   }
  // },
  // 优化后：
  created() {
    this.$store.dispatch('reqUserInfo')
  },
  computed: {
    info() {
      // 调用vuex里面的用户信息
      return this.$store.state.userinfo
    }
  },
  methods: {
    logout() {
      this.$store.commit('logout')
    }
  }
}
</script>

<style lang="less" scoped>
.profile {
  height: 140px;
  background-color: #3296fa;
  // 为了让头像和资料一左一右排列
  display: flex;
  // 垂直居中
  align-items: center;
  .avatar {
    height: 80px;
    width: 80px;
    // 左间距和右间距
    margin-left: 20px;
    margin-right: 10px;
  }
  .info {
    h4 {
      color: aliceblue;
      font-size: 18px;
      margin-bottom: 10px;
    }
    span {
      background-color: #fff;
      color: #3296fa;
      padding: 2px 4px;
    }
  }
}
.middle {
  display: flex;
  justify-content: space-between;
  .item {
    flex: 1;
    text-align: center;
    .van-icon {
      font-size: 30px;
      padding: 10px 0;
    }
    h3 {
      font-weight: 400;
    }
    &:nth-child(1) {
      .van-icon {
        color: #8daaff;
      }
    }
    &:nth-child(2) {
      .van-icon {
        color: #ff3800;
      }
    }
    &:nth-child(3) {
      .van-icon {
        color: #ffb45a;
      }
    }
  }
}
.van-cell-group {
  margin-top: 10px;
}
</style>
