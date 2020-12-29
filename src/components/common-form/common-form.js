import {noop} from '@/utils/index';

export default {
    name: 'CommonForm',
    props: {
        formData: {
            type: Object,
            required: true,
        },
        formItems: {
            type: Array,
            required: true
        },
        labelWidth: {
            type: String,
        },
        inline: {
            type: Boolean
        },
        rules: {
            type: Object,
        }
    },
    data() {
        return {
            formInstance: null,
        };
    },
    // eslint-disable-next-line
    render(h) {
        return (
            <el-form
                rules={this.rules}
                inline={this.inline}
                props={{ model: this.formData }}
                labelWidth={this.labelWidth}
            >
                {this.formItems.map((item, idx) => {
                    if (typeof item.showCondition !== 'function') {
                        item.showCondition = () => true;
                    }
                    return (
                        <el-form-item
                            style={item.showCondition(this.formData, item) ? {} : { display: 'none' }}
                            labelWidth={item.labelWidth}
                            key={idx}
                            required={item.required}
                            prop={item.key}
                            label={item.label}
                        >
                            {this.formCell(item, idx)}
                        </el-form-item>
                    );
                })}
                { this.$scopedSlots.footer ? this.$scopedSlots.footer(this.props) : '' }
            </el-form>
        );
    },
    methods: {
        formCell(cellData, index) {
            const {
                el: Unit,
                render,
                appendText = noop,
                props = {}, 
                options = [],
                formatter = noop, 
                key,
                placeholder,
                disabled = false,
                insertText = noop,
            } = cellData;

            if (/^el-/.test(Unit)) {
                const FormUnit = <Unit
                    disabled={disabled}
                    placeholder={placeholder}
                    value={this.formData[key]}
                    onInput={(e) => this.inputChangeHandle(e, key, index)}
                    onChange={(e) => this.changeHandle(e, key, index)}
                    {... { attrs: props }}
                >
                    {
                        options?.map(opt => {
                            const Opt = opt.el;
                            return (<Opt
                                value={opt.value}
                                label={opt.label}
                            >
                                {opt.value}
                            </Opt>);
                        })
                    }
                    {insertText.call(this, this.formData[key], formatter)}
                </Unit>;
                if (appendText) {
                    return (
                        <span>
                            {FormUnit}
                            {appendText.call(this, this.formData[key], formatter)}
                        </span>
                    );
                }
                return FormUnit;

            } else if (Unit === 'slot') {
                return this.$scopedSlots[key]({
                    key,
                    [key]: this.formData[key],
                    index,
                });
            } else if (typeof render === 'function') {
                return render.call(this, this.$createElement, this.$parent, formatter);
            }
        },
        inputChangeHandle(e, key, index) {
            this.formData[key] = e;
            // 触发输入事件，可以通知外部是哪个item正在被修改，这样就不需要watch某个属性
            this.$emit('input', {
                key,
                value: e,
                index,
            });
        },
        changeHandle(e, key, index) {
            this.formData[key] = e;
            this.$emit('change', {
                key,
                value: e,
                index,
            });
        },
    },
};