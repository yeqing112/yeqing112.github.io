---
layout: post
title: 修改linux系统时区以及同步时间的方法
date: 2020-05-23 08:01
author: yeqing
comments: true
category:
- 野生技术
tags:
- Linux
- 时区设置
---

## 时区

### 查看当前时区

```bash
timedatectl
```

### 修改系统时区

```bash
timedatectl set-timezone Asia/Shanghai
```

## 时间

### 查看当前系统时间

```bash
date -R
```

### 查看硬件时间（即BIOS时间）

```bash
hwclock -r
```

### 校准系统时间

```bash
yum install -y ntpdate || apt-get install -y ntpdate \
&& ntpdate time.windows.com
```

> 另附阿里云提供的7个时间服务器：
>
> ntp1.aliyun.com
>
> ntp2.aliyun.com
>
> ntp3.aliyun.com
>
> ntp4.aliyun.com
>
> ntp5.aliyun.com
>
> ntp6.aliyun.com
>
> ntp7.aliyun.com

### 让硬件时间与系统时间保持一致

```bash
hwclock -w
```

