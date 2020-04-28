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
        window.open('https://www.baidu.com/#q=site:yeqing.run+'+this.value);
    }
})