"""
FastAPI 入口 - Auth 后端服务
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .database import init_db
from .api.auth import router as auth_router

app = FastAPI(title="Auth API", version="1.0.0")

# CORS 配置，允许前端访问
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 生产环境应限制具体域名
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 注册路由
app.include_router(auth_router)


@app.on_event("startup")
async def startup_event():
    """启动时初始化数据库"""
    init_db()


@app.get("/health")
async def health_check():
    """健康检查接口"""
    return {"status": "ok"}