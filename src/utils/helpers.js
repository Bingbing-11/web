/**
 * 工具函数集合
 */

/** 生成唯一 ID */
export const genId = () => Math.random().toString(36).slice(2, 10);

/** 格式化日期 */
export const formatDate = (date) => {
  return new Date(date).toLocaleDateString("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
};

/** 深拷贝对象 */
export const deepClone = (obj) => JSON.parse(JSON.stringify(obj));
