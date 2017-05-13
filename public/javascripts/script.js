window.onload = change;




var header =document.querySelector('.topnav');
var a = header.getElementsByTagName('a');
var li = header.getElementsByTagName('li');

function change(){
    document.getElementById("loader").style.display = "none";
    document.getElementById("hideAll").style.display = "none";
    removeActive();
    for (var i = 0; i < a.length; i++){
        if(a[i].href == window.location.href){
            if(a[i].textContent != "Share Space") {
                a[i].classList.add('active');
            }
        }
    }
}

function removeActive(){
    for (var i = 0; i < a.length; i++){
        a[i].classList.remove('active');
    }
}

var button = document.getElementsByClassName('icon')[0];
var list = document.getElementById('myTopNav');
console.log(button.className);
button.addEventListener('click',function(){
    if(list.className =="topnav"){
        list.className +=" responsive";
        button.className += " responsive";

    }
    else{
        list.className = "topnav";
        button.className = "icon";
    }
});