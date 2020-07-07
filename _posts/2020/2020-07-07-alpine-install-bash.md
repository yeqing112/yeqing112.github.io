---
layout: post
title: alpine安装bash
date: 2020-07-07 9:36
author: yeqing
comments: true
category:
- 野生技术
tags:
- Linux
- alpine
- bash
---

Alpine Linux是一个轻型Linux发行版，它不同于通常的Linux发行版，Alpine采用了musl libc 和 BusyBox以减少系统的体积和运行时的资源消耗。Alpine Linux提供了自己的包管理工具：apk，我们可以通过https://pkgs.alpinelinux.org/packages 查询包信息。

Alpine Docker镜像继承了Alpine Linux发行版的这些优势，相比于其他Linux Docker进行，它的体积非常小，docker.io/alpine:latest只有几M，而 CentOS和Ubuntu系列的Docker镜像则都在200M左右。据说Docker官方也已开始推荐使用Alpine替代之前的Ubuntu来作为基础镜像，因为这样会带来多个好处，包括镜像下载速度加快，镜像安全性提高，占用更少的主机磁盘空间等。

Alpine Docker为了精简体积，是没有安装bash的，但我们可以依照需要定制一个安装bash的镜像，Dockerfile内容如下：

```dockerfile
FROM alpine:latest
MAINTAINER yeqing.run
RUN sed -i 's~dl-cdn.alpinelinux.org~mirrors.aliyun.com~' /etc/apk/repositories \
        && apk --update --no-cache add bash \
        bash-doc \
        bash-completion \
        && rm -rf /var/cache/apk/*
```

