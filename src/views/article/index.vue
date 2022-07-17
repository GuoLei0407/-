<template>
  <div>
    <van-nav-bar title="文章详情" fixed placeholder @click-left="$router.go(-1)" left-arrow></van-nav-bar>
    <h2 class="title">{{ detail.title }}</h2>
    <!-- 作者详情 -->
    <div class="author-box">
      <van-image fit="cover" round :src="detail.aut_photo"></van-image>
      <div class="info-box">
        <div>{{ detail.aut_name }}</div>
        <!-- 这里我们调用了在main.js里面声明的全局过滤器来将绝对时间转为相对时间 -->
        <span class="time">{{ detail.pubdate | relvTime }}</span>
      </div>
      <van-button round type="info">+关注</van-button>
    </div>
    <!-- 后端直接将主体的html结构都传给我们了，所以通过v-html来更改content的结构 -->
    <div class="content" v-html="detail.content"></div>
    <van-divider>end</van-divider>
    <div style="display: flex; justify-content: space-around">
      <van-button plain round icon="passed" type="primary">喜欢{{ detail.link_count }}</van-button>
      <van-button plain round icon="close" type="danger">不喜欢</van-button>
    </div>
    <Comment></Comment>
  </div>
</template>

<script>
import { articleDetailAPI } from '@/api/index.js'
import Comment from './comment.vue'
export default {
  data() {
    return {
      detail: {}
    }
  },
  async created() {
    const res = await articleDetailAPI(this.$route.query.id)
    this.detail = res.data.data
  },
  components: {
    Comment
  }
}
</script>

<style lang="less" scoped>
.title {
  font-size: 22px;
  margin: 20px;
}
.author-box {
  display: flex;
  align-items: center;
  margin: 0 20px;
  .van-image {
    width: 80px;
    height: 80px;
  }
  .info-box {
    flex: 1;
    margin-left: 10px;
    .time {
      color: gray;
      font-size: 14px;
    }
  }
}
.content {
  margin: 20px;

  ::v-deep pre {
    overflow: auto;
    background-color: #000;
    color: #dcdcdc;
  }
}
.van-nav-bar {
  width: 100%;
  top: 0;
}
</style>
