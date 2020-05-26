---
layout: post
title: CentOS7下NFS服务安装及配置
date: 2020-05-03 17:00
author: yeqing
comments: true
category: 
- 野生技术
tags: 
- centos
- nfs
---

系统环境：CentOS Linux release 7.4.1708 (Core) 3.10.0-693.el7.x86_64

软件版本：nfs-utils-1.3.0-0.48.el7_4.x86_64

网络环境中配置了DNS服务器，NFS服务器对应的域名是nfs.st.local，IP是192.168.1.18。配置过程中全部使用域名。

## 一、安装
nfs客户端和服务端都安装nfs-utils包，同时自动安装rpcbind。安装后会创建nfsnobody用户和组，uid和gid都是65534。
```csharp
# yum -y install nfs-utils
```

## 二、配置端口
nfs除了主程序端口2049和rpcbind的端口111是固定以外，还会使用一些随机端口，以下配置将定义这些端口，以便配置防火墙
```csharp
# vim /etc/sysconfig/nfs
#追加端口配置
MOUNTD_PORT=4001　　
STATD_PORT=4002
LOCKD_TCPPORT=4003
LOCKD_UDPPORT=4003
RQUOTAD_PORT=4004
```

## 三、NFS权限说明
1、普通用户

当设置all_squash时：访客时一律被映射为匿名用户(nfsnobody)

当设置no_all_squash时：访客被映射为服务器上相同uid的用户，因此在客户端应建立与服务端uid一致的用户，否则也映射为nfsnobody。root除外，因为root_suqash为默认选项，除非指定了no_root_squash

2、root用户

当设置root_squash时：访客以root用户访问NFS服务端时，被映射为nfsnobody用户

当设置no_root_squash时：访客以root用户访问NFS服务端时，被映射为root用户。以其他用户访问时同样映射为对应uid的用户，因为no_all_squash是默认选项
> 选项说明
> ro：共享目录只读
> rw：共享目录可读可写
> all_squash：所有访问用户都映射为匿名用户或用户组
> no_all_squash（默认）：访问用户先与本机用户匹配，匹配失败后再映射为匿名用户或用户组
> root_squash（默认）：将来访的root用户映射为匿名用户或用户组
> no_root_squash：来访的root用户保持root帐号权限
> anonuid=<UID>：指定匿名访问用户的本地用户UID，默认为nfsnobody（65534）
> anongid=<GID>：指定匿名访问用户的本地用户组GID，默认为nfsnobody（65534）
> secure（默认）：限制客户端只能从小于1024的tcp/ip端口连接服务器
> insecure：允许客户端从大于1024的tcp/ip端口连接服务器
> sync：将数据同步写入内存缓冲区与磁盘中，效率低，但可以保证数据的一致性
> async：将数据先保存在内存缓冲区中，必要时才写入磁盘
> wdelay（默认）：检查是否有相关的写操作，如果有则将这些写操作一起执行，这样可以提高效率
> no_wdelay：若有写操作则立即执行，应与sync配合使用
> subtree_check（默认） ：若输出目录是一个子目录，则nfs服务器将检查其父目录的权限
> no_subtree_check ：即使输出目录是一个子目录，nfs服务器也不检查其父目录的权限，这样可以提高效率


以nfsuser(uid=1000)创建共享目录，参数默认rw
```csharp
# mkdir /var/nfs
# chown nfsuser. -R /var/nfs　　
# vim /etc/exports　　
/var/nfs    192.168.1.0/24(rw)
# exportfs -r　　#重载exports配置
# exportfs -v　　#查看共享参数
/var/nfs      	192.168.1.0/24(rw,sync,wdelay,hide,no_subtree_check,sec=sys,secure,root_squash,no_all_squash)
```
> exportfs参数说明
> -a 全部挂载或卸载 /etc/exports中的内容
> -r 重新读取/etc/exports 中的信息 ，并同步更新/etc/exports、/var/lib/nfs/xtab
> -u 卸载单一目录（和-a一起使用为卸载所有/etc/exports文件中的目录）
> -v 输出详细的共享参数

## 四、防火墙
```csharp
# iptables -I INPUT 5 -p tcp -m tcp --dport 111 -j ACCEPT
# iptables -I INPUT 5 -p udp -m udp --dport 111 -j ACCEPT
# iptables -I INPUT 5 -p tcp -m tcp --dport 2049 -j ACCEPT
# iptables -I INPUT 5 -p udp -m udp --dport 2049 -j ACCEPT
# iptables -I INPUT 5 -p tcp -m tcp --dport 4001:4004 -j ACCEPT
# iptables -I INPUT 5 -p udp -m udp --dport 4001:4004 -j ACCEPT
# iptables-save >/etc/sysconfig/iptables
```

## 五、启动服务
```csharp
# systemctl start rpcbind.service
# systemctl enable rpcbind.service
# systemctl start nfs.service
# systemctl enable nfs.service
```
启动顺序一定是rpcbind->nfs，否则有可能出现错误

## 六、Linux客户端挂载
1、直接挂载
```csharp
# mount -t nfs nfs.st.local:/var/nfs /mnt
```
也可将挂载配置写入fstab文件中，与普通磁盘挂载一样，挂载时同样可以指定权限，只是类型为nfs。
2、autofs挂载
```csharp
# yum -y install autofs
# vi /etc/auto.master
#添加一行
/-    /etc/auto.mount
# vi /etc/auto.mount
#添加一行
/mnt -fstype=nfs,rw  nfs.st.local:/var/nfs

#启动服务
# systemctl start autofs 
# systemctl enable autofs 
```

## 七、故障解决
1、nfs只能挂载为nobody

同时修改服务端、客户端/etc/idmapd.conf中的Domain为一样的值，随后重启rpcidmapd服务，或重启所有服务

2、客户端无法卸载nfs目录

umount.nfs4: /var/nfs: device is busy

执行fuser -km /var/nfs/，然后再执行umount