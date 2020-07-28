import React, { Component, createRef } from 'react'
import { Card, Row, Col } from "antd"
import "./dashboard.less"
import echarts from 'echarts/lib/echarts';
import  'echarts/lib/chart/line';
import { Chart } from '@antv/g2';
import { getArticleAmount } from "../../requests"

const boardBg = ['red', 'yellow', 'green', 'blue']
export default class Dashboard extends Component {
    constructor(props) {
        super(props)
        
        this.amountChart = React.createRef();
    }
    componentDidMount() {
        getArticleAmount().then(res => {
            let amount = res.amount;
            // let month = [];
            // let value = [];
            // amount.map(data => {
            //     month.push(data.month);
            //     value.push(data.value)
            // })
            var myChart = echarts.init(this.amountChart.current);
            myChart.setOption({
                xAxis: {
                    type: 'category',
                    data: amount.map(data => data.month)
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    data: amount.map(data => data.value),
                    type: 'line',
                    smooth: true
                }]
            });
        })
        


        // const data = [
        //     { year: '1991', value: 3 },
        //     { year: '1992', value: 4 },
        //     { year: '1993', value: 3.5 },
        //     { year: '1994', value: 5 },
        //     { year: '1995', value: 4.9 },
        //     { year: '1996', value: 6 },
        //     { year: '1997', value: 7 },
        //     { year: '1998', value: 9 },
        //     { year: '1999', value: 13 }
        //   ];
    
        //   // Step 1: 创建 Chart 对象
        //   const chart = new Chart({
        //     container: 'chartBox', // 指定图表容器 ID
        //     width: 600, // 指定图表宽度
        //     height: 300, // 指定图表高度
        //   });
    
        //   // Step 2: 载入数据源
        //   chart.data(data);
    
        //   // Step 3：创建图形语法，绘制柱状图
        //   chart.line().position('year*value').label('value');
        //   chart.point().position('year*value');
    
        //   // Step 4: 渲染图表
        //   chart.render();
    }

    render() {
        return (
            <>
                <Card title="概览" className="view">
                    <Row gutter={16}>
                        {
                            [0,1,2,5].map((b,i) => {
                                return (
                                    <Col className="gutter-row" key={i} span={6}>
                                        <div className="viewBoard" style={{"background": boardBg[i]}}>col-6 {b}</div>
                                    </Col>
                                )
                            })
                        }
                    </Row>
                </Card>
                <Card title="最近浏览量" className="view">
                    <div ref={this.amountChart} style={{width:'100%', height:'300px'}}></div>
                    {/* 使用AntV绘制折线图 */}
                    {/* <div id="chartBox"></div> */}
                </Card>
            </>
        )
    }
}
