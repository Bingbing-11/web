import React from "react";
import "./Stats.css";

/**
 * Stats — 统计区组件
 * @param {Object} props
 * @param {Array} props.courses - 课程列表
 */
export default function Stats({ courses }) {
  const total = courses.length;
  const learned = courses.filter((c) => c.learned).length;
  const pending = total - learned;

  const StatItem = ({ label, value, color, icon }) => (
    <div className="stat-item">
      <span className="stat-icon" style={{ color }}>{icon}</span>
      <div className="stat-content">
        <div className="stat-label">{label}</div>
        <div className="stat-value" style={{ color }}>{value}</div>
      </div>
    </div>
  );

  return (
    <div className="stats-container">
      <StatItem label="课程总数" value={total} color="#667eea" icon="📚" />
      <StatItem label="已学习" value={learned} color="#52c41a" icon="✅" />
      <StatItem label="待学习" value={pending} color="#faad14" icon="📖" />
    </div>
  );
}
