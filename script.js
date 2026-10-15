// by jazil so we are starting to write our engine
document.getElementById("startos").onclick = function(){
    document.getElementById("welc").style.display = "none";
    document.getElementById("darkdesk").style.display = "block";
}
// this is by jazil not be ai  time changing fuction adding for time bar
function updateClock(){
  var d = new Date();
  var h = d.getHours().toString().padStart(2, '0');
  var m = d.getMinutes().toString().padStart(2, '0');
  var s = d.getSeconds().toString().padStart(2, '0');
  document.getElementById('clocktime').innerText = h + ':' + m + ':' + s;
}
setInterval(updateClock, 1000);
updateClock();

var zIndex = 1;
var openwins = {};
// we are next looking at the windows sizing bro
function openApp(name) {
    if (openwins[name]) {
        openwins[name].style.display = 'block';
        focusWindow(openwins[name]);
        return;
    }
}
var win = document.createElement('div');
win.className = 'win';
win.style.left = (100 + Object.keys(openwins).length * 23) + 'px';
win.style.top = (60 + Object.keys(openwins).length * 20) + 'px';
if (name === 'hacalc'){
    win.style.width = '250px';
    win.style.height = '300px';
    win.innerHTML = getCalcHTML();
}else if (name === 'hackerdone'){
    win.style.width = '400px';
    win.style.height = '300px';
    win.innerHTML = getHackdoneHTML();
}else if (name === 'hackterm'){
    win.style.width = '200px';
    win.style.height = '300px';
    win.innerHTML = getHacktermHTML();
}else if (name === 'hackbrowse'){
     win.style.width = '300px';
     win.style.height = '300px';
     win.innerHTML = getHackbrowseHTML();
}