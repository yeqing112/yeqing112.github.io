---
layout: page
title: 文章归档
permalink: /archive/
---
<input class="page-search-input" type="text" placeholder="搜索" />
{% for post in site.posts %}
{% unless post %}
{% else %}
{% capture year %}{{ post.date | date: '%Y' }}{% endcapture %}
{% capture nyear %}{{ post.next.date | date: '%Y' }}{% endcapture %}
{% if year != nyear %}
## {{ post.date | date: '%Y' }}
{:class="archive-title"}
{% endif %}
{% endunless %}
* {{ post.date | date: "%m-%d" }} &raquo; [{{ post.title }}]({{ post.url }} "{{ post.title }}"){:.archive-item-link}
{% endfor %}
<script type="text/javascript" src="/js/search.js"></script>