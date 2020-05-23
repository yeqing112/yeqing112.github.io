---
layout: post
title: 删除Docker容器和镜像的方法整理
date: 2020-05-22 16:03
author: yeqing
comments: true
category:
- 野生技术
tags:
- Docker
---
## 删除容器
### 杀死所有正在运行的容器

```bash
docker kill $(docker ps -a -q)
```

### 删除所有容器（包含正在运行和已停止的容器）

```bash
docker rm -f $(docker ps -q) ;
```

### 删除所有已经停止的容器

```bash
docker rm $(docker ps -a -q)
```

## 删除镜像
###  删除所有未打 dangling 标签的镜像

```bash
docker rmi $(docker images -q -f dangling=true)
```

### 删除未使用的镜像

```bash
docker image prune -a
docker image prune -a -f  # -f 强制，不需要确认
```

### 删除所有镜像

```bash
docker rmi $(docker images -q)
```

### 强制删除镜像名称中包含“doss-api”的镜像

```bash
docker rmi --force $(docker images | grep doss-api | awk '{print $3}')
```

## 其他
### 删除所有未使用数据

```bash
docker system prune
```

### 只删除未使用的volumes

```bash
docker volume prune
```

