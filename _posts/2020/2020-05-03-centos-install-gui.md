---
layout: post
title: 给CentOS安装GUI图形界面
date: 2020-05-03 15:42
author: yeqing
comments: true
category: 
- 野生技术
tags: 
- centos
---

## 1、在系统下使用命令安装gnome图形界面程序
第一步：在命令行下 输入下面的命令来安装Gnome包。
```bash
yum groupinstall “GNOME Desktop” “Graphical Administration Tools”
```
第二步：更新系统的运行级别。
```bash
ln -sf /lib/systemd/system/runlevel5.target /etc/systemd/system/default.target
```
第三步：重启机器。启动默认进入图形界面。
```bash
reboot
```
## 2、系统启动后直接进入图形界面

PS:
安装过程如遇报错：Transaction check error:
file /boot/efi/EFI/centos from install of fwupdate-efi-12-5.el7.centos.x86_64 conflicts with file from package grub2-common-1:2.02-0.65.el7.centos.2.noarch

用`yum upgrade -y`只升级所有包，不升级软件和系统内核。
之后再按以上步骤重新装Gnome