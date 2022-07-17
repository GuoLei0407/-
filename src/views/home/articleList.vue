<template>
  <div class="artList" @scroll="scrollEvent" ref="scrollRef">
    <van-pull-refresh v-model="isLoading" success-text="刷新成功" @refresh="onRefresh">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <van-cell v-for="item in list" :key="item.art_id" @click="$router.push('/article?id=' + item.art_id)">
          <template>
            <!-- 标题部分 -->
            <div class="title">{{ item.title }}</div>
            <!-- 图片部分 -->
            <van-grid :border="false" :column-num="item.cover.type">
              <van-grid-item v-for="(val, idx) in item.cover.images" :key="idx">
                <van-image class="pic" :src="val" />
              </van-grid-item>
            </van-grid>
            <!-- 新闻信息部分 -->
            <div class="other">
              <span>{{ item.aut_name }}</span>
              <span class="comment"> {{ item.comm_count }} </span>
              <span>{{ item.pubdate }}</span>
            </div>
          </template>
        </van-cell>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { articleListAPI } from '@/api/index.js'
export default {
  props: {
    artId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      timestamp: Date.now(), // 发起请求需要提交时间戳 ， Date.now()表示当前时间
      isLoading: false
    }
  },
  methods: {
    async onLoad() {
      // 发起请求
      const res = await articleListAPI({
        channel_id: this.artId,
        timestamp: this.timestamp
      })
      // console.log(res)
      this.list.push(...res.data.data.results)
      // 把上一段新闻的时间戳赋值给timestamp，方便下次去查找下一段新闻
      this.timestamp = res.data.data.pre_timestamp
      // 本次加载完成
      this.loading = false
      // 判断是否全部加载完成
      if (this.timestamp == null) {
        this.finished = true
      }
    },
    async onRefresh() {
      const res = await articleListAPI({
        channel_id: this.artId,
        // 刷新需要当前最新时间，所以在这里写死为Date.now()
        timestamp: Date.now()
      })
      // console.log(res)
      // 下拉刷新，要刷新成最新的新闻，所以是直接更换掉之前的list
      // 所以不是追加，也就不是push，而是替换，也就是重新赋值
      this.list = res.data.data.results
      this.isLoading = false
    },
    scrollEvent(e) {
      // 当我们滑动新闻列表是会触发滑动事件的这个方法
      // 这个方法会将我们滑动的位置记录到本地存储中
      localStorage.setItem('srcoll', e.target.scrollTop)
    }
  },
  activated() {
    // 该钩子函数配合keep-alive使用,当被keep-alive包裹的组件被激活是触发
    // 下面代码的意思就是：当组件重新被激活时，触发这个钩子将本地存储中的滑动位置的值拿出来，并且赋给当前的list盒子
    // 使我们切换到别的频道的时候，这个频道的位置会被记录下拉，然后回到这个频道时候，列表滑动的高度不会变
    // 实现了每个频道的滑动位置都是独立的
    this.$refs.scrollRef.scrollTop = +localStorage.getItem('scroll') // =-和=+就是赋值的意思，a=+b 就是 a=b,a=-b 就是a=-b
  }
}
</script>

<style lang="less" scoped>
// 让新闻列表滚动区域只有自己那一部分，我们给要设置固定定位、加top和bottom、外加overflow:auto、以及给宽度100%
.artList {
  width: 100vw;
  position: fixed;
  left: 0;
  top: 90px;
  bottom: 50px;
  overflow: auto;
  padding: 0 15px;
  box-sizing: border-box;
  .title {
    padding: 10px 0;
  }
  .other {
    color: #ccc;
    padding-bottom: 20px;
    .comment {
      padding: 0 15px;
    }
  }
}
</style>
