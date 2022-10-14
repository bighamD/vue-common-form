import Dialog from './promise-dialog'
import { noop } from '@/utils/index'
import Vue from 'vue'

const dialogInstances = {}

const newInstance = props => {
  const vm = new Vue({
    render: h => h(Dialog, props)
  })
  const component = vm.$mount()
  document.body.appendChild(component.$el)
  return vm.$children[0]
}

/**
 *
 * @param {*} name
 * @example
 */
const getDialogInstance = (name = '') => {
  return (dialogInstances[name] = dialogInstances[name] || newInstance())
}

export default {
  invoke ({
    name = '',
    title = '',
    render = noop,
    close = noop,
    open = noop,
    params = {},
    width = '50%',
    confirm = noop,
    cancel = noop,
    footer = null,
    confirmButtonText = '确认',
    cancelButtonText = '取消',
    editable = true,
    dialogProps = {}
  } = {}) {
    return getDialogInstance(name).invoke({
      editable,
      title,
      renderFn: render,
      open,
      close,
      cancel,
      params,
      width,
      confirm,
      dialogProps,
      footer,
      confirmButtonText,
      cancelButtonText
    })
  },
  hide (name) {
    getDialogInstance(name).hide()
  },
  next (name, payload) {
    getDialogInstance(name).resolve(payload)
  }
}
