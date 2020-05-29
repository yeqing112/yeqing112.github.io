---
layout: post
title: 使用VMware虚拟机安装群晖体验DSM6.2系统 
date: 2020-05-29 06:46
author: 转载
comments: true
category:
- 野生技术
tags:
- dsm
- vmware
---

**创作目的：**在学习之初网上看了很多教程都都觉得很麻烦很不适合小白使用，今天作者总结了一套方法可以快速安装，主要针对新手，简单且快速上手下面我将详细说明过程。

**环境准备：需要用到的工具说明**
**DSM_DS3617xs_23739.pat** —DSM镜像文件
**synoboot.img** —引导镜像
**VMware-workstation-full-15.5.1-15018445.exe** —VM15pro软件
**synology-assistant-6.2-23733.exe** —[群晖](https://pinpai.smzdm.com/2315/)用于搜索安装群晖
**StarWindConverter.exe** —img镜像转换vm格式工具
先把如上工具下载好，[（云盘下载链接）](https://pan.baidu.com/s/1fVqyeTXjkA6fkYkNf46THQ)提取码：tyu0 

## 第一步：转换引导镜像，img转vm格式

![打开StarWindConverter.直接下一步](../assets/images/5e6099f35b0095263.png_e680.jpg)

打开StarWindConverter.直接下一步

![点...找到img镜像](../assets/images/5e6099f359e271976.png_e680.jpg)

点...找到img镜像

![选中找开](../assets/images/5e6099f35c63f1884.png_e680.jpg)

选中找开

![如上图点下一步](../assets/images/5e6099f3b825a1590.png_e680.jpg)

如上图点下一步

![如上图选第二个pre-allocated image](../assets/images/5e6099f3c280f7680.png_e680.jpg)

如上图选第二个pre-allocated image

![一定要选IDE，下步](../assets/images/5e6099f3c4ad18338.png_e680.jpg)

一定要选IDE，下步

![转换中，完成后点下一步](../assets/images/5e6099f42d200809.png_e680.jpg)

转换中，完成后点下一步

![转换完成，生成两个文件](../assets/images/5e6099f437a8d3465.png_e680.jpg)

转换完成，生成两个文件

## 第二步：新建一个文件夹用于存放虚拟机

![将生成的文件移动过来放自己新建的要放虚拟机的文件夹例：vm安装dsm](../assets/images/5e6099f427b521845.png_e680.jpg)

将生成的文件移动过来放自己新建的要放虚拟机的文件夹例：vm安装dsm

## 第三步：VM 15 pro创建虚拟机

![打开我们的vm,VM安装方式略过](../assets/images/5e609ab4a90361605.png_e680.jpg)

打开我们的vm,VM安装方式略过

![选自定义-下一步](../assets/images/5e609ab4e3aab5444.png_e680.jpg)

选自定义-下一步

![选15.x-下一步](../assets/images/5e609ab4de6613584.png_e680.jpg)

选15.x-下一步

![选稍后安装系统-下一步](../assets/images/5e609ab5300bb3015.png_e680.jpg)

选稍后安装系统-下一步

![选linux 3.x，如图-下一步](../assets/images/5e609ab55f9c99747.png_e680.jpg)

选linux 3.x，如图-下一步

![这里设置刚才我们新建的文件夹，并起个名字-下一步](../assets/images/5e609ab568b459170.png_e680.jpg)

这里设置刚才我们新建的文件夹，并起个名字-下一步

![提示这个不影响，点继续就行是因为我们提前放了vmdk虚拟磁盘文件，不影响](../assets/images/5e609ab5d712e7759.png_e680.jpg)

提示这个不影响，点继续就行是因为我们提前放了vmdk虚拟磁盘文件，不影响

![如图根据自己PC性能选择核心数](../assets/images/5e609ab5c91dc2397.png_e680.jpg)

如图根据自己PC性能选择核心数

![群晖折腾二：初学者使用VMware 虚拟机安装群晖体验DSM6.2系统 （超详细版本）](../assets/images/5e609ab61be5f5518.png_e680.jpg)

![使用桥接方便从我们所在的局域网访问dsm](../assets/images/5e609ab656e2e9159.png_e680.jpg)

使用桥接方便从我们所在的局域网访问dsm

![选择LSI Logic(L)-下一步](../assets/images/5e609ab6c55934830.png_e680.jpg)

选择LSI Logic(L)-下一步

![选SATA-下一步](../assets/images/5e609ab6a1d606374.png_e680.jpg)

选SATA-下一步

![使用现有磁盘-下一步](../assets/images/5e609ab6c71876727.png_e680.jpg)

使用现有磁盘-下一步

![选择我们刚才放进的文件夹，选择synoboot.vmdk,打开](../assets/images/5e609ab727b029178.png_e680.jpg)

选择我们刚才放进的文件夹，选择synoboot.vmdk,打开

![之后如上图-下一步](../assets/images/5e609ab75ddf3899.png_e680.jpg)

之后如上图-下一步

![保持现有格式不变](../assets/images/5e609ab730adc2311.png_e680.jpg)

保持现有格式不变

![完成](../assets/images/5e609ab7a875e2685.png_e680.jpg)

完成

![编辑虚拟机](../assets/images/5e609ab7b3a572482.png_e680.jpg)

编辑虚拟机

![添加一块放数据的硬盘](../assets/images/5e609ab7e299f5713.png_e680.jpg)

添加一块放数据的硬盘

![硬盘-下一步](../assets/images/5e609ab80d4115273.png_e680.jpg)

硬盘-下一步

![SATA-下一步](../assets/images/5e609ab84ac678847.png_e680.jpg)

SATA-下一步

![建一个新的虚拟磁盘-下一步](../assets/images/5e609ab85cd0c2688.png_e680.jpg)

建一个新的虚拟磁盘-下一步

![容量大小无所谓，其它默认-下一步](../assets/images/5e609ab8863721965.png_e680.jpg)

容量大小无所谓，其它默认-下一步

![默认-完成](../assets/images/5e609ab8ce7d71172.png_e680.jpg)

默认-完成

![移除光驱](../assets/images/5e609ab8dfa934144.png_e680.jpg)

移除光驱

![核对一下左右的硬件情况，网络连接打钩复制物理网络连接状态-然后点确定](../assets/images/5e609ab908cd01210.png_e680.jpg)

核对一下左右的硬件情况，网络连接打钩复制物理网络连接状态-然后点确定

![虚拟机创建好了激动人心的时候到了-开机](../assets/images/5e609ab96c2c46842.png_e680.jpg)

虚拟机创建好了激动人心的时候到了-开机

## 第四步：启动虚拟机安装群晖

![默认选择第一个就行  ](../assets/images/5e609b3378e716438.png_e680.jpg)

默认选择第一个就行  

![显示如图说明开机成功，不要急等等几分种让DSM开机运行自动获取IP](../assets/images/5e609fb97472f2837.png_e680.jpg)

显示如图说明开机成功，不要急等等几分种让DSM开机运行自动获取IP

![http://find.synology.com/# 搜索，出现这个画面就对了，距离成功不远了。](../assets/images/5e609b33836767616.jpg_e680.jpg)

http://find.synology.com/# 搜索，出现这个画面就对了，距离成功不远了。

**打开搜索软件:Synology Assistant或打开网站** [**http://find.synology.com/#**](http://find.synology.com/#) **搜索**

![勾选同意，点确定](../assets/images/5e609b341e5147097.png_e680.jpg)]

勾选同意，点确定

![设置](../assets/images/5e609b33f11d76723.png_e680.jpg)

设置

![手动安装](../assets/images/5e609b342e2b55482.png_e680.jpg)

手动安装

![手动选择我给的镜像-打开](../assets/images/5e609b3472559708.png_e680.jpg)

手动选择我给的镜像-打开

![如上图，立即安装](../assets/images/5e609b34cdfeb9027.png_e680.jpg)

如上图，立即安装

![如上图会格式化新添加的80G硬盘-点确定](../assets/images/5e609b3490f144390.png_e680.jpg)

如上图会格式化新添加的80G硬盘-点确定

![开始安装](../assets/images/5e609b34d58b3651.png_e680.jpg)

开始安装

![67%，安装DSM](../assets/images/5e609b35580703929.png_e680.jpg)

67%，安装DSM

![安装成功后会重启，不要关闭这个页面，等待，等待。。。约5分钟会自动刷新](../assets/images/5e609b358dd647231.png_e680.jpg)

安装成功后会重启，不要关闭这个页面，等待，等待。。。约5分钟会自动刷新

![来了，输入自己的信息，随便写](../assets/images/5e609b358dc771846.png_e680.jpg)

来了，输入自己的信息，随便写

![选第三个通知我-下一步](../assets/images/5e609b35de8c4674.png_e680.jpg)

选第三个通知我-下一步

![跳过这个](../assets/images/5e609b36d1f157935.png_e680.jpg)

跳过这个

![点是，不需要](../assets/images/5e609b36288b85688.png_e680.jpg)

点是，不需要

![可以了，前往](../assets/images/5e609b367d0029060.png_e680.jpg)

可以了，前往

![设备分析也跳过](../assets/images/5e609b369ad631193.png_e680.jpg)

设备分析也跳过

![关闭更新-安装完成可以使用了，其它的设置可以自己摸索一下，需要新建一个存储容量把80G的硬盘添加上就可以安装套件了，开始我们快乐的体验过程吧。](../assets/images/5e609b36ed1ba4780.png_e680.jpg)

关闭更新-安装完成可以使用了，其它的设置可以自己摸索一下，需要新建一个存储容量把80G的硬盘添加上就可以安装套件了，开始我们快乐的体验过程吧。

控制面板-更新和还原-关闭更新-否则更新会无法开机的。
