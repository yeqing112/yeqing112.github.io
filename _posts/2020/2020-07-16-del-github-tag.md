---
layout: post
title: 如何删除GitHub仓库中冗余的tag？
date: 2020-07-16 10:06
author: yeqing
comments: true
category:
- 野生技术
tags:
- GitHub
---

比如如下tag：  

```
b_3.0.18_201806201808
b_3.0.18_201806201819
b_3.0.18_201806212108
```

## 一个一个删

- 本地删除tag :   

```
git  tag -d b_3.0.18_201806201808
git  tag -d b_3.0.18_201806201819
git  tag -d b_3.0.18_201806212108
```

- 删除远程tag: 

```
git push origin :refs/tags/b_3.0.18_201806201808
git push origin :refs/tags/b_3.0.18_201806201819
git push origin :refs/tags/b_3.0.18_201806212108
```

- 查看本地tag:  `git tag -l`
- 查看远程tag:  `git show-ref  --tag`

> 很麻烦!!!

## 批量删

> 用到awk 正则表达式
>
> 参考：
>
> [http://javascript.ruanyifeng....](http://javascript.ruanyifeng.com/stdlib/regexp.html#toc11)
>
> [https://www.cnblogs.com/OldJa...](https://www.cnblogs.com/OldJack/p/6607155.html)

本例正则可以是：`/^b_4.0.0_201806[0-9]{6}$/`

- 批量删本地:   

```
git tag -l| awk '/^b_4.0.0_201806[0-9]{6}$/ {print  $1}' | xargs git tag -d
```

- 批量删远程:

```
git show-ref --tag | awk '/^b_4.0.0_201806[0-9]{6}$/ {print ":" $2}' | xargs git push origin
```

- 查看本地:  `git tag -l`
- 查看远程: ` git show-ref --tag`