<template>
  <van-action-sheet v-model="isShow" title="频道管理">
    <div class="content">
      <div class="my">
        <span class="my-title">我的频道</span>
        <!-- 通过给span添加click事件，来使span被点击的时候，内容会在取消和编辑来回改变 -->
        <van-button type="danger" plain size="mini" class="my-btn" @click="edit = !edit">
          {{ edit ? '取消' : '编辑' }}
        </van-button>
      </div>
      <van-grid>
        <van-grid-item v-for="(item, index) in channelList" :key="item.id" @click="itemClick(index)">
          <span :class="{ active: value === index }">{{ item.name }}</span>
          <van-icon v-if="edit && item.name !== '推荐'" class="close" name="cross" @click="delItem(index)"></van-icon>
        </van-grid-item>
      </van-grid>
      <!-- 可选频道 -->
      <div class="select">
        <span class="my-title">可选频道</span>
        <van-grid>
          <van-grid-item v-for="i in newList" :key="i.id" :text="i.name" @click="selectClick(i)" />
        </van-grid>
      </div>
    </div>
  </van-action-sheet>
</template>

<script>
import { allChannelAPI } from '@/api/index.js'
export default {
  props: {
    channelList: {
      type: Array,
      require: true
    },
    value: {
      // 一个组件上的 v-model 默认会利用名为 value 的 prop ,所以这个vlaue就是我们在父组件里面对该组件绑的v-model的值，也就是父组件中的active
      type: Number,
      required: true
    }
  },
  data() {
    return {
      isShow: false,
      edit: false,
      allChannel: []
    }
  },
  computed: {
    // 我们在计算属性里面对Alllist过滤一下，将我的频道里面有的频道剔出出去
    newList() {
      return this.allChannel.filter((item) => {
        // 思路： item是所有频道里面的元素， i是我的频道里面的元素，然后通过find()方法 找到 i.id === item.id 的元素也就是找到我的频道和所有频道里面一样的频道
        const result = this.channelList.find((i) => i.id === item.id)
        return !result // 返回对result取反的值，也就是我的频道里面没有的频道
      })
    }
  },
  mounted() {
    this.getAlllist()
  },
  methods: {
    async getAlllist() {
      const res = await allChannelAPI()
      console.log(res)
      this.allChannel = res.data.data.channels
    },
    itemClick(index) {
      this.isShow = false
      this.$emit('input', index) // 一个组件上的 v-model 默认会利用名为 value 的 prop 和名为 input 的事件
      // 我的理解： 当一个自定义组件用v-model的时候它本身就自带一个value的prop和一个input的事件，这都是不需要单独去声明
    },
    delItem(index) {
      this.$emit('setList', { method: 'splice', value: index })
      if (index < this.value) {
        this.$emit('input', this.value - 1) // 让当前显示的频道也跟我们频道的删减同步，
        // 假如当前频道索引为5，我们删掉了索引4的频道，频道数组发生变化，当前频道索引向前进一，
        // 而父组件中用于控制当前频道显示的数据value仍然为5，就会导致当前频道发送改变，变成后一个频道也就是原本索引为6的频道
      }
    },
    selectClick(i) {
      this.$emit('setList', { method: 'push', value: i })
    }
  }
}
</script>

<style lang="less" scoped>
.content {
  padding: 15px;
  .my {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .my-title {
    font-size: 16px;
    font-weight: 500;
  }
  .close {
    position: absolute;
    top: 3px;
    right: 3px;
  }
  .active {
    color: red;
  }
}
</style>
