<template>
  <el-button type="danger" @click="invoke">
    Invoke Dialog 1
  </el-button>
</template>
<script>
import Form2 from './form2'
import { ELEMENTS } from '@/utils/assemble'

export default {
  name: 'Form1',
  props: {
    msg: String
  },
  data () {
    return {
      options: [],
      FORM_CONFIG: {
        dym: {
          options: []
        },
        props: {
          labelWidth: '120px'
          // inline: true,
        },
        formItems: [
          {
            span: 18,
            key: 'instruction',
            label: '介绍',
            el: ELEMENTS.Input,
            show: () => this.formData.pid === '选项1', //条件显示
            validators: [
              { required: true, message: '请输入自我介绍', trigger: ['blur'] }
            ],
            props: {
              type: 'textarea'
            }
          },
          {
            // span: 12,
            key: 'pid',
            label: '番号',
            el: ELEMENTS.Select,
            options: [
              {
                value: '选项1',
                label: '黄金糕',
                el: ELEMENTS.Option
              },
              {
                value: '选项2',
                label: '双皮奶',
                el: ELEMENTS.Option
              },
              {
                value: '选项3',
                label: '蚵仔煎',
                el: ELEMENTS.Option
              }
            ],
            events: {
              change: e => {
                console.log('option changed', e)
              }
            }
          },
          {
            key: 'checked',
            label: '是否可选',
            el: ELEMENTS.RadioGroup,
            formatter: key => {
              return { 1: '是', 0: '否' }[key]
            },
            options: [
              { label: '0', value: '否', el: ELEMENTS.Radio },
              { label: '1', value: '是', el: ELEMENTS.Radio }
            ],
            events: {
              change: v => {
                if (v === '0') {
                  this.FORM_CONFIG.dym.options = []
                } else {
                  this.FORM_CONFIG.dym.options = [
                    { label: 'football', el: ELEMENTS.Checkbox },
                    { label: 'swimming', el: ELEMENTS.Checkbox }
                  ]
                }
              }
            }
          },
          {
            key: 'hobby',
            label: '爱好',
            el: ELEMENTS.CheckboxGroup,
            options: () => this.FORM_CONFIG.dym.options
          },
          { key: 'avName', label: '片名', el: ELEMENTS.Input },
          {
            key: 'phone',
            label: '手机号码',
            el: ELEMENTS.Input,
            disabled: true
          },
          {
            key: 'switch',
            label: '是否使用迅雷',
            el: ELEMENTS.Switch,
            props: {
              'active-color': '#13ce66',
              'inactive-color': '#ff4949'
            },
            formatter: t => ({ true: '是', false: '否' }[!!t]),
            appendText: (text, formatter) => {
              return (
                <span style='color:red;margin-left:20px'>
                  {formatter(text)}
                </span>
              )
            }
          },
          {
            key: 'upload',
            label: '实名验证',
            el: ELEMENTS.Upload,
            insertText: () => {
              return (
                <span>
                  <el-button size='small' type='primary'>
                    上传
                  </el-button>
                  <div slot='tip' class='el-upload__tip'>
                    只能上传jpg/png文件，且不超过500kb
                  </div>
                </span>
              )
            },
            props: {
              action: 'https://jsonplaceholder.typicode.com/posts/'
            }
          },
          {
            key: 'rate',
            el: ELEMENTS.Rate,
            label: '评分',
            props: {
              colors: ['#99A9BF', '#F7BA2A', '#FF9900']
            }
          },
          {
            key: 'date',
            label: '时间',
            el: ELEMENTS.TimeSelect,
            placeholder: '选择时间',
            span: 14,
            props: {
              'picker-options': {
                start: '08:30',
                step: '00:15',
                end: '18:30'
              }
            }
          },
          {
            key: 'date2',
            label: '时间picker',
            el: ELEMENTS.TimePicker,
            placeholder: '选择时间',
            props: {
              'picker-options': {
                selectableRange: '18:30:00 - 20:30:00'
              }
            }
          },
          {
            key: 'date3',
            label: '时间picker',
            el: ELEMENTS.DatePicker,
            placeholder: '选择日期',
            props: {
              type: 'week',
              format: 'yyyy 第 WW 周'
            }
          },
          {
            key: 'render',
            label: 'render函数',

            render: () => <el-progress percentage={80}></el-progress>
          },
          {
            label: '自定义组件: ',
            key: '',
            render: () => <HelloWorld msg='hello wms' />
          }
        ]
      },
      formData: {
        rate: 2,
        date2: '',
        date: '',
        render: '666',
        switch: 'false',
        instruction: '1231234',
        pid: '选项1',
        avName: 'A567',
        avNo: 'SN7889',
        alias: 'bigham',
        checked: 'no',
        hobby: ['football'],
        date3: ''
      }
    }
  },
  methods: {
    change (item) {
      console.log(item)
    },

    restore () {
      console.log('format', this.formData)
      this.$refs.form1.resetFields()
    },
    async invoke () {
      const data = await this.$dialog.invoke({
        width: '50%',
        title: 'Dialog Title',
        cancel: () => {},
        open: () => {},
        cancelButtonText: '',
        confirmButtonText: '下一步',
        // footer() {
        //   return <el-button onClick={this.confirm}>提交</el-button>
        // },
        confirm: next => {
          next('显示下一个表单')
        },
        render: () => {
          return (
            <div>
              <el-button onClick={this.restore}>Restore</el-button>
              <CommonForm
                ref='form1'
                name='form1'
                class='form'
                style={{ border: '1px solid red' }}
                form-data={this.formData}
                form-config={this.FORM_CONFIG}
                onChange={this.change}
              ></CommonForm>
            </div>
          )
        }
      })
      this.$dialog.invoke({
        // dialogProps: {
        //   modal: false,
        // },
        title: data,
        editable: false, // 不显示dialog内置的确认取消footer
        render: () => <Form2></Form2>,
        confirmButtonText: '提交',
        footer: () => null
      })
    }
  }
}
</script>
