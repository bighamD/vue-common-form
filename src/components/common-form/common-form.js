import { noop, wrapAsFunction, isFun } from '@/utils/index'
import { ELEMENTS } from '../../utils/assemble'

export default {
  name: 'CommonForm',
  props: {
    formData: {
      type: Object,
      required: true
    },
    formConfig: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      formInstance: null
    }
  },
  // eslint-disable-next-line
  render (h) {
    const { props = {} } = this.formConfig
    console.log('rerender', this)
    return (
      <el-form
        ref='_form'
        rules={this.genRules()}
        validate-on-rules-change={false}
        props={{
          model: this.formData,
          ...props
        }}
        {...{ attrs: this.$attr }}
      >
        {
          <el-row gutter={props.gutter || 20}>
            {this.formConfig.formItems.map(this.genFormItems)}
          </el-row>
        }
        {this.$scopedSlots.footer && this.$scopedSlots.footer(this.props)}
      </el-form>
    )
  },
  methods: {
    genRules () {
      return this.formConfig.formItems.reduce((rules, { key, validators }) => {
        validators && (rules[key] = validators)
        return rules
      }, {})
    },
    genFormItems (item, idx) {
      const { props = {} } = this.formConfig
      const span = item.span || props.span || 24
      const offset = item.offset || props.offset || 0

      if (!isFun(item.show)) {
        item.show = () => true
      }
      if (!isFun(item.appendLabel)) {
        item.appendLabel = noop
      }

      return (
        <el-col span={span} offset={offset}>
          {item.appendLabel()}
          <el-form-item
            style={item.show(this.formData, item) ? {} : { display: 'none' }}
            labelWidth={item.labelWidth}
            key={idx}
            required={item.required}
            prop={item.key}
            label={item.label}
          >
            {this.genFormCell(item, idx)}
          </el-form-item>
        </el-col>
      )
    },
    /**
     *
     * @param {*} events @keyup.native这种带修饰符事件在vue-jsx需要使用nativeOn, 其余on
     */
    sortEvents (events) {
      const eventContainer = {
        nativeOn: {},
        on: {}
      }
      Object.keys(events).forEach(key => {
        const type = /\.native/.test(key) ? 'nativeOn' : 'on'
        eventContainer[type][key] = events[key]
      })
      return eventContainer
    },
    genFormCell (cellData, index) {
      const {
        el: Unit,
        render,
        appendText = noop,
        insertText = noop,
        props = {},
        options = [],
        formatter = noop,
        key,
        placeholder,
        disabled = false,
        events = {}
      } = cellData

      const disabledFn = wrapAsFunction(disabled)
      const optionsFn = wrapAsFunction(options)

      if (/^el-/.test(Unit)) {
        const FormUnit = (
          <Unit
            disabled={disabledFn(cellData)}
            placeholder={placeholder}
            value={this.formData[key]}
            onInput={val => this.handleInput({ val, key, index })}
            onChange={val => this.handleChange({ val, key, index })}
            {...{ attrs: props, ...this.sortEvents(events) }}
          >
            {optionsFn(cellData)?.map(opt => {
              const Opt = opt.el
              const attrs = opt.attrs
              return (
                <Opt value={opt.value} label={opt.label} {...{ attrs }}>
                  {Opt === ELEMENTS.Radio ? opt.value : ''}
                </Opt>
              )
            })}
            {insertText.call(this, this.formData[key], formatter)}
          </Unit>
        )
        if (appendText) {
          return (
            <span>
              {FormUnit}
              {appendText.call(this, this.formData[key], formatter)}
            </span>
          )
        }
        return FormUnit
      } else if (Unit === 'slot') {
        return this.$scopedSlots[key]({
          key,
          [key]: this.formData[key],
          index
        })
      } else if (typeof render === 'function') {
        // form-item提供的是render
        return render.call(this, this.formData[key])
      }
    },

    handleEvent (eventName, { val, key, index }) {
      if (!Object.getOwnPropertyDescriptor(this.formData, key)?.get) {
        this.$set(this.formData, key, val)
      } else {
        this.formData[key] = val
      }
      this.$emit(eventName, { val, key, index })
    },
    handleInput (source) {
      // 触发输入事件，可以通知外部是哪个item正在被修改，这样就不需要watch某个属性
      this.handleEvent('input', source)
    },
    handleChange (source) {
      this.handleEvent('change', source)
    },
    validate () {
      return this.formInstance.validate()
    },
    clearValidate () {
      return this.formInstance.clearValidate()
    },
    resetFields () {
      return this.formInstance.resetFields()
    },
    getFormInstance () {
      return this.formInstance || (this.formInstance = this.$refs._form)
    }
  },
  mounted () {
    this.getFormInstance()
  }
}
