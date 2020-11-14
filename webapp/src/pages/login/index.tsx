import React from 'react';
import './style.css';
import { Form, Input, Button, Checkbox, Card, message } from 'antd';
import axios from '../../request';
import { Redirect } from 'react-router-dom';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

interface State {
  isLogin: boolean;
}

class Login extends React.Component {

  state = {
    isLogin: false,
  }

  componentDidMount() {
    axios.get('/api/core/isLogin').then((res) => {
        if (res.data) {
            this.setState({
                isLogin: true,
            });
        }
    });
}

  onFinish = (values: any) => {
    console.log('Success:', values);
    axios.post('/api/core/login', { username: values.username, password: values.password }).then((res: any) => {
      if (res.data) {
        this.setState({
          isLogin: true,
        });
        message.success('登陆成功');
      } else {
        message.error(res.errMsg);
      }
    });
  };

  onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  render() {
    const { isLogin } = this.state;
    console.log(isLogin);
    if (isLogin) {
      return <Redirect to="/" />
    }
    return (
      <div className="login">
        <Card className="form">
          <div className="title">
            数据管理系统
          </div>
          <Form
            layout="vertical"
            name="basic"
            initialValues={{ remember: true }}
            onFinish={this.onFinish}
            onFinishFailed={this.onFinishFailed}
          >
            <Form.Item
              label="用户名"
              name="username"
              rules={[{ required: true, message: '请输入你的用户名!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="密码"
              name="password"
              rules={[{ required: true, message: '请输入你的密码!' }]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                登陆
          </Button>
            </Form.Item>
          </Form>
        </Card >
      </div>
    );
  }
}

export default Login;