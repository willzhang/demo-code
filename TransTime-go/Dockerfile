# 使用官方 Golang 镜像作为构建阶段的基础镜像
FROM golang:1.22.5 AS builder

# 设置工作目录
WORKDIR /app

# 将 Go 模块文件复制到工作目录
COPY go.mod ./

# 下载 Go 依赖
RUN go mod download

# 将整个项目复制到工作目录
COPY . .

# 编译 Go 项目
RUN GOOS=linux GOARCH=amd64 go build -o trans_time main.go

# 使用较小的基础镜像来运行二进制文件
FROM debian:stable-slim

# 将构建阶段生成的二进制文件复制到运行阶段
COPY --from=builder /app/trans_time /trans_time

# 将静态文件复制到运行阶段
COPY static /static

# 设置环境变量，指明静态文件目录
ENV STATIC_DIR=/static

# 设置容器的入口点
ENTRYPOINT ["/trans_time"]

# 公开端口
EXPOSE 8080
