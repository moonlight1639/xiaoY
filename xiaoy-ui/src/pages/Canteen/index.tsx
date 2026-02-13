import React, { useEffect, useRef, useState } from 'react';
import FoodImg from '@/assets/food/chicken.jpg'
import './Canteen.css'
import type { Location } from '@/types/Location';
import type { Dish } from '../../types/Dish';
import { ChatView } from '@/components';
function Canteen() {
  const [Rank ] = useState([
    {id : 1 , name: '宫保鸡丁', sales: 150},
    {id : 2 , name: '鱼香肉丝', sales: 120},
    {id : 3 , name: '麻婆豆腐', sales: 100},
    {id : 4 , name: '红烧肉', sales: 90},
    {id : 5 , name: '剁椒鱼头', sales: 80},
    {id : 6 , name: '扬州炒饭', sales: 70},
    {id : 7 , name: '清炒虾仁', sales: 60},
  ]);
  const [Location ] = useState<Location[]>(
    [
      {
        id: 1,
        name: '高新校区',
        dishList: [
          { id:1 , dishName: '宫保鸡丁',  description: '经典川菜，口味麻辣鲜香。' , price: 12.5, category: '川菜', locationId: 1, locationName: '高新校区' },
          { id:2 , dishName: '鱼香肉丝',  description: '酸甜适口，风味独特。' , price: 10.0 , category: '川菜', locationId: 1, locationName: '高新校区' },
          { id:3 , dishName: '麻婆豆腐',  description: '麻辣鲜香，豆腐嫩滑。' , price: 9.0, category: '川菜', locationId: 1, locationName: '高新校区' },
          { id:4 , dishName: '红烧肉',  description: '肥而不腻，入口即化。' , price: 15.0, category: '湘菜', locationId: 1, locationName: '高新校区' },
        ]
      },{
        id: 2,
        name: '东校区',
        dishList: [
          { id:1 , dishName: '宫保鸡丁',  description: '经典川菜，口味麻辣鲜香。' , price: 12.5, category: '川菜', locationId: 1, locationName: '高新校区' },
          { id:2 , dishName: '鱼香肉丝',  description: '酸甜适口，风味独特。' , price: 10.0, category: '川菜', locationId: 1, locationName: '高新校区' },
          { id:3 , dishName: '麻婆豆腐',  description: '麻辣鲜香，豆腐嫩滑。' , price: 9.0, category: '川菜', locationId: 1, locationName: '高新校区' },
          { id:4 , dishName: '红烧肉',  description: '肥而不腻，入口即化。' , price: 15.0, category: '湘菜', locationId: 1, locationName: '高新校区' },
        ]
      },{
        id: 3,
        name: '西校区',
        dishList: [
          { id:1 , dishName: '宫保鸡丁',  description: '经典川菜，口味麻辣鲜香。' , price: 12.5, category: '川菜', locationId: 1, locationName: '高新校区' },
          { id:2 , dishName: '鱼香肉丝',  description: '酸甜适口，风味独特。' , price: 10.0, category: '川菜', locationId: 1, locationName: '高新校区' },
          { id:3 , dishName: '麻婆豆腐',  description: '麻辣鲜香，豆腐嫩滑。' , price: 9.0, category: '川菜', locationId: 1, locationName: '高新校区' },
          { id:4 , dishName: '红烧肉',  description: '肥而不腻，入口即化。' , price: 15.0, category: '湘菜', locationId: 1, locationName: '高新校区' },
        ]
      }
      
    ]
  );
  useEffect(() => {
    
  }, []);

  const LocationRefs = useRef<(HTMLDivElement | null)[]>([])
  function scrollToLocation(index: number) {
    const target = LocationRefs.current[index];
    target?.scrollIntoView({ behavior: 'smooth' , block: 'start' }); 
  }
  return (
    <div className='canteen-page'>
      {/* <div className='canteen-header'>
        <h1>🍜 食堂信息</h1>
        <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>
          查看各食堂菜单和营业时间
        </p>
      </div> */}
      
      <div className='canteen-container'>
        
        <div className="canteen-left">
          <div className='canteen-header'>
            <h1>🍜 食堂信息</h1>
            <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>
              查看各食堂菜单和营业时间
            </p>
          </div>
          <div className='canteen-left-container'>
            <div className='canteen-left-header'>
              <svg className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="14549" width="42" height="42"><path d="M934.956522 934.956522h29.681159a44.521739 44.521739 0 0 1 0 89.043478h-920.115942a44.521739 44.521739 0 0 1 0-89.043478h29.68116v-771.710145A133.565217 133.565217 0 0 1 207.768116 29.681159h237.449275a133.565217 133.565217 0 0 1 133.565218 133.565218V296.811594H801.391304a133.565217 133.565217 0 0 1 133.565218 133.565218v504.57971z m-89.043479 0v-504.57971A44.521739 44.521739 0 0 0 801.391304 385.855072h-222.608695v549.10145h267.130434z m-356.173913 0v-771.710145A44.521739 44.521739 0 0 0 445.217391 118.724638H207.768116a44.521739 44.521739 0 0 0-44.521739 44.521739v771.710145h326.492753z m-207.768116-652.985508h89.043479a44.521739 44.521739 0 0 1 0 89.043479h-89.043479a44.521739 44.521739 0 0 1 0-89.043479z m0 207.768116h89.043479a44.521739 44.521739 0 0 1 0 89.043479h-89.043479a44.521739 44.521739 0 0 1 0-89.043479z m385.855073 0h89.043478a44.521739 44.521739 0 0 1 0 89.043479h-89.043478a44.521739 44.521739 0 0 1 0-89.043479z m-385.855073 207.768116h89.043479a44.521739 44.521739 0 0 1 0 89.043479h-89.043479a44.521739 44.521739 0 0 1 0-89.043479z m385.855073 0h89.043478a44.521739 44.521739 0 0 1 0 89.043479h-89.043478a44.521739 44.521739 0 0 1 0-89.043479z" fill="#333333" p-id="14550"></path></svg>
              <h1>校区</h1>
            </div>
            {Location.map((item) => (
              <div className='canteen-left-item' key={item.id} onClick={() => scrollToLocation(item.id)}>
                <span>{item.name}</span>
              </div>
              ))
            }
          </div>
          <div className='canteen-rank'>
            <h1 style={{fontSize:'30px', marginBottom:'0.5rem'}}> 📈排行榜</h1>
            
            {
              Rank.map((item , index) => (
                <div className='canteen-rank-item' key={item.id} >
                  <div className='rank-index'>{
                    index === 0 ? '🏆' : index === 1 ? '🥈' : index === 2 ? '🥉' : `${index + 1}` 
                  } </div> 
                  <span>{item.name}</span>
                </div>
              ))
            }
          </div>
        </div>
        <div className="canteen-right">
          <div className='canteen-right-container'>

          <div className='canteen-right-card-container'>
          {
            Location.map((loc) => (
              <React.Fragment key={loc.id}>
                <div className='canteen-right-location-card' ref={el =>{ 
                    if(el)
                      LocationRefs.current[loc.id] = el
                    else
                      delete LocationRefs.current[loc.id]
                  }
                  }>
                  <h2>{loc.name}</h2>
                </div>
                {
                  loc.dishList.map((food:Dish, foodIndex:number) => (
                    <div className='canteen-right-food-card' key={foodIndex} >
                          <div className='canteen-right-food-card-img'><img src={FoodImg} alt={food.dishName}></img></div>
                          
                          <div className='detail'>
                            <div style={{width:'100%' , display:'flex', flexDirection:'row'}}>
                              <div style={{width:'50%' , paddingLeft:'0rem' , textAlign:'left'}}><span>菜名:{food.dishName}</span></div>
                              <div style={{width:'50%' , paddingLeft:'0rem' , textAlign:'left'}}><span>标签:{food.category}</span></div>
                              
                            </div>
                            
                            <div style={{width:'100%' , display:'flex', flexDirection:'row'}}>
                              <div style={{width:'50%' , paddingLeft:'0rem' , textAlign:'left'}}><span>价格:￥{food.price.toFixed(2)}</span></div>
                              <div style={{width:'50%' , paddingLeft:'0rem' , textAlign:'left'}}><span>地点:{loc.name}</span></div>
                              
                            </div>
                            <div style={{width:'100%' , display:'flex', flexDirection:'row'}}>
                              <div style={{width:'100%' , textAlign:'left'}}><span>描述 ：{food.description}</span></div>
                              
                            </div>
                            
                            
                          </div>
                          <div style={{width:'100%' , display:'flex', flexDirection:'row', justifyContent:'flex-end', alignItems:'center' , paddingRight:'1rem' , marginTop:'0.5rem'}}>
                              <svg className='canteen-right-food-card-svg'  viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="16843" width="32" height="32"><path d="M669.781333 130.752c71.637333-11.093333 138.901333 11.477333 193.344 64.533333 55.317333 53.930667 81.834667 124.992 74.282667 199.530667-7.466667 73.642667-46.549333 146.368-112.32 210.474667-18.346667 17.898667-67.669333 66.218667-138.453333 135.637333-31.829333 31.232-65.706667 64.448-99.84 97.984L553.6 871.466667l-13.184 12.949333a40.554667 40.554667 0 0 1-56.832 0l-114.602667-112.64-24.213333-23.722667a677626.346667 677626.346667 0 0 0-145.856-142.762666C133.141333 541.184 94.08 468.48 86.613333 394.816c-7.552-74.538667 18.944-145.6 74.282667-199.530667 54.442667-53.056 121.706667-75.605333 193.344-64.533333 53.162667 8.213333 107.093333 34.688 157.781333 76.949333 50.709333-42.24 104.618667-68.736 157.781334-76.949333z" fill="#d81e06" p-id="16844"></path>
                              </svg> 
                              <span style={{fontSize:'15px' , color:'rgba(0 , 0 ,0 ,  0.7)'}}>123</span>
                          </div>
                      </div>
                    ))
                  }
                </React.Fragment>
                  

            ))
          }
                </div>
            </div>
        </div>
        <div className='canteen-ai'>
          <div style = {{padding : '0.5rem 0.7rem', textAlign:'left', fontSize:'1.2rem', marginBottom:'0.5rem' , fontWeight:'600' , color:'rgba(0 , 0 , 0 , 0.9)'}}>
            <span>聊天助手</span>
          </div>
          <ChatView AvatorSize={39} ContainerSize={300} />
        </div>
      </div>
      <footer className="footer">
        <div className="footer-content">
          <p>© 2026 科大小Y. All rights reserved.</p>
          <div className="footer-links">
            <a href="#">隐私政策</a>
            <a href="#">服务条款</a>
            <a href="#">联系我们</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Canteen