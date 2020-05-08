---
layout: post
title: 自制docker镜像实现goaccess网站日志实时分析
date: 2020-05-03 10:04
author: yeqing
comments: true
category: 
- 野生技术
tags: 
- docker
- goaccess
---
自从入坑docker以后，不管做什么都第一时间想着能不能用docker容器的方式实现，为什么喜欢docker，还是那个观念：方便，而且什么都跑在容器里面，对母机没有一点污染，母机干干净净的我喜欢。

最近想用goaccess对网站日志进行分析，首先想到的是能不能跑容器。那我们就来尝试一下，到hub.docker.com上搜索发现还真有goaccess官方镜像，但是，我并不想直接拿来用，我喜欢最近做。

OK，说干就干，首先运行一个纯净的alpine：
```bash
docker run -it --name alpine-goaccess alpine sh
```
进入容器后，第一件事：换更新源
```bash
vi /etc/apk/repositories
```
将里面的内容替换为阿里云的源：
> https://mirrors.aliyun.com/alpine/v3.6/main/
>
> https://mirrors.aliyun.com/alpine/v3.6/community/

然后执行`apk update`

安装goaccess：
```bash
apk add --no-cache goaccess
```
goaccess的配置文件是`/etc/goaccess.conf`

安装nginx：
```bash
apk add --no-cache nginx
```
安装nginx后，在run目录下新建nginx目录：
```bash
mkdir /run/nginx
```
ok,该装的装好了，下面打包镜像
exit退出容器，docker commit一个新镜像出来，用新的镜像启动容器后，容器内部的nginx服务不会自动运行的。所以我这里要用Dockerfile重新构建一个镜像，并在里面加上启动脚本：
Dockerfile内容如下：
```bash
FROM alpin-goaccess:1.2
MAINTAINER yeqing "51025826@qq.com"

EXPOSE 80
EXPOSE 443

CMD nginx && sh && exit
```
用docker build构建：
```bash
docker build -t yeqing112/alpine-goaccess:1.2 .
```
至此，goaccess镜像制作完成。下面说说怎么使用goaccess进行日志分析。

首先，我在data目录下新建goaccess目录，里面再建三个目录，分别是`html`（存放goaccess生成的静态网页）、`logs`（存放日志文件）、`nginx`（存放nginx配置文件）。

通过`docker cp`命令将nginx日志从容器中复制到/data/logs下。

运行goaccess容器：
```bash
docker run -dit --name goaccess -p 8080:80 -v /data/goaccess/nginx:/etc/nginx -v /data/goaccess/html:/data/html -v /data/goaccess/logs:/data/logs -v /etc/localtime:/etc/localtime:ro yeqing112/alpine-goaccess:1.2
```
成功运行之后，进入goaccess容器：
```bash
docker exec -it goaccess sh
```
在容器内部执行命令：
```bash
goaccess -a -d -f /data/logs/www.173top.cn.log -p /etc/goaccess.conf -o /data/html/index.html --real-time-html --daemonize --time-format='%H:%M:%S' --date-format='%d%b%Y' --log-format=COMBINED
```
OK，访问http://ip:8080 就可以查看日志分析了，方便吧？

为了方便，我的日志文件没有进行分割，当然，现阶段也不需要，我可以手动从容器中复制出来一份日志，也可以通过母机的计划任务自动复制出来日志。

设置计划任务：
```bash
crontab -e
```
加入下面的内容：
```bash
*/5 * * * * docker cp website:/var/log/nginx/www.173top.cn.log /data/goaccess/logs/  #每5分钟从容器中复制日志到/data/goaccess/logs目录下
```
然后`sudo service cron restart`重启crontab服务。
