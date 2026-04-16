import React from "react";
import "./SearchBox.css";

/**
 * SearchBox — 搜索框组件
 * @param {Object} props
 * @param {string} props.value - 输入值
 * @param {Function} props.onChange - 变化回调
 * @param {Function} props.onClear - 清空回调
 */
export default function SearchBox({ value, onChange, onClear }) {
  return (
    <div className="search-box">
      <span className="search-icon">🔍</span>
      <input
        className="search-input"
        type="text"
        placeholder="搜索课程名称或描述..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {value && (
        <button className="clear-btn" onClick={onClear}>
          ✕
        </button>
      )}
    </div>
  );
}
