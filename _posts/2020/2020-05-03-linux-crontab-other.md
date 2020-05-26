---
layout: post
title: Linux计划任务crontab：每分钟、每小时、每天、每周、每月、每年执行
date: 2020-05-03 19:10
author: yeqing
comments: true
category: 
- 野生技术
tags: 
- linux
- crontab
---

每分钟执行 * * * * *

每小时执行 0 * * * *

每天执行 0 0 * * *

每周执行 0 0 * * 0

每月执行 0 0 1 * *

每年执行 0 0 1 1 *

每小时的第3和第15分钟执行 3,15 * * * *

上午8点到11点的第3和第15分钟执行 3,15 8-11 * * *