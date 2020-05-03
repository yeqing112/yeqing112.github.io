---
layout: post
title: 在VMware虚拟机中安装koolshare的openwrt/LEDE
date: 2020-05-03 18:13
author: yeqing
comments: true
category: 
- 野生技术
tags: 
- vmware
- koolshare
- openwrt
- LEDE
---

## 首先准备好固件
链接：[http://firmware.koolshare.cn/LEDE_X64_fw867/](http://firmware.koolshare.cn/LEDE_X64_fw867/)
链接是x64设备用的固件，有img格式和vmdk虚拟机专用的格式，这里选择虚拟机专用格式下载。

![img](../assets/images/04854a49f43740bab354e5a9f63243aa.png)
![img](../assets/images/6fa01c5f4807a8c3626cde328ebf488a.png)

## 新建虚拟机
没啥好说的，看图跟着来吧

![img](../assets/images/56e01918900ce1571a4eee48eef9299d.png)

![img](../assets/images/1d0d31fb96f7b07884410fa283a425a1.png)

用老毛桃win10 PE
![img](../assets/images/81e94eebaa87b6dbf2f233a8a41fd16a.png)

![img](../assets/images/f57e54381161d661a728d28ed33702c6.png)

![img](../assets/images/cef804678e067b2b62e296c95b9dde4c.png)

先给个2核，以后再降1核
![img](../assets/images/b3a5c73dbf7832fe37cea5f07e3afba1.png)

先给个2G，以后再降到256M都可以
![img](../assets/images/402ff7e192e27d39700b7a6a48e3b4a8.png)

网络选择“仅主机”
![img](../assets/images/ee6631a609c28fc3bc511f8a87065a31.png)

![img](../assets/images/beb99edeb47beee07bbf319ac724e407.png)

![img](../assets/images/463dd4e083555e5026a52a7003540d12.png)

![img](../assets/images/9a11538666892efb18479334b56e7c92.png)

硬盘用不了多少几个G足够
![img](../assets/images/9f6323cc29e71555259c674e4b7c378c.png)

![img](../assets/images/c3b1dad422664d60597ab178229eb3da.png)

![img](../assets/images/f9255d0010b64ace0deae7207054adb2.png)

创建完成

## 把固件和IMG写盘工具烧录到一个iso镜像中

![img](../assets/images/d860971331ad04bb89e73238cb04a719.png)

这样方便我们加载这两个文件

## 安装LEDE
启动虚拟机
![img](../assets/images/8007e4ec6ab26e9677de3b15513d5309.png)

![img](../assets/images/8fc9da08dfe8938add71541d092cf588.png)

进入win10 PE系统后，把光驱的镜像换掉，换成上面我们烧录好的iso镜像
![img](../assets/images/fa074dce26be329d26bb8c454d16e927.png)

![img](../assets/images/78333cf5a6ba100df083046d278df187.png)

然后打开虚拟机PE系统中的“我的电脑”，打开光驱，运行IMG写盘工具
![img](../assets/images/656d2c5a95b493b064af618a21b0759b.png)

浏览加载固件文件
![img](../assets/images/bfb0fe4ff3afa004f599e996d7bf4e6a.png)
点开始即可，等待写盘完成，关闭虚拟机，将虚拟机内存降为256M，CPU降为1核，新增一个网卡，设置为桥接模式（个人验证，选择桥接模式适合母机通过op路由上网）

到这里，在VMware虚拟机中安装koolshare的openwrt/LEDE就完成了。