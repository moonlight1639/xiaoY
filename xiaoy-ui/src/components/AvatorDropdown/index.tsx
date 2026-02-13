import { useState, useRef, useEffect } from "react";
import { useAuthStore } from "../../store";
import stuImg from '@/assets/avator/stu.jpg';
import { getUserInfo } from "../../services/userInfo";
import './AvatorDropdown.css';
import {useLoginStore} from '../../store/isLogin';
function AvatarDropdown() {
  const { setIsLogin} = useLoginStore();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { user , setUser} = useAuthStore()
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("click", handler);
    
    return () => document.removeEventListener("click", handler);
  }, []);
  useEffect(() => {
    getUserInfo().then(response => {
      console.log("用户信息", response);
      if (response.data && response.success) {
        const userInfo = response.data;
        setUser(userInfo, null);
      }
    });
  }, [setUser]);
  return (
    <div ref={ref} style={{ position: "relative" , padding: "0.375rem 0.75rem"}} onClick={() => setOpen(!open)}>
      {/* <img
        src="https://via.placeholder.com/40"
        alt="avatar"
        style={{ borderRadius: "50%", cursor: "pointer" }}
        onClick={() => setOpen(!open)}
      /> */}
      {
        user?.nickname ?
        <div className="user-info" >
        <span className="user-name">{user?.nickname || '未登录'}</span>
          <div className="user-avatar">
              {user?.avatar ? (
                  <img src={user.avatar} alt="头像" />
              ) : (
                  <img src={stuImg} alt="头像" />
              )}
          </div>
          {open && (
            <ul
              style={{
                position: "absolute",
                right: 0,
                top: "65px",
                width: "120px",
                boxShadow: "0 2px 8px rgba(0,0,0,.15)",
                listStyle: "none",
                padding: "1px",
                margin: 0,
                borderRadius: "4px",
                fontSize: "14px",
                fontWeight: 500,
                background: "var(--color-bg-card)",
                border: "0.5px solid var(--color-border)",
                animation : "translateShowY 0.05s"
              }}
            >
              <li style={itemStyle}> <svg className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="16" height="16"><path d="M979.936 962.976c-22.656 48.768-83.136 52.544-101.152 52.544l-741.856 0c-12.736-0.736-64.352-6.336-87.776-50.432-9.888-18.592-17.664-49.728 1.408-92.32 34.752-77.408 115.264-84.928 134.496-85.6 137.056-21.216 181.568-68.384 181.984-68.832l3.2-3.328c14.624-13.792 19.616-38.016 20.928-59.072-88.64-67.424-144.704-197.632-144.704-340.736 0-229.344 142.272-310.688 264.128-310.688 121.888 0 264.192 81.376 264.192 310.688 0 143.104-56 273.28-144.64 340.704 1.376 21.12 6.368 45.408 20.864 59.104l4 4.288c0.096 0 44.832 46.816 181.216 67.904 31.392 1.248 90.336 18.336 128.608 75.936 29.888 44.992 24.704 79.168 15.072 99.84z" fill="#2c2c2c"></path></svg> 
              个人中心</li>
              <li style={itemStyle}> <svg className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="16" height="16"><path d="M903.232 562.176A489.6 489.6 0 0 0 906.88 512c0-17.408-1.6-33.792-3.648-50.176l120.64-102.656-113.664-204.544-158.08 52.736a387.328 387.328 0 0 0-88.96-50.176L633.92 0H396.352l-35.328 157.184c-32.064 12.8-61.568 30.208-88.96 50.176l-155.84-52.736L0.192 359.168 120.96 461.824c-2.112 16.384-3.712 33.28-3.712 50.176s1.6 33.792 3.712 50.176L12.544 657.088 128 866.816l144-50.176c27.392 20.48 56.896 37.376 88.96 50.176L394.688 1024h239.232l29.248-157.184c32.128-12.8 61.568-30.208 88.96-50.176l145.216 50.176 125.12-209.728-119.232-94.912z m-104.256-87.552a265.024 265.024 0 0 1 0.064 74.752l-7.424 57.856 46.848 35.84 56.832 43.008-36.864 61.952-66.816-26.112-54.72-21.504-47.36 34.816a310.4 310.4 0 0 1-65.856 37.376l-55.744 22.016-8.448 57.856-10.496 69.12H475.264l-9.984-69.12-8.448-57.856-55.808-22.016a300.8 300.8 0 0 1-64.704-36.352l-47.936-35.84-55.744 22.016-66.88 26.112-36.864-61.952 56.896-43.008 46.848-35.84-7.36-57.856A400.768 400.768 0 0 1 222.592 512c0-10.24 1.088-22.016 2.688-37.376l7.36-57.856-46.848-35.84-56.896-43.008 36.864-61.952 66.88 26.112 54.72 21.504 47.36-34.816a310.4 310.4 0 0 1 65.792-37.376l55.808-22.016 8.448-57.856 10.496-69.12H548.48l10.048 69.12 8.384 57.856 55.808 22.016c23.04 9.408 44.8 21.632 64.768 36.352l47.872 35.84 55.808-22.016 66.816-26.112 36.864 61.952-56.32 43.52-46.848 35.84 7.36 57.856h-0.064zM512 320a192 192 0 1 0 0 384 192 192 0 0 0 0-384z m0 288c-52.8 0-96-43.2-96-96S459.2 416 512 416s96 43.2 96 96S564.8 608 512 608z" fill="#0B0D24"></path></svg> 设置</li>
              <li style={itemStyle} onClick={()=>{setUser(null , null);}}> <svg className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="16" height="16"><path d="M814 65.9H265.7c-80.5 0-146 65.5-146 146V320c0 19.9 16.1 36 36 36s36-16.1 36-36V211.9c0-40.8 33.2-74 74-74H814c40.8 0 74 33.2 74 74v602.6c0 40.8-33.2 74-74 74H265.7c-40.8 0-74-33.2-74-74V704.2c0-19.9-16.1-36-36-36s-36 16.1-36 36v110.3c0 80.5 65.5 146 146 146H814c80.5 0 146-65.5 146-146V211.9c0-80.5-65.5-146-146-146z" ></path><path d="M549.7 680.5c-13.5 14.6-12.6 37.4 2 50.9 6.9 6.4 15.7 9.6 24.4 9.6 9.7 0 19.4-3.9 26.5-11.6l177.4-192c6.5-7 9.6-15.9 9.5-24.8 0.1-8.8-3.1-17.7-9.5-24.8l-177.4-192c-13.5-14.6-36.3-15.5-50.9-2-14.6 13.5-15.5 36.3-2 50.9l121.6 131.6H100c-19.9 0-36 16.1-36 36s16.1 36 36 36h571.8L549.7 680.5z"></path></svg> 
              退出登录</li>
            </ul>
          )}
        </div>
        :
        <div className="nouser-info" onClick={()=>{setIsLogin(true)}}>
          
          <span className="user-name">登录/注册</span>
        </div>
      }
    </div>
  );
}

const itemStyle = {
  padding: "8px 12px",
  cursor: "pointer",
  color: "var(--color-text)",
  display: "flex",
  alignItems: "center",
  gap: "8px" 
};
export default AvatarDropdown;