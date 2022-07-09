<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar title="编辑资料" left-arrow @click-left="$router.push('/layout/mine')" />

    <!-- 头像区域 -->
    <!-- 用uploader组件提交头像
    before-read 函数可以在上传前进行校验和处理，返回 true 表示校验通过，返回 false 表示校验失败
    after-read 文件读取完成后的回调函数
    -->
    <van-uploader :before-read="beforeRead" style="width: 100vw" :after-read="afterRead">
      <div class="avatar-box">
        <van-image round class="avatar" fit="cover" :src="info.photo" />
      </div>
    </van-uploader>
    <!-- 资料区域 -->
    <van-cell-group>
      <van-cell title="名称" :value="info.name" is-link @click="nameShow = true" />
      <!-- 我们的接口性别返回1和0，用1代表男，用0代表女 -->
      <!-- 1其实就是true,0就是false -->
      <van-cell title="性别" :value="info.gender ? '男' : '女'" is-link @click="sexShow = true" />
      <van-cell title="生日" :value="info.birthday" is-link @click="birthdayShow = true" />
    </van-cell-group>
    <!-- 弹出框 - 修改名字 -->
    <van-popup v-model="nameShow" style="width: 80%">
      <h3 class="title">修改姓名</h3>
      <van-field :value="info.name" @input="username = $event"></van-field>
      <div class="btn">
        <van-button type="primary" @click="nameShow = false">取消</van-button>
        <van-button type="primary" @click="nameSubmit">确定 </van-button>
      </div>
    </van-popup>
    <!-- 修改性别栏 -->
    <van-popup v-model="sexShow" position="bottom" style="width: 100%; height: 40%">
      <van-nav-bar title="修改性别" left-text="返回" @click="sexShow = false" />
      <van-cell title="男" is-link @click="genderSubmit(1)" />
      <van-cell title="女" is-link @click="genderSubmit(0)" />
    </van-popup>
    <!-- 修改生日栏 -->
    <van-popup v-model="birthdayShow" position="bottom" style="width: 100%; height: 40%">
      <van-datetime-picker v-model="birthday" type="date" title="选择年月日" :min-date="minDate" :max-date="maxDate" @cancel="birthdaySubmitclick" @confirm="birthdaySubmit" />
    </van-popup>
    <!-- 修改头像 -->
    <van-popup v-model="imgShow" style="width: 100%; height: 100%">
      <van-nav-bar title="裁剪头像" />
      <!-- autoCrop 表示是否自动生成截图框默认为true , cropImg为截图框中的图片也是我们要传给服务器的图片， -->
      <!-- ref是vue中用来操作dom的方法 相当于是加了个ID 通过this.$refs来获取 -->
      <VueCropper ref="cropper" :img="cropImg" autoCrop autoCropWidth="200px" autoCropHeight="200px"></VueCropper>
      <div class="imgBtn">
        <van-button type="primary" @click="imgShow = false">取消</van-button>
        <van-button type="primary" @click="cropClick">确定 </van-button>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { userProfilePatchAPI, userPhotoPatchAPI } from '@/api/index.js'
// 调用图片剪切组件，用来提交头像信息的时候对头像进行剪切
import { VueCropper } from 'vue-cropper'
// 调用js日期处理库来格式化我们修改的日期
import moment from 'moment'
export default {
  data() {
    return {
      // 名称栏相关数据
      nameShow: false,
      username: '',
      // 性别栏相关数据
      sexShow: false,
      // 生日栏相关数据
      birthdayShow: false,
      minDate: new Date(1900, 0, 1),
      maxDate: new Date(),
      birthday: new Date(this.$store.state.userinfo.birthday),
      // 头像框相关数据
      imgShow: false,
      cropImg: ''
    }
  },
  components: {
    VueCropper
  },
  // 直接访问修改页bug: 直接访问修改页或者在修改页面当场刷新，都会发现不会显示数据
  // 原因：因为vuex里的数据要发请求获取，而这个请求是在 mine/index.vue页面发的，如果你没访问这个页面，相当于没有请求，那么vuex里的数据就是空的，所以修改页上不会有任何显示
  // 解决方法： 所以我们在mine和edit里面都发起请求，但是要给请求一个限制，只有在用户信息没有的时候才发起
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
  // 对上面的请求进行了优化，因为如果多个组件都需要调用同一个请求方法，我们就把它写到vuex的action里面
  // 然后其他的组件直接调用action里面的请求方法就可以了
  created() {
    this.$store.dispatch('reqUserInfo')
  },
  computed: {
    // 相当于就是state里的userinfo起了一个别名叫info
    info() {
      console.log(this.$store.state.userinfo)
      return this.$store.state.userinfo
    }
  },
  methods: {
    // 我们将提交修改信息封装成统一的方法，后面修改什么信息，我们就调用这个方法，并传入对应从参数
    async setSubmit(key, value) {
      // 进行判断，判断更改后的数据是不是与之前的一样，如果是就不改
      if (value === '' || value === this.info[key]) {
        this.$toast.fail('不想改可以不改')
        // eslint-disable-next-line no-useless-return
        return
      }
      // 调用提交API将用户数据提交给服务器
      await userProfilePatchAPI({
        [key]: value
      })
      // 刷新vuex中的用户数据
      this.$store.commit('setUserInfos', {
        ...this.info,
        [key]: value
      })
      this.$toast.success('修改成功')
    },
    // 提交修改后名称的方法
    async nameSubmit() {
      this.setSubmit('name', this.username)
      this.nameShow = false
    },
    // 提交修改性别的方法
    async genderSubmit(a) {
      this.setSubmit('gender', a)
      this.sexShow = false
    },
    // 提交修改后生日的方法:
    // 用户取消日期选择的方法
    birthdaySubmitclick() {
      // 不涉及信息提交，不用调用setSubmit方法所以是同步的
      this.birthdayShow = false
      // 用户取消选择了，我们还是要将他的生日变回原来的生日
      this.birthday = new Date(this.info.birthday)
    },
    async birthdaySubmit() {
      await this.setSubmit(
        'birthday',
        // 格式化日期
        moment(this.birthday).format('YYYY-MM-DD')
      )
    },
    beforeRead(file) {
      // 定义limittype来检查图片格式是不是jpg或者png 是就为true不是就是false
      const limitType = file.type === 'image/jpeg' || file.type === 'image/png'
      // 如果不是提示重新更改格式
      if (!limitType) {
        this.$toast.fail('请上传正确格式')
      }
      // 限制图片大小
      // 因为file.size返回的是图片有多少B，除以两个1024后就是MB了
      const limitSize = file.size / 1024 / 1024 < 1
      if (!limitSize) {
        this.$toast.fail('图片太大了，要小于1MB')
      }
      // 返回一个布尔值，&&只有两侧都为true才能为true，不然就是false
      // tip: &&对比&的优势是具有短路功能，如果左边第一个技术的条件为false了就直接返回false右边的条件就不用计算了
      return limitType && limitSize
    },
    afterRead(res) {
      // res就是图片读取完成后返回的对象，res.content就是我们的图片了
      console.log(res)
      this.imgShow = true
      this.cropImg = res.content
    },
    cropClick() {
      // 上传图片需要另外一个API接口，我们这里直接写一个箭头函数 就不用setSubmit()这个方法了
      // eslint-disable-next-line space-before-function-paren
      this.$refs.cropper.getCropBlob(async (data) => {
        // 因为ajax是没办法直接上传文件的
        // 所以我们借用FormData()对象,我们将图片数据放到formdata对象中进行提交
        const formdata = new FormData()
        formdata.append('photo', data)
        console.log(formdata)
        const res = await userPhotoPatchAPI(formdata)
        this.imgShow = false
        this.$toast.success('图片上传成功')
        // 同时修改vuex中state的userinfo数据
        this.$store.commit('setUserInfos', {
          ...this.info,
          photo: res.data.data.photo
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
.van-uploader {
  height: 140px;
  display: flex;
  // 设置主轴居中和副轴居中就能水平垂直都居中了
  justify-content: center;
  align-items: center;

  .avatar {
    width: 120px;
    height: 120px;
  }
}
.van-popup {
  text-align: center;
  .btn {
    display: flex;
    .van-button {
      flex: 1;
      // justify-content: space-between;
    }
  }
  .imgBtn {
    display: flex;
    .van-button {
      flex: 1;
    }
  }
}
.van-nav-bar__text {
  color: aliceblue;
}
</style>
