---
layout: post
title: 记录我网站的Dockerfile
date: 2020-05-08 13:50
author: yeqing
comments: true
category: 
- 野生技术
tags: 
- dockerfile
---

本站（以前使用vps时）运行基于docker容器，在此记录Dockerfile镜像构建文件的相关内容，基础镜像使用alpine3.8

导入的时候一般指明版本, 不推荐使用`latest`
```shell
FROM alpine:3.8
```

修改镜像源地址为阿里云，并更新
```shell
RUN sed -i 's~dl-cdn.alpinelinux.org~mirrors.aliyun.com~' /etc/apk/repositories \
	&& apk update \
```

安装软件,这里安装的是tzdata，php与相关扩展，nginx
```shell
    && apk add --no-cache tzdata php7 php7-fpm php7-ftp php7-pdo php7-mysqli php7-simplexml php7-xmlwriter php7-zlib php7-imagick php7-memcached php7-sockets php7-mcrypt php7-zip php7-pgsql php7-pdo_odbc php7-odbc php7-curl php7-iconv php7-xml php7-json php7-gd php7-session php7-opcache php7-pdo_sqlite php7-mbstring php7-oauth php7-common php7-pdo_mysql nginx \
```

设置默认时区
```shell
    && cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime \
    && echo "Asia/Shanghai" > /etc/timezone \
```

为nginx运行新建/run/nginx
```shell
	&& mkdir /run/nginx \
```

清理运行时不需要的软件和安装缓存
```shell
    && apk del tzdata \
    && rm -rf /var/cache/apk/* \
    && rm -rf /root/.cache \
    && rm -rf /tmp/*
```

指明工作目录
```shell
WORKDIR /
```
指定容器启动脚本（自己摸索的方法，让php、nginx在容器启动时自启动）
```shell
CMD php-fpm7 && nginx && sh && exit
```

完整Dockerfile
```shell
FROM alpine:3.8
 
LABEL author www.173top.cn
 
RUN sed -i 's~dl-cdn.alpinelinux.org~mirrors.aliyun.com~' /etc/apk/repositories \
	&& apk update \
    && apk add --no-cache tzdata php7 php7-fpm php7-ftp php7-pdo php7-mysqli php7-simplexml php7-xmlwriter php7-zlib php7-imagick php7-memcached php7-sockets php7-mcrypt php7-zip php7-pgsql php7-pdo_odbc php7-odbc php7-curl php7-iconv php7-xml php7-json php7-gd php7-session php7-opcache php7-pdo_sqlite php7-mbstring php7-oauth php7-common php7-pdo_mysql nginx \
    && cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime \
    && echo "Asia/Shanghai" > /etc/timezone \
	&& mkdir /run/nginx \
    && apk del tzdata \
    && rm -rf /var/cache/apk/* \
    && rm -rf /root/.cache \
    && rm -rf /tmp/*
 
WORKDIR /
 
CMD php-fpm7 && nginx && sh && exit
```