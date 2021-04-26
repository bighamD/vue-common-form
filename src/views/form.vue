<script>
import Form2 from "./form2";
import { ELEMENTS } from "@/utils/assemble";

export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  // eslint-disable-next-line
  render(h) {
    return (
      <el-button type="danger" onClick={this.invoke}>
        invoke dialog
      </el-button>
    );
  },
  data() {
    return {
      FORM_CONFIG: {
        props: {
          labelWidth: "120px",
          // inline: true,
        },
        formItems: [
          {
            key: "instruction",
            label: "介绍",
            el: ELEMENTS.Input,
            showCondition: () => this.formData.checked === "yes", //条件显示
            validators: [
              { required: true, message: "请输入自我介绍", trigger: ["blur"] },
            ],
            props: {
              name: 2345,
              type: "textarea",
            },
          },
          {
            key: "pid",
            label: "番号",
            el: ELEMENTS.Select,
            options: [
              {
                value: "选项1",
                label: "黄金糕",
                el: ELEMENTS.Option
              },
              {
                value: "选项2",
                label: "双皮奶",
                el: ELEMENTS.Option
                
              },
              {
                value: "选项3",
                label: "蚵仔煎",
                el: ELEMENTS.Option

              },
            ],
            events: {
              change: e => {
                console.log('option changed', e);
              }
            }
          },
          {
            key: "checked",
            label: "是否可选",
            el: ELEMENTS.RadioGroup,
            formatter: (key) => {
              return { 1: "是", 0: "否" }[key];
            },
            options: [
              { label: "0", value: '否', el: ELEMENTS.Radio },
              { label: "1",value: '是', el: ELEMENTS.Radio },
            ],
            appendText: (text, formatter) => {
              return (
                <span style="color:#F56C6C;margin-left:20px">
                  {formatter(text)}
                </span>
              );
            },
          },
          {
            key: "hobby",
            label: "爱好",
            el: ELEMENTS.CheckboxGroup,
            options: [
              { label: "football", el: ELEMENTS.Checkbox },
              { label: "swimming", el: ELEMENTS.Checkbox },
            ],
          },
          { key: "avName", label: "片名", el: ELEMENTS.Input },
          {
            key: "avNo",
            label: "番号",
            el: ELEMENTS.Input,
            disabled: true,
          },
          {
            key: "switch",
            label: "是否使用迅雷",
            el: ELEMENTS.Switch,
            props: {
              "active-color": "#13ce66",
              "inactive-color": "#ff4949",
            },
            formatter: (t) => ({ true: "是", false: "否" }[!!t]),
            appendText: (text, formatter) => {
              return (
                <span style="color:red;margin-left:20px">
                  {formatter(text)}
                </span>
              );
            },
          },
          {
            key: "upload",
            label: "实名验证",
            el: ELEMENTS.Upload,
            btnText: "上传",
            insertText: () => {
              return (
                <span>
                  <el-button size="small" type="primary">
                    上传
                  </el-button>
                  <div slot="tip" class="el-upload__tip">
                    只能上传jpg/png文件，且不超过500kb
                  </div>
                </span>
              );
            },
            props: {
              action: "https://jsonplaceholder.typicode.com/posts/",
            },
          },
          {
            key: "rate",
            el: ELEMENTS.Rate,
            label: "评分",
            props: {
              colors: ["#99A9BF", "#F7BA2A", "#FF9900"],
            },
          },
          {
            key: "date",
            label: "时间",
            el: ELEMENTS.TimeSelect,
            placeholder: "选择时间",
            props: {
              "picker-options": {
                start: "08:30",
                step: "00:15",
                end: "18:30",
              },
            },
          },
          {
            key: "date2",
            label: "时间picker",
            el: ELEMENTS.TimePicker,
            placeholder: "选择时间",
            props: {
              "picker-options": {
                selectableRange: "18:30:00 - 20:30:00",
              },
            },
          },
          {
            key: "date3",
            label: "时间picker",
            el: ELEMENTS.DatePicker,
            placeholder: "选择日期",
            props: {
              type: "week",
              format: "yyyy 第 WW 周",
            },
          },
          {
            key: "render",
            label: "render函数",
            render: () => <el-progress percentage={80}></el-progress>,
          },
        ],
      },
      formData: {
        rate: 2,
        date2: "",
        date: "",
        render: "666",
        switch: "false",
        instruction: "",
        pid: "选项1",
        avName: "人妻诱惑",
        avNo: "SN7889",
        alias: "bigham",
        checked: "no",
        hobby: ["football"],
        date3: "",
      },
    };
  },
  methods: {
    change(item) {
      console.log(item);
    },
    async invoke() {
      window.J.postMessage({
        type: 'message',
        data: {
          formdata: this.formData,
          callback: '6767',
          callback: (res => {
            console.log('res', res)
          }).toString()
        }
      })
      
      var info = window.J.getMchInfo();
      console.log(info)

    var info2 = window.J.getAppId();
      console.log('appid', info2)
      // window.J.postMessage({
      //   type: 'navigateBack',
      //   data: {
      //     name: 1234,
      //   }
      // })
      setTimeout(() => {

        window.J.navigateBack();
      }, 1000)

      // return;
      const data = await this.$dialog.invoke({
        width: "50%",
        title: "新增配置",
        cancel: () => {
          // console.log("cancel event has triggered");
        },
        open: () => {
          // console.log("open event has triggered");
        },
        // footer() {
        //   return <el-button onClick={this.confirm}>提交</el-button>
        // },
        confirm: (hide, rs) => {
          setTimeout(() => {
            rs("显示下一个表单");
          }, 800);
        },
        render: () => {
          return (
            <CommonForm
              form-data={this.formData}
              form-config={this.FORM_CONFIG}
              onChange={this.change}
            ></CommonForm>
          );
        },
      });
      this.$dialog.invoke({
        title: data,
        editable: false, // 不显示dialog内置的确认取消footer
        render: () => <Form2></Form2>,
        confirmButtonText: "提交",
      });
    },
  },
};
</script>
