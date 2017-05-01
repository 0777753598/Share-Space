window.onload = change;

var header =document.querySelector('.header');
var a = header.getElementsByTagName('a');
var li = header.getElementsByTagName('li');

function change(){
    removeActive();
    for (var i = 0; i < a.length; i++){
        if(a[i].href == window.location.href){
            a[i].parentNode.classList.add('active');
            console.log(window.location.href);
        }
    }
}

function removeActive(){
    for (var i = 0; i < li.length; i++){
        li[i].classList.remove('active');
    }
}

function addComment() {
    var inputs = document.getElementsByName('review');
    inputs[0].appendChild(name);

}