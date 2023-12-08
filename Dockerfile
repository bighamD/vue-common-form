# 使用 Node 18 镜像作为构建环境
FROM node:16 as builder

# 设置工作目录
WORKDIR /app

COPY . .

# 安装依赖
RUN npm install

# 执行构建命令
RUN npm run build

# 使用官方的 Nginx 镜像
FROM nginx:latest

# 从构建环境中拷贝打包后的静态文件到 Nginx 默认的静态文件目录
COPY --from=builder /app/dist /usr/share/nginx/html

# 复制自定义的 nginx.conf 文件到 Nginx 配置目录
COPY nginx.conf /etc/nginx/conf.d/default.conf
