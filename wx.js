// 微信api常用方法
export default {
    // 图片转base64
    getBase64(imgUrl,callback) {
        window.URL = window.URL || window.webkitURL;
        var xhr = new XMLHttpRequest();
        xhr.open("get", imgUrl, true);
        // 至关重要
        xhr.responseType = "blob";
        xhr.onload = function () {
            if (this.status == 200) {
                //得到一个blob对象
                var blob = this.response;
                // 至关重要
                let oFileReader = new FileReader();
                oFileReader.onloadend = function (e) {
                    let base64 = e.target.result;
                    callback && callback(postData);
                };
                oFileReader.readAsDataURL(blob);
            }
        }
        xhr.send();
    },
    // 产生随机数，len：长度
    getUUID: (len) => {
        len = len || 6
        len = parseInt(len, 10)
        len = isNaN(len) ? 6 : len
        const seed = '0123456789abcdefghijklmnopqrstubwxyzABCEDFGHIJKLMNOPQRSTUVWXYZ'
        const seedLen = seed.length - 1
        let uuid = ''
        while (len--) {
            uuid += seed[Math.round(Math.random() * seedLen)]
        }
        return uuid
    },
    // 深拷贝
    deepCopy: (data) => {
        if (!data) {
            return data
        }
        let sourceCopy = data instanceof Array ? [] : {}
        for (let item in data) {
            sourceCopy[item] = typeof data[item] === 'object' ? this.deepcopy(data[item]) : data[item]
        }
        return sourceCopy
    },
    // 获取url中的参数，以object形式返回
    getQueryParams: () => {
        let params = {}
        let str = ''
        let keyName = ''
        let keyValue = ''
        let url = window.location.href
        let index = 0
        let _index = 0
        // 合成数组
        if (url.indexOf('?') > -1) {
            index = url.indexOf('?')
            str = url.substring(index + 1).split('&')
            for (let i = 0; i < str.length; i++) {
                _index = str[i].indexOf('=')
                if (_index === -1) {
                    keyName = str[i]
                    keyValue = ''
                } else {
                    keyName = str[i].substring(0, _index)
                    keyValue = str[i].substring(_index + 1) || ''
                }
                params[keyName] = keyValue
            }
        }
        return params
    },
    /**
     * 微信等分享接口前的设置调用
     * @param {any} appid 公众号的openid
     * @param {any} noncestr 用accesst_token获取的noncestr
     * @param {any} ticket 用accesst_token获取的ticket
     * @param {any} timestamp 时间戳
     * @param {any} callback 回调函数，放置分享等设置
     */
    settingWechat: (appid, noncestr, ticket, timestamp, callback) => {
        let full = 'jsapi_ticket=' + ticket + '&noncestr=' + noncestr + '&timestamp=' + timestamp + '&url=' + window.location.href // 拼接jsapi_ticket
        let shaValue = sha1(full) // 使用sha1加密jsapi_ticket
        wx.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId, // 必填，公众号的唯一标识
            timestamp, // 必填，生成签名的时间戳
            nonceStr, // 必填，生成签名的随机串
            signature, // 必填，签名，见附录1
            jsApiList: ['onMenuShareAppMessage', 'onMenuShareTimeline','openLocation','getLocation','scanQRCode'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        })
        // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
        wx.ready(callback)
    },
    /**
     * 微信分享朋友功能
     * @param {any} title 分享标题
     * @param {any} desc 分享描述
     * @param {any} link 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
     * @param {any} imgUrl 分享图标
     * @param {any} callback 成功后回调的函数
     */
    menuShareAppMessage: (title, desc, link, imgUrl, callback) => {
        wx.onMenuShareAppMessage({
            title, // 分享标题
            desc, // 分享描述
            link,
            // 获取未付款订单, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl, // 分享图标
            type: '', // 分享类型,music、video或link，不填默认为link
            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            success: callback, // 用户确认分享后执行的回调函数,
            cancel: function () {
                // 用户取消分享后执行的回调函数
            }
        })
    },
    /**
     * 微信分享朋友圈
     * @param {any} title 分享标题
     * @param {any} link 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
     * @param {any} imgUrl 分享图标
     * @param {any} callback 用户确认分享后执行的回调函数
     */
    menuShareTimeline: (title, link, imgUrl, callback) => {
        wx.onMenuShareTimeline({
            title, // 分享标题
            link,
            // 获取未付款订单, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl, // 分享图标
            success: callback, // 用户确认分享后执行的回调函数
            cancel: function () {
                // 用户取消分享后执行的回调函数
            }
        })
    },
    /**
     * 微信扫一扫
     * @param {any} callback 用户扫码之后的回调
     */
    sweepYard: (callback) => {
        wx.scanQRCode({
            desc: 'scanQRCode desc',
            needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
            scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
            success: function(res){
                return callback(res)
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
            }
        });
    },
    /**
     * 微信支付方法
     * @param {any} appId appID
     * @param {any} timeStamp timeStamp
     * @param {any} nonceStr nonceStr
     * @param {any} packages packages
     * @param {any} signType signType
     * @param {any} paySign paySign
     * @param {any} callback 回调函数
     */
    wechatPay: (appId, timeStamp, nonceStr, packages, signType, paySign, callback) => {
        WeixinJSBridge.invoke('getBrandWCPayRequest', {
            debug: false,
            appId, // appID
            timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
            nonceStr, // 支付签名随机串，不长于 32 位
            package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
            signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
            paySign // 支付签名
        }, callback)
    }
}
