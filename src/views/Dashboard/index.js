import React, { Component } from 'react'
import { Card, Row, Col } from "antd"
import "./dashboard.less"

export default class Dashboard extends Component {
    render() {
        const style = { background: '#0092ff', padding: '8px 0' };
        return (
            <>
                <Card title="概览" className="view">
                    <Row gutter={16}>
                        <Col className="gutter-row" span={6}>
                            <div className="viewBoard">col-6</div>
                        </Col>
                        <Col className="gutter-row" span={6}>
                            <div className="viewBoard">col-6</div>
                        </Col>
                        <Col className="gutter-row" span={6}>
                            <div className="viewBoard">col-6</div>
                        </Col>
                        <Col className="gutter-row" span={6}>
                            <div className="viewBoard">col-6</div>
                        </Col>
                    </Row>
                </Card>
            </>
        )
    }
}
