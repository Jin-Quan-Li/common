
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

switch ( process.env.VUE_APP_SECRET ) { //VUE_APP_SECRET 环境变量
    case 'dev':   // 注意这里的名字要和配置的环境名字对应起来
        baseInfo = config.dev
        break
    case 'local':
        baseInfo = config.local
        break
    case 'test':
        baseInfo = config.test
        break
    case 'pro':
        baseInfo = config.pro
        break
    default:
    
}

export default baseInfo

