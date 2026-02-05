import "./SchoolBus.css";

const campusShuttle = {
	title: "校园班车运行时刻表",
	subtitle: "（2025年9月7日执行）",
	columns: [
		{
			title: "东区 → 西区",
			times: [
				"7:25★",
				"9:20",
				"9:35",
				"11:35",
				"12:15",
				"13:30★",
				"15:30",
				"15:50",
				"17:30★",
				"17:50",
				"18:40★",
				"20:10",
				"21:15★",
				"22:10",
			],
		},
		{
			title: "西区 → 东区",
			times: [
				"7:35★",
				"9:30",
				"9:45",
				"11:45",
				"12:25",
				"13:40★",
				"15:40",
				"16:00",
				"17:40★",
				"18:00",
				"18:50★",
				"20:20",
				"21:25★",
				"22:20",
			],
		},
		{
			title: "南区 → 东区",
			times: [
				"7:10",
				"7:25",
				"8:30",
				"11:35",
				"7:30★",
				"8:00",
				"8:30",
				"9:00",
				"12:05",
				"13:20",
				"13:40★",
				"14:00",
				"15:10",
				"19:15★",
				"20:45",
				"21:50★",
				"22:45",
			],
		},
		{
			title: "南区 → 西区",
			times: [
				"7:10▲",
				"7:35",
				"7:30★",
				"8:30",
				"9:00",
				"13:20",
				"13:40★",
				"14:00",
				"15:10",
				"17:35★",
				"18:00",
				"18:50",
				"20:20",
				"21:25★",
				"22:20",
			],
		},
	],
};

const highTechWeekday = {
	title: "工作日",
	left: {
		route: "高新校区 → 先研院 → 西区 → 东区",
		times: [
			"6:40",
			"8:00",
			"9:35",
			"12:50",
			"14:30",
			"16:00",
			"18:30",
			"22:05",
		],
	},
	right: {
		route: "东区 → 西区 → 先研院 → 高新校区",
		times: [
			"6:50",
			"8:00",
			"12:50",
			"14:30",
			"16:00",
			"18:30",
			"21:20",
			"22:05",
		],
	},
};

const highTechHoliday = {
	title: "双休节假日",
	left: {
		route: "高新校区 → 先研院 → 西区 → 东区",
		times: ["8:00", "13:40", "16:00", "21:50"],
	},
	right: {
		route: "东区 → 西区 → 先研院 → 高新校区",
		times: ["7:00", "12:50", "18:30", "21:50"],
	},
};

function SchoolBus() {
	return (
		<div className="schoolbus-page">
			<header className="schoolbus-hero">
				<p className="hero-subtitle">中国科大2025年秋季学期</p>
				<h1 className="hero-title">校车时刻表</h1>
			</header>

			<section className="schoolbus-card">
				<div className="card-title">
					<span>校园班车运行时刻表</span>
					<em>（2025年9月7日执行）</em>
				</div>

				<div className="campus-grid">
					{campusShuttle.columns.map((col) => (
						<div key={col.title} className="campus-col">
							<h3>{col.title}</h3>
							<ul>
								{col.times.map((time) => (
									<li key={time}>{time}</li>
								))}
							</ul>
						</div>
					))}
					<div className="campus-rules">
						<h3>乘车守则</h3>
						<ul>
							<li>文明乘车 · 有序排队</li>
							<li>注意安全 · 严禁超员</li>
							<li>前门上车 · 后门下车</li>
							<li>车票当日有效</li>
							<li>特殊天气视情况调整</li>
						</ul>
					</div>
				</div>
			</section>

			<section className="schoolbus-card">
				<div className="card-title">
					<span>高新校区班车运行时刻表</span>
					<em>（2025年9月7日执行）</em>
				</div>

				<div className="bus-block">
					<h3>{highTechWeekday.title}</h3>
					<div className="bus-grid">
						<div className="bus-col">
							<p className="bus-route">{highTechWeekday.left.route}</p>
							<div className="bus-times">
								{highTechWeekday.left.times.map((t) => (
									<span key={t}>{t}</span>
								))}
							</div>
						</div>
						<div className="bus-col">
							<p className="bus-route">{highTechWeekday.right.route}</p>
							<div className="bus-times">
								{highTechWeekday.right.times.map((t) => (
									<span key={t}>{t}</span>
								))}
							</div>
						</div>
					</div>
				</div>

				<div className="bus-block">
					<h3>{highTechHoliday.title}</h3>
					<div className="bus-grid">
						<div className="bus-col">
							<p className="bus-route">{highTechHoliday.left.route}</p>
							<div className="bus-times">
								{highTechHoliday.left.times.map((t) => (
									<span key={t}>{t}</span>
								))}
							</div>
						</div>
						<div className="bus-col">
							<p className="bus-route">{highTechHoliday.right.route}</p>
							<div className="bus-times">
								{highTechHoliday.right.times.map((t) => (
									<span key={t}>{t}</span>
								))}
							</div>
						</div>
					</div>
				</div>

				<p className="bus-note">注：标注“★ / ▲”为图中标识班次，请以官方最新通知为准。</p>
			</section>

			<footer className="schoolbus-footer">关注 @ 蜗壳小道消息</footer>
		</div>
	);
}

export default SchoolBus;
