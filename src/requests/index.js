import axios from "axios"
import {message} from "antd"

const isDev = process.env.NODE_ENV == "development";

const serve = axios.create({
    baseURL: isDev ? 'http://rap2.taobao.org:38080/app/mock/258513' : ''
})

serve.interceptors.request.use(config => {
    config.data = Object.assign({}, config.data, {
        // authToken: window.localStorage.getItem("authToken")
        authToken: 'tempAuthToken'
    })
    return config;
})

serve.interceptors.response.use(res => {
    console.log('es,', res)
    if(res.data.code == 200) {
        return res.data.data
    }else {
        //全局处理错误
        message.error(res.data.errMsg)
    }
})


export const getArticles = () => {
    return serve.post("/api/v1/articleList")
}