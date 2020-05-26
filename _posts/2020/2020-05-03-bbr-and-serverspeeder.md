---
layout: post
title: BBR+BBR魔改+锐速一键脚本 for Centos/Debian/Ubuntu
date: 2020-05-03 17:24
author: yeqing
comments: true
category: 
- 野生技术
tags: 
- bbr
- 锐速
- linux
---

## 安装
支持系统：Centos 6+/Debian 8+/Ubuntu 14+，BBR魔改版不支持Debian 8。
注意：该脚本在Vultr各个系统均测试通过，如果期间有出现任何问题，可向原作者反映帮助改善。
运行以下命令：
```shell
wget -N --no-check-certificate "https://raw.githubusercontent.com/chiakge/Linux-NetSpeed/master/tcp.sh" && chmod +x tcp.sh && ./tcp.sh
```
## 使用说明
使用脚本后会出现如下选项：
![](../assets/images/b5ea434fa256bbc8bd21c972789be34b.png)
请输入图片描述
根据自己需求操作，重启后再使用./tcp.sh命令接着操作。

如果在删除内核环节出现这样一张图
![](../assets/images/15c7971741acf6e03ec6e083ed512746.png)
请输入图片描述
注意选择NO，然后根据提示重启系统。