import React, { useState, useCallback } from "react";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { useDebounce } from "./hooks/useDebounce";
import { genId } from "./utils/helpers";
import Stats from "./components/Stats";
import SearchBox from "./components/SearchBox";
import AddCourseForm from "./components/AddCourseForm";
import CourseList from "./components/CourseList";
import "./App.css";

/**
 * App — 课程管理系统主组件
 *
 * 使用的 Hooks:
 * - useLocalStorage: 状态持久化到 localStorage
 * - useDebounce: 搜索输入防抖
 * - useCallback: 缓存回调函数，配合 React.memo 优化性能
 * - useMemo (在 CourseList 中): 缓存筛选结果
 */
function App() {
  // 使用自定义 Hook 管理课程状态
  const [courses, setCourses] = useLocalStorage("courses_v2", [
    {
      id: genId(),
      title: "React 基础入门",
      desc: "组件、Props、State 核心概念",
      learned: false,
    },
    {
      id: genId(),
      title: "React Hooks 详解",
      desc: "useState、useEffect、useCallback、useMemo",
      learned: false,
    },
    {
      id: genId(),
      title: "JavaScript 高级",
      desc: "闭包、原型链、异步编程",
      learned: true,
    },
    {
      id: genId(),
      title: "TypeScript 实战",
      desc: "类型系统、接口、泛型编程",
      learned: false,
    },
  ]);

  // 搜索功能
  const [searchInput, setSearchInput] = useState("");
  const searchKeyword = useDebounce(searchInput, 300);

  // useCallback 包装所有回调函数，确保引用稳定
  const handleAdd = useCallback((title, desc) => {
    setCourses((prev) => [
      ...prev,
      { id: genId(), title, desc, learned: false },
    ]);
  }, []);

  const handleDelete = useCallback((id) => {
    if (window.confirm("确定删除这门课程吗？")) {
      setCourses((prev) => prev.filter((c) => c.id !== id));
    }
  }, []);

  const handleLearn = useCallback((id) => {
    setCourses((prev) => {
      const course = prev.find((c) => c.id === id);
      if (course && !course.learned) {
        alert(`🎉 开始学习「${course.title}」，加油！`);
      }
      return prev.map((c) =>
        c.id === id ? { ...c, learned: true } : c
      );
    });
  }, []);

  const handleEdit = useCallback((id, newTitle, newDesc) => {
    setCourses((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, title: newTitle, desc: newDesc } : c
      )
    );
  }, []);

  const handleClearAll = () => {
    if (window.confirm("⚠️ 确定清空所有课程吗？此操作不可恢复！")) {
      setCourses([]);
    }
  };

  return (
    <div className="app">
      {/* 页面标题 */}
      <header className="app-header">
        <h1>📚 课程管理系统</h1>
        <p>React Hooks 综合实践</p>
      </header>

      {/* 统计区 */}
      <Stats courses={courses} />

      {/* 搜索框 */}
      <SearchBox
        value={searchInput}
        onChange={setSearchInput}
        onClear={() => setSearchInput("")}
      />

      {/* 添加表单 */}
      <AddCourseForm onAdd={handleAdd} />

      {/* 课程列表 */}
      <CourseList
        courses={courses}
        searchKeyword={searchKeyword}
        onDelete={handleDelete}
        onLearn={handleLearn}
        onEdit={handleEdit}
      />

      {/* 底部操作 */}
      {courses.length > 0 && (
        <footer className="app-footer">
          <Stats courses={courses} />
          <button className="clear-all-btn" onClick={handleClearAll}>
            🗑️ 清空全部
          </button>
        </footer>
      )}

      {/* 技术说明 */}
      <details className="tech-details">
        <summary>📖 点击查看技术实现说明</summary>
        <div className="tech-content">
          <p>
            <b>useLocalStorage</b>：自定义 Hook，实现状态与 localStorage 的双向同步
          </p>
          <p>
            <b>useDebounce</b>：自定义 Hook，对搜索输入进行 300ms 防抖处理
          </p>
          <p>
            <b>useCallback</b>：缓存所有事件处理函数，避免子组件不必要的重渲染
          </p>
          <p>
            <b>useMemo</b>：在 CourseList 中缓存筛选后的课程列表
          </p>
          <p>
            <b>React.memo</b>：CourseCard 组件使用 memo 包裹，props 不变时跳过渲染
          </p>
          <p>
            <b>useRef</b>：AddCourseForm 中用于自动聚焦输入框
          </p>
        </div>
      </details>
    </div>
  );
}

export default App;
