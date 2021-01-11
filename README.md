# Vue Common Form
**功能**
- 通过form-item数组配置需要表单的元素
- 如果结构单一可以直接通过指定el属性，比如el-input
- 可以通过insertText把额外的内容插入到这个el的子元素尾部
- 可以通过appendText将额外的内容作为兄弟元素插入
- 如果el属性已经不满足需求，可以使用render函数传入自定义的form-item内容
- 如果在template中使用Common-Form可以使用具名插槽v-slot:name指定内容
- 提供input、change事件，传递的参数是当前item，通知外部正在修改的item，这个的好处就是可以减少使用watch，不必去监听formData
- 条件显示showCondition, 可以根据条件是否显示当前item，TODO: 可以修改为异步逻辑，async
- 额外的属性通过props属性传递，会被直接渲染为DOM property，这个属性十分关键

# Vue Promise dialog
**功能**
- 不用管理visible变量，而且可以把每个dialog拆成独立的组件，直接通过invoke方法呼出一个对话框，当需要关闭的是可以使用hide回调或者this.$dialog.hide(name)关闭整个例子
- invoke返回一个promise，可以主动resolve这个promise，有以下两种方式
    1. 使用confirm回调中的第二个参数resolve
    2. 使用this.$dialog.next(name, payload)
- 通过name维护各自的dialog实例，invoke相同name的dialog实际上只是在替换里面的内容，关闭的时候也要指定关闭对话框的name

> 为什么会返回一个promise，主要是有些业务场景在一个对话框关闭的时候需要弹出下个对话框，而且他们的数据是关联，比如上个对话框请求回来的数据需要在下个对话框中渲染