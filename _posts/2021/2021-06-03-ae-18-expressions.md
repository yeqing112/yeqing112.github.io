---
layout: post
title: AE的18种新手进阶必备表达式（转载）
date: 2021-06-03 10:01
author: yeqing
comments: true
category:
- 动效设计
tags:
- AE
- 表达式
---

很多朋友面对AE表达式望而生畏，不过再难的东西都会有它最本质的规则，如果你理解了基本的原理和常用的表达式命令，这也许会提高你的工作效率。我通过自己对AE的理解，尝试用最简单的语言解释一些看似复杂的操作，如果此篇文章能给你带来一些启发，不胜荣幸~

![AE教程！18种新手进阶必备表达式！](../assets/images/rr-210317-aebds-1.jpg)

**首先什么是表达式呢？**

表达式就是AE内部基于JS编程语言开发的编辑工具，可以理解为简单的编程，不过没有编程那么复杂。其次表达式只能添加在可以编辑的关建帧的属性上，不可以添加在其他地方；表达式的使用根据实际情况来决定，如果关键帧可以更好的实现你想要的效果，使用关键帧就可以啦，表达式大部分情况下是可以更节约时间，提高工作效率的。

**接下来看一下如何添加表达式**

![AE教程！18种新手进阶必备表达式！](../assets/images/rr-210317-aebds-2.gif)

**表达式工具**

A.表达式开关 B.表达式图表 C.表达式关联器 D.表达式语言菜单

![AE教程！18种新手进阶必备表达式！](../assets/images/rr-210317-aebds-3.jpg)

由于AE里不同的属性的参数不同，常用的我们可以分为：数值（旋转/不透明度）、数组（位置/缩放）、布尔值（true代表「真」、false代表「假」/0代表「假」、1代表「真」）这三种形式来进行书写表达式。对于表达式AE也有很多内置的函数命令，直接可以在表达式语言菜单里面进行调用。

**接下来一起看看常用的表达式有哪些吧！**

### 1. time表达式

**原理：**time表示时间，以秒为单位，time*n =时间（秒数）*n （若应用于旋转属性，则n表示角度）

**举例：**若在旋转属性上设置time表达式为time*60，则图层将通过1秒的时间旋转60度，2秒时旋转到120度以此类推（数值为正数时顺时针旋转，为负数时逆时针旋转）

**注意事项：**time只能赋予一维属性的数据。(位置属性可进行单独尺寸的分离，从而可单独设置X或Y上的time）

![AE教程！18种新手进阶必备表达式！](../assets/images/rr-210317-aebds-4.jpg)

### 2. 抖动/摆动表达式

> wiggle(freq, amp, octaves = 1, amp_mult = 0.5, t = time)

**原理：**freq=频率（设置每秒抖动的频率）；amp=振幅（每次抖动的幅度）；octaves=振幅幅度（在每次振幅的基础上还会进行一定的震幅幅度，很少用）；amp_mult=频率倍频（默认数值即可，数值越接近0，细节越少；越接近1，细节越多）；t=持续时间（抖动时间为[合成](https://uiiiuiii.com/itag/合成)时间，一般无需修改）；一般只写前两个数值即可

**举例：**若在一维属性中，为位置属性添加wiggle(10,20)，则表示图层每秒抖动10次，每次随机波动的幅度为20；若在二维属性中，为缩放添加n=wiggle(1,10);[n[0],n[0]]，则表示图层的缩放XY在每秒抖动10次，每次随机波动的幅度为20；若在二维属性中，想单独在单维度进行抖动，需要将属性设置为单独尺寸后添加wiggle(10,20)，表示图层的缩放X轴在每秒抖动10次，每次随机波动的幅度为20。

**注意事项：**可直接在现有属性上运行，包括任何关键帧

![AE教程！18种新手进阶必备表达式！](../assets/images/rr-210317-aebds-5.jpg)

![AE教程！18种新手进阶必备表达式！](../assets/images/rr-210317-aebds-6.gif)

### 3. index表达式（索引表达式）

**原理：**为每间隔多少数值来产生多少变化

**举例：**若为图层1的旋转属性添加表达式index*5 ，则第一个图层会旋转5度，之后按Ctrl+D去复制多个图层时，第2个图层将旋转10度，以此类推；若想第一层图形不产生旋转保持正常形态，复制后的图形以5度递增，表达式可写为(index-1)*5

![AE教程！18种新手进阶必备表达式！](../assets/images/rr-210317-aebds-7.jpg)

### 4. value表达式

**原理：**在当前时间输出当前属性值

**举例：**若对位置属性添加表达式为value+100，则位置会在关键帧数值的基础上对X轴向右偏移100（正数向右侧，负数像左侧）；若想控制Y轴的位置属性，则可对位置属性进行单独尺寸的分割，从而可单独控制Y轴（正数向下，负数向上）

**注意事项：**更多的使用场景是结合其他表达式一起应用

![AE教程！18种新手进阶必备表达式！](../assets/images/rr-210317-aebds-8.jpg)

### 5. random表达式（随机表达式）

**原理：**random(x,y)在数值x到y之间随机进行抽取，最小值为x，最大值为y

**举例：**

❶ 若为数字源文本添加表达式random(20)，则数据会随机改变，最大值不会超过20；

❷ 若为数字源文本添加表达式random(10,100)，则数据会在10<数值<100之间随机改变；

❸ 若为数字源文本添加表达式seedRandom(5, timeless = false)，random(50)，则数据会在50以内随机改变（前面的5是种子数，如一张画面中需要多个相同区间的数值做随机变化，就要为他们添加不同的种子数，防止两者随机变化雷同）,若希望数字随机变化为整数则应添加表达式为Math.round(random(2,50))，表示在2和50之间随机改变无小数

**注意事项：**随机表达式不仅局限于数据上的使用，其他属性也可以应用，若数值为整数Math的M要大写

![AE教程！18种新手进阶必备表达式！](../assets/images/rr-210317-aebds-9.jpg)

### 6. loopOut表达式（循环表达式）

**原理：**

loopOut(type=”类型”,numkeyframes=0)对一组动作进行循环

loopOut(type=”pingpong”,numkeyframes=0)是类似像乒乓球一样的来回循环；

loopOut(type=”cycle”,numkeyframes=0)是周而复始的循环；

loopOut(type=”continue”)延续属性变化的最后速度，

loopOut(type=”offset”,numkeyframes=0)是重复指定的时间段进行循环；

numkeyframes=0是循环的次数，0为无限循环，1是最后两个关键帧无限循环，2是最后三个关键帧无限循环，以此类推

**举例：**如下图gif

![AE教程！18种新手进阶必备表达式！](../assets/images/rr-210317-aebds-10.jpg)

![AE教程！18种新手进阶必备表达式！](../assets/images/rr-210317-aebds-11.gif)

### 7. timeRemap表达式（抽帧）

**原理：**timeRemap*n，n以帧为单位

**举例：**将图层设置为timeRemap*10，代表每隔10帧就抽掉1帧画面，(根据要抽取的速率决定)

**注意事项：**使用timeRemap表达式之前要启用时间重映射，否则无法使用此表达式

![AE教程！18种新手进阶必备表达式！](../assets/images/rr-210317-aebds-12.jpg)

### 8. linear表达式（线性表达式）

**原理：**linear(t, tMin, tMax, value1, value2)表示linear(time, 开始变化的时间, 结束变化的时间, 开始变化时的数值, 结束变化的数值);

linear(t, value1, value2)表示当time在0到1之间时，从value1变化到value2；

ease(t, tMin, tMax, value1, value2)的含义与linear一样，
区别是在tMin和tMax点处，进行缓入缓出，使数据更加平滑；

easeIn(t, tMin, tMax, value1, value2)与linear的含义一样，
区别是在tMin处，进行缓入，使数据更加平滑；

easeOut(t, tMin, tMax, value1, value2)与linear的含义一样，
区别是在tMax点处，进行缓出，使数据更加平滑

**举例：**见下图均以(time,0,3,131,1000)为例，若为数字的源文本属性添加此表达式可以制作出倒计时的效果n=linear(time, 0, 3, 3, 0)表示从0-3秒数字从3到0，希望数字为整体需添加Math.floor(）

**注意事项：**倒计时的用法比较常用，整数M要大写

![AE教程！18种新手进阶必备表达式！](../assets/images/rr-210317-aebds-13.jpg)

![AE教程！18种新手进阶必备表达式！](../assets/images/rr-210317-aebds-14.gif)

### 9. Other Math（角度弧度）

**原理：**degreesToRadians(degrees) 角度转为弧度（degrees度的变量或表达式）radiansToDegrees(radians)弧度转为角度（radians弧度的变量或表达式）

**举例：**常用语数学中的一些计算sin，cos，tan，sec，csc，cot等

![AE教程！18种新手进阶必备表达式！](../assets/images/rr-210317-aebds-15.jpg)

### 10. layer表达式

**原理：**layer(index)中index 是数值，按照编号检索图层；layer(name)中name 是一个字符串，按照名称检索图层（若没有图层名称，则根据源名称）；layer(otherLayer, relIndex)中otherLayer 表示图层对象，relIndex 表示数值，检索属于图层对象的数值图层

**举例：**

layer(index)—thisComp.layer(1).position；

layer(name)—thisComp.layer(“形状图层1”)；

layer(otherLayer, relIndex)—thisComp.layer(thisLayer, 1).active 将返回 true

![AE教程！18种新手进阶必备表达式！](../assets/images/rr-210317-aebds-16.jpg)

### 11. marker表达式

**原理：**marker.key(index)中index 是数值；marker.key(name)中name 是一个字符串

**举例：**

thisComp.marker.key(1).time表示返回第一个合成标记的间;thisComp.marker.key(“我叫注释名称”).time表示返回具有名称”我叫注释名称”的合成标记的时间

![AE教程！18种新手进阶必备表达式！](../assets/images/rr-210317-aebds-17.jpg)

### 12. comp(合成属性和方法)width与height表达式

**原理：**width表示返回合成宽度；height表示返回合成高度

**举例：**[thisComp.width/2, thisComp.height/2]表示宽度和高度为合成的一半也就是居中的位置

![AE教程！18种新手进阶必备表达式！](../assets/images/rr-210317-aebds-18.jpg)

### 13. param表达式

**原理：**param(name)中name表示字符串；param(index)表示数值

**举例：**effect(“高斯模糊”).param(“模糊度”)效果控制点始终位于图层空间中

![AE教程！18种新手进阶必备表达式！](../assets/images/rr-210317-aebds-19.jpg)

### 14. 弹性表达式

**原理：**复制粘贴表达式使用就可以，amp表示振幅,freq表示频率,decay表示衰减（根据不同需求做不同的调整）

**举例：**

> n = 0;
>
> if (numKeys > 0){
>
> n = nearestKey(time).index;
>
> if (key(n).time > time){n–;}}
>
> if (n == 0){t = 0;}else{
>
> t = time – key(n).time;}
>
> if (n > 0){
>
> v = velocityAtTime(key(n).time – thisComp.frameDuration/10);
>
> amp = .03;
>
> freq = 2.5;
>
> decay = 4.0;
>
> value + v*amp*Math.sin(freq*t*2*Math.PI)/Math.exp(decay*t);
>
> }else{value;}

上述内容复制粘贴使用即可

![AE教程！18种新手进阶必备表达式！](../assets/images/rr-210317-aebds-20.jpg)

![AE教程！18种新手进阶必备表达式！](../assets/images/rr-210317-aebds-21.gif)

**注意：**motion2脚本也带此功能，方法不唯一



[MG神器！AE插件Motion2的超全面使用方法Motion2可自定义表达式添加到您的项目，自由控制图形编辑器,让你快速制作渴望运动图形MG效果！  一.动画曲线／锚点设置区域 点击火箭or船锚切换  1.动画曲线 选取头尾帧，滑动滑块选择参数，数值越大效果越强～ 匀速运动 缓入 缓入+缓出 缓出  2.锚点设置 一键设置锚点位置  二.功能区 功能区有12个超酷功能  1.EXCITE 选取头尾帧，点击EXCITE，可以做出惯性...阅读文章 *>>*](https://uiiiuiii.com/aftereffects/1212158980.html)



### 15. 反弹表达式

**原理：**k表示反弹最终结果，a表示反弹阻力，b表示反弹变化时间

**举例：**k=500; a=8; b=30; x=k*(1-Math.exp(-a*time)*Math.cos(b*time));[x,x]（根据不同情况调节kab的数值即可）

![AE教程！18种新手进阶必备表达式！](../assets/images/rr-210317-aebds-22.jpg)

### 16. 数字递增表达式

**原理：**StartNumber表示开始时的数值，EndNumber表示结束时的数值，StartTime表示开始的时间，EndTime表示结束的时间，和前面的linear表达式相对应

**举例：**

> StartNumber=1;
>
> EndNumber=20;
>
> StartTime=0;
>
> EndTime=3;
>
> t=linear(time,StartTime,EndTime,StartNumber,EndNumber);Math.floor(t)

![AE教程！18种新手进阶必备表达式！](../assets/images/rr-210317-aebds-23.jpg)

### 17. 挤压与伸展

**原理：**spd表示挤压拉伸的速度，maxDev表示挤压拉伸的大小，decay表示衰减

**举例：**

> spd =20;maxDev =10;
>
> decay = 1;
>
> t = time – inPoint;
>
> offset = maxDev*Math.sin(t*spd)/Math.exp(t*decay);
>
> scaleX = scale[0] + offset;scaleY = scale[1] – offset;
>
> [scaleX,scaleY]

![AE教程！18种新手进阶必备表达式！](../assets/images/rr-210317-aebds-24.jpg)

![AE教程！18种新手进阶必备表达式！](../assets/images/rr-210317-aebds-25.gif)

### 18. 运动拖尾

**原理：**delay表示要延迟的帧数

**举例：**为位置属性添加表达式delay = 0.5;

d = delay*thisComp.frameDuration*(index – 1);

thisComp.layer(1).position.valueAtTime(time – d)；

如想要实现不透明度拖尾需为不透明度属性添加表达式opacityFactor =.80;

Math.pow(opacityFactor,index – 1)*100(调整好一个图层后复制多个)

![AE教程！18种新手进阶必备表达式！](../assets/images/rr-210317-aebds-26.jpg)

![AE教程！18种新手进阶必备表达式！](../assets/images/rr-210317-aebds-27.gif)

![AE教程！18种新手进阶必备表达式！](../assets/images/rr-210317-aebds-28.jpg)





