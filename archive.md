---
layout: page
title: 文章归档
---
<input class="page-search-input" type="text" placeholder="搜索" />
<script>
document.querySelector('.page-search-input').addEventListener('keyup',function(e){
    var archive = document.getElementsByClassName('archive-item-link');
    for (var i = 0; i < archive.length; i++){
        if( archive[i].title.toLowerCase().indexOf(this.value.toLowerCase()) > -1 ) {
            archive[i].closest('li').style.display = '';
        } else {
            archive[i].closest('li').style.display = 'none';
        }
    }
    if(e.keyCode == 13){
        window.open('https://www.google.com/#q=site:blog.fooleap.org+'+this.value);
    }
})
</script>
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