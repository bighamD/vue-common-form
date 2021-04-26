<template>
  <div id="app">
    <!-- <custom-form></custom-form> -->
    <el-button @click="back">回到页面</el-button>
    
    <el-button @click="msg">获取消息</el-button>
    <el-button @click="image">拍照</el-button>
    <el-button @click="scan">扫一扫</el-button>

  </div>
</template>

<script>
import CustomForm from '@/views/form.vue'

export default {
  name: 'App',
  components: {
    CustomForm
  }
  ,
  methods: {
    back() {
      console.log(location.href)
      SDK.navigateBack({
        redirectUrl: location.href
      })
    },
    msg() {

    },
    async image() {
      const res = await SDK.chooseImage();
      console.log('chooseImage ret', res)
    },
    scan() {
      SDK.scanQRCode();
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
