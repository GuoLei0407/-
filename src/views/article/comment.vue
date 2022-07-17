<template>
  <div>
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
              <van-button @click="doReply(item)" size="mini">回复（{{ item.reply_count }}）</van-button>
            </div>
          </div>
          <van-icon name="like-o" />
        </div>
      </van-cell>
    </van-list>
    <!-- 发布区域 -->
    <div class="send-box">
      <van-field v-model.trim="content" center clearable placeholder="说说你的看法吧">
        <template #button>
          <van-button size="small" type="info" @click="submit">发布</van-button>
        </template>
      </van-field>
    </div>
    <van-action-sheet v-model="replyShow" title="回复列表">
      <reply v-if="replyShow" :cmt="cmt"></reply>
    </van-action-sheet>
  </div>
</template>

<script>
import { cmtListAPI, sendCmtAPI } from '@/api/index.js'
import Reply from './reply.vue'
export default {
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      offset: null, // 传给服务器，表示获取的评论的位置，null表示从第一页开始
      content: '',
      replyShow: false,
      // 声明一个变量，用于将该组件的数据传给子组件reply
      cmt: {}
    }
  },
  components: {
    Reply
  },
  methods: {
    async onLoad() {
      // console.log(this.$route.query.id)
      const res = await cmtListAPI({
        type: 'a',
        source: this.$route.query.id,
        offset: this.offset,
        limit: '1'
      })
      // console.log(res)
      // 把数据存起来
      this.list.push(...res.data.data.results)
      // 将本次请求的最后一条评论的id记录下来，方便下次请求是交给服务器
      this.offset = res.data.data.last_id
      // 把本次加载状态改成false
      this.loading = false
      // 判断全部加载完
      if (res.data.data.end_id === res.data.data.last_id) {
        this.finished = true
      }
    },
    async submit() {
      if (this.content !== '') {
        const res = await sendCmtAPI({
          target: this.$route.query.id,
          content: this.content
        })
        // console.log('发布成功', res)
        this.$toast.success('ok')
        this.content = ''
        // unshift() 方法可向数组的开头添加一个或更多元素，并返回新的长度
        this.list.unshift(res.data.data.new_obj)
      } else {
        this.$toast.fail('请输入评论内容')
      }
    },
    doReply(item) {
      // 给子组件把被点的这行数据传递过去
      this.cmt = item
      // 显出回复列表
      this.replyShow = true
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
