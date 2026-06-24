FROM python:3.10-slim

# 安装node、npm、系统依赖
RUN apt-get update && apt-get install -y --no-install-recommends \
    nodejs npm git curl \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# 全局yarn稳定版
RUN npm install -g yarn
RUN yarn set version stable

# 容器工作目录对应本地 D:\Code\Etl
WORKDIR /app

# 复制全部源码
COPY . .

# 1. 编译前端（对应你本地 jlpm install / build）
RUN jlpm install
RUN jlpm build

# 2. 本地安装amphi包（对应 python -m pip install .）
RUN pip install --no-cache-dir .

# 暴露默认访问端口（Amphi独立服务默认端口）
EXPOSE 8000

# 启动命令 完全复刻你本地运行逻辑
# -w /app/workspace 对应你本地 D:\Code\Etl\workspace
CMD ["python", "-c", "from amphi.main import main; main()", "start", "-w", "/app/workspace"]