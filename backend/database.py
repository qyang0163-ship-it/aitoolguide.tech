"""
数据库模块 - SQLite 用户存储
"""
import sqlite3
import uuid
from datetime import datetime, timezone
from typing import Optional

# 数据库路径，默认当前目录
DATABASE_PATH = "auth.db"


def get_connection() -> sqlite3.Connection:
    """获取数据库连接"""
    conn = sqlite3.connect(DATABASE_PATH)
    conn.row_factory = sqlite3.Row
    return conn


def init_db():
    """初始化数据库，创建 users 表"""
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS users (
            id TEXT PRIMARY KEY,
            email TEXT UNIQUE NOT NULL,
            password_hash TEXT NOT NULL,
            username TEXT NOT NULL,
            vip_level INTEGER DEFAULT 0,
            created_at TEXT NOT NULL,
            updated_at TEXT NOT NULL
        )
    """)
    conn.commit()
    conn.close()


def create_user(email: str, password_hash: str, username: str) -> dict:
    """创建新用户"""
    conn = get_connection()
    cursor = conn.cursor()
    user_id = str(uuid.uuid4())
    now = datetime.now(timezone.utc).isoformat()

    cursor.execute("""
        INSERT INTO users (id, email, password_hash, username, vip_level, created_at, updated_at)
        VALUES (?, ?, ?, ?, 0, ?, ?)
    """, (user_id, email, password_hash, username, now, now))

    conn.commit()
    conn.close()

    return {
        "id": user_id,
        "email": email,
        "username": username,
        "vip_level": 0,
        "created_at": now
    }


def get_user_by_email(email: str) -> Optional[dict]:
    """根据邮箱查找用户"""
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM users WHERE email = ?", (email,))
    row = cursor.fetchone()
    conn.close()

    if row:
        return dict(row)
    return None


def get_user_by_id(user_id: str) -> Optional[dict]:
    """根据ID查找用户"""
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT id, email, username, vip_level, created_at FROM users WHERE id = ?", (user_id,))
    row = cursor.fetchone()
    conn.close()

    if row:
        return dict(row)
    return None