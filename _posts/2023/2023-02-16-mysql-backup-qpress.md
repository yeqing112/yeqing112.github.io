---
layout: post
title: MySQL物理备份文件恢复到自建数据库
date: 2023-02-16 00:01
author: yeqing
comments: true
category:
- 野生技术
tags:
- MySQL
- 物备
---

本文介绍如何将RDS MySQL的物理备份文件恢复到自建数据库。

**说明**

- 关于如何选择数据恢复方案，请参见[数据恢复方案概览](https://help.aliyun.com/document_detail/157519.htm#concept-2445988)。
- 本文恢复方案用于恢复备份文件中的全部数据。如仅需恢复部分库表，请参见[RDS MySQL逻辑备份文件恢复到自建数据库](https://help.aliyun.com/document_detail/97438.htm#concept-zql-2c5-vfb)。
- 由于软件限制，目前**仅支持**将云数据库MySQL的备份文件恢复到安装在**Linux系统**中的自建MySQL数据库中。Windows系统下的备份恢复请参见[使用mysqldump迁移MySQL数据](https://help.aliyun.com/document_detail/96156.htm#concept-uyq-mn5-ydb)。

## 前提条件

1. RDS MySQL实例需满足以下条件：

   - 大版本：8.0、5.7、5.6、5.5
   - 系列：高可用版
   - 存储类型：本地SSD盘

   **说明**

   - 您可以前往实例基本信息页面查看以上信息。
   - 仅如上版本的实例支持下载物理备份。对于基础版实例，请参见[基础版实例的备份怎么恢复或迁移](https://help.aliyun.com/document_detail/41817.html#section-ohm-rf7-3mx)。

2. RDS实例中的表未通过

   TDE

   加密。

   **说明**

   - 实例中如果存在加密过的表，会导致恢复过程出错，请先在下载备份文件前，对已加密的表执行[解密操作](https://help.aliyun.com/document_detail/96121.htm#section-0nx-bpi-ef8)。
   - 您可在RDS控制台目标实例***\*数据安全性\** > \**TDE\****页面查看TDE开启状况。

3. RAM账号需要具备下载备份文件的权限。如需为RAM账号授权，请参见[添加下载备份文件权限给只读子账号](https://help.aliyun.com/document_detail/100043.htm#concept-qmt-zxm-cgb)。

4. MySQL自建库版本与RDS MySQL

   版本必须相同

   （例如都是5.7）。

   **说明** 请确保该MySQL服务上没有运行其他业务。

5. 自建库所在服务器中必须根据不同MySQL实例安装对应版本的Percona XtraBackup。

   - 对于MySQL 5.7、5.6或5.5实例：下载及安装Percona XtraBackup 2.4，具体请参见[Percona XtraBackup 2.4](https://docs.percona.com/percona-xtrabackup/2.4/installation/apt_repo.html)。
   - 对于MySQL 8.0实例：下载及安装Percona XtraBackup 8.0，具体请参见[Percona XtraBackup 8.0](https://docs.percona.com/percona-xtrabackup/8.0/installation/apt_repo.html)。

6. 自建库所在服务器中必须已安装解压工具qpress。安装方法：

   ```bash
   ## 下载可执行文件的tar包
   wget "http://docs-aliyun.cn-hangzhou.oss.aliyun-inc.com/assets/attach/183466/cn_zh/1608011575185/qpress-11-linux-x64.tar"
   ## 解压下载的tar包，取出可执行文件
   tar xvf qpress-11-linux-x64.tar
   ## 设置qpress文件的执行权限
   chmod 775 qpress
   ## 拷贝qpress到/usr/bin中
   cp qpress /usr/bin
   ```

## 一、下载备份

1. 访问[RDS实例列表](https://rdsnext.console.aliyun.com/rdsList/basic)，在上方选择地域，然后单击目标实例ID。

2. 在左侧导航栏中，单击**备份恢复**。

3. 在**备份恢复**页面中选择***\*基础备份列表\** > \**数据备份\****。

4. 单击目标备份集右侧**操作**列下的**实例备份下载**。

   **说明**

   - 默认展示近8天内的备份数据，如需查看8天前的备份，请修改时间范围。
   - 如控制台页面没有**实例备份下载**按钮，请确认您的实例版本或实例所在地域是否满足**前提条件**。

5. 在**实例备份下载**对话框，您可通过下载地址或单击**已了解，要下载**，下载备份数据。

   **重要**

   - 使用内网地址下载时，需要在同地域的VPC网络中才可下载，在跨地域VPC以及经典网络的服务器端无法下载。
   - **已知晓，下载备份文件，内网流量免费，外网流量收费**默认选中，通过外网链接下载备份数据时，超出外网下载免费额度后需要支付外网流量费用。更多信息，请参见[费用说明](https://help.aliyun.com/document_detail/98819.htm#section-p6l-jre-70e)。
   - 备份下载地址链接获取后有效时间仅有一个小时。超过有效时间后您可刷新页面获取最新链接下载即可。
   - 请勿修改或删减已备份的文件内容，可能造成备份文件损坏，无法恢复，如需修改，请恢复到自建数据库后，再进行修改操作。

6. 在**Linux服务器**上，执行如下命令下载物理备份。

   ```javascript
   wget -c 'http://...' -O test1_qp.xb
   ```

   **说明**

   - 请将上述命令中的*http://...*替换为备份的下载地址。
   - *test1_qp.xb*是另存为的文件名。您可以自定义该文件名，但后缀必须与下载地址里的后缀相同。![下载截图](../assets/images/p184686.png)

## 二、解压和恢复备份

1. 在

   Linux服务器

   上，创建一个目录（本文示例目录为

   /home/mysql/data

   ）用于存放解压后的文件。

   ```bash
   mkdir /home/mysql/data
   ```

2. 解压压缩包。根据压缩包的后缀选择解压命令。

   **说明**

   - 请先参考[前提条件](https://help.aliyun.com/document_detail/41817.html#section-ooe-3fz-r97)，在自建库所在服务器中安装Percona XtraBackup和qpress后，再执行以下解压命令。若不安装，后续执行如下命令将失败。
   - 执行以下解压命令时，请将*test1*和*/home/mysql/data*替换为实际的文件名和路径。

   | 备份文件类型                        | 解压命令                                                     |
   | :---------------------------------- | :----------------------------------------------------------- |
   | tar 压缩包 （.tar.gz 后缀）         | `tar -izxvf test1.tar.gz -C /home/mysql/data`                |
   | xbstream 压缩包 （.xb.gz 后缀）     | `gzip -d -c test1.xb.gz | xbstream -x -v -C /home/mysql/data` |
   | xbstream 文件包（_qp.xb 后缀）      | `## 步骤一：解包 cat test1_qp.xb | xbstream -x -v -C /home/mysql/data ## 步骤二：解压 ### 对于MySQL 5.6/5.7 innobackupex --decompress --remove-original /home/mysql/data ### 对于MySQL 8.0 xtrabackup --decompress --remove-original --target-dir=/home/mysql/data`**说明**若执行以上cat解包命令出现`can't change to dir to xx( errorcode:no such file or directory)`报错，请检查您存放解压后文件的目录路径是否存在或正确。若执行以上解压命令出现innobackupex未找到命令提示，请参考本文[前提条件](https://help.aliyun.com/document_detail/41817.html#section-ooe-3fz-r97)确认您自建库所在服务器中是否已安装Percona XtraBackup。若执行以上解压命令出现`sh: qpress: command not found`报错，请参考本文[前提条件](https://help.aliyun.com/document_detail/41817.html#section-ooe-3fz-r97)确认您自建库所在服务器中是否已安装解压工具qpress。 |
   | xbstream qpress压缩包（_xb.qp后缀） | `qpress -do  test1_xb.qp  | xbstream -x -v -C /home/mysql/data` |

3. 执行如下命令，查询解压后生成的文件。

   ```bash
   ls -l /home/mysql/data
   ```

   系统会返回如下结果，其中蓝色字体为备份文件包含的数据库。![查看解压文件](../assets/images/p47410.jpg)

4. 执行如下命令，恢复解压好的备份文件。

   ```bash
   ## MySQL 5.6/5.7
   innobackupex --defaults-file=/home/mysql/data/backup-my.cnf --apply-log /home/mysql/data
   
   ## MySQL 8.0
   ## xtrabackup工具备份前的准备操作
   xtrabackup --prepare --target-dir=/home/mysql/data
   ## 执行备份还原命令
   xtrabackup --datadir=/var/lib/mysql --copy-back --target-dir=/home/mysql/data
   ```

   | 参数              | 含义                                                         |
   | :---------------- | :----------------------------------------------------------- |
   | `--defaults-file` | 通过传入文件设置MySQL默认选项。备份集解压后会有**backup-my.cnf**，一般传入该文件。 |
   | `--apply-log`     | 应用此目录下的事务日志文件`xtrabackup_logfile`到备份集解压后的路径中。 |
   | `--prepare`       | xtrabackup工具备份前的准备命令，与后续备份恢复有关。         |
   | `--datadir`       | 源数据库数据所在路径。与MySQL服务的位置有关。**说明** 该路径与[步骤3](https://help.aliyun.com/document_detail/41817.html#section-0gk-go7-ovm)中启动MySQL进程命令中**--datadir**的路径一致。 |
   | `--target-dir`    | 备份集解压后的路径。                                         |

   恢复时请耐心等待，若系统返回如下类似结果，则说明备份文件已成功恢复到自建数据库：![恢复成功](../assets/images/p47412.jpg)

   **常见恢复报错**：

   - 若系统返回`xtrabackup: Unknown error 3613`，请将Percona XtraBackup更新到最新版本后再次尝试。
   - 若系统返回如下报错，可以用`rm -rf /var/lib/mysql`命令清空文件夹内文件，然后用`chown -R mysql:mysql /var/lib/mysql`修改权限。![文件夹不为空](../assets/images/p187242.png)
   - 若系统返回如下报错，请参见[前提条件](https://help.aliyun.com/document_detail/41817.html#section-ooe-3fz-r97)中的第2项说明。![恢复失败](../assets/images/p298939.png)

   **说明** 请确保您的Percona XtraBackup版本正确：

   - MySQL 5.7、5.6以及之前的版本需要安装 Percona XtraBackup 2.4，安装指导请参见官方文档[Percona XtraBackup 2.4](https://docs.percona.com/percona-xtrabackup/2.4/installation/apt_repo.html)。
   - MySQL 8.0版本需要安装 Percona XtraBackup 8.0，安装指导请参见官方文档[Percona XtraBackup 8.0](https://docs.percona.com/percona-xtrabackup/8.0/installation/apt_repo.html)。

## 三、启动MySQL

1. 为避免版本问题，您需要修改

   backup-my.cnf

   文件，具体操作步骤如下。

   1. 执行如下命令，以文本方式编辑

      backup-my.cnf

      文件。

      ```bash
      vi /home/mysql/data/backup-my.cnf
      ```

   2. 添加如下参数：

      ```undefined
      lower_case_table_names=1
      ```

   3. 注释掉如下自建数据库不支持的参数，

      若不注释会导致报错

      ：

      ```bash
      #innodb_log_checksum_algorithm
      #innodb_fast_checksum
      #innodb_log_block_size
      #innodb_doublewrite_file
      #innodb_encrypt_algorithm
      #rds_encrypt_data
      #redo_log_version
      #master_key_id
      #server_uuid
      ```

      **说明** 如果自建数据库使用的是MyISAM引擎，由于无法兼容MySQL的InnoDB引擎，则需要多注释掉如下参数并增加skip-grant-tables参数：

      ```python
      #innodb_log_checksum_algorithm=strict_crc32
      #redo_log_version=1
      skip-grant-tables
      ```

   4. 按**Esc**键，然后输入`:wq`并回车进行保存。

2. 执行如下命令，修改文件属性，并确定文件所属为MySQL用户。

   ```bash
   chown -R mysql:mysql /home/mysql/data
   ```

3. 执行如下命令，启动MySQL进程。

   ```javascript
   mysqld_safe --defaults-file=/home/mysql/data/backup-my.cnf --user=mysql --datadir=/var/lib/mysql &
   ```

   **说明**

   - root密码问题

     ：

     - 如果您的实例版本为MySQL 5.5或5.6，需要重置root密码方可正常使用。更多信息，请参见[官方文档](https://dev.mysql.com/doc/refman/8.0/en/resetting-permissions.html)。
     - 如果您的实例版本为MySQL 5.7或8.0，则root密码即自建库的root密码。

   - 如果启动MySQL进程报错，可以尝试修改存储引擎。更多信息，请参见[常见问题](https://help.aliyun.com/document_detail/41817.html#section-ohm-rf7-3mx)。

   **常见错误**

   如果Ubuntu操作系统报如下错误，是Ubuntu自带安全程序AppArmor导致的，请使用`apt install -y apparmor-utils`和`aa-complain /usr/sbin/mysqld`命令修改AppArmor设置。

   

4. 执行如下命令，登录MySQL数据库以验证进程启动成功。

   ```xml
   mysql -u<源RDS MySQL实例账号> -p<对应密码>
   ```

   **说明**

   - 若执行以上命令出现`Access denied for user 'XXX'`提示，请检查RDS MySQL实例账号或密码是否正确。
   - 该登录命令仅为了验证恢复成功。若仅需查看某些表数据，则登录账号及密码无需为高权限，仅确认有查询对应表的权限即可。
   - 若忘记账号或密码，请在**步骤3**执行启动MySQL进程命令时，传入`--skip-grant-tables`参数，进程启动后会忽略权限检查，从而此步骤无需账户密码就可登录数据库。您可在登录成功后重新再修改账号和密码。
   - 您也可以通过外部第三方工具或[客户端、命令行](https://help.aliyun.com/document_detail/26138.htm#concept-n1v-qpf-vdb)连接数据库。

5. **（可选步骤）**您也可以执行`show databases;`命令查看数据库，确认是否恢复成功。![启动成功](../assets/images/p47413.jpg)