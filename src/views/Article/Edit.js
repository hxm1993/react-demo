import React, { useState, useEffect } from 'react'
import { Card, Form, Input, Button, message, Spin } from 'antd'
import { getArticleById, editArticleById } from "../../requests"

import LzEditor from 'react-lz-editor'


// const [form] = Form.useForm();

const Article = (props) => {
    const [form] = Form.useForm();
    const [formData, setFormData] = React.useState({});
    const [loading, setLoading] = React.useState(false);
    useEffect(() => {
        setLoading(true)
        getArticleById().then(res => {
            setFormData({
                ...formData,
                ...res
            })

            form.setFieldsValue({ ...res });
        }).finally(() => {
            setLoading(false)
        })
    }, [])
    const layout = {
        labelCol: {
            span: 4,
        },
        wrapperCol: {
            span: 16,
        },
    };
    const tailLayout = {
        wrapperCol: {
            offset: 4,
            span: 16,
        },
    };
    const onFinish = values => {
        editArticleById(formData.id, values).then(res => {
            message.success(res.msg);
        }).finally(() => {
            props.history.push("/admin/article");
        })
    };

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    const receiveContent = (param) => {
        form.setFieldsValue({ content: param });

    }
    console.log('loading', loading)
    return (
        <Spin spinning={loading}>
        <Card title={"文章编辑" + loading}>
            <Form
                {...layout}
                name="basic"
                form={form}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    label="id"
                    name="id"
                    rules={[
                        {
                            required: true,
                            message: '12',
                        },
                    ]}
                >
                    <Input disabled />
                </Form.Item>

                <Form.Item
                    label="标题"
                    name="title"
                    rules={[
                        {
                            required: true,
                            message: '请输入标题!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="作者"
                    name="author"
                    rules={[
                        {
                            required: true,
                            message: '请输入作者!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="阅读量"
                    name="amount"
                    rules={[
                        {
                            required: true,
                            message: '请输入阅读量!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="创建时间"
                    name="createAt"
                    rules={[
                        {
                            required: true,
                            message: '请输入创建时间!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="内容"
                    name="content"
                    rules={[
                        {
                            required: true,
                            message: '请输入文章内容!',
                        },
                    ]}
                >
                    <LzEditor
                        active={true}
                        importContent={formData.content}
                        cbReceiver={receiveContent}
                        image={false}
                        video={false}
                        audio={false}
                        convertFormat="html"/>
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        Submit
                        </Button>
                </Form.Item>
            </Form>
        </Card>
        </Spin>
    )
}



export default Article;