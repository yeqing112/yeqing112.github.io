---
layout: post
title: 解决wordpress插件Crayon Syntax Highlighter语法高亮插件多余空行的问题
date: 2020-05-03 10:50
author: yeqing
comments: true
category: 
- 野生技术
tags: 
- wordpress
---
以前使用WordPress做博客，安装了 Crayon Syntax Highlighter 语法高亮插件，但是发现每一个代码块最后一行都有一个空行，看起来很不协调，看着心里难受，于是去百度了解决方案，发现一哥们的方法可行。
这个方法是在主题文件中插入一段js，利用js去除多余的空行。我把js写在了文章页面single.php中，解决了多余空行的问题。

### 分享这段代码：
```javascript
<script>
 /*
  * 由于Crayon Syntax Highlighter组件会在展示代码时在末尾多出一个空行,
  * 因此增加一个脚本，用来去掉这个多余的空行
  */
//遍历每个crayon的代码表格dom元素
var codes = document.querySelectorAll('.crayon-main');
for (var i = codes.length - 1; i >= 0; i--) {
      //刪除最后的行号（左侧）
      var nums_content = codes[i].querySelectorAll('.crayon-num')
      var num_node_count = nums_content.length;
      if(num_node_count>1){
        var last_num_node = nums_content[num_node_count-1]; 
        last_num_node.parentNode.removeChild(last_num_node); 
      }
      //删除最后的代码行（右侧）
      var codes_content = codes[i].querySelectorAll('.crayon-line')
      var code_node_count = codes_content.length;
      if(code_node_count>1){
        var last_code_node = codes_content[code_node_count-1]; 
        last_code_node.parentNode.removeChild(last_code_node); 
      }
};
</script>
```
参考文档：[GoldSudo](http://goldsudo.com/develop/website/%E8%A7%A3%E5%86%B3crayon-syntax-highlighter%E4%BB%A3%E7%A0%81%E9%AB%98%E4%BA%AE%E6%8F%92%E4%BB%B6%E5%A4%9A%E4%BD%99%E7%A9%BA%E4%BB%A3%E7%A0%81%E8%A1%8C%E7%9A%84%E9%97%AE%E9%A2%98)