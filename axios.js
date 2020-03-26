/*
* axios简易封装,可根据实际情况做调整
* 注意：貌似会先执行axios.interceptors.request 后执行 transformRequest
*/

import axios from 'axios';
import Qs from 'qs';
import config from './index';

/**
* 创建axios实例
*/
axios.create({timeout: 1000});

/**
* 返回axios请求
* @param { String } url  请求url
* @param { String } method  请求方式，默认是get
* @param { Object } data  请求参数
* @param { Boolean } withCredentials  表示跨域请求时是否需要使用凭证
* @param { Boolean } formData  判断是否上传文件 FormData 格式
* @param { Boolean } sendForm  预留字段
*/
export const ajax = (url, method = 'get', data = {}, formData = false, sendForm = false ) => {
    let _url = '';
    if( url.indexOf('http') != -1 ||  url.indexOf('https') != -1 ) {
        /** 完整地址 */
        _url = `${config.serverApiUrl}${url}`
    }else {
        _url = url;
    }
    if( method === 'get' ){
        return axios({
            url,
            method,
            params:{
                ...data
            },
            withCredentials: true
        }).then(response => response.data)
    }else {
        return axios({
            url,
            method,
            data:{
                ...data
            },
            transformRequest:[(data,headers) => {
                // `transformRequest` 允许在向服务器发送前，修改请求数据
                // 只能用在 'PUT', 'POST' 和 'PATCH' 这几个请求方法
                // 后面数组中的函数必须返回一个字符串，或 ArrayBuffer，或 Stream
                // 注意:这里是为了可以根据上面的参数来设置自定义请求头等信息
                let _data = data;
                if( formData ){ //上传文件
                    headers['Content-Type'] = 'multipart/form-data';
                    const params = new FormData()
                    for (let key of Object.keys(data)) {
                        params.append(key,data[key])
                    }
                    _data = params;
                    console.log(data instanceof FormData)
                }
                return _data
            }],

            headers: {'Content-Type': 'multipart/form-data'},
            transformResponse: [(data) => {
                // `transformResponse` 在传递给 then/catch 前，允许修改响应数据
                // 只能用在 'PUT', 'POST' 和 'PATCH' 这几个请求方法
                // 对 data 进行任意转换处理
                // return data;
            }],
            withCredentials: true
        }).then(response => response.data)
    }
}



/**
* 添加请求拦截器
*/
axios.interceptors.request.use( config => {// 在发送请求之前做些什么操作
    // post 请求Qs.stringify 序列化参数
    if( config.method === 'post' ){
        config.data = Qs.stringify(config.data,{indices: false});
        config.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
    }
    return config;
}, error => {// 对请求错误做些什么
    return Promise.reject(error);
})




/**
* 添加响应拦截器
*/
axios.interceptors.response.use( response => {
    // 对响应数据做点什么 (请求成功 Code == 200)
    switch (response.data.code) {
        case 100:
            console.log('响应成功，根据后台定义的code做不同的处理，例如 code === 100 表示用户未登录 那么就重定向到登陆页面')
        break
        default: break
    }
    return response;
}, error => {
    // 对响应错误做点什么 (请求失败 Code !== 200)
    switch (error.status) {
        case 400:
            console.log("请求错误!")
        break
        case 403:
            console.log("拒绝访问!")
        break
        case 404:
            console.log(`请求地址出错: ${error.response.config.url}`)
        break
        case 408:
            console.log("请求超时!")
        break
        case 500:
            console.log("服务器内部错误!")
        break
            default: console.log('系统错误'); 
        break
    }
    return Promise.reject(error);
})


/**
 * 使用方法
 * api统一管理文件
 * import { ajax } from './axios';//引入封装的axios
 * export const login = (usename,password) => { //导出方法供页面调用
 *     const params = {
 *         usename: usename,
 *         password:password
 *     }
 * return ajax('/login', 'get', params)
 * 
 * 页面中使用api获取数据
 * import { login } from './api'
 * login('李白','123456').then(res=>{
 *     console.log(res)
 * })
 */
