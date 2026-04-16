import React, { useMemo } from "react";
import CourseCard from "./CourseCard";
import "./CourseList.css";

/**
 * CourseList — 课程列表组件
 * @param {Object} props
 * @param {Array} props.courses - 所有课程
 * @param {string} props.searchKeyword - 搜索关键词（已防抖）
 * @param {Function} props.onDelete - 删除回调
 * @param {Function} props.onLearn - 学习回调
 * @param {Function} props.onEdit - 编辑回调
 */
export default function CourseList({
  courses,
  searchKeyword,
  onDelete,
  onLearn,
  onEdit,
}) {
  // useMemo 缓存筛选结果
  const filteredCourses = useMemo(() => {
    if (!searchKeyword.trim()) return courses;
    const lower = searchKeyword.toLowerCase();
    return courses.filter(
      (c) =>
        c.title.toLowerCase().includes(lower) ||
        (c.desc && c.desc.toLowerCase().includes(lower))
    );
  }, [courses, searchKeyword]);

  if (filteredCourses.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">🔍</div>
        <p>
          {courses.length === 0
            ? "暂无课程，请先添加 👆"
            : `未找到 "${searchKeyword}" 相关课程`}
        </p>
      </div>
    );
  }

  return (
    <div className="course-list">
      <div className="list-header">
        <span className="list-stats">
          共 <b>{courses.length}</b> 门课程
          {searchKeyword && (
            <>
              ，筛选后 <b>{filteredCourses.length}</b> 门
            </>
          )}
        </span>
        <span className="memo-badge">useMemo 缓存</span>
      </div>
      <ul className="list-content">
        {filteredCourses.map((course) => (
          <CourseCard
            key={course.id}
            course={course}
            onDelete={onDelete}
            onLearn={onLearn}
            onEdit={onEdit}
          />
        ))}
      </ul>
    </div>
  );
}
