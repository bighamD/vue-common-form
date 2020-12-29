import CommonForm from '@/components/common-form/index';
import PromiseDialog from '@/components/promise-dialog/index';
import CommandDialog from '@/components/promise-dialog/instance-dialog';

const components = [
    CommonForm,
    PromiseDialog,
];

const install = function (Vue) {
    components.forEach(component => {
        Vue.component(component.name, component);
    });
    Vue.prototype.$dialog = CommandDialog;
};

export default {
    install,
    CommonForm,
    PromiseDialog,
};