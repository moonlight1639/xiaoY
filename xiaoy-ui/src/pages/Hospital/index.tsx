import { useState } from 'react'
import './Hospital.css'

// 科室数据
const departments = [
  {
    name: '内科',
    icon: '🩺',
    desc: '诊治内科常见病、多发病，包括呼吸、消化、心血管等系统疾病',
    doctors: ['简梅', '黄海', '梁胜', '徐骝', '佟颖', '吕晓飞', '张至强', '王珊']
  },
  {
    name: '眼科',
    icon: '👁️',
    desc: '重点特色科室，设有白内障、青光眼、小儿弱视、斜视、眼底病等专家门诊',
    doctors: ['陈莺', '牛梦琪', '汪晨', '刘超凡', '刘梦可', '许玮', '孙正杨', '孙文峰'],
    highlight: true
  },
  {
    name: '普外科',
    icon: '🔬',
    desc: '开展常见外科手术，包括阑尾炎、疝气、胆囊等手术',
    doctors: ['车娴', '陈银河']
  },
  {
    name: '口腔科',
    icon: '🦷',
    desc: '口腔常见病诊治、拔牙、补牙、洁牙等',
    doctors: ['王东贵', '张善青']
  },
  {
    name: '妇科',
    icon: '👩‍⚕️',
    desc: '妇科常见病诊治、妇女保健',
    doctors: ['方玉兰']
  },
  {
    name: '耳鼻喉科',
    icon: '👂',
    desc: '耳鼻喉常见病诊治',
    doctors: ['倪娅萍']
  },
  {
    name: '皮肤科',
    icon: '🧴',
    desc: '皮肤常见病诊治',
    doctors: ['李芸']
  },
  {
    name: '传统医学科',
    icon: '🌿',
    desc: '中医诊治、针灸推拿、康复理疗',
    doctors: ['马树田', '高平洋', '靳丹丹', '陈丙亮', '曹婷']
  },
  {
    name: '检验科',
    icon: '🧪',
    desc: '血液、生化、免疫等检验',
    doctors: ['王秋桐', '孟颜', '谢玉燕', '高娟']
  },
  {
    name: '影像科',
    icon: '📷',
    desc: 'CT、磁共振、DR、超声等影像检查',
    doctors: ['朱江', '李威', '段梦萦', '蔡梦佳']
  }
]

function Hospital() {
  const [activeDept, setActiveDept] = useState<string | null>(null)

  return (
    <div className="hospital-page">
      {/* 头部介绍 */}
      <header className="hospital-header">
        <h1>🏥 中国科学技术大学医院</h1>
        <p className="hospital-subtitle">省市职工、城乡居民医保定点医院</p>
      </header>

      {/* 医院简介 */}
      <section className="hospital-intro">
        <h2>医院简介</h2>
        <p>
          中国科学技术大学医院座落在风景优美、学术氛围浓厚的中国科学技术大学校园内，
          担负着中国科学技术大学及周边地区的医疗、预防保健、健康教育、教学、急救等任务。
          经过六十多年的艰苦创业和十多年的快速发展，现已成为<strong>学科齐全、技术配套、设备先进、环境舒适</strong>，
          集医疗、教学、科研、急救、预防、保健工作为一体的综合性二级医院，合肥市继续医学教育承办单位。
        </p>
        <p>
          医院坚持走"小综合、大专科"的办院模式，形成了眼科在全国范围内都具备明显技术优势和专业特色的喜人局面。
        </p>
      </section>

      {/* 重点科室 */}
      <section className="hospital-highlight">
        <h2>⭐ 重点特色科室 - 眼科</h2>
        <div className="highlight-card">
          <p>
            眼科经过多年的发展，现设有门诊、住院、儿童弱视斜视研究治疗中心及训练部、准分子激光治疗中心(PRK)。
            眼科门诊除设普通门诊外，还有<strong>白内障、青光眼、小儿弱视、斜视、眼底病、眼外伤、角膜病、眼肌病、低视力、眼屈光</strong>等专家、专科门诊。
          </p>
          <p className="highlight-tip">
            💡 为方便患者，特别是学龄青少年患者就诊，眼科节假日照常门诊、验光。
          </p>
          <div className="contact-info">
            <span>📞 眼科咨询电话：0551-63606811 / 63606549</span>
          </div>
        </div>
      </section>

      {/* 医疗设备 */}
      <section className="hospital-equipment">
        <h2>🔧 医疗设备</h2>
        <p>医院拥有现代化的医疗仪器设备：</p>
        <ul className="equipment-list">
          <li>飞利浦64排螺旋CT</li>
          <li>西门子1.5T超导磁共振</li>
          <li>普兰梅卡口腔全景CT一体机</li>
          <li>飞利浦Q7超声</li>
          <li>迈瑞780DR</li>
          <li>欧林巴斯胃镜</li>
          <li>彩色多普勒超声</li>
        </ul>
      </section>

      {/* 科室列表 */}
      <section className="hospital-departments">
        <h2>📋 科室介绍</h2>
        <div className="departments-grid">
          {departments.map((dept) => (
            <div
              key={dept.name}
              className={`dept-card ${dept.highlight ? 'highlight-dept' : ''} ${activeDept === dept.name ? 'active' : ''}`}
              onClick={() => setActiveDept(activeDept === dept.name ? null : dept.name)}
            >
              <div className="dept-header">
                <span className="dept-icon">{dept.icon}</span>
                <h3>{dept.name}</h3>
                {dept.highlight && <span className="badge">特色</span>}
              </div>
              <p className="dept-desc">{dept.desc}</p>
              {activeDept === dept.name && (
                <div className="dept-doctors">
                  <h4>科室医生</h4>
                  <div className="doctors-list">
                    {dept.doctors.map((doctor) => (
                      <span key={doctor} className="doctor-tag">{doctor}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        <p className="dept-tip">💡 点击科室卡片查看医生列表</p>
      </section>

      {/* 联系方式 */}
      <section className="hospital-contact">
        <h2>📞 联系方式</h2>
        <div className="contact-grid">
          <div className="contact-item">
            <span className="contact-label">眼科咨询</span>
            <span className="contact-value">0551-63606811 / 63606549</span>
          </div>
          <div className="contact-item">
            <span className="contact-label">院办电话</span>
            <span className="contact-value">0551-63602739</span>
          </div>
          <div className="contact-item">
            <span className="contact-label">医保办</span>
            <span className="contact-value">0551-63607801</span>
          </div>
          <div className="contact-item full-width">
            <span className="contact-label">医院地址</span>
            <span className="contact-value">安徽省合肥市太湖路与金寨路交口东100米</span>
          </div>
        </div>
      </section>

      {/* 就诊提示 */}
      <section className="hospital-tips">
        <h2>📝 就诊提示</h2>
        <ul>
          <li>本院为省市职工、城乡居民医保定点医院</li>
          <li>眼科节假日照常门诊、验光</li>
          <li>就诊请携带医保卡或电子医保凭证</li>
          <li>如有疑问可拨打咨询电话</li>
        </ul>
      </section>
    </div>
  )
}

export default Hospital
