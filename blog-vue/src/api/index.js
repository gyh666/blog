import request from "./request";

// 登录
export const login = params => request.post("/api/user/login", params);

// 获取博客列表
export const getBlogList = params => request.get("/api/blog/list", params);

// 获取博客详情
export const getBlogDetail = params => request.get("/api/blog/detail", params);
