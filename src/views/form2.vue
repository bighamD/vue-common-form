<template>
  <CommonForm :form-data="formData" :form-config="formConfig">
    <template v-slot:age="">
      <el-input v-model="formData.age"></el-input>
    </template>
    <template v-slot:footer="">
      <el-row>
        <el-button @click="cancel">取消</el-button>
        <el-button type="danger">新增</el-button>
      </el-row>
    </template>
  </CommonForm>
</template>
<script>
export default {
  data () {
    return {
      formConfig: {
        props: {
          inline: true,
          labelWidth: '60px'
        },
        formItems: [
          {
            el: 'el-input',
            placeholder: '输入姓名',
            key: 'name',
            label: '姓名',
            events: {
              change: e => this.nameChange(e),
              input: e => this.nameInput(e)
            }
          },
          {
            el: 'slot',
            key: 'age',
            label: '年龄'
          }
        ]
      },
      formData: {
        age: 26
      }
    }
  },
  methods: {
    nameChange () {
      console.log('do something when name changed')
    },
    nameInput () {
      console.log('do something when name input')
    },
    cancel () {
      this.$dialog.close() //关闭这个对话框
    }
  }
}
</script>
