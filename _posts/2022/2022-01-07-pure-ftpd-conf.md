---
layout: post
title: ubuntu下pure-ftpd配置实例讲解（转载）
date: 2022-01-07 00:01
author: yeqing
comments: true
category:
- 野生技术
tags:
- Linux
- pureftpd
- ftp
---

## 目的
创建如下表所示的ftp服务器：

| 目录                     | 用途                            |
| ------------------------ | ------------------------------- |
| /var/ftp                 | ftp根目录，ftpadmin掌控。       |
| /var/ftp/public          | 公共目录，由匿名用户读取。      |
| /var/ftp/public/incoming | 公共上传目录，由匿名用户读写。  |
| /var/ftp/teams/teama     | 小组a专用目录，小组成员可读写。 |
| /var/ftp/teams/teamb     | 小组b专用目录，小组成员可读写。 |

> 个人感觉pure-ftpd工作原理很大程度上依赖linux对用户、目录权限的管理，如果没接触过这个问题，可以先简单参考下这篇文章。

## 过程
### 创建目录
用以下命令创建相应目录。

```bash
mkdir /var/ftp
mkdir /var/ftp/public
mkdir /var/ftp/public/incoming
mkdir /var/ftp/teams
```

注意到只创建到/var/ftp/teams，并没有创建teama和teamb目录，这两个目录可以由pure-ftpd自动创建，后面会看到。

### 创建用户组和用户
下表是对用户组和用户的需求说明

| 用户     | 用户组    | 用途                                |
| -------- | --------- | ----------------------------------- |
| ftpadmin | ftpadmins | 掌控ftp。                           |
| teamuser | ftpadmins | 掌控相应的目录，如teama或teamb。    |
| ftp      | ftpusers  | 一般用户。pure-ftpd以此为匿名用户。 |

下面是达到这个需求的命令操作和简单的解释。

创建ftpadmins和ftpusers两个用户组。

```bash
groupadd ftpadmins
groupadd ftpusers
```


创建ftpadmin和teamuser两个用户，它们都属于ftpadmins组，-d /dev/null表明不给该账户指派主目录，-s /bin/false表明该账户不能单独登陆系统，因为这些账户是打算用于pure-ftpd的，不是要真正在linux中使用的账户。

```bash
useradd -g ftpadmins -d /dev/null -s /bin/false ftpadmin
useradd -g ftpadmins -d /dev/null -s /bin/false teamuser
```

创建ftp用户，他属于ftpusers组，由于他是pure-ftpd认定的匿名账户，不需要用pure-ftpd的虚拟用户二次配置，因此现在就要用-d /var/ftp/public指明该账户主目录。

```bash
useradd -g ftpusers -d /var/ftp/public -s /bin/false ftp
```

### 设置权限
目录和用户已经有了，现在就要根据需求设置目录与用户间的权限了。

将/var/ftp的所属者和所属组设置为ftpadmin和ftpadmins。

```bash
chown -R ftpadmin:ftpadmins /var/ftp
```

将/var/ftp设置为所属者（ftpadmin）完全掌控，所属组（ftpadmins）可读，其它用户可读。

```bash
chmod -R 755 /var/ftp
```

将/var/ftp/public/incoming设置为任意用户可读写。

```bash
chmod -R 777 /var/ftp/public/incoming
```

将/var/ftp/teams设置为所属者和所属组掌控，其他用户不可见。

```bash
chmod -R 770 /var/ftp/teams
```

### 安装pure-ftpd
用命令行直接安装即可。

```bash
apt-get install pure-ftpd
```

（选）可以用以下两行卸载以前安装过的pure-ftpd。

```bash
apt-get remove pure-ftpd
apt-get autoremove
```

### 配置pure-ftpd
下表是对pure-ftpd的配置需求。

| 需求                   | 设置                                                      |
| ---------------------- | --------------------------------------------------------- |
| 允许匿名登陆           | NoAnonymous=no                                            |
| 限制用户在其主目录下   | ChrootEveryone=yes                                        |
| 禁止用户删除文件       | KeepAllFiles=yes，TrustedGID组除外                        |
| TrustedGID             | 先通过id ftpadmin察看ftpadmins的gid，再设置TrustedGID=gid |
| 自动创建虚拟用户主目录 | CreateHomeDir=yes                                         |
| 每个IP最多5个连接      | MaxClientsPerIP=5                                         |
| 同时最多100个连接      | MaxClientsNumber=100                                      |
| 最多使用磁盘50%空间    | MaxDiskUsage=50                                           |
| 端口号为8021           | Bind=8021                                                 |

> 注意：ubuntu下，pure-ftpd的配置信息位于/etc/pure-ftpd/conf目录中，且以文件名作为参数名，文件内容作为参数值的形式存在。

根据pure-ftpd的配置信息在ubuntu下的特点，用下面的方法来完成上表中的参数设置。

```bash
cd /etc/pure-ftpd/conf
echo 'no' > NoAnonymous
echo 'yes' > ChrootEveryone
echo 'yes' > KeepAllFiles
echo '1004' > TrustedGID [注意：gid可使用id ftpadmin察看得知，不一定是1004。]
echo 'yes' > CreateHomeDir
echo '5' > MaxClientsPerIP
echo '100' > MaxClientsNumber
echo '50' > MaxDiskUsage
echo '8021' > Bind
```

重启ftp服务器

```bash
service pure-ftpd restart [注意：只要修改了这类配置就需要重启]
```

### 配置pure-ftpd的虚拟用户
pure-ftpd是通过配置自己的虚拟用户来访问ftp的，然后用对应的系统用户来进行实际的文件操作，下表是对虚拟用户的需求说明。

| 虚拟用户 | 对应的系统用户 | 用途                       |
| -------- | -------------- | -------------------------- |
| admin    | ftpadmin       | 掌控/var/ftp。             |
| teama    | teamuser       | 掌控/var/ftp/teams/teama。 |
| teamb    | teamuser       | 掌控/var/ftp/teams/teamb。 |

> 注意：以上配置中未出现匿名配置条目，因为pure-ftpd以ftp用户作为匿名用户，因此匿名用户对应的就是ftp用户，其操作权限也就是ftp用户的操作权限，这在前面使用useradd添加ftp用户时已经设置了。

创建虚拟用户admin，对应ftpadmin，注意：之前用useradd创建ftpadmin时并未指定主目录，现在可以给admin指定。

```bash
pure-pw useradd admin -u ftpadmin -d /var/ftp
```

创建teama和teamb两个虚拟用户，都对应teamuser用户，他们对应的主目录也是此时指定的。

```bash
pure-pw useradd teama -u teamuser -d /var/ftp/teams/teama
pure-pw useradd teamb -u teamuser -d /var/ftp/teams/teamb
```

> 注意：之前并未创建过关teama和teamb目录，但配置pure-ftpd是指定了CreateHomeDir=yes，因此在使用虚拟用户teama或teamb初次登陆ftp时，对应的主目录会被自动创建，提前创建好当然也是可以的。

更新pure-ftpd的数据库。

```bash
pure-pw mkdb [注意：在用过一个或一连串pure-pw指令后，要用pure-pw mkdb更新数据库]
```

### 链接pure-ftpd数据库
感觉这步应该在安装时自动完成，不知为啥非得人工设置。没办法，那就设置吧。

```bash
ln -s /etc/pure-ftpd/conf/PureDB /etc/pure-ftpd/auth/60pureDB
```

> 有时/etc/pure-ftpd/conf/PureDB不存在，那就这样建立一下：
> echo ‘/etc/pure-ftpd/pure-ftpd.pdb’ > /etc/pure-ftpd/conf/PureDB
> 其实就是建立一个PureDB文档，里面内容是/etc/pure-ftpd/pure-ftpd.pdb，这大概是pure-ftpd数据库所在。至于为啥ln时得叫做60pureDB，我也不清楚，希望得到解答。

### pure-ftpd安装-配置完毕
不知是不是该恭喜你了呢，到这里工作就完毕了，最好重启一下，然后运行ftp。

```bash
service pure-ftpd start
```

### 测试ftp
是该试试ftp能否正常工作的时候了，建议安装FileZilla。

```bash
apt-get install filezilla
```

然后就使用各种用户登陆进行操作，看看是否符合当初的规划吧。如果一切如愿以偿，就自己恭喜一下自己吧，可以放松一会儿了。

