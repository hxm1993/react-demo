import React, { Component } from 'react'
import { Card, Form, Button, Checkbox, Input, Spin } from "antd"
import { Redirect } from "react-router-dom";
import { connect } from "react-redux"
import { loginAction } from "../../actions/login"

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };

const mapStateToProps = state => {
    const {isLoading, userInfo,isLogin} = state.login
    return {
        isLoading,
        userInfo,
        isLogin
    }
}

@connect(mapStateToProps, { loginAction })
class Login extends Component {
    componentDidMount() {
        console.log('state', this.props)
    }
    onFinish = values => {
        console.log('state', this.props)
        this.props.loginAction(values)
    };
    
    onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };
    render() {
        return (
            this.props.isLogin
            ?
            <Redirect to="/admin"/>
            :
            <div>
                <Card title="登录" style={{ width: 600, margin: '100px auto', background: 'rgb(250, 250, 250)' }}>
                <Form
                    {...layout}
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={this.onFinish}
                    onFinishFailed={this.onFinishFailed}
                    >
                    <Form.Item
                        label="用户名"
                        name="username"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="密码"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                        <Checkbox>记住我</Checkbox>
                    </Form.Item>

                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">
                            <Spin spinning={this.props.isLoading}>登录</Spin>
                        </Button>
                    </Form.Item>
                    </Form>
                </Card>
            </div>

        )
    }
}

export default Login;