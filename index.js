
/**
 * 可根据个人需要修改配置，需要配合webpack配置多套环境使用
 * 不同环境配置文件
 * @param {any} appID appId
 * @param {any} appSecret appSecret
 * @param {any} serverApiUrl api 接口
 * @param {any} serverUrl 分享链接
 * @param {any} imgserverUrl 图片路劲
 */

const config = {
    // 生产环境（正式）
    pro: {
        appID: '',
        appSecret: '',
        serverApiUrl: '',
        serverUrl: '',
        imgserverUrl: ''
    },
    // 生产环境（测试）
    test: {
        appID: '',
        appSecret: '',
        serverApiUrl: '',
        serverUrl: '',
        imgserverUrl: ''
    },
    // 开发环境(调试)
    dev: {
        appID: '',
        appSecret: '',
        serverApiUrl: '',
        serverUrl: '',
        imgserverUrl: ''
    },
    // 开发环境(开发)
    local: {
        appID: '',
        appSecret: '',
        serverApiUrl: '',
        serverUrl: '',
        imgserverUrl: ''
    }
}

let baseInfo
/** 开发环境 */
if( process.env.NODE_ENV === 'development' ) {
    /** 开发环境中(开发) */
    if( process.env.VUE_APP_TITLE === 'local' ) {
        baseInfo = config.local
    /** 开发环境中(调试) */
    }else {
        baseInfo = config.dev
    }

/** 生产环境 */
}else {
    /** 生产环境(测试) */
    if( process.env.VUE_APP_TITLE === 'test' ) {
        baseInfo = config.test
    /** 生产环境(正式) */
    }else {
        baseInfo = config.pro
    }
}

export default baseInfo

