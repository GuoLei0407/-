<template>
  <div>
    <van-cell>
      <div class="cmt-box">
        <!-- 头像 -->
        <van-image fit="cover" round :src="cmt.aut_photo"></van-image>

        <div class="info-box">
          <!-- 名字 -->
          <div class="name">{{ cmt.aut_name }}</div>
          <!-- 内容 -->
          <div class="content">{{ cmt.content }}</div>
          <div class="bottom-box">
            <span class="time">{{ cmt.pubdate | relvTime }}</span>
          </div>
        </div>
      </div>
    </van-cell>

    <van-divider>我的回复</van-divider>

    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <van-cell v-for="item in list" :key="item.com_id">
        <div class="cmt-box">
          <!-- 头像 -->
          <van-image fit="cover" round :src="item.aut_photo"></van-image>

          <div class="info-box">
            <!-- 名字 -->
            <div class="name">{{ item.aut_name }}</div>
            <!-- 内容 -->
            <div class="content">{{ item.content }}</div>
            <div class="bottom-box">
              <span class="time">{{ item.pubdate | relvTime }}</span>
            </div>
          </div>
        </div>
      </van-cell>
    </van-list>

    <!-- 发表区域 -->
    <div class="send-box">
      <van-field @keyup.enter="send" v-model="msg" center clearable placeholder="发表你的观点">
        <template #button>
          <van-button @click="send" size="small" type="info">发布</van-button>
        </template>
      </van-field>
    </div>
  </div>
</template>

<script>
import { cmtListAPI, sendCmtAPI } from '@/api/index.js'
export default {
  props: ['cmt'],
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      offset: null,
      msg: '',
      replyShow: true
    }
  },
  methods: {
    async onLoad() {
      // 加载回复数据
      const res = await cmtListAPI({
        type: 'c',
        // 因为获取的是回复，所以这里要传当前评论的id
        source: this.cmt.com_id,
        offset: this.offset
      })
      // 把数据存起来
      this.list.push(...res.data.data.results)
      // 把下一页的开头id也存起来方便查下一页
      this.offset = res.data.data.last_id

      // 把本次加载状态改成false
      this.loading = false
      // 判断全部加载完
      if (res.data.data.end_id === res.data.data.last_id) {
        this.finished = true
      }
    },
    // 发送的点击事件
    async send() {
      // 非空判断
      if (this.msg === '') return this.$toast('请输入点评论内容')

      // 代表不为空，就要发请求
      const res = await sendCmtAPI({
        // 对文章评论传入文章id
        target: this.cmt.com_id,
        content: this.msg,
        art_id: this.$route.query.id
      })

      // 把发表成功后的评论加到数组的最前面，就不用刷新也能看到数据了
      this.list.unshift(res.data.data.new_obj)

      // 清空输入框
      this.msg = ''
      // 提示成功
      this.$toast.success('评论成功！')
    }
  }
}
</script>

<style lang="less" scoped>
.cmt-box {
  display: flex;

  .van-image {
    width: 40px;
    height: 40px;
  }

  .info-box {
    margin-left: 10px;
    flex: 1;
    .name {
      color: #466b9d;
    }

    .bottom-box {
      .time {
        color: gray;
      }
      .van-button {
        vertical-align: middle;
      }
    }
  }
}

.send-box {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
}
</style>
