import React, { Component } from 'react'
import { Table, Tag, Space } from 'antd'
import { getArticles } from "../../requests"
import moment from "moment"


const columnsKeysMap = { 
  "id": 'id', 
  "title": "标题", 
  "author": "作者", 
  "amount": "阅读量", 
  "createAt": "创建时间"
}

export default class Article extends Component {
  constructor(props) {
    super(props);
    this.state = {
      total: 0,
      columns: [],
      data: []
    }
  }
  componentDidMount() {
    getArticles().then(res => {
      console.log(111,res)
      const columnKeys = Object.keys(res.list[0]);
      const columns = columnKeys.map(key => {
        if(key === "amount") {
          return  {
            title: columnsKeysMap[key],
            dataIndex: key,
            key: key,
            render: text =>  <Tag color={text > 200 ? 'red' : 'green'}>{text}</Tag>,
          }
        }
        if(key == "createAt") {
          return  {
            title: columnsKeysMap[key],
            dataIndex: key,
            key: key,
            render: text =>  <p>{moment(text).format("YYYY/MM/DD HH:MM:SS")}</p>,
          }
        }
        return  {
          title: columnsKeysMap[key],
          dataIndex: key,
          key: key,
          // render: text => <a>{text}</a>,
        }
      })
      this.setState({
        total: res.total,
        columns: columns,
        data: res.list
      })
    })
  }
    render() {
        return (
            <div>
                <h2>文章列表</h2>
                <Table rowKey={record => record.id} columns={this.state.columns} dataSource={this.state.data} pagination={{ total: this.state.total}} />
            </div>
        )
    }
}
