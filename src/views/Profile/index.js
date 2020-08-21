import React, { Component } from 'react'
import { Upload } from "antd"
import axios from "axios"

export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imageUrl: ''
        }
    }
    beforeUpload = () => {
        console.log("beforeUpload")
    }
    customRequest = ({file}) => {
        console.log("axios",axios)
        let uploadFile = new FormData();
        uploadFile.append("Token",'25f71a63ddaae35d7790096306f023138cd622fc:fQh-qBrOoYsDrV7kgqndNx3mpEs=:eyJkZWFkbGluZSI6MTU5Nzk5OTMyNSwiYWN0aW9uIjoiZ2V0IiwidWlkIjoiNzI1NjE0IiwiYWlkIjoiMTcxMTkxOSIsImZyb20iOiJmaWxlIn0=')
        uploadFile.append('file', file)
        axios.post("http://up.imgapi.com/",uploadFile)
            .then(res => {
                if(res.status == "200") {
                    this.setState({
                        imageUrl: res.data.linkurl
                    })
                }
                
            })
    }
    render() {
        const uploadButton = (
            <div>
              {/* {this.state.loading ? <LoadingOutlined /> : <PlusOutlined />} */}
              <div className="ant-upload-text">Upload</div>
            </div>
        );
        return (
            <div>
                {this.state.imageUrl }
                <Upload
                    name="avatar"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    customRequest={this.customRequest}
                >
                    {this.state.imageUrl ? <img src={this.state.imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                </Upload>
            </div>
        )
    }
}
