import PromiseDialog from './promise-dialog';

PromiseDialog.install = function (Vue) {
    Vue.component(PromiseDialog.name, PromiseDialog);
};

export default PromiseDialog;