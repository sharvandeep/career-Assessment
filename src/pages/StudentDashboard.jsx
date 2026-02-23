import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { getStudentHistory } from "../services/api";
import "../styles/studentdashboard.css";
import "../styles/global.css";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

export default function StudentDashboard() {

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")) || {};

  const [history, setHistory] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [scrollProgress, setScrollProgress] = useState(0);
  const wrapperRef = useRef(null);

  // Scroll progress tracker
  useEffect(() => {
    const handleScroll = () => {
      if (!wrapperRef.current) return;
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(Math.min(progress, 100));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const [stats, setStats] = useState({
    total: 0,
    average: 0,
    best: 0,
    latest: 0
  });

  useEffect(() => {

    const loadDashboardData = async () => {

      if (!user?.id) return;

      try {

        const res = await getStudentHistory(user.id);
        const data = res.data;

        setHistory(data);

        if (data.length > 0) {

          const totalAttempts = data.length;

          const average =
            data.reduce((sum, item) => sum + item.percentage, 0) / totalAttempts;

          const best = Math.max(...data.map(item => item.percentage));

          const latest = data[0].percentage;

          setStats({
            total: totalAttempts,
            average: average.toFixed(2),
            best: best.toFixed(2),
            latest: latest.toFixed(2)
          });

          const formatted = data.map((item, index) => ({
            name: `Attempt ${index + 1}`,
            percentage: item.percentage
          }));

          setChartData(formatted.reverse());
        }

      } catch (error) {
        console.error("Dashboard Load Error:", error);
      }
    };

    loadDashboardData();

  }, [user?.id]);

  // Milestone data for the journey
  const milestones = [
    { icon: '👤', label: 'Profile', color: '#6366f1' },
    { icon: '📊', label: 'Statistics', color: '#8b5cf6' },
    { icon: '📈', label: 'Progress', color: '#a855f7' },
    { icon: '🎯', label: 'Skills', color: '#06b6d4' },
    { icon: '📝', label: 'Assess', color: '#10b981' },
    { icon: '🏆', label: 'Results', color: '#f59e0b' },
    { icon: '📜', label: 'History', color: '#ec4899' }
  ];

  // Generate particles based on scroll
  const particles = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    delay: i * 0.3,
    size: 4 + (i % 3) * 2,
    offset: (i % 4) * 15
  }));

  return (
    <div className="sd-wrapper" ref={wrapperRef}>

      {/* Floating Background Elements */}
      <div className="sd-floating-elements">
        <div className="floating-shape shape-1" style={{ transform: `translateY(${scrollProgress * 2}px)` }}></div>
        <div className="floating-shape shape-2" style={{ transform: `translateY(${scrollProgress * -1.5}px) rotate(${scrollProgress}deg)` }}></div>
        <div className="floating-shape shape-3" style={{ transform: `translateY(${scrollProgress * 1}px)` }}></div>
        <div className="floating-shape shape-4" style={{ transform: `translateY(${scrollProgress * -2}px) rotate(${-scrollProgress * 0.5}deg)` }}></div>
        <div className="floating-shape shape-5" style={{ transform: `translateY(${scrollProgress * 1.5}px)` }}></div>
      </div>

      {/* Enhanced Journey Roadmap Path */}
      <div className="sd-journey-path">
        <svg className="journey-svg" viewBox="0 0 100 2400" preserveAspectRatio="none">
          <defs>
            {/* Main gradient */}
            <linearGradient id="pathGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#6366f1" />
              <stop offset="25%" stopColor="#8b5cf6" />
              <stop offset="50%" stopColor="#a855f7" />
              <stop offset="75%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#10b981" />
            </linearGradient>
            {/* Glow gradient */}
            <linearGradient id="glowGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#6366f1" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#a855f7" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.2" />
            </linearGradient>
            {/* Animated dash gradient */}
            <linearGradient id="dashGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
              <stop offset="50%" stopColor="#ffffff" stopOpacity="1" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>
            {/* Glow filter */}
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
            {/* Outer glow */}
            <filter id="outerGlow" x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur stdDeviation="8" result="blur"/>
              <feFlood floodColor="#6366f1" floodOpacity="0.5"/>
              <feComposite in2="blur" operator="in"/>
              <feMerge>
                <feMergeNode/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          {/* Background track (faded) */}
          <path
            className="journey-track"
            d="M 50 0 
               C 90 100, 10 200, 50 300 
               C 90 400, 10 500, 50 600 
               C 90 700, 10 800, 50 900 
               C 90 1000, 10 1100, 50 1200 
               C 90 1300, 10 1400, 50 1500 
               C 90 1600, 10 1700, 50 1800 
               C 90 1900, 10 2000, 50 2100 
               C 90 2200, 10 2300, 50 2400"
            fill="none"
            stroke="rgba(99, 102, 241, 0.1)"
            strokeWidth="8"
            strokeLinecap="round"
          />
          
          {/* Glow layer */}
          <path
            className="journey-glow-path"
            d="M 50 0 
               C 90 100, 10 200, 50 300 
               C 90 400, 10 500, 50 600 
               C 90 700, 10 800, 50 900 
               C 90 1000, 10 1100, 50 1200 
               C 90 1300, 10 1400, 50 1500 
               C 90 1600, 10 1700, 50 1800 
               C 90 1900, 10 2000, 50 2100 
               C 90 2200, 10 2300, 50 2400"
            fill="none"
            stroke="url(#glowGradient)"
            strokeWidth="20"
            strokeLinecap="round"
            filter="url(#outerGlow)"
            style={{ 
              strokeDasharray: 2600,
              strokeDashoffset: 2600 - (scrollProgress * 26)
            }}
          />
          
          {/* Main animated path */}
          <path
            className="journey-line-main"
            d="M 50 0 
               C 90 100, 10 200, 50 300 
               C 90 400, 10 500, 50 600 
               C 90 700, 10 800, 50 900 
               C 90 1000, 10 1100, 50 1200 
               C 90 1300, 10 1400, 50 1500 
               C 90 1600, 10 1700, 50 1800 
               C 90 1900, 10 2000, 50 2100 
               C 90 2200, 10 2300, 50 2400"
            fill="none"
            stroke="url(#pathGradient)"
            strokeWidth="4"
            strokeLinecap="round"
            filter="url(#glow)"
            style={{ 
              strokeDasharray: 2600,
              strokeDashoffset: 2600 - (scrollProgress * 26)
            }}
          />
          
          {/* Inner bright line */}
          <path
            className="journey-line-inner"
            d="M 50 0 
               C 90 100, 10 200, 50 300 
               C 90 400, 10 500, 50 600 
               C 90 700, 10 800, 50 900 
               C 90 1000, 10 1100, 50 1200 
               C 90 1300, 10 1400, 50 1500 
               C 90 1600, 10 1700, 50 1800 
               C 90 1900, 10 2000, 50 2100 
               C 90 2200, 10 2300, 50 2400"
            fill="none"
            stroke="white"
            strokeWidth="1"
            strokeLinecap="round"
            strokeOpacity="0.6"
            style={{ 
              strokeDasharray: 2600,
              strokeDashoffset: 2600 - (scrollProgress * 26)
            }}
          />
        </svg>
        
        {/* Floating Particles along path */}
        <div className="journey-particles">
          {particles.map((particle) => {
            const isVisible = scrollProgress > particle.delay * 8;
            return (
              <div
                key={particle.id}
                className={`journey-particle ${isVisible ? 'visible' : ''}`}
                style={{
                  top: `${5 + (particle.id * 12)}%`,
                  left: `${30 + particle.offset}px`,
                  width: `${particle.size}px`,
                  height: `${particle.size}px`,
                  animationDelay: `${particle.delay}s`,
                  opacity: isVisible ? 0.8 : 0
                }}
              />
            );
          })}
        </div>
        
        {/* Enhanced Milestone Nodes */}
        <div className="journey-milestones">
          {milestones.map((milestone, index) => {
            const nodeProgress = (index / (milestones.length - 1)) * 100;
            const isActive = scrollProgress >= nodeProgress - 5;
            const isPassed = scrollProgress > nodeProgress + 8;
            const distanceFromActive = Math.abs(scrollProgress - nodeProgress);
            const isNear = distanceFromActive < 15;
            
            return (
              <div 
                key={index} 
                className={`milestone-node ${isActive ? 'active' : ''} ${isPassed ? 'passed' : ''} ${isNear ? 'near' : ''}`}
                style={{ 
                  top: `${6 + (index * 12.5)}%`,
                  '--milestone-color': milestone.color,
                  '--pulse-delay': `${index * 0.2}s`
                }}
              >
                {/* Connector line to content */}
                <div className={`milestone-connector ${isActive ? 'active' : ''}`}></div>
                
                {/* Outer ring animation */}
                <div className="milestone-ring-outer"></div>
                <div className="milestone-ring-pulse"></div>
                
                {/* Main dot */}
                <div className="milestone-dot">
                  <div className="milestone-dot-inner">
                    <span className="milestone-icon">{milestone.icon}</span>
                  </div>
                  {/* Shine effect */}
                  <div className="milestone-shine"></div>
                </div>
                
                {/* Label with background */}
                <div className="milestone-label-container">
                  <span className="milestone-label">{milestone.label}</span>
                  <span className="milestone-progress">{Math.round(nodeProgress)}%</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Current position indicator */}
        <div 
          className="journey-current-marker"
          style={{ top: `${6 + (scrollProgress * 0.88)}%` }}
        >
          <div className="current-marker-dot"></div>
          <div className="current-marker-pulse"></div>
        </div>
      </div>

      {/* Enhanced Scroll Progress Indicator */}
      <div className="sd-progress-indicator">
        <div className="progress-label-top">Start</div>
        <div className="progress-track">
          <div className="progress-track-bg"></div>
          <div 
            className="progress-fill" 
            style={{ height: `${scrollProgress}%` }}
          >
            <div className="progress-fill-glow"></div>
          </div>
          {/* Progress markers */}
          {[0, 25, 50, 75, 100].map(mark => (
            <div 
              key={mark}
              className={`progress-marker ${scrollProgress >= mark ? 'passed' : ''}`}
              style={{ bottom: `${mark}%` }}
            />
          ))}
        </div>
        <div className="progress-label-bottom">End</div>
        <div className="progress-percentage">
          <span className="progress-number">{Math.round(scrollProgress)}</span>
          <span className="progress-symbol">%</span>
        </div>
      </div>

      <div className="sd-container">

        {/* HEADER */}
        <div className="sd-header">
          <h2>Student Dashboard</h2>
          <p>Welcome back, {user.name}</p>
        </div>

        {/* PROFILE SECTION */}
        <div className="sd-profile-card sd-animate-card" data-section="profile">
          <div className="card-glow"></div>
          <div className="glacier-sweep"></div>
          
          <div className="profile-header">
            <div className="profile-avatar">
              <div className="avatar-ring"></div>
              <div className="avatar-inner">
                <span className="avatar-emoji">👤</span>
              </div>
              <div className="avatar-status online"></div>
            </div>
            <div className="profile-title">
              <h3>{user.name || 'Student'}</h3>
              <span className="profile-role-badge">{user.role}</span>
            </div>
          </div>

          <div className="profile-details">
            <div className="profile-detail-item">
              <span className="detail-icon">🆔</span>
              <div className="detail-content">
                <span className="detail-label">User ID</span>
                <span className="detail-value">{user.userCode}</span>
              </div>
            </div>
            <div className="profile-detail-item">
              <span className="detail-icon">📧</span>
              <div className="detail-content">
                <span className="detail-label">Email</span>
                <span className="detail-value">{user.email}</span>
              </div>
            </div>
            <div className="profile-detail-item">
              <span className="detail-icon">🎓</span>
              <div className="detail-content">
                <span className="detail-label">Branch</span>
                <span className="detail-value">{user.branchName}</span>
              </div>
            </div>
          </div>

          <button className="profile-edit-btn" onClick={() => navigate("/student/profile")}>
            <span>✏️</span> Edit Profile
          </button>
        </div>

        {/* STATS SECTION */}
        <div className="sd-stats-grid sd-animate-row" data-section="stats">
          <div className="sd-stat-card stat-attempts">
            <div className="stat-icon-ring">
              <svg className="stat-ring-svg" viewBox="0 0 36 36">
                <circle className="stat-ring-bg" cx="18" cy="18" r="16" />
                <circle 
                  className="stat-ring-progress" 
                  cx="18" cy="18" r="16"
                  style={{ strokeDasharray: `${Math.min(stats.total * 10, 100)}, 100` }}
                />
              </svg>
              <div className="stat-icon">📝</div>
            </div>
            <div className="stat-content">
              <span className="stat-value-big">{stats.total}</span>
              <span className="stat-label">Total Attempts</span>
            </div>
            <div className="stat-card-shine"></div>
          </div>

          <div className="sd-stat-card stat-average">
            <div className="stat-icon-ring">
              <svg className="stat-ring-svg" viewBox="0 0 36 36">
                <circle className="stat-ring-bg" cx="18" cy="18" r="16" />
                <circle 
                  className="stat-ring-progress" 
                  cx="18" cy="18" r="16"
                  style={{ strokeDasharray: `${stats.average}, 100` }}
                />
              </svg>
              <div className="stat-icon">📊</div>
            </div>
            <div className="stat-content">
              <span className="stat-value-big">{stats.average}<small>%</small></span>
              <span className="stat-label">Average Score</span>
            </div>
            <div className="stat-card-shine"></div>
          </div>

          <div className="sd-stat-card stat-best">
            <div className="stat-icon-ring">
              <svg className="stat-ring-svg" viewBox="0 0 36 36">
                <circle className="stat-ring-bg" cx="18" cy="18" r="16" />
                <circle 
                  className="stat-ring-progress" 
                  cx="18" cy="18" r="16"
                  style={{ strokeDasharray: `${stats.best}, 100` }}
                />
              </svg>
              <div className="stat-icon">🏆</div>
            </div>
            <div className="stat-content">
              <span className="stat-value-big">{stats.best}<small>%</small></span>
              <span className="stat-label">Best Score</span>
            </div>
            <div className="stat-card-shine"></div>
          </div>

          <div className="sd-stat-card stat-latest">
            <div className="stat-icon-ring">
              <svg className="stat-ring-svg" viewBox="0 0 36 36">
                <circle className="stat-ring-bg" cx="18" cy="18" r="16" />
                <circle 
                  className="stat-ring-progress" 
                  cx="18" cy="18" r="16"
                  style={{ strokeDasharray: `${stats.latest}, 100` }}
                />
              </svg>
              <div className="stat-icon">⭐</div>
            </div>
            <div className="stat-content">
              <span className="stat-value-big">{stats.latest}<small>%</small></span>
              <span className="stat-label">Latest Score</span>
            </div>
            <div className="stat-card-shine"></div>
          </div>
        </div>

        {/* PERFORMANCE GRAPH */}
        <div className="sd-card sd-full sd-animate-card" data-section="performance">
          <div className="card-glow"></div>
          <h3>Performance Trend</h3>

          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="percentage"
                  stroke="#6366f1"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <p>No performance data available yet.</p>
          )}
        </div>
        

        {/* MAIN ACTIONS */}
        <div className="sd-card sd-animate-card" data-section="skills">
          <div className="card-glow"></div>
  <h3>Skill Analysis</h3>
  <p>
    View detailed breakdown of your performance by skill.
  </p>
  <button onClick={() => navigate("/student/skills")}>
    View Skill Analysis
  </button>
</div>
        <div className="sd-row sd-animate-row" data-section="actions">

          <div className="sd-card">
            <div className="card-glow"></div>
            <h3>Take Assessment</h3>
            <p>
              Attempt the career assessment to discover your strengths
              and suitable career paths.
            </p>
            <button onClick={() => navigate("/student/assessments")}>
              Start Assessment
            </button>
          </div>

          <div className="sd-card">
            <div className="card-glow"></div>
            <h3>My Results</h3>
            <p>
              View your completed assessments and performance analysis.
            </p>
            <button onClick={() => navigate(`/student/results/${user.id}`)}>
              View Results
            </button>
          </div>

        </div>

        {/* RECENT ATTEMPTS */}
        <div className="sd-attempts-card sd-animate-card" data-section="history">
          <div className="card-glow"></div>
          <div className="glacier-sweep"></div>
          
          <div className="attempts-header">
            <h3>📜 Recent Attempts</h3>
            <span className="attempts-count">{history.length} total</span>
          </div>

          {history.length > 0 ? (
            <div className="attempts-list">
              {history.slice(0, 3).map((item, index) => {
                const scoreClass = item.percentage >= 80 ? 'excellent' : 
                                   item.percentage >= 60 ? 'good' : 
                                   item.percentage >= 40 ? 'average' : 'needs-work';
                return (
                  <div key={index} className={`attempt-item ${scoreClass}`}>
                    <div className="attempt-rank">#{index + 1}</div>
                    <div className="attempt-info">
                      <span className="attempt-title">{item.assessmentTitle}</span>
                      <div className="attempt-score-bar">
                        <div 
                          className="score-fill" 
                          style={{ width: `${item.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="attempt-percentage">
                      {item.percentage.toFixed(1)}%
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="attempts-empty">
              <span className="empty-icon">📝</span>
              <p>No assessments attempted yet.</p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}