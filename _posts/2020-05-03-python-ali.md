---
layout: post
title: 为Python更换阿里源
date: 2020-05-03 16:58
author: yeqing
comments: true
category: 
- 野生技术
tags: 
- python
---

背景
由于 python 自带的源下载速度非常慢，特别是安装一些库的时候，甚至有时会失败。

替换
首先在 windows 当前用户家的目录下，创建一个 pip 文件夹，然后创建一个pip.ini文件，修改文件内容为如下；
```bash
[global]
index-url = http://mirrors.aliyun.com/pypi/simple/ 
[install]
trusted-host=mirrors.aliyun.com
```
备注
记得一定是pip.ini，如果没有开后缀的同学，记得把文件后缀打开，再修改文件的后缀为ini即可。