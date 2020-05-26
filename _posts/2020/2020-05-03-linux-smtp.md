---
layout: post
title: 在ubuntu中利用第三方smtp发送邮件
date: 2020-05-03 19:11
author: yeqing
comments: true
category: 
- 野生技术
tags: 
- linux
- smtp
---

## 安装heirloom-mail
```bash
sudo apt-get install heirloom-mailx
```
## 修改/etc/s-nail.rc文件
```bash
vim /etc/s-nail.rc
```
在该文件内容末尾添加：
```bash
set from="xxx@gamil.com"
set smtp="smtps://smtp.gmail.com:465"
set smtp-auth-user="xxx@gamil.com"
set smtp-auth-password="xxxxx"
set smtp-auth=login
```
## 发送邮件
命令行格式为：
```bash
echo “邮件内容” | heirloom-mailx -s “邮件标题” -a 『附件全称包括扩展名』 xxx@xxx.com
```
或
```bash
mail -s 『邮件标题』-a 『邮件附件』「收件人邮箱」< 「文件」
```
注意：「文件」= 「邮件内容」，可以提前排版好邮件内容。比较方便。
如果不需要发送附件可以将 -a『邮件附件』去掉