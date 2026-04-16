import React, { useState, useRef } from "react";
import "./AddCourseForm.css";

/**
 * AddCourseForm — 添加课程表单
 * @param {Object} props
 * @param {Function} props.onAdd - 添加课程回调 (title, desc) => void
 */
export default function AddCourseForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const titleRef = useRef(null);

  const handleAdd = () => {
    const trimmedTitle = title.trim();
    if (!trimmedTitle) {
      alert("⚠️ 课程名称不能为空");
      titleRef.current?.focus();
      return;
    }
    onAdd(trimmedTitle, desc.trim());
    setTitle("");
    setDesc("");
    titleRef.current?.focus();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleAdd();
  };

  return (
    <div className="add-course-form">
      <h3 className="form-title">➕ 添加新课程</h3>
      <div className="form-content">
        <input
          ref={titleRef}
          className="form-input"
          type="text"
          placeholder="课程名称（必填）"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <input
          className="form-input"
          type="text"
          placeholder="课程描述（选填）"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button className="form-button" onClick={handleAdd}>
          ＋ 添加课程
        </button>
      </div>
    </div>
  );
}
