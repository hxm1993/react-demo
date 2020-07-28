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

//获取文章列表
export const getArticles = (offset, limit) => {
    console.log(offset, limit)
    return serve.post("/api/v1/articleList", {
        offset: offset,
        limit:limit
    })
}

//获取某篇文章
export const getArticleById = (id) => {
    return serve.post(`/api/v1/article/${id}`)
}

//文章修改
export const editArticleById = (id, data) => {
    return serve.post(`/api/v1/articleEdit/${id}`, {
        ...data
    })
}

//删除文章
export const deleteArticleById = (id) => {
    return serve.post(`/api/v1/articleDelete/${id}`)
}

//获取文章每个月的浏览量
export const getArticleAmount = (id) => {
    return serve.post(`/api/v1/articleAmount`)
}
