import type { FormProps } from 'antd';
import { Button, Form, Input } from 'antd';
import { useRef } from 'react';
import { registerApi } from '../../services/userApi';
import type {User} from '../../types/User';
type FieldType = {
  username?: string;
  password?: string;
  repassword?: string;
};

const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
  console.log('Success:', values);
};

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
  console.log('Failed:', errorInfo);
};
type RegisterComponentProps = {
  returnLogin: (value: boolean) => void;
};

function RegisterComponent({ returnLogin }: RegisterComponentProps) {
  function handerRegister(){
    console.log("注册");
    // 注册逻辑
    if(UserFrom.current.password !== UserFrom.current.repassword){
      alert("两次输入的密码不一致");
      return;
    }

    registerApi({username: UserFrom.current.username , password: UserFrom.current.password} as User).then((response) => {
      if(response.success == true){
        alert("注册成功，请登录");
        returnLogin(false);
      }
      else
        alert("注册失败，" + response.errorMsg);
      
    }).catch((error) => {
      console.error("注册失败", error);
    });
  }
  function returnLoginFun(){
    returnLogin(false);
  }
  const UserFrom = useRef<{ username: string; password: string; repassword: string}>({ username: '', password: '', repassword: ''});
  return (

    <div
      style={{
        display: "flex",
        alignItems: "center",
        height: '400px',
        position: 'relative',
        flexDirection: "column",
        animation: 'translateShowX 0.8s'
      }}
    >
      <div style={{position:'absolute' , top:'10px', left:'10px', cursor:'pointer'}} onClick={returnLoginFun}>
      <svg  className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4804" width="32" height="32"><path d="M455.7312 866.6112l-4.096-3.4304-324.5056-304.2304a64 64 0 0 1-7.168-85.4528l4.1984-5.12 2.9184-2.9184L451.584 160.9216a42.6496 42.6496 0 0 1 62.0544 58.3168l-3.6864 3.8912-262.4 246.2208h627.0976a42.7008 42.7008 0 0 1 5.12 85.0432l-5.12 0.3072H247.2448l262.7072 246.1696a42.6496 42.6496 0 0 1 5.376 56.32l-3.4304 4.1472a42.7008 42.7008 0 0 1-56.32 5.12z" fill="#2c2c2c" p-id="4805"></path></svg>
      </div>
      
      <h1 style={{marginBottom:'20px' , fontSize: '40px', fontWeight: '600' , marginTop: '15px'}}>注&emsp;册</h1>
      
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
          <Input style={{ width: '200px' }} value={UserFrom.current.username} onChange={e => UserFrom.current.username = e.target.value} />
        </Form.Item>

        <Form.Item<FieldType>
          label=<div style={{display:'flex', alignItems:'center', gap:'2px'}}>
              <svg  className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2724" width="24" height="24"><path d="M817.152 957.44H207.36c-18.944 0-34.304-15.36-34.304-34.304V485.376c0-18.944 15.36-34.304 34.304-34.304h24.064V374.784c-0.512-8.192-1.024-16.896-1.024-25.6 0-155.648 126.464-282.112 282.112-282.112s282.112 126.464 282.112 282.112V450.56h23.04c18.944 0 34.304 15.36 34.304 34.304v437.248c0 19.968-15.36 35.328-34.816 35.328z m-322.048-226.304v79.36h34.304v-79.36c32.768-7.68 57.344-37.376 57.344-72.704 0-41.472-33.28-74.752-74.752-74.752s-74.752 33.28-74.752 74.752c0 34.816 25.088 64.512 57.856 72.704z m224.256-379.392v-2.048c0-114.688-92.672-207.36-207.36-207.36S305.152 235.008 305.152 349.696v101.376h414.72l-0.512-99.328z" fill="#333333" p-id="2725"></path></svg>
              <span style={{color: 'rgba(0, 0, 0, 0.7)'}}>密&emsp;码</span>
            </div>
          name="password"
          rules={[{ required: true, message: "请输入密码!" }]}
        >
          <Input.Password style={{ width: '200px' }} value={UserFrom.current.password} onChange={e => UserFrom.current.password = e.target.value} />
        </Form.Item>

        

        <Form.Item<FieldType>
          label=<div style={{display:'flex', alignItems:'center', gap:'2px'}}>
              
              <span style={{color: 'rgba(0, 0, 0, 0.7)'}}>再次输入密码</span>
            </div>
          name="repassword"
          rules={[{ required: true, message: "请再次输入密码!" }]}
        >
          <Input.Password style={{ width: '200px' }} value={UserFrom.current.repassword} onChange={e => UserFrom.current.repassword = e.target.value} />
        </Form.Item>

        
        
      </Form>
      <div style={{display:'flex' , flexDirection:'column' , alignItems:'center'}} onClick={handerRegister}>
          <Button type="dashed"  style={{ width: '300px', marginTop: '10px' , fontWeight: 600 }} >
            确认
          </Button>
      </div>

      <span style={{marginTop:'50px' , color: 'rgba(0, 0, 0, 0.3)'}}>@科大小智欢迎您的到来</span>
    </div>
  );
}

export default RegisterComponent