import {
    Dashboard,
    ArticleList,
    ArticleEdit,
    Login,
    Setting,
    NotFound,
    Notification
} from "../views";

export const mainRouter = [
    {
        pathname: '/login',
        component: Login
    },
    {
        pathname: '/404',
        component: NotFound
    }
]

export const adminRouter = [
    {
        pathname: '/admin/dashboard',
        component: Dashboard,
        title: "仪表盘",
        isNav: true
    },
    {
        pathname: '/admin/article',
        component: ArticleList,
        exact: true,
        title: "文章列表",
        isNav: true
    },
    {
        pathname: '/admin/article/edit/:id',
        component: ArticleEdit
    },
    {
        pathname: '/admin/setting',
        component: Setting,
        title: "设置",
        isNav: true
    },
    {
        pathname: '/admin/notification',
        component: Notification        
    }

]