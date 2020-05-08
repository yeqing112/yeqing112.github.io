---
layout: post
title: 查看docker容器相关属性
date: 2020-05-03 17:20
author: yeqing
comments: true
category: 
- 野生技术
tags: 
- docker
---

### 查看Docker的底层信息

docker inspect 会返回一个 JSON 文件记录着 Docker 容器的配置和状态信息
```bash
docker inspect NAMES 
# 查看容器所有状态信息；

docker inspect --format='{{.NetworkSettings.IPAddress}}' ID/NAMES
# 查看 容器ip 地址

docker inspect --format '{{.Name}} {{.State.Running}}' NAMES
# 容器运行状态
```
### 查看进程信息
```bash
docker top NAMES
```
### 查看端口；(使用容器ID 或者 容器名称)
```bash
docker port ID/NAMES
```
### 查看IP地址 也可以直接通过用 远程执行命令也可以（Centos7）；
```bash
docker exec -it ID/NAMES ip addr
```