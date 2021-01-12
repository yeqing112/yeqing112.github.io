---
layout: post
title: Ubuntu环境下安装和配置pure-ftpd
date: 2021-01-09 02:20
author: yeqing
comments: true
category:
- 野生技术
tags:
- ftp
- pureftpd
---

## 安装Pure-ftpd

```bash
apt install -y pure-ftpd
```

## 配置Pure-ftpd

### 新建ftp目录

```bash
mkdir /ftp
```

### 新建系统用户组和用户

新建pure-ftpd用户组

```bash
groupadd -g 8888 pure-ftpd
```

新建pure-ftpd用户，并禁止该用户登录系统

```bash
useradd -u 8888 -g 8888 -s /bin/false pure-ftpd -d /ftp
```

新建Pure-ftpd虚拟子账户

```bash
pure-pw useradd ftpuser -u pure-ftpd -d /ftp
```

创建用户信息数据库文件（每次新增用户都需要执行一次该命令）

```bash
pure-pw mkdb
```

以下是Pure-ftpd常用的操作命令

```bash
# 列出所有用户
pure-pw list
# 查看用户ftpuser的信息
pure-pw show ftpuser
# 删除用户ftpuser
pure-pw userdel ftpuser
# 修改用户ftpuser的密码
pure-pw passwd ftpuser
```

### 特别注意：

如果连接ftp出现如下提示，很有可能是`/etc/pure-ftpd/auth`目录下没有`puredb`，这是puredb认证，在auth目录下有`65unix` `70pam`（前面数字的作用是排序），唯独缺少`puredb`

```bash
ls: 登录失败: 530 Login authentication failed  
```

解决办法很简单，用软链接去创建这个文件即可：

```bash
ln -s /etc/pure-ftpd/conf/PureDB /etc/pure-ftpd/auth/60puredb
```

重启Pure-ftpd

```bash
/etc/init.d/pure-ftpd restart
```

------

## 测试连接

### 安装lftp

```bash
apt install lftp
```

连接ftp

```bash
lftp ftpuser@127.0.0.1
```


























