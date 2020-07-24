---
layout: post
title: 更换Docker镜像源，为拉取镜像加速
date: 2020-07-23 10:07
author: yeqing
comments: true
category:
- 野生技术
tags:
- Docker
---

使用 Docker 的时候，需要经常从官方获取镜像，但是由于显而易见的网络原因，拉取镜像的过程非常耗时，严重影响使用 Docker 的体验。

我们可以设置Docker镜像源地址来解决这个问题！

编辑 /etc/docker/daemon.json：

```bash
vim /etc/docker/daemon.json
```

在其中添加几个国内的加速镜像源：

```bash
{
"registry-mirrors": [
"https://c55uw9c5.mirror.aliyuncs.com",
"https://registry.docker-cn.com",
"http://hub-mirror.c.163.com"
],
"dns": ["114.114.114.114","8.8.8.8"]
}
```
重启docker服务：
```bash
systemctl restart docker
```