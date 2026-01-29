import React, { useState } from 'react'
import './ReviewInfo.css'
import defaultAvator from '@/assets/avator/defaultAvator.jpg'
import { Button, Flex } from 'antd';
import stuAvator from '@/assets/avator/stu.jpg'
import stuAvator1 from '@/assets/avator/stu1.jpg'
function ReviewInfo() {
  const [comment, setComment] = useState([
    {id: 1, author: '用户A', content: '这本书非常有趣，学到了很多组合数学的知识！', img: stuAvator
    },
    {
      id: 2, author: '用户B', content: '内容详实，适合初学者入门。' , img: stuAvator1
    },
    { id: 3, author: '用户C', content: '讲解清晰，但例题稍显简单。' ,  img: stuAvator}
  ])

  return (
    <div className='review-info-page'>
    
      <div className='review-info-container'>
          <div className='review-info-left'>
            
            <img src={defaultAvator} alt={`头像`} />
            <h2>组合数学</h2>
            <p style={{color:'black' , marginBottom:'0.5rem'}}>郑慧南</p>
            <p>组合数学是数学的一个分支，研究有限或可数离散结构的性质和关系。它涉及排列、组合、图论、设计理论等多个领域，广泛应用于计算机科学、统计学和运筹学等领域。</p>
          </div>

          <div className='review-info-right'>
            <div className='review-info-right-header'>
              <h1 >组合数学</h1>
              <p>郑慧南</p> 
            </div>
              
            <div className='review-info-detail'>
              <span style={{fontSize:'1.3rem', lineHeight:'1.5' , fontWeight:'400' , color:'rgba(0,0,0,0.75)'}}>
                &emsp;&emsp;组合数学是数学的一个分支，研究有限或可数离散结构的性质和关系。它涉及排列、组合、图论、设计理论等多个领域，广泛应用于计算机科学、统计学和运筹学等领域。
              </span>   
            </div>
            <div className='revie-info-comment'>
              <div style={{position:'absolute' , top:'-30px' , left:'20px' , backgroundColor:'rgba(255,255,255,0.9)' , color:'black',
                 padding:'2px',
                display:'flex', alignItems:'center', gap:'5px',
              }}>
                <svg className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6038" width="40" height="40"><path d="M481.578667 968.832l-157.909334-158.293333H85.418667A85.290667 85.290667 0 0 1 0 725.12L0.426667 128.042667C0.426667 80.768 38.4 42.666667 85.845333 42.666667h852.778667c47.189333 0 85.418667 38.101333 85.376 85.418666l-0.426667 597.12c0 47.146667-38.229333 85.333333-85.376 85.333334h-237.781333l-158.549333 158.293333a42.624 42.624 0 0 1-60.288 0z m456.704-243.712L938.666667 128.042667s-852.906667-0.128-852.906667 0.042666c0 0-0.384 597.077333-0.298667 597.077334H341.333333c11.306667 0 22.186667 4.48 30.165334 12.501333l140.330666 140.629333 140.8-140.672a42.624 42.624 0 0 1 30.165334-12.458666h255.488zM277.333333 512a64 64 0 1 1 0-128 64 64 0 0 1 0 128z m234.666667 0a64 64 0 1 1 0-128 64 64 0 0 1 0 128z m234.666667 0a64 64 0 1 1 0-128 64 64 0 0 1 0 128z" fill="#3D3D3D" p-id="6039"></path></svg>
                <div style={{fontSize:'30px', fontWeight:'600', color:'rgba(0 , 0 , 0 , 0.75'}}>点评</div>
              </div>
              

              <div className='review-info-comment-container'>

                <textarea className='review-info-textarea' placeholder='我们需要您的宝贵点评！'>

                </textarea>
                <div className='review-info-comment-bottom'>
                  <div className='left'>
                    <button>上传图片(待实现)</button>
                  </div>
                  <div className='right'>
                    <Button type='primary' style={{fontSize : '1.1rem' , padding : '1rem 2rem'}}>发射点评!</Button>
                  </div>
                </div>
              </div>
              
              {comment.map((item) => (
                <div key={item.id} className='review-info-user-comment'>
                  <Flex align="start" gap={10} style={{height:'100%'}}>
                    <img src={item.img} alt={`头像`} style={{width:'50px', height:'50px', borderRadius:'50%' , objectFit : 'cover' , 
                      
                    }}/>
                    <div style={{width:'90%'}}>
                      <div style={{fontWeight:'600', fontSize:'1.2rem', color:'black',
                        display:'flex', alignItems:'center', gap:'8px'
                      }}>{item.author} 
                      </div>
                      <div style={{minHeight:'10rem', marginTop:'9px', fontSize:'1rem', color:'rgba(0,0,0,0.75)',
                        boxShadow : '0px 0px 4px rgba(0 , 0 , 0 , 0.2)' , padding : '1rem' , 
                      }}>{item.content}</div>
                      <div style={{ display:'flex' , width:'100%' , justifyContent:'flex-end' , paddingTop:'0.5rem' , gap:'0.5rem' , color:'rgba(0,0,0,0.6)' , fontSize:'1.2rem' , alignItems:'center'}}>
                        <svg t="1769345297924" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="10381" width="24" height="24"><path d="M523.733333 841.024l33.173334-32.576 99.690666-97.813333c70.976-69.632 120.32-117.973333 138.709334-135.893334 59.008-57.514667 93.248-121.28 99.626666-184.234666 6.250667-61.44-15.488-119.744-61.589333-164.672-44.992-43.84-98.88-61.909333-157.034667-52.906667-49.365333 7.616-101.034667 34.624-150.016 78.848a21.333333 21.333333 0 0 1-28.586666 0c-48.981333-44.224-100.650667-71.232-150.016-78.869333-58.154667-8.96-112.042667 9.088-157.034667 52.928-46.101333 44.928-67.84 103.210667-61.610667 164.693333 6.4 62.933333 40.64 126.72 99.648 184.213333a100207.573333 100207.573333 0 0 1 145.92 142.826667l24.256 23.765333L512 852.522667l11.733333-11.498667z m-11.733333 11.52l-1.493333 1.429333A2.133333 2.133333 0 0 1 512 853.333333c0.512 0 1.045333 0.213333 1.493333 0.64l-1.493333-1.450666z m157.781333-721.792c71.637333-11.093333 138.901333 11.477333 193.344 64.533333 55.317333 53.930667 81.834667 124.992 74.282667 199.530667-7.466667 73.642667-46.549333 146.368-112.32 210.474667-18.346667 17.898667-67.669333 66.218667-138.453333 135.637333-31.829333 31.232-65.706667 64.448-99.84 97.984L553.6 871.466667l-13.184 12.949333a40.554667 40.554667 0 0 1-56.832 0l-114.602667-112.64-24.213333-23.722667a677626.346667 677626.346667 0 0 0-145.856-142.762666C133.141333 541.184 94.08 468.48 86.613333 394.816c-7.552-74.538667 18.944-145.6 74.282667-199.530667 54.442667-53.056 121.706667-75.605333 193.344-64.533333 53.162667 8.213333 107.093333 34.688 157.781333 76.949333 50.709333-42.24 104.618667-68.736 157.781334-76.949333z" fill="#3D3D3D" p-id="10382"></path></svg>
                        <span style={{fontSize:'1rem' ,}}>123</span>
                        <svg t="1769345319578" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="11453" width="24" height="24"><path d="M512 917.333333h-4.266667c-149.333333-42.666667-443.733333-260.266667-443.733333-512 0-140.8 115.2-256 256-256 42.666667 0 81.066667 8.533333 115.2 29.866667 8.533333 4.266667 12.8 12.8 12.8 21.333333l-17.066667 110.933334 179.2 98.133333c4.266667 4.266667 8.533333 8.533333 12.8 17.066667 0 8.533333 0 12.8-8.533333 17.066666l-136.533333 115.2 55.466666 89.6-38.4 21.333334-64-106.666667c-4.266667-8.533333-4.266667-21.333333 4.266667-25.6l128-106.666667-166.4-93.866666c-8.533333-4.266667-12.8-12.8-12.8-21.333334l17.066667-106.666666c-25.6-12.8-51.2-17.066667-81.066667-17.066667-119.466667 0-213.333333 93.866667-213.333333 213.333333 0 217.6 260.266667 422.4 405.333333 469.333334 145.066667-46.933333 405.333333-251.733333 405.333333-469.333334 0-119.466667-93.866667-213.333333-213.333333-213.333333-34.133333 0-68.266667 8.533333-98.133333 21.333333l-21.333334-38.4c34.133333-17.066667 76.8-29.866667 115.2-29.866666 140.8 0 256 115.2 256 256 0 247.466667-290.133333 469.333333-443.733333 512 4.266667 4.266667 0 4.266667 0 4.266666z" p-id="11454"></path></svg>
                        <span style={{fontSize:'1rem' ,}}>234</span>
                      </div>
                     
                    </div>
                  </Flex>
                </div>
              ))}
            </div>   
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

export default ReviewInfo