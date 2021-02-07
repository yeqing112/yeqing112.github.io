---
layout: post
title: 在Ubuntu/Debian上搭建NFS服务器
date: 2020-04-30 14:58
author: yeqing
comments: true
category: 
- 野生技术
tags: 
- 安装nfs
- ubuntu
- debian
---
nfs服务是实现Linux和Linux之间的文件共享，nfs服务的搭建比较简单。

现在介绍如何在ubuntu16.04系统中搭建nfs服务，ubuntu的搭建比红帽的还要简单。

## NFS服务器配置：

### 1、安装NFS相关包
```shell
apt-get install nfs-kernel-server nfs-common

# centos 7
# yum install nfs-utils
```

### 2、配置NFS目录和权限
新建一个/nfsdir目录并赋予777权限：
```bash
mkdir /nfsdir && chmod -R 777 /nfsdir/
```
修改exports
```shell
cat > /etc/exports <<-EOF
/nfsdir  *(rw,no_subtree_check,root_squash,no_all_squash,insecure)
EOF
```
```bash
# 将远程访问的所有普通用户及所属组都映射为匿名用户或用户组（nfsnobody）
# 允许客户端从大于1024的tcp/ip端口连接服务器
# 这种可以用于挂载者不对存储修改权限，多app访问时也不会出现权限问题
/nfsdir *(rw,all_squash,insecure)

# 将数据同步写入内存缓冲区与磁盘中，效率低，但可以保证数据的一致性
# 不将root用户及所属组都映射为匿名用户或用户组（默认设置）
# 这里这么配置，主要是k8s中创建pvc时会修改文件用户
/nfsdir *(rw,sync,no_root_squash)
```

### 3、重启服务

```shell
/etc/init.d/nfs-kernel-server restart

# centos 7
# systemctl enable nfs-server && systemctl start nfs-server
```
一键安装命令：
```bash
apt-get install -y nfs-kernel-server nfs-common \
&& mkdir /nfsdir \
&& chmod -R 777 /nfsdir/ \
&& echo "/nfsdir  192.168.43.0/24(rw,no_subtree_check,root_squash,no_all_squash,insecure)" > /etc/exports \
&& /etc/init.d/nfs-kernel-server restart
```

## NFS客户端配置:

### 1、安装NFS客户端

```shell
apt-get install nfs-common
```

### 2、查看NFS服务器共享目录

```shell
showmount -e nfs-server-ip
```

### 3、将目录挂载到本地

```shell
mount nfs-server-ip:/nfsdir /mnt
```

### 4、开机自动挂载

```shell
vim /etc/fstab
nfs-server-ip:/nfsdir /mnt       nfs    rw    0     0
```

## 卸载挂载

### 一、nfs远程挂载

1.首先确定服务端（实体挂载节点）的IP

2.通过cat /etc/hosts 查看服务端的server name

3.mount -t nfs servername:/挂载文件夹 /服务端挂载文件夹

### 二、nfs客户端卸载

1.umount /挂载文件夹 

2.如果umount卸载显示 device busy，则通过下列方式卸载

3.（1）fuser -km /挂载文件夹

　（2）umount /挂载文件夹

