---
layout: post
title: Debian10 安装完成之后的初始化设置
date: 2020-05-03 19:13
author: yeqing
comments: true
category: 
- 野生技术
tags: 
- debian10
- debian
---

## 更新软件安装源
Debian10安装完成之后，国内用户首先需要修改更新源，这使用阿里的源：

```shell
cat > /etc/apt/sources.list <<EOF
deb http://mirrors.aliyun.com/debian/ buster main non-free contrib
deb http://mirrors.aliyun.com/debian/ buster-updates main non-free contrib
deb http://mirrors.aliyun.com/debian/ buster-backports main non-free contrib
deb-src http://mirrors.aliyun.com/debian/ buster main non-free contrib
deb-src http://mirrors.aliyun.com/debian/ buster-updates main non-free contrib
deb-src http://mirrors.aliyun.com/debian/ buster-backports main non-free contrib
deb http://mirrors.aliyun.com/debian-security/ buster/updates main non-free contrib
deb-src http://mirrors.aliyun.com/debian-security/ buster/updates main non-free contrib
EOF
```
## 安装ssh
安装ssh：
```bash
apt install openssh-server
```
启用ssh服务：
```bash
systemctl start ssh.service
```
修改配置：
```bash
vi /etc/ssh/sshd_config
```
修改的内容：
```bash
PermitRootLogin yes
PasswordAuthentication yes
```
## 让普通用户可以切换root登录
修改文件：
```bash
vi /etc/sudoers
```
在root下面增加一个用户：
```bash
user01  ALL=(ALL:ALL) ALL
```