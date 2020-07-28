import React, { Component } from 'react'
import { Layout, Menu, Breadcrumb, Dropdown, Avatar, Badge } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { withRouter } from "react-router-dom"
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import "./frame.less"

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;



@withRouter
class Frame extends Component {
    onMenuClick = ({ item, key, keyPath, domEvent }) => {
        console.log(this.props)
        this.props.history.push(key)
    }
    initPersonalMenu = () => {
        return (
            <Menu onClick={this.personalMenuClick}>
              <Menu.Item key="/admin/notification">
                通知中心
                <Badge dot></Badge>
              </Menu.Item>
              <Menu.Item key="/admin/setting">
                个人设置
              </Menu.Item>
              <Menu.Divider />
              <Menu.Item key="/login">
                退出登录
              </Menu.Item>
            </Menu>
          )
    }
    personalMenuClick = ({item,key}) => {
        this.props.history.push(key)
    }   
    render() {
        console.log(this.props.menu)
        return (
            <Layout>
                <Header className="header">
                    <div className="logo">
                        logo
                    </div>
                    <div>
                        <Dropdown overlay={this.initPersonalMenu()}>
                            <a className="ant-dropdown-link" onClick={e => e.preventDefault()} style={{display: 'flex', alignItems: 'center'}}>
                                <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                                <span>欢迎您！张三 </span>
                                <DownOutlined />                                
                                <Badge count={25} offset={[-10, -25]}/>
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
        )
    }
}

export default Frame;