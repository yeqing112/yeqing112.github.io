---
layout: post
title: 使用阿里云ECS时如何卸载阿里云盾
date: 2020-06-04 01:40
author: yeqing
comments: true
category:
- 野生技术
tags:
- 阿里云ECS
---

阿里云主机开通时就自带了阿里云盾，这个免费版的阿里云盾还是比较鸡肋的，如果不喜欢，咱们可以通过以下的方法将其卸载。

## 卸载阿里云盾

```bash
wget http://update.aegis.aliyun.com/download/uninstall.sh \
&& chmod +x uninstall.sh \
&& ./uninstall.sh \
&& wget http://update.aegis.aliyun.com/download/quartz_uninstall.sh \
&& chmod +x quartz_uninstall.sh \
&& ./quartz_uninstall.sh
```


## 删除残留

删除残留

```bash
pkill aliyun-service \
&& rm -fr /etc/init.d/agentwatch /usr/sbin/aliyun-service \
&& rm -rf /usr/local/aegis*
```

## 屏蔽云盾IP

```bash
iptables -I INPUT -s 140.205.201.0/28 -j DROP
iptables -I INPUT -s 140.205.201.16/29 -j DROP
iptables -I INPUT -s 140.205.201.32/28 -j DROP
iptables -I INPUT -s 140.205.225.192/29 -j DROP
iptables -I INPUT -s 140.205.225.200/30 -j DROP
iptables -I INPUT -s 140.205.225.184/29 -j DROP
iptables -I INPUT -s 140.205.225.183/32 -j DROP
iptables -I INPUT -s 140.205.225.206/32 -j DROP
iptables -I INPUT -s 140.205.225.205/32 -j DROP
iptables -I INPUT -s 140.205.225.195/32 -j DROP
iptables -I INPUT -s 140.205.225.204/32 -j DROP
```


## 
## 卸载aliyun-service 

```bash
rm -rf /usr/sbin/aliyun*
```

卸载aliyun-service 
rm -rf /usr/sbin/aliyun*

## ## 关闭cloudmonitor 

```bash
chkconfig --del cloudmonitor
```

