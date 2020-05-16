---
layout: post
title: 解决CentOS8安装Docker报错的问题
date: 2020-05-16 17:22
author: yeqing
comments: true
category:
- 野生技术
tags:
- CentOS
- docker
---
## 背景简介：

前两天遇到一位用户说CentOS8安装URLOS时报错，于是看了看，原因是缺少依赖，下面将解决办法记录一下。



## 安装步骤：

1. 下载docker-ce的repo

```bash
curl https://download.docker.com/linux/centos/docker-ce.repo -o /etc/yum.repos.d/docker-ce.repo
```

2. 安装依赖（这是相比centos7的关键步骤）

```bash
yum install https://download.docker.com/linux/fedora/30/x86_64/stable/Packages/containerd.io-1.2.6-3.3.fc30.x86_64.rpm
```
3. 安装docker-ce

```bash
yum install docker-ce
```
4. 启动docker

```bash
systemctl start docker
```

到此，docker仅是安装成功，其他功能有待测试。