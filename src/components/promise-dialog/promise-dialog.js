import { noop, compose } from '@/utils/index'

export default {
  name: 'PromiseDialog',
  // eslint-disable-next-line
  render (h) {
    // 如果是通过template使用common-form，提供v-slot="footer"可以自定义的尾部
    // 过是传递了footer函数，那么footer中的内容将会作为自定义的尾部
    return (
      <el-dialog
        ref='ddd'
        width={this.width}
        onClose={this.hide}
        visible={this.visible}
        title={this.title}
        onOpen={this.open}
        close-on-click-modal={false}
        footer={true}
        props={{ ...this.dialogProps }}
        scopedSlots={{
          title: this.titleRender
        }}
      >
        {this.renderFn()}
        {this.renderFooter()}
      </el-dialog>
    )
  },
  data () {
    return {
      title: '',
      width: '50%',
      renderFn: noop,
      open: noop,
      close: noop,
      visible: false,
      resolver: {},
      params: {},
      footer: null,
      confirm: noop,
      cancel: noop,
      cancelButtonText: '取消',
      confirmButtonText: '确认',
      editable: true,
      dialogProps: {},
      titleRender: noop,
      defaultFooter: () => (
        <div class='dialog-footer' style='text-align:right'>
          <el-button onClick={this.cancel}>{this.cancelButtonText}</el-button>
          <el-button type='primary' onClick={this.confirm}>
            {this.confirmButtonText}
          </el-button>
        </div>
      )
    }
  },
  methods: {
    renderFooter () {
      if (typeof this.footer === 'function') {
        return this.footer()
      }

      return this.defaultFooter()
    },
    invoke (config) {
      this.getParams(config)
      return new Promise((resolve, reject) => {
        this.resolver = { resolve, reject }
      })
    },
    getParams (config) {
      const { confirm, close, cancel, ...rest } = config

      Object.keys(rest).forEach(key => (this[key] = config[key]))
      if (typeof config.title === 'function') {
        this.title = null
        this.titleRender = config.title
      }

      this.confirm = confirm.bind(this, this.next)
      this.cancel = compose(this.hide, cancel)
      this.close = compose(this.hide, close)
      this.visible = true
    },
    next (cfg) {
      this.resolver.resolve(cfg)
      this.hide()
    },
    hide () {
      this.visible = false
    },
    resolve (v) {
      this.resolver.resolve(v)
    },
    reject (err) {
      this.resolver.reject(new Error(err))
    }
  }
}
