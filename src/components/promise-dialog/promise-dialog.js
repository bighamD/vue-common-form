import { noop, compose } from '@/utils/index';

export default {
    name: 'PromiseDialog',
    render(h) {
        // 如果是通过template使用common-form，提供v-slot="footer"可以自定义的尾部
        // 过是传递了footer函数，那么footer中的内容将会作为自定义的尾部
        return (
            <el-dialog
                width={this.width}
                onClose={this.hide}
                visible={this.visible} 
                title={this.title}
                onOpen={this.open}
            >
                {this?.renderFn.call(this, h, this.params)}
                {this.$scopedSlots.footer ? this.$scopedSlots.footer.call(this, this.params) : 
                    this.footer ?
                        this.footer.call(this, this.params)
                        : this.editable ? <div class="dialog-footer" style="text-align:right">
                            <el-button onClick={this.cancel}>{this.cancelButtonText}</el-button>
                            <el-button type="primary" onClick={this.confirm}>{this.confirmButtonText}</el-button>
                        </div> : ''
                }
            </el-dialog>
        );
    },
    data() {
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
        };
    },
    methods: {
        invoke(config) {
            this.getParams(config);
            return new Promise((resolve, reject) => {
                this.resolver = { resolve, reject };
            });
        },
        getParams(config) {
            const { confirm, close, cancel, ...rest } = config;

            Object.keys(rest).forEach((key) => this[key] = config[key]);

            this.confirm = async () => {
                return await confirm.call(this, this.hide, this.resolver.resolve);
            };

            this.cancel = compose(this.hide, cancel);
            this.close = compose(this.hide, close);
            this.visible = true;
        },
        hide() {
            this.visible = false;
        },
        resolve(v) {
            this.resolver.resolve(v);
        },
        reject(err) {
            this.resolver.reject(new Error(err));
        },
    },
};
