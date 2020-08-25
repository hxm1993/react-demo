import React, { Component } from 'react'
import { Layout, Menu, Breadcrumb, Dropdown, Avatar, Badge, Spin } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { withRouter } from "react-router-dom"
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import "./frame.less"
import { connect } from "react-redux"
import { getNotificationsList } from "../../actions/notification"
import { loginFailed } from "../../actions/login"

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;


@connect(
    (state) => {
        return {
            list: state.notifications.list,
            notificationsCount: state.notifications.list.filter(n => n.hasRead == true).length,
            isLoading: state.notifications.isLoading,
            userInfo: JSON.parse(localStorage.getItem("userInfo") || sessionStorage.getItem("userInfo")),
            avator: state.login.userInfo.avator
        }
    },
    {
        getNotificationsList,
        loginFailed
    }
)
@withRouter
class Frame extends Component {
    //侧边栏导航
    onMenuClick = ({ item, key, keyPath, domEvent }) => {
        this.props.history.push(key)
    }
    componentDidMount() {
        this.props.getNotificationsList();
    }
    initPersonalMenu = () => {
        return (
            <Menu onClick={this.personalMenuClick}>
                <Menu.Item key="/admin/notification">
                    通知中心
                <Badge dot={Boolean(this.props.notificationsCount)}></Badge>
                </Menu.Item>
                <Menu.Item key="/admin/profile">
                    个人设置
              </Menu.Item>
                <Menu.Divider />
                <Menu.Item key="/login">
                    退出登录
              </Menu.Item>
            </Menu>
        )
    }
    personalMenuClick = ({ item, key }) => {
        //如果点击的是退出登录
        if(key == "/login") {
            this.props.loginFailed()
        }
        this.props.history.push(key)
    }
    render() {
        return (
            <Spin spinning={this.props.isLoading}>
                <Layout>
                    <Header className="header">
                        <div className="logo">
                            logo
                        </div>
                        <div>
                            <Dropdown overlay={this.initPersonalMenu()}>
                                <a className="ant-dropdown-link" onClick={e => e.preventDefault()} style={{ display: 'flex', alignItems: 'center' }}>
                                    <Avatar src={this.props.avator} />
                                    <span>欢迎您！{this.props.userInfo.displayName} </span>
                                    <DownOutlined />
                                    <Badge count={this.props.notificationsCount} offset={[-10, -25]} />
                                </a>
                            </Dropdown>
                        </div>
                    </Header>
                    <Layout>
                        <Sider width={200} className="site-layout-background">
                            <Menu
                                mode="inline"
                                selectedKeys={[this.props.location.pathname]}
                                defaultOpenKeys={['sub1']}
                                style={{ height: '100%', borderRight: 0 }}
                                onClick={this.onMenuClick}
                            >
                                {
                                    this.props.menu.map(route => {
                                        return <Menu.Item key={route.pathname}>{route.title}</Menu.Item>
                                    })
                                }·
                        </Menu>
                        </Sider>
                        <Layout style={{ padding: '0 24px 24px' }}>
                            <Breadcrumb style={{ margin: '16px 0' }}>
                                <Breadcrumb.Item>Home</Breadcrumb.Item>
                                <Breadcrumb.Item>List</Breadcrumb.Item>
                                <Breadcrumb.Item>App</Breadcrumb.Item>
                            </Breadcrumb>
                            <Content
                                className="site-layout-background"
                                style={{
                                    padding: 24,
                                    margin: 0,
                                    minHeight: 280,
                                }}
                            >
                                {this.props.children}
                            </Content>
                        </Layout>
                    </Layout>
                </Layout>
            </Spin>
        )
    }
}

export default Frame;