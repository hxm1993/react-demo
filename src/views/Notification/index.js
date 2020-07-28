import React, { Component } from 'react'
import { Card, Button, List, Badge  } from "antd"

const data = [
    {
      id: '111',
      title: 'abc',
      desc: 'sjflsadfkjsldkffffffff',
      hasRead: false
    },
    {
        id: '222',
        title: 'abc222',
        desc: 'sjflsadfkjsldkffffffff222',
        hasRead: true
    },
    {
        id: '333',
        title: 'abc3333',
        desc: 'sjflsadfkjsldkffffffff3333',
        hasRead: false
    }
  ];

export default class Notification extends Component {
    render() {
        return (
            <Card title="通知中心" extra={<Button>全部标为已读</Button>} >
                <List
                    itemLayout="horizontal"
                    dataSource={data}
                    renderItem={item => (
                        <List.Item>
                            <List.Item.Meta
                                title={<span>{item.title} <Badge dot={item.hasRead}/></span>}
                                description={item.desc}
                            />
                            
                            {item.hasRead ? <Button>标为已读</Button> : null}
                        </List.Item>
                    )}
                />
            </Card>
        )
    }
}
