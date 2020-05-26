---
layout: post
title: ubuntu 16.04 使用speedtest测试网络速度
date: 2020-05-03 17:08
author: yeqing
comments: true
category: 
- 野生技术
tags: 
- ubuntu
- speedtest
---

我们在终端直接输入  
```bash
speedtest-cli
```
会提示
```bash
The program 'speedtest-cli' is currently not installed. You can install it by typing:
sudo apt install speedtest-cli
```
这已经提示了我们应该怎么做：
```bash
$ sudo apt install speedtest-cli
```
安装完成后 输入
```bash
speedtest-cli
```
就可以自动测速了
