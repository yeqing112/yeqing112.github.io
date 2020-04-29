---
layout: post
title: Linux 学习笔记 (1)
description: "现在使用的笔记本是二手的 IBM Thinkpad X30，上学期几百块钱从淘宝淘过来的，当初买这本子的时，根本没想到现在还会用着（第一学期学校不让带电脑，买这台凑合着用，1.2GHzCPU + 512RAM + 40GHDD ）。"
category: tech
thumb: 'IMG_PATH/linux.png'
tags: [Fedora, Linux, Ubuntu, 初学, 学习, 笔记]
---

现在使用的笔记本是二手的 IBM ThinkPad X30，上学期几百块钱从淘宝淘过来的，当初买这本子的时，根本没想到现在还会用着（第一学期学校不让带电脑，买这台凑合着用凯，1.2GHzCPU + 512RAM + 40GHDD ）。虽然零件什么的都不怎么纯的样子，不过挺好用的我觉得，寒假在家里很多时间都是用这台笔记本上网，它已经可以满足我日常电脑的使用（我不怎么看电影，不玩大型游戏，最多也就超级玛莉~）。目前我所知道的笔记本品牌里，相对来说 ThinkPad 系列是最好的，它很照顾键盘党，TrackPoint 很给力，占用空间小且好用，有了它我都没使用鼠标了，以后再买笔记本，也会是 ThinkPad。

在这台笔记本里，装过 Win 2003, Win XP, Ubuntu, Linux Mint, Lubuntu 再到现在的 Fedora 14，当然也尝试安装了其他的 Linux 发行版，比如说 Debian，Arch Linux 等，其实目前最想装的是 Arch Linux，可惜自己还没那能力，或许可以吧，只是要折腾，所以还是好好学好基础再说。对于 Linux，要学的还有很多，我只是一只刚踏入 Linux 道路的笨鸟，我在图书馆借到了一本《鸟哥的 Linux 私房菜，很庆幸学校图书馆有这本 Linux 基础教程。一切都是折腾，网络环境一直不怎么样，又没光驱，USB 还是 1.1 的。现在的它，6G 给了 Windows（宿舍局域网下，6G 足以），其余都属于 Linux，个人数据等都在 ext3 分区。

确实，Windows 下面有很多精品软件，可是作为载体的它是盗版的，下面的软件：Office, Adobe... 既然自己没有能力去支付昂贵的软件费用，何不转而使用免费正版的 Linux 系统呢？现在我日常使用都在 Linux 下，用着 Linux 很舒服，操作习惯已慢慢养成，现在回到 Windows，反而感到陌生了。在 Windows 下，我一般不会用 cmd，因为大部分软件都是图形化操作，设置也一样，根本用不着；到了 Linux，感觉不得不用 CLI 的时候，一开始我是强迫自己去学习那些命令的，到后来温习命令已经成为一种习惯，原因是感觉到 CLI 的自由，方便，安全。现在回想起来，在国内的环境下，在 Windows 上使用软件不是一般的危险，虽然容易上手，使用较为方便，但是有危险，当你在前台操作的时候，可能后台的木马已经猖狂已久，这是不可避免的，可能随着使用时间的推移，使用经验的提升，预防的能力越来越强，可还是不能保证下次不再遇到；而在 Linux 下，很多操作我们都用 CLI，运行什么完全由自己掌握。其实我不是想说 Linux 比 Windows 好，在娱乐上，易用程度上，Linux 还是比 Windows 差，所以现在的家用 PC 机还是 Windows 比较适合，如果用电脑只是娱乐办公，Windows 是最合适不过了，只不过它需要费用。

记得自己第一次使用 Linux 的时候是 08 年，那个时候使用的不是 Ubuntu，而是国产红旗 Linux，现在已经没什么印象了，第一次使用 Ubuntu 是 8.04，不过那时候没时间慢慢体验，也因为是家用机，所以不能整天折腾，当然 Ubuntu 更新的时候会凑凑热闹，真正的进入 Linux 的学习是从这一学期开始的。

记得 Ubuntu 或基于 Ubuntu 的发行版的 Live CD，用来硬盘安装是最简单的，基本上是这样的：准备好自由空间，然后在 Windows 下提取 iso 文件里的 initrd.lz 及 vmlinuz 文件，然后配置好 Grub for DOS 及 menu.lst 文件，然后进入 Live CD 环境，打开终端输入"sudo umount -l /isodevice"，回车，然后双击桌面上的“安装到硬盘”的图标，分区设置安装自动化，进入系统后再"sudo update-grub"，Windows 和 Linux 的双系统就这样诞生了，这是第一步。当然对于其他的发行版来说，硬盘安装稍微比 Ubuntu 的 Live CD 复杂点，比如说 Debian，initrd 和 vmlinuz 不能直接使用其 iso 里的。不过都是大同小异，必须先引导，然后挂载 iso，再进行安装。各发行版 Wiki 一般都会都有详细的安装说明。

因为电脑配置低，所以在 Linux 下我会尝试各种占用内存低的软件，比如说听歌，看电影，直接使用 Mplayer，用惯了感觉很舒服，想实现什么就一条命令，简单清晰，听歌我一般是"mplayer -shuffle ~/Music/*/* "，看电影有时候会"mplayer -zoom -ontop -fs * "。我认为一款软件，如果要使用它，还要经过学习，那它一定是一款好软件，需要学习的时间越多，软件越好；比如说 Vim，Emacs，已经是神器了！命令行下的软件，如果你不会用它，你会觉得很烦，当你学会用一款 CLI 软件的时候，知道它是多么好用多么强大，可能你就会拼命寻找其他类型软件的命令行替代品。这是我的亲身经历，我相信会有很多 Linux 初学者和我一样的，学了命令行处理日常，才知道什么叫做高效。

目前我所知道的，最好的入门教程还是 [《鳥哥的 Linux 私房菜》](http://linux.vbird.org/)，注意原版和大陆改编版有区别，原版语言活泼生趣；论坛首推 [Ubuntu 中文论坛](http://forum.ubuntu.org.cn/)；桌面发行版推荐 [Ubuntu Linux](http://www.ubuntu.com/) 和 [Linux Deepin](http://linux.deepin.org/)。

![Ubuntu_Linux]({{site.IMG_PATH}}/linux-study-1.jpg?imageView2/2/w/640/q/90)
Ubuntu

**本文历史**

* 2011 年 04 月 09 日 创建文章
* 2015 年 05 月 10 日 换图床
