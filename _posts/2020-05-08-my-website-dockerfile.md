---
layout: post
title: ��¼����վ��Dockerfile
date: 2020-05-08 13:50
author: yeqing
comments: true
category: 
- Ұ������
tags: 
- dockerfile
---

��վ����ǰʹ��vpsʱ�����л���docker�������ڴ˼�¼Dockerfile���񹹽��ļ���������ݣ���������ʹ��alpine3.8

�����ʱ��һ��ָ���汾, ���Ƽ�ʹ��`latest`
```shell
FROM alpine:3.8
```

�޸ľ���Դ��ַΪ�����ƣ�������
```shell
RUN sed -i 's~dl-cdn.alpinelinux.org~mirrors.aliyun.com~' /etc/apk/repositories \
	&& apk update \
```

��װ���,���ﰲװ����tzdata��php�������չ��nginx
```shell
    && apk add --no-cache tzdata php7 php7-fpm php7-ftp php7-pdo php7-mysqli php7-simplexml php7-xmlwriter php7-zlib php7-imagick php7-memcached php7-sockets php7-mcrypt php7-zip php7-pgsql php7-pdo_odbc php7-odbc php7-curl php7-iconv php7-xml php7-json php7-gd php7-session php7-opcache php7-pdo_sqlite php7-mbstring php7-oauth php7-common php7-pdo_mysql nginx \
```

����Ĭ��ʱ��
```shell
    && cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime \
    && echo "Asia/Shanghai" > /etc/timezone \
```

Ϊnginx�����½�/run/nginx
```shell
	&& mkdir /run/nginx \
```

��������ʱ����Ҫ������Ͱ�װ����
```shell
    && apk del tzdata \
    && rm -rf /var/cache/apk/* \
    && rm -rf /root/.cache \
    && rm -rf /tmp/*
```

ָ������Ŀ¼
```shell
WORKDIR /
```
ָ�����������ű����Լ������ķ�������php��nginx����������ʱ��������
```shell
CMD php-fpm7 && nginx && sh && exit
```

����Dockerfile
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