---
layout: default
title: 现在时刻
permalink: /time/
---
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>现在时刻</title>
</head>
<body>
<p id="time"></p>

<script>
var weekday=new Array(7)
weekday[0]="星期日 "
weekday[1]="星期一 "
weekday[2]="星期二 "
weekday[3]="星期三 "
weekday[4]="星期四 "
weekday[5]="星期五 "
weekday[6]="星期六 "
/*document.write("今天是" + weekday[d.getDay()])*/

function addZero(i){
    if (i<10) {
        i="0" + i;
    }
    return i;
}

    setInterval(function() {
        ajax()
        function ajax(option) {
            var xhr = null;
            if (window.XMLHttpRequest) {
                xhr = new window.XMLHttpRequest();
            } else { // ie
                xhr = new ActiveObject("Microsoft")
            }
            // 通过get的方式请求当前文件
            xhr.open("get", "/");
            xhr.send(null);
            // 监听请求状态变化
            xhr.onreadystatechange = function() {
                var time = null, curDate = null;
                if (xhr.readyState === 2) {
                    // 获取响应头里的时间戳
                    time = xhr.getResponseHeader("Date");
                    console.log(xhr.getAllResponseHeaders())
                    curDate = new Date(time);
                    document.getElementById("time").innerHTML = curDate.getFullYear() + "年"
                            + (curDate.getMonth() + 1) + "月"
                            + curDate.getDate() + "日 " 
                            + weekday[curDate.getDay()]
                            + addZero(curDate.getHours()) + ":"
                            + addZero(curDate.getMinutes()) + ":"
                            + addZero(curDate.getSeconds());
                }
            }
        }
    }, 1000);
</script>

</body>
</html>