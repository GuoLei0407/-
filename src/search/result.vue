<template>
  <div>
    <van-nav-bar title="搜索结果" left-arrow @click-left="$router.go(-1)" />
    <van-list v-model="loading" @load="onLoad" :finished="finished">
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
    <van-cell v-if="noResults">
      <div class="nores">抱歉暂时还没有您要搜索的内容</div>
    </van-cell>
  </div>
</template>

<script>
import { seacrhAPI } from '@/api/index.js'
export default {
  data() {
    return {
      loading: false,
      list: [],
      page: 1,
      finished: false,
      noResults: false
    }
  },
  methods: {
    async onLoad() {
      const res = await seacrhAPI({
        page: this.page,
        q: this.$route.params.key
      })
      // 每次加载我们请求的页面都+1
      console.log(res)
      if (!res.data.data.results.length) {
        this.noResults = true
      } else {
        this.page++
        this.list.push(...res.data.data.results)
        // 本次请求完成
        this.loading = false
      }
      if (this.list.length >= res.data.data.total_count) {
        this.finished = true
      }
    }
  }
}
</script>

<style lang="less" scoped>
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
.nores {
  text-align: center;
  font-size: 16px;
}
</style>
