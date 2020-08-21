import React, { Component } from 'react'
import { Card, Button, List, Badge  } from "antd"
import { connect } from "react-redux"
import { makeNotificationAsReadById, makeAllNotificationAsRead } from "../../actions/notification"

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

const mapStateToProps = state => {
    return {
        list: state.notifications.list
    }
}

@connect(mapStateToProps, {makeNotificationAsReadById, makeAllNotificationAsRead})
class Notification extends Component {
    // constructor(props) {
    //     super(props)
    // }
    makeNotificationAsRead(id) {
        this.props.makeNotificationAsReadById(id)
    }
    makeAllNotificationAsRead() {
        this.props.makeAllNotificationAsRead();
    }
    render() {
        return (
            <Card title="通知中心" extra={<Button disabled={this.props.list.every(d => d.hasRead == false)} onClick={() => this.makeAllNotificationAsRead()}>全部标为已读</Button>} >
                <List
                    itemLayout="horizontal"
                    dataSource={this.props.list}
                    renderItem={item => (
                        <List.Item>
                            <List.Item.Meta
                                title={<span>{item.title} <Badge dot={item.hasRead}/></span>}
                                description={item.desc}
                            />
                            
                            {item.hasRead ? <Button onClick={() => this.makeNotificationAsRead(item.id)}>标为已读</Button> : null}
                        </List.Item>
                    )}
                />
            </Card>
        )
    }
}

export default Notification;
