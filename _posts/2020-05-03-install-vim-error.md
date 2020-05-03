---
layout: post
title: vim : Ubuntu安装vim报错的处理方法
date: 2020-05-03 18:28
author: yeqing
comments: true
category: 
- 野生技术
tags: 
- vim
---

```tex
vim : Depends: vim-common (= 2:7.4.052-1ubuntu3.1) but 2:7.4.1689-3ubuntu1.3 is to be installed
E: Unable to correct problems, you have held broken packages.
```
安装vim出现以上提示，别急，请执行下面4条命令：

```bash
sudo apt-get purge vim-common
sudo apt-get update
sudo apt-get upgrade
sudo apt-get install vim
```