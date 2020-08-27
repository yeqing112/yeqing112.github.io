---
layout: post
title: 启动容器时指定ip和绑定host
date: 2020-08-27 07:25
author: yeqing
comments: true
category:
- 野生技术
tags:
- Docker
---

先创建一个容器网络，比如
```bash
docker network create --subnet=192.168.2.0/24 mynetwork
```

然后启动容器时，指定几个参数即可
```bash
docker run -dit --name website --hostname website --net mynetwork --ip 192.168.2.2 --add-host website1:192.168.2.3 --add-host website2:192.168.2.4 -p 80:80 -p 8080:8080 nginx:latest
```

这样就实现了启动容器时自动绑定ip、指定hosts了