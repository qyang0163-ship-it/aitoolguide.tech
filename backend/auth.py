"""
认证模块 - JWT Token 和密码加密
"""
import os
import jwt
import bcrypt
from datetime import datetime, timedelta, timezone
from typing import Optional

# 环境变量配置
JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY", "dev-secret-key-change-in-production")
JWT_EXPIRE_DAYS = int(os.getenv("JWT_EXPIRE_DAYS", "7"))


def hash_password(password: str) -> str:
    """密码 bcrypt 哈希"""
    salt = bcrypt.gensalt()
    return bcrypt.hashpw(password.encode("utf-8"), salt).decode("utf-8")


def verify_password(password: str, password_hash: str) -> bool:
    """验证密码"""
    return bcrypt.checkpw(password.encode("utf-8"), password_hash.encode("utf-8"))


def create_token(user_id: str) -> tuple[str, str]:
    """
    创建 JWT Token
    返回: (token, expires_at)
    """
    expires_at = datetime.now(timezone.utc) + timedelta(days=JWT_EXPIRE_DAYS)

    payload = {
        "sub": user_id,
        "exp": expires_at
    }

    token = jwt.encode(payload, JWT_SECRET_KEY, algorithm="HS256")
    return token, expires_at.isoformat()


def verify_token(token: str) -> Optional[str]:
    """
    验证 JWT Token
    返回: user_id 或 None
    """
    try:
        payload = jwt.decode(token, JWT_SECRET_KEY, algorithms=["HS256"])
        return payload.get("sub")
    except jwt.ExpiredSignatureError:
        return None
    except jwt.InvalidTokenError:
        return None