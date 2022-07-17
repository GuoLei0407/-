<template>
  <div>
    <van-nav-bar>
      <!-- 自定义左侧 -->
      <template #left>
        <div class="logo">头条123</div>
      </template>

      <template #right>
        <van-button round icon="search" type="info" @click="$router.push('/search')">搜索</van-button>
      </template>
    </van-nav-bar>
    <van-tabs v-model="active">
      <van-tab v-for="item in myChannels" :key="item.id" :title="item.name">
        <!-- 我们用keep-alive将list组件包裹，这样我们来回切换频道的时候，当切换回加载过的频道是就不需要重新加载 -->
        <keep-alive include="list">
          <acrticle-list :artId="item.id"></acrticle-list>
        </keep-alive>
      </van-tab>
      <div class="icon-wrap">
        <van-icon name="weapp-nav" @click="Show()" />
      </div>
    </van-tabs>
    <channel-edit ref="cnl" v-model="active" @setList="setList" :channelList="myChannels" />
  </div>
</template>

<script>
import { myChannelAPI, myChannelsPutAPI } from '@/api/index.js'
import acrticleList from './articleList.vue'
import channelEdit from './channelEdit.vue'
export default {
  data() {
    return {
      myChannels: [],
      active: 0
    }
  },
  async created() {
    // 获取我的频道前先进行判断是否登录
    if (this.$store.state.tokenObj.token) {
      // 登录了就发请求
      const res = await myChannelAPI()
      this.myChannels = res.data.data.channels
    } else {
      // 没有登录就从本地存储中拿频道列表
      const localList = JSON.parse(localStorage.getItem('list'))
      if (localList) {
        // 有数据就用本地数据
        this.myChannels = localList
      } else {
        // 没有数据，我们还是会发起请求，不过这次参数是不带token的，请求的是默认的频道
        const res = await myChannelAPI()
        this.myChannels = res.data.data.channels
      }
    }
  },
  components: {
    acrticleList,
    channelEdit
  },
  methods: {
    Show() {
      this.$refs.cnl.isShow = true
    },
    async setList({ method, value }) {
      if (method === 'push') {
        this.myChannels.push(value)
      } else if (method === 'splice') {
        this.myChannels.splice(value, 1)
      }
      // 调用本地存储长久保存我的频道列表
      localStorage.setItem('list', JSON.stringify(this.myChannels))
      if (this.$store.state.tokenObj.token) {
        const channels = this.myChannels.map((item, index) => {
          // 用map方法对频道数组进行映射,然后传给服务器
          return {
            id: item.id,
            seq: index
          }
        })
        await myChannelsPutAPI({
          channels: channels
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.van-tabs {
  //在 vue 项目的开发过程，使用了样式组件且样式 style 使用了 scoped 属性，当想要修改组件样式，发现直接修改不了，需去掉 scoped 属性或者使用深度选择器才能修改成功
  // 这时候我们通过::v-deep深度选择器也就是样式穿透来修改组件中的样式
  /deep/ .van-tabs__wrap {
    width: 340px;
  }
  .icon-wrap {
    position: absolute;
    right: 0;
    top: 7px;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .van-icon {
    font-size: 30px;
  }
}
.van-nav-bar .van-icon {
  /* color: #1989fa; */
  color: #fff;
}
</style>
