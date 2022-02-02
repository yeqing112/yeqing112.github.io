---
layout: post
title: VMware CentOS LVM磁盘扩容
date: 2022-02-02 00:01
author: yeqing
comments: true
category:
- 野生技术
tags:
- Linux
- VMware
- LVM
---

## 一. 在虚拟机上增加磁盘空间

如下图。

![img](../assets/images/Center.png)


增加完后会有提示 “磁盘已成功扩展。您必须从客户机操作系统内部对磁盘重新进行分区和扩展文件系统。是继续完成以下步骤才算成功。

## 二. 调整虚拟机磁盘LVM 

### 1.查看现有的硬盘分区（现在空间没有变大）

```bash
# df -h
```

### 2.对新增的硬盘空间做新增分区（硬盘数没有增加，增加的是空间）

```bash
fdisk  /dev/sda
```

输入“**n**”，新增分区

输入“**p**”

Partition number (1-4): **3** 说明：新增分区号（1，2默认已经用了）

First cylinder (2611-7832, default 2611): 默认回车（最小）

Using default value 2611

Last cylinder or +size or +sizeM or +sizeK(2611-7832, default 7832):默认回车（最大）

Using default value 7832

 

Command (m for help): **t** 说明：修改分区类型

Partition number (1-4): **3** 说明：修改分区类型对应的分区号

Hex code (type L to list codes): **8e** 说明：8e是lvm磁盘类型

Changed system type of partition 3 to 8e(Linux LVM)

Command (m for help): **p** 说明：打印分区表

 

Disk /dev/sda: 64.4 GB, 64424509440 bytes

255 heads, 63 sectors/track, 7832 cylinders

Units = cylinders of 16065 * 512 = 8225280bytes

 

  Device Boot    Start    End    Blocks Id  System

/dev/sda1  *      1     13    104391 83  Linux

/dev/sda2        14    2610   20860402+ 8e  Linux LVM

/dev/sda3       2611    7832   41945715 8e  Linux LVM

 

Command (m for help): **w** 说明：保存退出

The partition table has been altered!

### 3.重启系统

```bash
reboot
```

### 4.查看硬盘情况（核对刚才所做的分区操作是否保存成功）

```bash
fdisk -l
```

### 5.查看当前分区的类型

```bash
df -T /dev/sda1
#说明：查看当前的主分区类型
```

### 6.创建文件系统在新的磁盘上

```bash
mkfs.ext4 /dev/sda3
#说明：ext4为你查看到的文件系统类型（ext2、ext3、ext4等)
#比如我系统上要增加的是xfs ，我就创建xfs的文件系统
```

### 7.创建PV（pv组成vg，vg组成lv）

```bash
 pvcreate /dev/sda3
```

查看pv状态

```bash
pvdisplay
```

查看vg状态

```bash
vgdisplay
```

### 8.刚创建的PV加入相应的VG

```bash
vgextend centos /dev/sda3
#说明 centos是我的服务器vg名称，请通过查看vg状态得到名称VG name
```

### 9.查看LV状态，把VG加入到LV

```bash
lvdisplay
```

### 10.将新建的分区空间用以扩展文件系统

这里有一点注意，由于是将新建的分区的所有空间都用以扩展文件系统，因此使用了：

```bash
lvextend /dev/centos/root /dev/sda3
```

如果只是给一部分空间用于文件系统，则使用：

```bash
lvextend -l+1535 /dev/centos/root （1535=7040-5505）
```

`/dev/centos/root` 是要增加控件的文件系统

> 说明：2559为上面pvdisplay查看到的free的PE数量
>
> 如果刚才看到是0，要用命令pvdisplay再看一下

### 11.用 resize2fs 调整文件系统大小（如果文件系统是xfs，则使用xfs_growfs）

```bash
resize2fs /dev/mapper/centos-root
```

