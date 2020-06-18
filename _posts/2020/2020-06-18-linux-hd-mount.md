---
layout: post
title: Linux如何挂载硬盘
date: 2020-06-18 07:40
author: yeqing
comments: true
category:
- 野生技术
tags:
- 硬盘挂载

---

Linux添加新硬盘自动挂载硬盘的具体步骤

## 插入新硬盘

插入新硬盘，启动Linux服务器，使用 `fdisk -l` 查看硬盘

```bash
root@ubuntu:~$ fdisk -l
Disk /dev/sdb: 30 GiB, 32212254720 bytes, 62914560 sectors
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes


Disk /dev/sda: 15 GiB, 16106127360 bytes, 31457280 sectors
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disklabel type: dos
Disk identifier: 0x3c38ebe6

设备       启动    Start   末尾   扇区  Size Id 类型
/dev/sda1  *        2048 29456383 29454336   14G 83 Linux
/dev/sda2       29458430 31455231  1996802  975M  5 扩展
/dev/sda5       29458432 31455231  1996800  975M 82 Linux 交换 / Solaris
```

## 格式化硬盘

```bash
mkfs -t ext4 /dev/sdb
```

## 挂载硬盘

> 格式：mount 硬盘地址 要挂载的地址 (将数据盘挂载到data目录)

```bash
mkdir /data
mount /dev/sdb /data
```

## 系统启动后自动挂载该分区

```bash
vim /etc/fstab
```

在最后一行添加

```bash
/dev/sdb /data                  ext4 defaults 1 2
```

## 查看文件系统磁盘使用量

使用`df -lh`命令查看文件系统磁盘使用量

```bash
root@ubuntu:~$ df -lh
文件系统        容量  已用  可用 已用% 挂载点
udev            467M     0  467M    0% /dev
tmpfs            98M  4.4M   94M    5% /run
/dev/sda1        14G  1.7G   12G   13% /
tmpfs           488M     0  488M    0% /dev/shm
tmpfs           5.0M     0  5.0M    0% /run/lock
tmpfs           488M     0  488M    0% /sys/fs/cgroup
tmpfs            98M     0   98M    0% /run/user/0
/dev/sdb         30G   44M   28G    1% /data
```

