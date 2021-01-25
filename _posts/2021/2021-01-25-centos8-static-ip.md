---
layout: post
title: CentOS8设置固定IP的方法
date: 2021-01-25 10:01
author: yeqing
comments: true
category:
- 野生技术
tags:
- centos
- linux
---

## 修改配置文件

进入服务器后，到路径/etc/sysconfig/network-scripts 下，找到前缀 `ifcfg` 的文件

```bash
cd /etc/sysconfig/network-scripts
vi ifcfg-***
```

内容如下

```bash
TYPE=Ethernet
PROXY_METHOD=none
BROWSER_ONLY=no
BOOTPROTO=static #此处修改为静态
DEFROUTE=yes
IPV4_FAILURE_FATAL=no
IPV6INIT=yes
IPV6_AUTOCONF=yes
IPV6_DEFROUTE=yes
IPV6_FAILURE_FATAL=no
IPV6_ADDR_GEN_MODE=stable-privacy
NAME=ens32
UUID=066b4926-b40c-4c28-a5b4-2310d2b96613
DEVICE=ens32
ONBOOT=yes #此处修改为yes，并添加下方信息
IPADDR=192.168.1.10
NETMASK=255.255.255.0
GATEWAY=192.168.1.1
DNS1=114.114.114.114
PREFIX=24
```

## 重启网络

```bash
nmcli c reload  
#可以及时生效***是ifcfg-后边的内容
nmcli c up ***
nmcli d reapply ***
nmcli d connect ***
```










