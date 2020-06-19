import { Loading } from "../components"
import loadable from "react-loadable"

// import Dashboard from "./Dashboard";
// import ArticleList from "./Article";
// import ArticleEdit from "./Article/Edit";
// import Login from "./Login";
// import NotFound from "./NotFound";
// import Setting from "./Setting";

const Dashboard = loadable({
    loader: () => import("./Dashboard"),
    loading: Loading
})
const ArticleList = loadable({
    loader: () => import("./Article"),
    loading: Loading
})
const ArticleEdit = loadable({
    loader: () => import("./Article/Edit"),
    loading: Loading
})
const Login = loadable({
    loader: () => import("./Login"),
    loading: Loading
})
const NotFound = loadable({
    loader: () => import("./NotFound"),
    loading: Loading
})
const Setting = loadable({
    loader: () => import("./Setting"),
    loading: Loading
})
export {
    Dashboard,
    ArticleList,
    ArticleEdit,
    Login,
    Setting,
    NotFound
}