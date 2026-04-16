import React, { useRef, memo } from "react";
import "./CourseCard.css";

/**
 * CourseCard — 课程卡片组件
 * @param {Object} props
 * @param {Object} props.course - 课程数据 { id, title, desc, learned }
 * @param {Function} props.onDelete - 删除回调 (id) => void
 * @param {Function} props.onLearn - 学习回调 (id) => void
 * @param {Function} props.onEdit - 编辑回调 (id, newTitle, newDesc) => void
 */
const CourseCard = memo(function CourseCard({ course, onDelete, onLearn, onEdit }) {
  const { id, title, desc, learned } = course;
  const renderCount = useRef(0);
  renderCount.current += 1;

  const handleEdit = () => {
    const newTitle = prompt("✏️ 修改课程标题:", title);
    if (newTitle === null) return;

    const trimmedTitle = newTitle.trim();
    if (!trimmedTitle) {
      alert("⚠️ 课程标题不能为空");
      return;
    }

    const newDesc = prompt("📝 修改课程描述:", desc || "");
    if (newDesc === null) return;

    onEdit(id, trimmedTitle, newDesc.trim());
  };

  return (
    <li className={`course-card ${learned ? "learned" : ""}`}>
      <div className="course-status">
        {learned ? "✅" : "📖"}
      </div>

      <div className="course-info">
        <h4 className="course-title">{title}</h4>
        {desc && <p className="course-desc">{desc}</p>}
        <div className="course-meta">
          <code className="course-id">id: {id}</code>
          <span className="render-count">渲染: {renderCount.current}</span>
        </div>
      </div>

      <div className="course-actions">
        <button
          className={`action-btn ${learned ? "learned-btn" : "learn-btn"}`}
          onClick={() => onLearn(id)}
        >
          {learned ? "已完成" : "开始学习"}
        </button>
        <button className="action-btn edit-btn" onClick={handleEdit}>
          ✏️ 编辑
        </button>
        <button className="action-btn delete-btn" onClick={() => onDelete(id)}>
          🗑️ 删除
        </button>
      </div>
    </li>
  );
});

export default CourseCard;
