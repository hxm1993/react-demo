import React, { Component } from 'react'
import { Card, Button, List, Badge  } from "antd"
import { getTest } from "../../requests"

export default class Notification extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stu: []
        }
    }
    componentDidMount() {
        getTest().then(res => {
            this.setState({
                stu: res.list
            })
        })
    }
    handleAge(e,name) {
        let curValue = e.target.value;
        this.setState({
            stu: this.state.stu.map((item) => item.name == name ? {...item, curValue} : item)
        })
    }
    handleSubmit() {
        console.log("submit", this.state.stu)
    }
    render() {
        return (
            <div>
                {this.state.stu && this.state.stu.map(s => {
                    return (
                        <div key={s.name}>
                            <span>{s.name}</span>
                            <input defaultValue={s.value} onChange={(event)=>{this.handleAge(event,s.name)}}></input>
                        </div>
                    )
                })}
                <div>
                    <input type="button" onClick={() => this.handleSubmit()} value="提交"/>
                </div>
            </div>
        )
    }
}
