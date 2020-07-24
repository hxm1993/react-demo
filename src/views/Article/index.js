import React, { Component } from 'react'
import { Table, Tag, Space, Button, Card, Modal } from 'antd'
import { getArticles, deleteArticleById } from "../../requests"
import moment from "moment"
import XLSX from "xlsx"
const { confirm } = Modal;



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
      data: [],
      isLoading: false,
      offset: 0,
      limit: 10,
      currentPage: 1
    }
  }
  componentDidMount() {
    this.setState({
      isLoading: true
    })
    this.getArticlesData();
  }
  getArticlesData = () => {
    getArticles(this.state.offset, this.state.limit)
      .then(res => {
        console.log(111, res)
        const columnKeys = Object.keys(res.list[0]);
        const columns = columnKeys.map(key => {
          if (key === "amount") {
            return {
              title: columnsKeysMap[key],
              dataIndex: key,
              key: key,
              render: text => <Tag color={text > 200 ? 'red' : 'green'}>{text}</Tag>,
            }
          }
          if (key == "createAt") {
            return {
              title: columnsKeysMap[key],
              dataIndex: key,
              key: key,
              render: text => <p>{moment(text).format("YYYY/MM/DD HH:MM:SS")}</p>,
            }
          }
          return {
            title: columnsKeysMap[key],
            dataIndex: key,
            key: key,
            // render: text => <a>{text}</a>,
          }
        })

        columns.push({
          title: '操作',
          key: 'option',
          render: (text, record) => {
            return <Button.Group>
              <Button size="small" type="primary" onClick={this.toEdit.bind(this, record.id)}>编辑</Button>
              <Button size="small" type="danger" onClick={this.deleteArticle.bind(this, text, record)}>删除</Button>
            </Button.Group>
          }
        })
        this.setState({
          total: res.total,
          columns: columns,
          data: res.list
        })
      })
      .catch(err => {

      })
      .finally(() => {
        this.setState({
          isLoading: false
        })
      })
  }
  toEdit = (id) => {
    console.log(this.props)
    this.props.history.push(`/admin/article/edit/${id}`)
  }
  deleteArticle = (text,record) => {
    confirm({
      title: '确定要删除该数据吗?',
      content: record.title,
      onOk: () => {
        deleteArticleById(record.id).finally(() => {
          this.setState({
            currentPage: 1
          }, () => {
            this.getArticlesData()
          })
        })
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }
  paginationChange = (page, pageSize) => {
    this.setState({
      offset: pageSize * (page -1),
      limit: pageSize,
      currentPage: page
    }, () => {
      this.getArticlesData()
    })
    console.log(page)
    console.log(pageSize)
  }
  paginationSizeChange = (current, pagesize) => {
    this.setState({
      offset: 0,
      limit: pagesize
    }, () => {
      this.getArticlesData()
    })
    console.log(current, pagesize)
  }
  exportExcel = () => {
    let data = [];
    this.state.data.map(d => {
      data.push([
        d.id, d.title, d.author, d.amount, moment(d.createAt).format("YYYY-MM-DD HH:MM:SS")
      ])
    })
    const ws = XLSX.utils.aoa_to_sheet([['id', 'title', 'author', 'amount', 'createAt'],...data] );
		const wb = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(wb, ws, "SheetJS");
		XLSX.writeFile(wb, "sheetjs.xlsx")
  }
  render() {
    return (
      <div>
        <Card title="文章列表" extra={<Button onClick={this.exportExcel}>导出excel</Button>} >
          <Table
            loading={this.state.isLoading}
            rowKey={record => record.id}
            columns={this.state.columns}
            dataSource={this.state.data}
            pagination={{ 
              current: this.state.currentPage,
              total: this.state.total, 
              onChange:this.paginationChange,
              onShowSizeChange: this.paginationSizeChange
            }}
            
          />
        </Card>
        
      </div>
    )
  }
}
