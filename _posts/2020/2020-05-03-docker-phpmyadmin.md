---
layout: post
title: docker下phpmyadmin连接到容器中mysql数据库的方法
date: 2020-05-03 18:20
author: yeqing
comments: true
category: 
- 野生技术
tags: 
- docker
- phpmyadmin
- mysqk
---

### 1.查看myql的docker所在的网络
```bash
docker ps
```
![](https://cdn.173top.cn/wp-content/uploads/2019/12/2247156e51d67ad31dbc147ce3c2fb71.png)
```bash
docker inspect app_mysql_1
```
![](https://cdn.173top.cn/wp-content/uploads/2019/12/457f3c4fb93459b395c24215a4a7ef2a.png)

### 2.运行镜像，并制定mysql容器名称和对应的网络名
```bash
docker run --name myadmin -d --link app_mysql_1:db --net  app_default -p 8080:80 phpmyadmin/phpmyadmin
```