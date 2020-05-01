$(document).ready(function() {

  $('a.blog-button').click(function() {
    // If already in blog, return early without animate overlay panel again.
    if (location.hash && location.hash == "#blog") return;
    if ($('.panel-cover').hasClass('panel-cover--collapsed')) return;
    $('.main-post-list').removeClass('hidden');
    currentWidth = $('.panel-cover').width();
    if (currentWidth < 960) {
      $('.panel-cover').addClass('panel-cover--collapsed');
    } else {
      $('.panel-cover').css('max-width',currentWidth);
      $('.panel-cover').animate({'max-width': '700px', 'width': '30%'}, 400, swing = 'swing', function() {} );
    }
  });

  if (window.location.hash && window.location.hash == "#blog") {
    $('.panel-cover').addClass('panel-cover--collapsed');
    $('.main-post-list').removeClass('hidden');
  }

  if (window.location.pathname.substring(0, 5) == "/tags/") {
    $('.panel-cover').addClass('panel-cover--collapsed');
  }

  $('.btn-mobile-menu__icon').click(function() {
    if ($('.navigation-wrapper').css('display') == "block") {
      $('.navigation-wrapper').on('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
        $('.navigation-wrapper').toggleClass('visible animated bounceOutUp');
        $('.navigation-wrapper').off('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend');
      });
      $('.navigation-wrapper').toggleClass('animated bounceInDown animated bounceOutUp');

    } else {
      $('.navigation-wrapper').toggleClass('visible animated bounceInDown');
    }
    $('.btn-mobile-menu__icon').toggleClass('fa fa-list fa fa-angle-up animated fadeIn');
  });

  $('.navigation-wrapper .blog-button').click(function() {
    if ($('.navigation-wrapper').css('display') == "block") {
      $('.navigation-wrapper').on('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
        $('.navigation-wrapper').toggleClass('visible animated bounceOutUp');
        $('.navigation-wrapper').off('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend');
      });

      $('.navigation-wrapper').toggleClass('animated bounceInDown animated bounceOutUp');
    }
    
    $('.btn-mobile-menu__icon').toggleClass('fa fa-list fa fa-angle-up animated fadeIn');
  });
});

//搜索功能与文章分类功能

function getQuery(variable) {
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    if (pair[0] == variable) { return pair[1]; }
  }
  return (false);
}

function timeAgo(selector) {

  var templates = {
    prefix: "",
    suffix: "前",
    seconds: "几秒",
    minute: "1分钟",
    minutes: "%d分钟",
    hour: "1小时",
    hours: "%d小时",
    day: "1天",
    days: "%d天",
    month: "1个月",
    months: "%d个月",
    year: "1年",
    years: "%d年"
  };

  var template = function (t, n) {
    return templates[t] && templates[t].replace(/%d/i, Math.abs(Math.round(n)));
  };

  var timer = function (time) {
    if (!time) return;
    time = time.replace(/\.\d+/, ""); // remove milliseconds
    time = time.replace(/-/, "/").replace(/-/, "/");
    time = time.replace(/T/, " ").replace(/Z/, " UTC");
    time = time.replace(/([\+\-]\d\d)\:?(\d\d)/, " $1$2"); // -04:00 -> -0400
    time = new Date(time * 1000 || time);

    var now = new Date();
    var seconds = ((now.getTime() - time) * .001) >> 0;
    var minutes = seconds / 60;
    var hours = minutes / 60;
    var days = hours / 24;
    var years = days / 365;

    return templates.prefix + (
      seconds < 45 && template('seconds', seconds) || seconds < 90 && template('minute', 1) || minutes < 45 && template('minutes', minutes) || minutes < 90 && template('hour', 1) || hours < 24 && template('hours', hours) || hours < 42 && template('day', 1) || days < 30 && template('days', days) || days < 45 && template('month', 1) || days < 365 && template('months', days / 30) || years < 1.5 && template('year', 1) || template('years', years)) + templates.suffix;
  };

  var elements = document.getElementsByClassName('timeago');
  for (var i in elements) {
    var $this = elements[i];
    if (typeof $this === 'object') {
      $this.innerHTML = timer($this.getAttribute('datetime'));
    }
  }
  // update time every minute
  setTimeout(timeAgo, 60000);
}

document.addEventListener('DOMContentLoaded', function (event) {

  var curYear = new Date().getFullYear();
  var startYear = Date.parse('01 Jan '+curYear+' 00:00:00');
  var endYear = Date.parse('31 Dec '+curYear+' 23:59:59');
  var yearProgress = (Date.now() - startYear) / (endYear - startYear) * 100;
  var widthProgress = yearProgress.toFixed(2) + '%'

  function wxchoose() {
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        var localIds = res.localIds;
      }
    });
  }

  // 目录
  var toc = document.querySelector('.post-toc');
  var subTitles = document.querySelectorAll('.page-content h2,.page-content h3');
  var clientHeight = document.documentElement.clientHeight;
  function tocShow() {
    var clientWidth = document.documentElement.clientWidth;
    var tocFixed = clientWidth / 2 - 410 - toc.offsetWidth;
    if (tocFixed < 15) {
      toc.style.visibility = 'hidden';
    } else {
      toc.style.visibility = 'visible';
      toc.style.left = tocFixed + 'px';
    }
  }
  function tocScroll() {
    var sectionIds = [];
    var sections = [];
    for (var i = 0; i < subTitles.length; i++) {
      sectionIds.push(subTitles[i].id);
      sections.push(subTitles[i].offsetTop);
    }
    var pos = document.documentElement.scrollTop || document.body.scrollTop;
    var lob = document.body.offsetHeight - subTitles[subTitles.length - 1].offsetTop;
    for (var i = 0; i < sections.length; i++) {
      if (i === subTitles.length - 1 && clientHeight > lob) {
        pos = pos + (clientHeight - lob);
      }
      if (sections[i] <= pos && sections[i] < pos + clientHeight) {
        if (document.querySelector('.active')) {
          document.querySelector('.active').classList.remove('active');
        }
        document.querySelector('[href="#' + sectionIds[i] + '"]').classList.add('active');
      }
    }
  }
  if (!!toc) {
    document.addEventListener('scroll', tocScroll, false);
    window.addEventListener('resize', tocShow, false);
    tocShow();
  }


  var links = document.getElementsByTagName('a');
  var noteArr = [];
  for (var i = 0; i < links.length; i++) {
    if (links[i].hostname != location.hostname && /^javascript/.test(links[i].href) === false) {
      var numText = links[i].innerHTML;
      if (/\[[0-9]*\]/.test(numText)) {
        var num = parseInt(numText.slice(1, -1));
        noteArr.push({
          num: num,
          title: links[i].title,
          href: links[i].href
        });
        links[i].classList.add('ref');
        links[i].href = '#note-' + num;
        links[i].id = 'ref-' + num;
      } else {
        links[i].target = '_blank';
      }
    }
  }
  noteArr = noteArr.sort(function (a, b) {
    return +(a.num > b.num) || +(a.num === b.num) - 1;
  })
  for (var i = 0; i < noteArr.length; i++) {
    document.getElementById('refs').insertAdjacentHTML('beforeend', '<li id="note-' + noteArr[i].num + '" class="note"><a href="#ref-' + noteArr[i].num + '">^</a> <a href="' + noteArr[i].href + '" title="' + noteArr[i].title + '" class="exf-text" target="_blank">' + noteArr[i].title + '</a></li>');
  }


  if (page.url == '/archive/') {
    document.querySelector('.page-search-input').addEventListener('keyup', function (e) {
      var archive = document.getElementsByClassName('archive-item-link');
      for (var i = 0; i < archive.length; i++) {
        if (archive[i].title.toLowerCase().indexOf(this.value.toLowerCase()) > -1) {
          archive[i].closest('li').style.display = 'block';
        } else {
          archive[i].closest('li').style.display = 'none';
        }
      }
      if (e.keyCode == 13) {
        location.href = '/search?keyword=' + this.value;
      }
    })
  }

  if (page.url == '/search/') {
    var keyword = getQuery('keyword');
    var searchData;
    var input = document.querySelector('.search-input');
    var result = document.querySelector('.search-result');
    var xhrSearch = new XMLHttpRequest();
    xhrSearch.open('GET', '/search.json', true);
    xhrSearch.onreadystatechange = function () {
      if (xhrSearch.readyState == 4 && xhrSearch.status == 200) {
        searchData = JSON.parse(xhrSearch.responseText);
        if (keyword) {
          input.value = decodeURI(keyword);
          search(decodeURI(keyword));
        }
        input.placeholder = "请输入关键词，回车搜索";
      }
    }
    xhrSearch.send(null);

    document.querySelector('.search-input').addEventListener('keyup', function (e) {
      if (e.keyCode == 13) {
        search(decodeURI(this.value));
      }
    })

    function search(keyword) {
      result.innerHTML = '';
      var title = '搜索：' + keyword + ' | ' + site.title;
      var url = '/search?keyword=' + keyword;
      var total = result.length;
      var html = '';
      searchData.forEach(function (item) {
        var postContent = item.title + item.tags.join('') + item.content;
        if (postContent.toLowerCase().indexOf(keyword.toLowerCase()) > -1) {
          var index = item.content.toLowerCase().indexOf(keyword.toLowerCase());
          var realKeyword = item.content.substr(index, keyword.length);
          var first = index > 75 ? index - 75 : 0;
          var last = first + 150;
          html += '<div class="search-result-item">' +
            '      <i class="search-result-thumb" data-src="' + item.thumb + '" style="background-image:url(' + item.thumb + ')"></i>' +
            '      <div class="search-result-content">' +
            '        <div class="search-result-header">' +
            '           <div class="search-result-title"><a class="search-result-link" target="_blank" href="' + item.url + '">' + item.title + '</a></div>' +
            '           <div class="search-result-comment"></div>' +
            '        </div>' +
            '        <div class="search-result-desc">' + item.content.slice(first, last).replace(new RegExp(realKeyword, 'g'), '<span class="search-result-highlight">' + realKeyword + '</span>') + '</div>' +
            '      </div>' +
            '    </div>';
        }
      })
      result.innerHTML = html;
      document.title = title;
      history.replaceState({
        "title": title,
        "url": url
      }, title, url);
      if (site.home === location.origin && window.parent == window) {
        _hmt.push(['_trackPageview', url]);
      }
    }

  }


  if (page.url == '/tags/') {
    var keyword = getQuery('keyword');
    var tagsData;
    var xhrPosts = new XMLHttpRequest();
    xhrPosts.open('GET', '/posts.json', true);
    xhrPosts.onreadystatechange = function () {
      if (xhrPosts.readyState == 4 && xhrPosts.status == 200) {
        tagsData = JSON.parse(xhrPosts.responseText);
        if (keyword) {
          tags(decodeURI(keyword));
        }
      }
    }
    xhrPosts.send(null);
    function tags(keyword) {
      var title = '标签：' + keyword + ' | ' + site.title;
      var url = '/tags/?keyword=' + keyword;
      var tagsTable = document.getElementById('tags-table');
      tagsTable.style.display = 'table';
      tagsTable.querySelector('thead tr').innerHTML = '<th colspan=2>以下是标签含有“' + keyword + '”的所有文章</th>';
      var html = '';
      tagsData.forEach(function (item) {
        if (item.tags.indexOf(keyword) > -1) {
          var date = item.date.slice(0, 10).split('-');
          date = date[0] + ' 年 ' + date[1] + ' 月 ' + date[2] + ' 日';
          html += '<tr><td><time>' + date + '</time></td><td><a href="' + item.url + '" title="' + item.title + '">' + item.title + '</a></td></tr>';
        }
      })
      tagsTable.getElementsByTagName('tbody')[0].innerHTML = html;
      document.title = title;
      history.replaceState({
        "title": title,
        "url": url
      }, title, url);
      if (site.home === location.origin && window.parent == window) {
        _hmt.push(['_trackPageview', url]);
      }
    }
    var tagLinks = document.getElementsByClassName('post-tags-item');
    var tagCount = tagLinks.length;
    for (var i = 0; i < tagCount; i++) {
      tagLinks[i].addEventListener('click', function (e) {
        tags(e.currentTarget.title);
        e.preventDefault();
      }, false);
    }
  }
  
  if (page.url == '/ui/' || page.url == '/ae/' || page.url == '/3d/' || page.url == '/pm/' || page.url == '/it/' || page.url == '/rs/') {
    var pageNum = !!getQuery('page') ? parseInt(getQuery('page')) : 1;
    var postData, posts = [];
    var xhrPosts = new XMLHttpRequest();
    var category = page.title;
    xhrPosts.open('GET', '/posts.json', true);
    xhrPosts.onreadystatechange = function () {
      if (xhrPosts.readyState == 4 && xhrPosts.status == 200) {
        postData = JSON.parse(xhrPosts.responseText);
        postData.forEach(function (item) {
          if (item.category == category) {
            posts.push(item);
          }
        })
        turn(pageNum);
      }
    }
    xhrPosts.send(null);

    function turn(pageNum) {
      var cat = '';
      var postClass = '';
      var pageSize = 10;
      switch (page.url) {
        case '/ui/':
          cat = '界面设计';
          postClass = 'post-ui';
          break;
        case '/ae/':
          cat = '动效设计';
          postClass = 'post-ae';
          break;
        case '/3d/':
          cat = '三维设计';
          postClass = 'post-3d';
          break;
		case '/pm/':
          cat = '产品设计';
          postClass = 'post-pm';
          break;
		case '/it/':
          cat = '野生技术';
          postClass = 'post-it';
          break;
		case '/rs/':
          cat = '资源分享';
          postClass = 'post-rs';
          break;
      }
      var title = pageNum == 1 ? cat + ' | ' + site.title : cat + '：第' + pageNum + '页 | ' + site.title;
      var url = pageNum == 1 ? page.url : page.url + '?page=' + pageNum;
      var html = '';
      var total = posts.length;
      var first = (pageNum - 1) * pageSize;
      var last = total > pageNum * pageSize ? pageNum * pageSize : total;

        for (var i = first; i < last; i++) {
          var item = posts[i];
          html += '<div class="main-post-list">' +
            '    <ol class="post-list">' +
            '    <li>' +
            '    <h2 class="post-list__post-title post-title"><a href="' + item.url + '" title="' + item.title + '">' + item.title + '</a></h3>' +
			'    <p class="excerpt">' + item.content.slice(0, 200) + '</p>' +
            '    <div class="post-list__meta"><time datetime="' + item.date + '"></time>' +
            ' • <span  class="post-list__meta--tags tags">' + item.tags + '<a class="btn-border-small" href="' + item.url + '">继续阅读</a></div>' +
            '<hr class="post-list__divider">' +
            '    </li>';
        }

      var totalPage = Math.ceil(total / pageSize);
      var prev = pageNum > 1 ? pageNum - 1 : 0;
      var next = pageNum < totalPage ? pageNum + 1 : 0;
      var prevLink = !!prev ? '<a class="pagination-item-link" href="' + page.url + '?page=' + prev + '" data-page="' + prev + '">较新文章 &raquo;</a>' : '';
      var nextLink = !!next ? '<a class="pagination-item-link" href="' + page.url + '?page=' + next + '" data-page="' + next + '">&laquo; 较旧文章</a>' : '';
      var pagination = '<ul class="pagination-list">' +
        '<li class="pagination-item">' + nextLink + '</li>' +
        '<li class="pagination-item">' + pageNum + ' / ' + totalPage + '</li>' +
        '<li class="pagination-item">' + prevLink + '</li>' +
        '</ul>';

      document.querySelector('.post-list').classList.add(postClass);
      document.querySelector('.post-list').innerHTML = html;
      document.querySelector('.pagination').innerHTML = pagination;
      timeAgo();
      var link = document.getElementsByClassName('pagination-item-link');
      for (var i = 0; i < link.length; i++) {
        link[i].addEventListener('click', function (e) {
          var pageNum = parseInt(e.currentTarget.dataset.page);
          turn(pageNum);
          e.preventDefault();
        })
      }
      document.title = title;
      history.replaceState({
        "title": title,
        "url": url
      }, title, url);
      if (site.home === location.origin && window.parent == window) {
        _hmt.push(['_trackPageview', url]);
      }
    }
  }

  var appendZero = function (num) {
    if (!num) {
      return '00'
    }

    if (num < 10) {
      return '0' + num
    }

    return num
  }

})