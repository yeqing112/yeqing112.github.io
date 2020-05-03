---
layout: post
title: 在docker容器中运行ubuntu桌面版，并通过VNC连接
date: 2020-05-03 18:28
author: yeqing
comments: true
category: 
- 野生技术
tags: 
- vnc
- docker
---

拉取镜像：
```bash
docker pull dorowu/ubuntu-desktop-lxde-vnc
```
运行容器：
```bash
docker run -dit --name ubuntu -p 6080:80 -p 5900:5900 -e VNC_PASSWORD=VNC登录的密码 -v /dev/shm:/dev/shm dorowu/ubuntu-desktop-lxde-vnc
```
该镜像以VNC的方式连接到桌面环境服务器，可以下载个VncViewer 作为客户端连接到容器

注意，这里的容器暴露了两个端口

6080：是web版的vnc，可以在浏览器上直接访问桌面环境

显示分辨率可以通过环境变量来控制 如下：
```bash
docker run -dit --name ubuntu -p 6080:80 -e RESOLUTION=1920x1080 -v /dev/shm:/dev/shm dorowu/ubuntu-desktop-lxde-vnc
```