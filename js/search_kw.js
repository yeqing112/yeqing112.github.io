var iDisqus = require('disqus-php-api');

window.addEventListener('beforeunload', function (event) {
  document.getElementById('menu').checked = false;
});

document.addEventListener('DOMContentLoaded', function (event) {
	
  var disq = new iDisqus('comment', {
    forum: site.forum,
    site: site.home,
    api: site.api + '/disqus',
    title: page.title,
    url: page.url,
    mode: 2,
    timeout: 3000,
    slug: page.url.slice(1).split('.')[0],
    init: true,
    toggle: 'comment-toggle',
    sort: 'newest',
    emoji_path: site.api + '/emoji/unicode/',
  });

  disq.count();

  var curYear = new Date().getFullYear();
  var startYear = Date.parse('01 Jan '+curYear+' 00:00:00');
  var endYear = Date.parse('31 Dec '+curYear+' 23:59:59');
  var yearProgress = (Date.now() - startYear) / (endYear - startYear) * 100;
  var widthProgress = yearProgress.toFixed(2) + '%'
  var styles = document.styleSheets;
  styles[styles.length-1].insertRule('.page-header .page-title:before{width:'+widthProgress+'}',0);
  styles[styles.length-1].insertRule('.page-header .page-title:after{left:'+widthProgress+'}',0);
  styles[styles.length-1].insertRule('.page-header .page-title:after{content:"' + parseInt(yearProgress) + '%"}',0);

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
        location.href = '/search/?keyword=' + this.value;
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
      var url = '/search.html?keyword=' + keyword;
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
      var url = '/tags.html?keyword=' + keyword;
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