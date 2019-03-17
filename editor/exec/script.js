//WebScript
const {remote} = require('electron');
var perm = -1;

function minimize(){
     var window = remote.getCurrentWindow();
     window.minimize(); 
}

function maximize(){
     var window = remote.getCurrentWindow();
     if (!window.isMaximized()) {
         window.maximize();          
     } else {
         window.unmaximize();
     }
}

function closeBtn(){
     var window = remote.getCurrentWindow();
     window.close();
}

function start(){
    goTo("editor/editor");
}

function goTo(name){
    document.getElementById("fadeIn").style.opacity = 0;
    setTimeout(() => {
        var content = document.getElementById("content");
        var client = new XMLHttpRequest();
        client.onreadystatechange = function() {
            document.getElementById("fadeIn").innerHTML = client.responseText;
            document.getElementById("fadeIn").style.opacity = 1;
        }
        client.open('GET', name + '.html');
        client.send();
    }, 500);
}