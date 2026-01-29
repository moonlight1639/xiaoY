import type { FormProps } from 'antd';
import { Button, Checkbox, Form, Input } from 'antd';
import LogoImg from '../assets/doubao1.jpg'
import { useState } from 'react';
import RegisterComponent from './RegisterComponent';
type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
  console.log('Success:', values);
};

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
  console.log('Failed:', errorInfo);
};
function LoginComponent() {
  const [isRegister , setIsRegister] = useState(false);

  function getReturnLogin(value: boolean){
    setIsRegister(value);
  }
  return (
    <div style={{backgroundColor:'var(--color-bg-card)'}}>
      {isRegister == false ?  
      <div
        style={{
          display: "flex",
          alignItems: "center",
          height: '500px',
          width: '100%',
          position: 'relative',
          flexDirection: "column",
          animation: 'translateShowX2 0.5s',
          // height: '100%',
        }}
      >
        <img src={LogoImg} alt='logo' style={{ width: '160px', height: '160px', borderRadius: '50%', marginBottom: '30px' , marginTop: '15px',objectFit: 'contain'}} />
        
        <Form
          name="basic"
          labelCol={{ span: 8 , style: { fontSize: '16px', fontWeight: 500, color: '#333' }}}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          labelAlign="left"
          
        >
          <Form.Item<FieldType>
            label={
              <div style={{display:'flex', alignItems:'center', gap:'2px'}}>
                <svg className="icon" viewBox="0 0 1024 1024" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M358.065416 472.050126c-58.668548-29.100782-97.862781-93.321432-97.862781-168.93455 0-102.749152 75.444294-186.04423 168.508596-186.04423 93.066349 0 168.510643 83.294055 168.510643 186.04423 0 75.396177-39.082688 139.512451-97.480049 168.736029 144.447635 34.715663 253.83741 173.11578 260.997776 341.046466l-663.803973 0.481977C106.108921 647.64026 214.91334 507.412518 358.065416 472.050126zM568.80452 138.600685c38.816618 41.537022 62.941027 99.709933 62.941027 164.105568 0 59.481719-20.584648 113.65555-54.316249 154.313551l0.005117 0.001023c105.026218 49.877991 184.421659 152.995533 210.30418 278.58181l0-0.00614 150.093446-0.107447c-6.364202-149.248186-103.584321-272.251637-231.963343-303.106366 51.900124-25.970488 86.634606-82.95534 86.634606-149.962453 0-91.317799-67.050793-165.346839-149.763928-165.346839-27.557742 0-53.378862 8.218172-75.559932 22.555715" fill="#272636"></path>
                </svg>
                <span style={{color: 'rgba(0, 0, 0, 0.7)'}}>用户名</span>
              </div>
            }
            name="username"
            // style={{fontSize: '16px'}}
            rules={[{ required: true, message: "请输入用户名!" }]}
          >
            <Input style={{ width: '200px' }} />
          </Form.Item>

          <Form.Item<FieldType>
            label=<div style={{display:'flex', alignItems:'center', gap:'2px'}}>
                <svg className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2724" width="24" height="24"><path d="M817.152 957.44H207.36c-18.944 0-34.304-15.36-34.304-34.304V485.376c0-18.944 15.36-34.304 34.304-34.304h24.064V374.784c-0.512-8.192-1.024-16.896-1.024-25.6 0-155.648 126.464-282.112 282.112-282.112s282.112 126.464 282.112 282.112V450.56h23.04c18.944 0 34.304 15.36 34.304 34.304v437.248c0 19.968-15.36 35.328-34.816 35.328z m-322.048-226.304v79.36h34.304v-79.36c32.768-7.68 57.344-37.376 57.344-72.704 0-41.472-33.28-74.752-74.752-74.752s-74.752 33.28-74.752 74.752c0 34.816 25.088 64.512 57.856 72.704z m224.256-379.392v-2.048c0-114.688-92.672-207.36-207.36-207.36S305.152 235.008 305.152 349.696v101.376h414.72l-0.512-99.328z" fill="#333333" p-id="2725"></path></svg>
                <span style={{color: 'rgba(0, 0, 0, 0.7)'}}>密码</span>
              </div>
            name="password"
            rules={[{ required: true, message: "请输入密码!" }]}
          >
            <Input.Password style={{ width: '200px' }}/>
          </Form.Item>

          <Form.Item<FieldType>
            name="remember"
            valuePropName="checked"
            label={null}
          >
            <Checkbox style={{color: 'rgba(0, 0, 0, 0.7)'}}>记住我</Checkbox>
          </Form.Item>
          
          
        </Form>
          <div style={{display:'flex' , flexDirection:'column' , alignItems:'center'}}>
              <Button type="primary"  style={{ width: '300px' }}>
                登录
              </Button>
              <Button type="dashed"  style={{ width: '300px', marginTop: '10px' }} onClick={()=>setIsRegister(true)}>
                注册
              </Button>
          </div>
        <a href="#" style={{ position:'absolute', bottom: '0px' }}>忘记密码？</a>
      </div>
      : <RegisterComponent returnLogin={getReturnLogin} />}
    </div>
  );
}

export default LoginComponent

