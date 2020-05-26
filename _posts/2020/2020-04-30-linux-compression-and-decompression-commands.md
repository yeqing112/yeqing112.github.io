---
layout: post
title: Ubuntu下压缩与解压各种文件的命令
date: 2020-04-30 17:27
author: 转载
comments: true
category: 
- 野生技术
tags: 
- linux
- linux压缩
- linux解压
---

## 1、压缩与解压xz文件
压缩

```shell
xz -z  filename
```

解压

```shell
xz -d  filename.xz
```

## 2、压缩与解压tar文件
压缩
```shell
tar -cvf  filename（压缩到当前文件夹）
tar cvf fileName.tar DirName（压缩到指定文件夹）
```
解压
```shell
tar -xvf filename.tar（解压到当前文件夹）
```

## 3、压缩与解压tar.xz文件
压缩

未知

解压
```shell
tar xvJf filename.tar.xz
```


## 4、压缩与解压gz文件
压缩
```shell
gzip FileName
```
解压
```shell
gunzip FileName.gz
gzip -d FileName.gz
```

## 5、压缩与解压tar.gz文件
压缩
```shell
tar zcvf FileName.tar.gz DirName
```
解压
```shell
tar zxvf FileName.tar.gz
```

## 6、压缩与解压bz2文件
压缩
```shell
bzip2 -z FileName
```
解压
```shell
bzip2 -d FileName.bz2
bunzip2 FileName.bz2
```

## 7、压缩与解压tar.bz2文件
压缩
```shell
tar jcvf FileName.tar.bz2 DirName
```
解压
```shell
tar jxvf FileName.tar.bz2
```

## 8、压缩与解压bz文件
压缩

未知

解压
```shell
bzip2 -d FileName.bz
bunzip2 FileName.bz
```

## 9、压缩与解压tar.bz文件
压缩

未知

解压
```shell
tar jxvf FileName.tar.bz
```

## 10、压缩与解压Z文件
压缩
```shell
compress FileName
```
解压
```shell
uncompress FileName.Z
```


## 11、压缩与解压tar.Z文件
压缩
```shell
tar Zcvf FileName.tar.Z DirName
```
解压
```shell
tar Zxvf FileName.tar.Z
```

## 12、压缩与解压tgz文件
压缩

未知

解压
```shell
tar zxvf FileName.tgz
```

## 13、压缩与解压tar.tgz文件
压缩
```shell
tar zcvf FileName.tar.tgz FileName
```
解压
```shell
tar zxvf FileName.tar.tgz
```

## 14、压缩与解压zip文件
压缩
```shell
zip FileName.zip DirName
```
解压
```shell
unzip FileName.zip
```

## 15、压缩与解压rar文件
压缩
```shell
rar e FileName.rar
```
解压
```shell
rar a FileName.rar
```

## 16、压缩与解压lha文件
压缩
```shell
lha -a FileName.lha FileName
```
解压
```shell
lha -e FileName.lha
```