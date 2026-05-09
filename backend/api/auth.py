"""
Auth API 路由
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/me
POST /api/auth/logout
"""
import re
from fastapi import APIRouter, HTTPException, Header
from pydantic import BaseModel, EmailStr

from . import auth, database

router = APIRouter(prefix="/api/auth", tags=["认证"])

# --- Request Models ---

class RegisterRequest(BaseModel):
    email: EmailStr
    password: str
    username: str


class LoginRequest(BaseModel):
    email: str
    password: str


# --- 正则验证 ---

EMAIL_REGEX = re.compile(r"^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$")

def validate_username(username: str) -> bool:
    return 2 <= len(username) <= 32


# --- Routes ---

@router.post("/register")
async def register(body: RegisterRequest):
    """用户注册"""
    # 参数验证
    if not EMAIL_REGEX.match(body.email):
        raise HTTPException(status_code=400, detail={"code": "INVALID_EMAIL", "message": "邮箱格式错误"})

    if len(body.password) < 8:
        raise HTTPException(status_code=400, detail={"code": "INVALID_PASSWORD", "message": "密码至少8字符"})

    if not validate_username(body.username):
        raise HTTPException(status_code=400, detail={"code": "INVALID_USERNAME", "message": "用户名2-32字符"})

    # 检查邮箱是否存在
    existing = database.get_user_by_email(body.email)
    if existing:
        raise HTTPException(status_code=409, detail={"code": "EMAIL_EXISTS", "message": "邮箱已注册"})

    # 创建用户
    password_hash = auth.hash_password(body.password)
    user = database.create_user(body.email, password_hash, body.username)

    # 生成 Token
    token, expires_at = auth.create_token(user["id"])

    return {
        "success": True,
        "user_id": user["id"],
        "token": token
    }


@router.post("/login")
async def login(body: LoginRequest):
    """用户登录"""
    user = database.get_user_by_email(body.email)

    if not user:
        raise HTTPException(status_code=401, detail={"code": "INVALID_CREDENTIALS", "message": "邮箱或密码错误"})

    if not auth.verify_password(body.password, user["password_hash"]):
        raise HTTPException(status_code=401, detail={"code": "INVALID_CREDENTIALS", "message": "邮箱或密码错误"})

    # 生成 Token
    token, expires_at = auth.create_token(user["id"])

    return {
        "success": True,
        "user_id": user["id"],
        "token": token,
        "expires_at": expires_at
    }


def get_current_user(authorization: str):
    """从 Header 解析当前用户"""
    if not authorization:
        raise HTTPException(status_code=401, detail={"code": "UNAUTHORIZED", "message": "未提供认证信息"})

    parts = authorization.split()
    if len(parts) != 2 or parts[0].lower() != "bearer":
        raise HTTPException(status_code=401, detail={"code": "INVALID_TOKEN", "message": "Token 格式错误"})

    token = parts[1]
    user_id = auth.verify_token(token)

    if not user_id:
        raise HTTPException(status_code=401, detail={"code": "TOKEN_EXPIRED", "message": "Token 无效或已过期"})

    return user_id


@router.get("/me")
async def me(authorization: str = Header(None)):
    """获取当前用户信息"""
    user_id = get_current_user(authorization)
    user = database.get_user_by_id(user_id)

    if not user:
        raise HTTPException(status_code=401, detail={"code": "USER_NOT_FOUND", "message": "用户不存在"})

    return {
        "user_id": user["id"],
        "email": user["email"],
        "username": user["username"],
        "vip_level": user["vip_level"],
        "created_at": user["created_at"]
    }


@router.post("/logout")
async def logout(authorization: str = Header(None)):
    """用户登出"""
    user_id = get_current_user(authorization)

    # 客户端删除 token 即可，服务端无需特殊处理
    return {"success": True}