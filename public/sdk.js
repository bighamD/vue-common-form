!(function (root, fatctory) {
    root.SDK = fatctory();
})(window, function () {
    const __ORIGIN__ = 'http://bigham.natapp1.cc/' // 父窗口
    const ACTION_MAP = {
        getAppId: 'getAppId',
        navigateBack: 'navigateBack',
        navigateToLogin: 'navigateToLogin',
        getMchInfo: 'getMchInfo',
        postMessage: 'postMessage',
        chooseImage: 'chooseImage',
        scanQRCode: 'scanQRCode',

    }
    // const top = window.top || window.parent;

    let top = null;

    window.addEventListener('load', () => {
        top = window.top;
        console.log('top-window', top)

        window.addEventListener('message', (e) => {
            const data = e.data;
            const {action, response} = data;
            console.log('action', action)
            console.log('message', action)

            console.log('response', e)
            
            if (action) {
                APIS[action].rs(response);
            }
        })
    })

    const APIS = {
        mchInfo: {},
        appId: {},
        scanQRCode: {},
        chooseImage: {}
    }

    const postMessagePromise = (action, params = {})=> {
        return new Promise((rs, rj) => {
            APIS[action] = {rs, rj};
            SDK.postMessage({
                action,
                params,
            })
        })
    }

    const SDK = {
        [ACTION_MAP.postMessage](data, origin = __ORIGIN__) {
            data.action = data.action || ACTION_MAP.postMessage;
            
            top.postMessage(data, origin);
        },
        [ACTION_MAP.navigateBack](params) {
            this.postMessage({
                action: ACTION_MAP.navigateBack,
                params,
            })
        },
        [ACTION_MAP.navigateToLogin](params) {
            this.postMessage({
                action: ACTION_MAP[navigateToLogin],
                params,
            })
        },
        [ACTION_MAP.getMchInfo](data) {
            return postMessagePromise(ACTION_MAP.getMchInfo, data);
        },
        [ACTION_MAP.getAppId](data) {
            return postMessagePromise(ACTION_MAP.getAppId, data);
        },
        [ACTION_MAP.scanQRCode](data) {
            return postMessagePromise(ACTION_MAP.scanQRCode, data);
        },
        [ACTION_MAP.chooseImage](data) {
            return postMessagePromise(ACTION_MAP.chooseImage, data);
        }
    }
    
    return SDK;
})
