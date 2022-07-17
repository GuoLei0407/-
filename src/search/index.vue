<template>
  <div>
    <van-nav-bar title="搜索" left-arrow @click-left="$router.go(-1)"></van-nav-bar>
    <van-search @input="onInput" v-model.trim="inputValue" show-action placeholder="请输入搜索关键词">
      <template #action>
        <van-button @click="onSearch" round icon="search" type="info">搜索</van-button>
      </template>
    </van-search>
    <!-- 历史记录 -->
    <van-cell-group v-if="!inputValue">
      <van-cell title="历史记录" />
      <van-cell class="hsList" v-for="(item, index) in historyList" :key="index" :title="item" />
    </van-cell-group>
    <!-- 查询结果 -->
    <van-cell-group v-else-if="inputValue">
      <van-cell icon="search" v-for="(item, index) in suggestList" :key="index" :title="item" />
    </van-cell-group>
  </div>
</template>

<script>
import { suggestAPI } from '../api/index.js'
export default {
  data() {
    return {
      inputValue: '',
      suggestList: [],
      historyList: JSON.parse(localStorage.getItem('toutiao-history')) || []
    }
  },
  methods: {
    onSearch() {
      if (this.inputValue) {
        // 输入关键词不为空才执行代码
        if (this.historyList.includes(this.inputValue) === false) {
          // 如果输入的关键词历史记录数组里面没有就执行代码
          this.historyList.push(this.inputValue)
          localStorage.setItem('toutiao-history', JSON.stringify(this.historyList))
        }
        // 两种路由的写法：
        // 写路由path的时候对应两种不同的写法
        this.$router.push('/search/result/' + this.inputValue) // =》path: '/search/result/:key',:key就是inputValue =》通过this.$route.params.key使用，param:对象，包含路由中的动态片段和全匹配片段的键值对。
        // this.$router.push('/search/result?sq=' + this.inputValue) // =》path:'/search/result' ,因为?后面携带的是查询参数， =》 通过this.$route.query.sq使用，，query:对象，包含路由中查询参数的键值对
      }
    },
    async onInput() {
      if (this.inputValue) {
        const res = await suggestAPI({
          q: this.inputValue
        })

        if (res.data.data.options[0] == null) {
          // 解决当输入的关键词没有联想结果是，后端返回null控制台报错的问题
          this.suggestList = []
        } else {
          this.suggestList = res.data.data.options
        }
      }
    }
  }
}
</script>

<style>
.hsList {
  font-size: 14px;
  color: rgba(204, 204, 204, 0.938);
}
</style>
