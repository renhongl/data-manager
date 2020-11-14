
import React from 'react';
import './style.css';
import axios from '../../request';
import { Redirect } from 'react-router-dom';
import { Form, Input, Button, Checkbox, Card, message } from 'antd';
import ReactEcharts from 'echarts-for-react';

interface State {
    isLogin: boolean;
    loaded: boolean;
    courseData: any;
}

class Home extends React.Component<{}, State> {
    state = {
        isLogin: true,
        loaded: false,
        courseData: {},
    }

    componentDidMount() {
        axios.get('/api/core/isLogin').then((res) => {
            if (!res.data) {
                this.setState({
                    isLogin: false,
                });
            } else {
                this.updateChart();
            }
            this.setState({
                loaded: true,
            });
        });
    }

    logout = () => {
        axios.get('/api/core/logout').then((res) => {
            if (res.data) {
                this.setState({
                    isLogin: false,
                });
            }
        });
    }

    pullData = () => {
        axios.get('/api/course/pull').then((res: any) => {
            if (res.data) {
                message.success('爬取成功');
                this.updateChart();
            } else {
                message.error(res.errMsg);
            }
        });
    }

    updateChart() {
        axios.get('/api/course/').then((res: any) => {
            if (res.data) {
                this.setState({
                    courseData: res.data
                });
            } else {
                message.error(res.errMsg);
            }
        });
    }

    getOptions() {
        let data: any[] = [];
        let x: string[] = [];
        let keys: string[] = [];
        let l: string[] = [];
        const { courseData } = this.state;
        if (courseData && Object.keys(courseData).length > 0) {
            keys = Object.keys(courseData);
            x = keys.map(key => {
                const date = new Date(Number(key));
                return date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
            });
            (courseData as any)[keys[0]].forEach((item: any) => {
                l.push(item.title);
            });

            l.forEach(one => {
                const d = {
                    name: one,
                    type: 'line',
                    data: [],
                };
                keys.forEach(key => {
                    (courseData as any)[key].forEach((item: any) => {
                        if (item.title === one) {
                            (d.data as any).push(item.count);
                        }
                    });
                });
                data.push(d);
            });
        }

        return {
            title: {
                text: "课程分析",
            },
            legend: {
                data: l
            },
            xAxis: {
                type: 'category',
                data: x
            },
            yAxis: {
                type: 'value'
            },
            series: data
        }
    }

    render() {
        const { isLogin, loaded } = this.state;
        if (isLogin) {
            if (loaded) {
                return (
                    <div className="home">
                        <Button type="primary" onClick={this.pullData}>
                            爬取数据
                        </Button>
                        <Button type="primary" onClick={this.logout}>
                            退出
                        </Button>
                        <ReactEcharts option={this.getOptions()} />
                    </div>
                )
            }
            return null;
        }
        return <Redirect to="/login" />
    }
}


export default Home;




