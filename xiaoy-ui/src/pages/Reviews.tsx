import { useState , useRef} from "react"
import { Link } from "react-router-dom";
import './Reviews.css'
import defaultAvator from '../assets/avator/defaultAvator.jpg'
function Reviews() {
  const [courses , setCourses] = useState([
    { id: 1, name: '计算机导论', reviews: ['非常有趣，适合入门。', '老师讲解清晰，内容丰富。'] },
    { id: 2, name: '数据结构与算法', reviews: ['课程内容扎实，但作业量较大。', '学到了很多实用的算法技巧。'] },
    { id: 3, name: '操作系统概论', reviews: ['理论性强，实践环节有待加强。', '对理解计算机工作原理很有帮助。'] },
    { id: 4, name: '计算机网络', reviews: ['内容全面，涵盖了网络的各个方面。', '实验设计合理，帮助理解概念。']},
    { id: 5, name: '计算机导论', reviews: ['非常有趣，适合入门。', '老师讲解清晰，内容丰富。'] },
    { id: 6, name: '数据结构与算法', reviews: ['课程内容扎实，但作业量较大。', '学到了很多实用的算法技巧。'] },
    { id: 7, name: '操作系统概论', reviews: ['理论性强，实践环节有待加强。', '对理解计算机工作原理很有帮助。'] },
    { id: 8, name: '计算机网络', reviews: ['内容全面，涵盖了网络的各个方面。', '实验设计合理，帮助理解概念。']},
    { id: 9, name: '计算机导论', reviews: ['非常有趣，适合入门。', '老师讲解清晰，内容丰富。'] },
    { id: 10, name: '数据结构与算法', reviews: ['课程内容扎实，但作业量较大。', '学到了很多实用的算法技巧。'] },
    { id: 11, name: '操作系统概论', reviews: ['理论性强，实践环节有待加强。', '对理解计算机工作原理很有帮助。'] },
    { id: 12, name: '计算机网络', reviews: ['内容全面，涵盖了网络的各个方面。', '实验设计合理，帮助理解概念。']},
    { id: 13, name: '数据结构与算法', reviews: ['课程内容扎实，但作业量较大。', '学到了很多实用的算法技巧。'] },
    { id: 14, name: '操作系统概论', reviews: ['理论性强，实践环节有待加强。', '对理解计算机工作原理很有帮助。'] },
    { id: 15, name: '计算机网络', reviews: ['内容全面，涵盖了网络的各个方面。', '实验设计合理，帮助理解概念。']},
    { id: 16, name: '计算机导论', reviews: ['非常有趣，适合入门。', '老师讲解清晰，内容丰富。'] },
    { id: 17, name: '数据结构与算法', reviews: ['课程内容扎实，但作业量较大。', '学到了很多实用的算法技巧。'] },
    { id: 18, name: '操作系统概论', reviews: ['理论性强，实践环节有待加强。', '对理解计算机工作原理很有帮助。'] },
    { id: 19, name: '计算机网络', reviews: ['内容全面，涵盖了网络的各个方面。', '实验设计合理，帮助理解概念。']},
  ]);
  const listRefs = useRef<Record<number, HTMLDivElement | null>>({});
  const [highLightRef, setHighLightRef] = useState(-1);
  const timerId = useRef<ReturnType<typeof setTimeout> | null>(null);
  const container = useRef<HTMLDivElement | null>(null);
  function scrollToCourse(id : number) {
    const containerTop = container.current?.getBoundingClientRect().top;
    const target = listRefs.current[id]
    
    const targetTop = target?.getBoundingClientRect().top;
    if (target && typeof targetTop === 'number') {
      container.current?.scrollTo({behavior: 'smooth', top : (container.current?.scrollTop ?? 0) + (targetTop - containerTop!) - 20});
      console.log(targetTop , containerTop , container.current?.scrollTop , (container.current?.scrollTop ?? 0) + (targetTop - containerTop!) - 20);
    }
    
    setHighLightRef(id);
    if(timerId.current) clearTimeout(timerId.current);
    timerId.current = setTimeout(() => setHighLightRef(-1), 1000);

  }
  return (
    <div className="review-page" ref = {el => container.current = el}>
      
      
      
        {/* 左侧 */}
        <div id='left' className="review-sidebar" style={{position:'sticky' , top:'0'}}>
          <div style={{marginLeft:'7%' ,textAlign:'left'}}>
            <h2>⭐ 课程点评</h2>
            <p style={{ color: 'var(--color-text-secondary)', marginBottom: '1rem' }}>
              查看和分享课程评价，帮助你做出更好的选课决策
            </p>
          </div>
          <div style={{width:"100%" , height:'fit-content'}}>
            <div style={{borderRadius:'4px 4px 0 0' , background : '#87CEFA' , height : '40px' , width : '100%' , display: 'flex', justifyContent: 'center' , alignItems: 'center' , borderBottom:'1px solid var(--color-border)'}}>
              <p style={{color:'#2563EB', fontSize:'20px' , fontWeight: '600' , textShadow : '1px 1px 0 rgba(160, 196, 255,0.3)'}}>课程</p>
            </div>
            <div style={{display:'flex' , flexDirection:'column' , flex:'1' , width : '100%' , overflow:'auto' , scrollbarWidth: 'none' , border: '1.7px solid var(--color-border)'}}>
              {

              courses.map(course => (
                
                  <div key={course.id} className="review-item" onClick={() => scrollToCourse(course.id)}>
                    <span style={{fontSize:'15px' , fontWeight : '500' , textShadow : '0.5px 0px 0 rgba(0,0,0,0.3)', color:'var(--color-text)'}}
                      
                      >
                      {course.name}
                      </span>
                  </div>

              ))
              }
            </div>
          </div>
          
            
          </div>

        {/* 中间 */}
        <div id='right' className="review-main-content">
          
          <div className="review-content" >
            {
            courses.map(course => (


                <Link to='info' id={'course' + course.id} key={course.id} ref={el => listRefs.current[course.id] = el} 
                className={`review-Reviewitem${highLightRef === course.id ? ' highlight' : ''}`} >
                  <img src={defaultAvator} alt={`${course.name} avatar`} />
                  <div>
                    <h4>{course.name}</h4>
                    <span style={{fontSize:'1.1rem' , color:'rgba(0 , 0 , 0 , 0.9)',marginTop:'2px'}}>授课老师 : 刘春英</span>
                    <span style={{fontSize:'0.9rem' , color:'rgba(0 , 0 , 0 , 0.5)'}}>{course.name}是中科大春节学期开办的一门课，授课老师为刘春英，一个学期有20节课</span>
                    <div className="review-card-footer">
                      <span>查看详细</span>
                      <span>阅读 点赞 评论 收藏</span>
                      
                    </div>
                    
                  </div>
                  
                </Link>

              ))}
          </div>

        
        </div>
        
        <div id='left' className="review-sidebar" style={{position:'sticky',
    top:'100px'}}>
          
          <div style={{borderRadius:'4px 4px 0 0' , background : '#87CEFA' , height : '40px' , width : '100%' , display: 'flex', justifyContent: 'center' , alignItems: 'center' , borderBottom:'1px solid var(--color-border)'}}>
            <p style={{color:'#2563EB', fontSize:'20px' , fontWeight: '600' , textShadow : '1px 1px 0 rgba(160, 196, 255,0.3)'}}>课程评价</p>
          </div>
          <div style={{display:'flex' , justifyContent:'center' ,flexDirection:'column' , flex:'1' , width : '100%' , minHeight:'200px' , scrollbarWidth: 'none' , border: '1.7px solid var(--color-border)'}}>
            <span style={{fontSize:'1.5rem' , marginTop:'1rem'}}>暂无ai总结</span>
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

export default Reviews
