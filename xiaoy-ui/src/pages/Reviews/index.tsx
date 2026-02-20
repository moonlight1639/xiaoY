import { useState , useRef, useEffect} from "react"
import { Link } from "react-router-dom";
import './Reviews.css';
import { getCourses } from "@/services/courseApi";
import defaultAvator from '@/assets/avator/defaultAvator.jpg'
import type { ChatMessageList ,Course} from "@/types";
import { ChatView } from "@/components";
// import doubapImg from '@/assets/doubao1.jpg'
// import stuImg from '@/assets/avator/stu.jpg'
function Reviews() {
  const [courses , setCourses] = useState<Course[]>([
    { id: 1, courseName: '计算机导论' , readCount:0 , likeCount:0 , commentCount:0 , collectCount:0},
    { id: 2, courseName: '数据结构与算法' , readCount:0 , likeCount:0 , commentCount:0 , collectCount:0},
    { id: 3, courseName: '操作系统概论' , readCount:0 , likeCount:0 , commentCount:0 , collectCount:0},
    { id: 4, courseName: '计算机网络' , readCount:0 , likeCount:0 , commentCount:0 , collectCount:0},
    { id: 5, courseName: '计算机导论' , readCount:0 , likeCount:0 , commentCount:0 , collectCount:0},
    { id: 6, courseName: '数据结构与算法' , readCount:0 , likeCount:0 , commentCount:0 , collectCount:0},
    { id: 7, courseName: '操作系统概论' , readCount:0 , likeCount:0 , commentCount:0 , collectCount:0},
    { id: 8, courseName: '计算机网络' , readCount:0 , likeCount:0 , commentCount:0 , collectCount:0},
    { id: 9, courseName: '计算机导论' , readCount:0 , likeCount:0 , commentCount:0 , collectCount:0},
    { id: 10, courseName: '数据结构与算法' , readCount:0 , likeCount:0 , commentCount:0 , collectCount:0},
    { id: 11, courseName: '操作系统概论' , readCount:0 , likeCount:0 , commentCount:0 , collectCount:0},
    { id: 12, courseName: '计算机网络' , readCount:0 , likeCount:0 , commentCount:0 , collectCount:0},
    { id: 13, courseName: '数据结构与算法' , readCount:0 , likeCount:0 , commentCount:0 , collectCount:0},
    { id: 14, courseName: '操作系统概论' , readCount:0 , likeCount:0 , commentCount:0 , collectCount:0},
    { id: 15, courseName: '计算机网络' , readCount:0 , likeCount:0 , commentCount:0 , collectCount:0},
    { id: 16, courseName: '计算机导论' , readCount:0 , likeCount:0 , commentCount:0 , collectCount:0},
    { id: 17, courseName: '数据结构与算法' , readCount:0 , likeCount:0 , commentCount:0 , collectCount:0},
    { id: 18, courseName: '操作系统概论' , readCount:0 , likeCount:0 , commentCount:0 , collectCount:0},
    { id: 19, courseName: '计算机网络' , readCount:0 , likeCount:0 , commentCount:0 , collectCount:0},
  ]);

  const listRefs = useRef<Record<number, HTMLDivElement | null>>({});
  const [highLightRef, setHighLightRef] = useState(-1);
  const timerId = useRef<ReturnType<typeof setTimeout> | null>(null);
  const container = useRef<HTMLDivElement | null>(null);
  const [activeConversation, setActiveConversation] = useState<ChatMessageList | null>({
    memoryId: '1',
    title: '示例对话',
    messages: [
      { type: 'user', content: '这是一条用户消息', createTime: new Date().toISOString() },
      { type: 'assistant', content: '这是一条助手消息', createTime: new Date().toISOString() }
    ],
    createTime: new Date().toISOString(),
  })
  
  useEffect(() => {
    const fetchCourses = async () => {
      
      const res = await getCourses();
      if (res.success == true && res.data) {
        
        setCourses(res.data);
      }
      
    };
    fetchCourses();
  }, []);

  useEffect(() => {
    listRefs.current = {};
    console.log('Courses updated, reset listRefs')
  }, [courses]);
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
    <div className="review-page" ref={container}>
      
      
      
        {/* 左侧 */}
        <div id='left' className="review-sidebar-left" style={{position:'sticky' , top:'0'}} key={'review-left'}>
          <div style={{textAlign:'left' , width:'100%'}}>
            <h2>⭐ 课程点评</h2>
            <p style={{ color: 'var(--color-text-secondary)', marginBottom: '1rem' }}>
              查看和分享课程评价，帮助你做出更好的选课决策
            </p>
          </div>
          <div style={{background:'white', width:"100%" , minHeight:'0', flex:'1' ,border : '1.7px solid var(--color-border)', borderRadius: '1rem', display:'flex' , flexDirection:'column' ,alignContent:'center' , alignItems:'center'  }}>
            <div style={{borderRadius:'4px 4px 0 0'  , height : '40px' , width : '100%' , display: 'flex', justifyContent: 'center' , alignItems: 'center'   }}>
              <p style={{ fontSize:'20px' , fontWeight: '600' , textShadow : '1px 1px 0 rgba(160, 196, 255,0.3)'}}>课程</p>
            </div>
            {/* , scrollbarWidth: 'none' */}
            <div style={{display:'flex' ,flexDirection:'column' , flex:'1' , width : '100%' , overflow:'auto' , scrollbarWidth: 'none' , alignItems: 'center' }}>  
              {

              courses.map(course => (
                
                  <div key={course.id} className="review-item" onClick={() => scrollToCourse(course.id)}>
                    <span style={{fontSize:'15px' , fontWeight : '500' , textShadow : '0.5px 0px 0 rgba(0,0,0,0.3)', color:'var(--color-text)'}}
                      
                      >
                      {course.courseName}
                      </span>
                  </div>

              ))
              }
            </div>
          </div>
          
            
          </div>

        {/* 中间 */}
        <div id='right' className="review-main-content">
          <div className="review-sidebar-right-header" >
              <h2>🧾 教师列表</h2>
          </div>
          <div className="review-content" >
            
            {
            courses.map(course => (


                <div  id={'course' + course.id} key={course.id} ref={el => {
                  if (el) {
                    listRefs.current[course.id] = el;
                  } else {
                    delete listRefs.current[course.id];
                  }  
                }} 
                className={`review-Reviewitem${highLightRef === course.id ? ' highlight' : ''}`} >
                  <div style={{display:'none'}}>
                    默认值赋值
                    {course.teacher = course.teacher || '刘春英'}
                    {course.description = course.description || `${course.courseName}是中科大春节学期开办的一门课，授课老师为刘春英，一个学期有20节课`}
                    {course.avatar = course.avatar || defaultAvator}
                  </div>
                  <img src={course.avatar} alt={`${course.courseName} avatar`} />
                  <Link to={`info/${course.id}`} style={{width:'90%'}}>
                  
                    <div>
                      <h4 style={{fontSize:'1.2rem' , fontWeight:'600' , color:'rgba(0 , 0 , 0 , 0.9)'}}>{course.courseName}</h4>
                      <span style={{fontSize:'0.95rem' , fontWeight:'550', color:'rgba(0 , 0 , 0 , 0.9)',marginTop:'2px'}}>授课老师 : {course.teacher}</span>
                      <span style={{fontSize:'0.9rem' , color:'rgba(0 , 0 , 0 , 0.5)'}}>{course.description}</span>
                      <div className="review-card-footer">
                        {/* <Link to={`info/${course.id}`}><Button >查看详细</Button></Link> */}
                        <span style={{fontWeight:'400' , fontSize:'0.9rem'}} >阅读 {course.readCount} 点赞 {course.likeCount} 评论 {course.commentCount} 收藏 {course.collectCount}</span>
                        
                      </div>
                      
                    </div>
                  </Link>
                  
                </div>

              ))}
          </div>

        
        </div>
        
        <div id='right' key={'review-right'} className="review-sidebar-right" style={{ position:'sticky' ,
    top:'50px' , marginTop:'50px'}}>
          
          
          {/* /* <div style={{ borderRadius:'4px 4px 0 0' , height : '40px' , width : '100%' , display: 'flex', justifyContent: 'center' , alignItems: 'center' }}>
            <p style={{ fontSize:'20px' , fontWeight: '600' }}>课程评价</p>
          </div>
          <div style={{ display:'flex' , justifyContent:'center' ,flexDirection:'column' , flex:'1' , width : '100%' , minHeight:'200px' , scrollbarWidth: 'none' }}>
            <span style={{fontSize:'1.5rem' , marginTop:'1rem'}}>暂无ai总结</span>
          </div> */ }
          
          <div key='chat-header' style = {{padding : '0.5rem 0.7rem', textAlign:'left', fontSize:'1.2rem', marginBottom:'0.5rem' , fontWeight:'600' , color:'rgba(0 , 0 , 0 , 0.9)'}}>
            <span >聊天助手</span>
          </div>
          <div style={{flex:'1'}}>
            <ChatView key='review-chat-body' AvatorSize={39} />
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
