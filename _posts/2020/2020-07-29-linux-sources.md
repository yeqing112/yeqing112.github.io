---
layout: post
title: linux软件更新源大全
date: 2020-07-29 07:07
author: yeqing
comments: true
category:
- 野生技术
tags:
- linux
---

[toc]

## Debian

### 阿里云

来源：https://developer.aliyun.com/mirror/debian

**debian 7.x (wheezy)**

编辑/etc/apt/sources.list文件(需要使用sudo), 在文件最前面添加以下条目(操作前请做好相应备份)

```bash
deb http://mirrors.aliyun.com/debian/ wheezy main non-free contrib
deb http://mirrors.aliyun.com/debian/ wheezy-proposed-updates main non-free contrib
deb-src http://mirrors.aliyun.com/debian/ wheezy main non-free contrib
deb-src http://mirrors.aliyun.com/debian/ wheezy-proposed-updates main non-free contrib
```

**debian 8.x (jessie)**

编辑/etc/apt/sources.list文件(需要使用sudo), 在文件最前面添加以下条目(操作前请做好相应备份)

```bash
deb http://mirrors.aliyun.com/debian/ jessie main non-free contrib
deb http://mirrors.aliyun.com/debian/ jessie-proposed-updates main non-free contrib
deb-src http://mirrors.aliyun.com/debian/ jessie main non-free contrib
deb-src http://mirrors.aliyun.com/debian/ jessie-proposed-updates main non-free contrib
```

**debian 9.x (stretch)**

编辑/etc/apt/sources.list文件(需要使用sudo), 在文件最前面添加以下条目(操作前请做好相应备份)

```bash
deb http://mirrors.aliyun.com/debian/ stretch main non-free contrib
deb-src http://mirrors.aliyun.com/debian/ stretch main non-free contrib
deb http://mirrors.aliyun.com/debian-security stretch/updates main
deb-src http://mirrors.aliyun.com/debian-security stretch/updates main
deb http://mirrors.aliyun.com/debian/ stretch-updates main non-free contrib
deb-src http://mirrors.aliyun.com/debian/ stretch-updates main non-free contrib
deb http://mirrors.aliyun.com/debian/ stretch-backports main non-free contrib
deb-src http://mirrors.aliyun.com/debian/ stretch-backports main non-free contrib
```

### 网易

来源：http://mirrors.163.com/.help/debian.html

**debian 7.x (wheezy)**

编辑/etc/apt/sources.list文件(需要使用sudo), 在文件最前面添加以下条目(操作前请做好相应备份)

```bash
deb http://mirrors.163.com/debian/ wheezy main non-free contrib
deb http://mirrors.163.com/debian/ wheezy-updates main non-free contrib
deb http://mirrors.163.com/debian/ wheezy-backports main non-free contrib
deb-src http://mirrors.163.com/debian/ wheezy main non-free contrib
deb-src http://mirrors.163.com/debian/ wheezy-updates main non-free contrib
deb-src http://mirrors.163.com/debian/ wheezy-backports main non-free contrib
deb http://mirrors.163.com/debian-security/ wheezy/updates main non-free contrib
deb-src http://mirrors.163.com/debian-security/ wheezy/updates main non-free contrib
```

**debian 8.x (jessie)**

编辑/etc/apt/sources.list文件(需要使用sudo), 在文件最前面添加以下条目(操作前请做好相应备份)

```bash
deb http://mirrors.163.com/debian/ jessie main non-free contrib
deb http://mirrors.163.com/debian-archive/debian/ jessie-backports main non-free contrib
deb-src http://mirrors.163.com/debian/ jessie main non-free contrib
deb-src http://mirrors.163.com/debian-archive/debian/ jessie-backports main non-free contrib
deb http://mirrors.163.com/debian-security/ jessie/updates main non-free contrib
deb-src http://mirrors.163.com/debian-security/ jessie/updates main non-free contrib
```

**debian 9.x (stretch)**

编辑/etc/apt/sources.list文件(需要使用sudo), 在文件最前面添加以下条目(操作前请做好相应备份)

```bash
deb http://mirrors.163.com/debian/ stretch main non-free contrib
deb http://mirrors.163.com/debian/ stretch-updates main non-free contrib
deb http://mirrors.163.com/debian/ stretch-backports main non-free contrib
deb-src http://mirrors.163.com/debian/ stretch main non-free contrib
deb-src http://mirrors.163.com/debian/ stretch-updates main non-free contrib
deb-src http://mirrors.163.com/debian/ stretch-backports main non-free contrib
deb http://mirrors.163.com/debian-security/ stretch/updates main non-free contrib
deb-src http://mirrors.163.com/debian-security/ stretch/updates main non-free contrib
```

### 腾讯云
来源：https://mirrors.cloud.tencent.com/help/debian.html

**debian 7.x (wheezy)**

编辑/etc/apt/sources.list文件(需要使用sudo), 在文件最前面添加以下条目(操作前请做好相应备份)

```bash
deb http://mirrors.cloud.tencent.com/debian wheezy main contrib non-free
deb http://mirrors.cloud.tencent.com/debian wheezy-updates main contrib non-free
#deb http://mirrors.cloud.tencent.com/debian wheezy-proposed-updates main contrib non-free
#deb http://mirrors.cloud.tencent.com/debian wheezy-backports main contrib non-free
#deb http://mirrors.cloud.tencent.com/debian wheezy-backports-sloppy main contrib non-free
deb-src http://mirrors.cloud.tencent.com/debian wheezy main contrib non-free
deb-src http://mirrors.cloud.tencent.com/debian wheezy-updates main contrib non-free
#deb-src http://mirrors.cloud.tencent.com/debian wheezy-proposed-updates main contrib non-free
#deb-src http://mirrors.cloud.tencent.com/debian wheezy-backports main contrib non-free
#deb-src http://mirrors.cloud.tencent.com/debian wheezy-backports-sloppy main contrib non-free
```

**debian 8.x (jessie)**

编辑/etc/apt/sources.list文件(需要使用sudo), 在文件最前面添加以下条目(操作前请做好相应备份)

```bash
deb http://mirrors.cloud.tencent.com/debian jessie main contrib non-free
deb http://mirrors.cloud.tencent.com/debian jessie-updates main contrib non-free
#deb http://mirrors.cloud.tencent.com/debian jessie-backports main contrib non-free
#deb http://mirrors.cloud.tencent.com/debian jessie-proposed-updates main contrib non-free
deb-src http://mirrors.cloud.tencent.com/debian jessie main contrib non-free
deb-src http://mirrors.cloud.tencent.com/debian jessie-updates main contrib non-free
#deb-src http://mirrors.cloud.tencent.com/debian jessie-backports main contrib non-free
#deb-src http://mirrors.cloud.tencent.com/debian jessie-proposed-updates main contrib non-free
```

**debian 9.x (stretch)**

编辑/etc/apt/sources.list文件(需要使用sudo), 在文件最前面添加以下条目(操作前请做好相应备份)

```bash
deb http://mirrors.cloud.tencent.com/debian stretch main contrib non-free
deb http://mirrors.cloud.tencent.com/debian stretch-updates main contrib non-free
#deb http://mirrors.cloud.tencent.com/debian stretch-backports main contrib non-free
#deb http://mirrors.cloud.tencent.com/debian stretch-proposed-updates main contrib non-free
deb-src http://mirrors.cloud.tencent.com/debian stretch main contrib non-free
deb-src http://mirrors.cloud.tencent.com/debian stretch-updates main contrib non-free
#deb-src http://mirrors.cloud.tencent.com/debian stretch-backports main contrib non-free
#deb-src http://mirrors.cloud.tencent.com/debian stretch-proposed-updates main contrib non-free
```

----

## Ubuntu
### 阿里云
来源：https://developer.aliyun.com/mirror/ubuntu

**ubuntu 16.04(xenial)**

编辑/etc/apt/sources.list文件(需要使用sudo), 在文件最前面添加以下条目(操作前请做好相应备份)

```bash
deb http://mirrors.aliyun.com/ubuntu/ xenial main
deb-src http://mirrors.aliyun.com/ubuntu/ xenial main
deb http://mirrors.aliyun.com/ubuntu/ xenial-updates main
deb-src http://mirrors.aliyun.com/ubuntu/ xenial-updates main
deb http://mirrors.aliyun.com/ubuntu/ xenial universe
deb-src http://mirrors.aliyun.com/ubuntu/ xenial universe
deb http://mirrors.aliyun.com/ubuntu/ xenial-updates universe
deb-src http://mirrors.aliyun.com/ubuntu/ xenial-updates universe
deb http://mirrors.aliyun.com/ubuntu/ xenial-security main
deb-src http://mirrors.aliyun.com/ubuntu/ xenial-security main
deb http://mirrors.aliyun.com/ubuntu/ xenial-security universe
deb-src http://mirrors.aliyun.com/ubuntu/ xenial-security universe
```

**ubuntu 18.04(bionic) **

编辑/etc/apt/sources.list文件(需要使用sudo), 在文件最前面添加以下条目(操作前请做好相应备份)

```bash
deb http://mirrors.aliyun.com/ubuntu/ bionic main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ bionic main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ bionic-security main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ bionic-security main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ bionic-updates main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ bionic-updates main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ bionic-proposed main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ bionic-proposed main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ bionic-backports main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ bionic-backports main restricted universe multiverse
```
**ubuntu 20.04(focal)**

编辑/etc/apt/sources.list文件(需要使用sudo), 在文件最前面添加以下条目(操作前请做好相应备份)

```bash
deb http://mirrors.aliyun.com/ubuntu/ focal main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ focal main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ focal-security main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ focal-security main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ focal-updates main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ focal-updates main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ focal-proposed main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ focal-proposed main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ focal-backports main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ focal-backports main restricted universe multiverse
```

### 网易
来源：http://mirrors.163.com/.help/ubuntu.html

**ubuntu 16.04(xenial)**

编辑/etc/apt/sources.list文件(需要使用sudo), 在文件最前面添加以下条目(操作前请做好相应备份)

```bash
deb http://mirrors.163.com/ubuntu/ xenial main restricted universe multiverse
deb http://mirrors.163.com/ubuntu/ xenial-security main restricted universe multiverse
deb http://mirrors.163.com/ubuntu/ xenial-updates main restricted universe multiverse
deb http://mirrors.163.com/ubuntu/ xenial-proposed main restricted universe multiverse
deb http://mirrors.163.com/ubuntu/ xenial-backports main restricted universe multiverse
deb-src http://mirrors.163.com/ubuntu/ xenial main restricted universe multiverse
deb-src http://mirrors.163.com/ubuntu/ xenial-security main restricted universe multiverse
deb-src http://mirrors.163.com/ubuntu/ xenial-updates main restricted universe multiverse
deb-src http://mirrors.163.com/ubuntu/ xenial-proposed main restricted universe multiverse
deb-src http://mirrors.163.com/ubuntu/ xenial-backports main restricted universe multiverse
```

**ubuntu 18.04(bionic) **

编辑/etc/apt/sources.list文件(需要使用sudo), 在文件最前面添加以下条目(操作前请做好相应备份)

```bash
deb http://mirrors.163.com/ubuntu/ bionic main restricted universe multiverse
deb http://mirrors.163.com/ubuntu/ bionic-security main restricted universe multiverse
deb http://mirrors.163.com/ubuntu/ bionic-updates main restricted universe multiverse
deb http://mirrors.163.com/ubuntu/ bionic-proposed main restricted universe multiverse
deb http://mirrors.163.com/ubuntu/ bionic-backports main restricted universe multiverse
deb-src http://mirrors.163.com/ubuntu/ bionic main restricted universe multiverse
deb-src http://mirrors.163.com/ubuntu/ bionic-security main restricted universe multiverse
deb-src http://mirrors.163.com/ubuntu/ bionic-updates main restricted universe multiverse
deb-src http://mirrors.163.com/ubuntu/ bionic-proposed main restricted universe multiverse
deb-src http://mirrors.163.com/ubuntu/ bionic-backports main restricted universe multiverse
```
**ubuntu 20.04(focal)**

编辑/etc/apt/sources.list文件(需要使用sudo), 在文件最前面添加以下条目(操作前请做好相应备份)

```bash
deb http://mirrors.163.com/ubuntu/ focal main restricted universe multiverse
deb http://mirrors.163.com/ubuntu/ focal-security main restricted universe multiverse
deb http://mirrors.163.com/ubuntu/ focal-updates main restricted universe multiverse
deb http://mirrors.163.com/ubuntu/ focal-proposed main restricted universe multiverse
deb http://mirrors.163.com/ubuntu/ focal-backports main restricted universe multiverse
deb-src http://mirrors.163.com/ubuntu/ focal main restricted universe multiverse
deb-src http://mirrors.163.com/ubuntu/ focal-security main restricted universe multiverse
deb-src http://mirrors.163.com/ubuntu/ focal-updates main restricted universe multiverse
deb-src http://mirrors.163.com/ubuntu/ focal-proposed main restricted universe multiverse
deb-src http://mirrors.163.com/ubuntu/ focal-backports main restricted universe multiverse
```
### 腾讯云
来源：https://mirrors.cloud.tencent.com/help/ubuntu.html

**ubuntu 16.04(xenial)**

编辑/etc/apt/sources.list文件(需要使用sudo), 在文件最前面添加以下条目(操作前请做好相应备份)

```bash
deb http://mirrors.cloud.tencent.com/ubuntu/ xenial main restricted universe multiverse
deb http://mirrors.cloud.tencent.com/ubuntu/ xenial-security main restricted universe multiverse
deb http://mirrors.cloud.tencent.com/ubuntu/ xenial-updates main restricted universe multiverse
#deb http://mirrors.cloud.tencent.com/ubuntu/ xenial-proposed main restricted universe multiverse
#deb http://mirrors.cloud.tencent.com/ubuntu/ xenial-backports main restricted universe multiverse
deb-src http://mirrors.cloud.tencent.com/ubuntu/ xenial main restricted universe multiverse
deb-src http://mirrors.cloud.tencent.com/ubuntu/ xenial-security main restricted universe multiverse
deb-src http://mirrors.cloud.tencent.com/ubuntu/ xenial-updates main restricted universe multiverse
#deb-src http://mirrors.cloud.tencent.com/ubuntu/ xenial-proposed main restricted universe multiverse
#deb-src http://mirrors.cloud.tencent.com/ubuntu/ xenial-backports main restricted universe multiverse
```

**ubuntu 18.04(bionic) **

编辑/etc/apt/sources.list文件(需要使用sudo), 在文件最前面添加以下条目(操作前请做好相应备份)

```bash
deb http://mirrors.cloud.tencent.com/ubuntu/ bionic main restricted universe multiverse
deb http://mirrors.cloud.tencent.com/ubuntu/ bionic-security main restricted universe multiverse
deb http://mirrors.cloud.tencent.com/ubuntu/ bionic-updates main restricted universe multiverse
#deb http://mirrors.cloud.tencent.com/ubuntu/ bionic-proposed main restricted universe multiverse
#deb http://mirrors.cloud.tencent.com/ubuntu/ bionic-backports main restricted universe multiverse
deb-src http://mirrors.cloud.tencent.com/ubuntu/ bionic main restricted universe multiverse
deb-src http://mirrors.cloud.tencent.com/ubuntu/ bionic-security main restricted universe multiverse
deb-src http://mirrors.cloud.tencent.com/ubuntu/ bionic-updates main restricted universe multiverse
#deb-src http://mirrors.cloud.tencent.com/ubuntu/ bionic-proposed main restricted universe multiverse
#deb-src http://mirrors.cloud.tencent.com/ubuntu/ bionic-backports main restricted universe multiverse
```
**ubuntu 20.04(focal)**

编辑/etc/apt/sources.list文件(需要使用sudo), 在文件最前面添加以下条目(操作前请做好相应备份)

```bash
deb http://mirrors.cloud.tencent.com/ubuntu/ focal main restricted universe multiverse
deb http://mirrors.cloud.tencent.com/ubuntu/ focal-security main restricted universe multiverse
deb http://mirrors.cloud.tencent.com/ubuntu/ focal-updates main restricted universe multiverse
#deb http://mirrors.cloud.tencent.com/ubuntu/ focal-proposed main restricted universe multiverse
#deb http://mirrors.cloud.tencent.com/ubuntu/ focal-backports main restricted universe multiverse
deb-src http://mirrors.cloud.tencent.com/ubuntu/ focal main restricted universe multiverse
deb-src http://mirrors.cloud.tencent.com/ubuntu/ focal-security main restricted universe multiverse
deb-src http://mirrors.cloud.tencent.com/ubuntu/ focal-updates main restricted universe multiverse
#deb-src http://mirrors.cloud.tencent.com/ubuntu/ focal-proposed main restricted universe multiverse
#deb-src http://mirrors.cloud.tencent.com/ubuntu/ focal-backports main restricted universe multiverse
```

----

## CentOS

### 阿里云
来源：https://developer.aliyun.com/mirror/centos

1. 备份

```
mv /etc/yum.repos.d/CentOS-Base.repo /etc/yum.repos.d/CentOS-Base.repo.backup
```

2. 下载新的 CentOS-Base.repo 到 /etc/yum.repos.d/

**CentOS 6**

```
wget -O /etc/yum.repos.d/CentOS-Base.repo https://mirrors.aliyun.com/repo/Centos-6.repo
```

或者

```
curl -o /etc/yum.repos.d/CentOS-Base.repo https://mirrors.aliyun.com/repo/Centos-6.repo
```

**CentOS 7**

```
wget -O /etc/yum.repos.d/CentOS-Base.repo https://mirrors.aliyun.com/repo/Centos-7.repo
```

或者

```
curl -o /etc/yum.repos.d/CentOS-Base.repo https://mirrors.aliyun.com/repo/Centos-7.repo
```

**CentOS 8**

```
wget -O /etc/yum.repos.d/CentOS-Base.repo https://mirrors.aliyun.com/repo/Centos-8.repo
```

或者

```
curl -o /etc/yum.repos.d/CentOS-Base.repo https://mirrors.aliyun.com/repo/Centos-8.repo
```

3. 运行yum clean all && yum makecache 生成缓存

### 网易
来源：http://mirrors.163.com/.help/centos.html

1. 备份

```
mv /etc/yum.repos.d/CentOS-Base.repo /etc/yum.repos.d/CentOS-Base.repo.backup
```

2. 下载新的 CentOS-Base.repo 到 /etc/yum.repos.d/

**CentOS 6**

```
wget -O /etc/yum.repos.d/CentOS-Base.repo http://mirrors.163.com/.help/CentOS6-Base-163.repo
```

**CentOS 7**

```
wget -O /etc/yum.repos.d/CentOS-Base.repo http://mirrors.163.com/.help/CentOS7-Base-163.repo
```

**CentOS 8**

```
wget -O /etc/yum.repos.d/CentOS-Base.repo http://mirrors.163.com/.help/CentOS8-Base-163.repo
```

3. 运行yum clean all && yum makecache 生成缓存

### 腾讯云
来源：https://mirrors.cloud.tencent.com/help/centos.html

1. 备份

```
mv /etc/yum.repos.d/CentOS-Base.repo /etc/yum.repos.d/CentOS-Base.repo.backup
```

2. 下载新的 CentOS-Base.repo 到 /etc/yum.repos.d/

**CentOS 6**

```
wget -O /etc/yum.repos.d/CentOS-Base.repo http://mirrors.cloud.tencent.com/repo/centos6_base.repo
```

**CentOS 7**

```
wget -O /etc/yum.repos.d/CentOS-Base.repo http://mirrors.cloud.tencent.com/repo/centos7_base.repo
```

**CentOS 8**

```
wget -O /etc/yum.repos.d/CentOS-Base.repo http://mirrors.cloud.tencent.com/repo/centos8_base.repo
```

3. 运行yum clean all && yum makecache 生成缓存

## Alpine

### 阿里云

来源：https://developer.aliyun.com/mirror/alpine

a. 编辑 `/etc/apk/repositories`
b. 将里面 dl-cdn.alpinelinux.org 的 改成 mirrors.aliyun.com ; 保存退出即可

```bash
sed -i 's~dl-cdn.alpinelinux.org~mirrors.aliyun.com~' /etc/apk/repositories
```

