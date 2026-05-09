# Auth 模块 API 接口契约

## 基础信息

- **Base URL**: `/api/auth`
- **Content-Type**: `application/json`
- **认证方式**: JWT Bearer Token（Header: `Authorization: Bearer <token>`）

---

## 接口列表

### 1. POST /api/auth/register - 用户注册

**请求体**
```json
{
  "email": "string (必填, 有效邮箱格式)",
  "password": "string (必填, 最少8字符)",
  "username": "string (必填, 2-32字符)"
}
```

**成功响应 (201)**
```json
{
  "success": true,
  "user_id": "uuid-string",
  "token": "jwt-string"
}
```

**错误响应**
| code | 说明 |
|------|------|
| 400 | 参数格式错误 |
| 409 | 邮箱已注册 |

---

### 2. POST /api/auth/login - 用户登录

**请求体**
```json
{
  "email": "string (必填)",
  "password": "string (必填)"
}
```

**成功响应 (200)**
```json
{
  "success": true,
  "user_id": "uuid-string",
  "token": "jwt-string",
  "expires_at": "ISO8601 时间戳"
}
```

**JWT Token 规范**
- 算法: HS256
- Payload: `{ "sub": user_id, "exp": 过期时间 }`
- 有效期: 7 天（可配置 via JWT_EXPIRE_DAYS）

**错误响应**
| code | 说明 |
|------|------|
| 401 | 邮箱或密码错误 |

---

### 3. GET /api/auth/me - 获取当前用户信息

**请求头**
```
Authorization: Bearer <token>
```

**成功响应 (200)**
```json
{
  "user_id": "uuid-string",
  "email": "string",
  "username": "string",
  "vip_level": 0,
  "created_at": "ISO8601 时间戳"
}
```

**错误响应**
| code | 说明 |
|------|------|
| 401 | Token 无效或已过期 |

---

### 4. POST /api/auth/logout - 用户登出

**请求头**
```
Authorization: Bearer <token>
```

**成功响应 (200)**
```json
{
  "success": true
}
```

> 登出为客户端行为，服务端标记 token 失效（黑名单或删除）

---

## 数据库设计（SQLite）

### users 表
```sql
CREATE TABLE users (
    id TEXT PRIMARY KEY,              -- UUID v4
    email TEXT UNIQUE NOT NULL,        -- 登录账号
    password_hash TEXT NOT NULL,       -- bcrypt 哈希
    username TEXT NOT NULL,            -- 显示名称
    vip_level INTEGER DEFAULT 0,       -- VIP等级 (0=免费, 1=基础, 2=高级)
    created_at TEXT NOT NULL,          -- ISO8601
    updated_at TEXT NOT NULL           -- ISO8601
);
```

---

## 环境变量

| 变量 | 说明 | 默认值 |
|------|------|--------|
| JWT_SECRET_KEY | JWT签名密钥 | 必须设置 |
| JWT_EXPIRE_DAYS | Token有效期 | 7 |
| DATABASE_PATH | SQLite数据库路径 | ./auth.db |

---

## 状态码规范

| HTTP Status | 用途 |
|-------------|------|
| 200 | 成功 |
| 201 | 创建成功 |
| 400 | 参数错误 |
| 401 | 未授权 |
| 409 | 资源冲突 |
| 500 | 服务器错误 |