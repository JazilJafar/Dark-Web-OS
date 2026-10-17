d// by jazil so we are starting to write our engine
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

// next important thing is when clicking on button 
// a function want to run so its creating simple functions
  
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
document.getElementById('windows').appendChild(win);
openwins[name] = win;
makeDraggeble(win);
focusWin(win);
win.quearySelector('.closebtn').onclick = function(){
    win.remove();
    delete openwins[name];
}
win.querySelector('.minbtn').onclick = function(){
    win.style.display = 'none';
}
win.querySelector('.maxbtn').onclick = function(){
    if (win.dataset.max == '1'){
        win.style.width = win.dataset.w;
        win.style.height = win.dataset.h;
        win.style.left = win.dataset.l;
        win.style.top = win.dataset.t;
        win.dataset.max = '0';
    }else {
        win.dataset.w = win.style.width;
        win.dataset.h = win.style.height;
        win.dataset.l = win.style.left;
        win.dataset.t = win.style.top;
        win.style.left = '10px';
        win.style.top = '40px';
        win.style.width = '90vw';
        win.style.height = '80vh';
        win.dataset.max = '1';
    }

if(name === 'hacalc') setupCalc(win);
if(name === 'hackbrowse') setupHackbrowse(win);
if (name === 'hackterm') setupHackterm(win);
if (name === 'hackerdone') setupHackdone(win);
}

//  we are doinf next the dragging and focusing
//  of windows so we can move around that os
  
function focusWin(win){
    zIndex++;
    win.style.zIndex = zIndex;
}
function makeDraggeble(win){
    var bar = win.quearySelector('.winbar');
    var offx = 0, offY = 0, dragging = false;

    bar.onmousedown = function(e){
        if (e.target.tagName === 'SPAN') return;
        dragging = true;
        offX = e.clientX - win.offsetLeft;
        offY = e.clientY - win.offsetTop;
        focusWin(win);
    };
    document.onmousemove = function(e){
        if (!dragging) return;
        win.style.left = (e.clientX - offX) + 'px';
        win.style.top = (e.clientY - offY) + 'px';
    }
    document.onmouseup = function(){
        dragging = false;
    }
}
//  i am jazil not ai code is by jazil everything is by jazil 
//  next step is making calculator 

function getCalcHTMl(){
    return '<div class="wintop"><span>hacalc</span><span class="winbar"><span class="minbtn"></span><span class="maxbtn"></span><span class="closebtn"></span></span></div>' +
    '<div class="winbody"></div>' +
    '<div id="calcscreen">0</div>' +
    '<div class="calcRow"><button onclick="calcClear()">C</button><button onclick="calcpress(\'/\')" class="op">/</button><button onclick="clacpress(\'*\')" class="op">*</button><button onclick="calcpress(\'-\')" class="op">-</button></div>' +""
    '<div class="calcRow"><button onclick="calcpress(\'7\')">7</button><button onclick="calcpress(\'8\')">8</button><button onclick="calcpress(\'9\')">9</button><button onclick="calcpress(\'+\')" class="op">-</button></div>' +
    '<div class="calcRow"><button onclick="calcpress(\'4\')">4</button><button onclick="calcpress(\'5\')">5</button><button onclick="caclpress(\'6\')">6</button><button onclick="calcpress(\'=\')" class="op">=</button></div>' +
    '<div class="calcRow"><button onclick="calcpress(\'1\')">1</button><button onclick="calcpress(\'2\')">2</button><button onclick="calcpress(\'3\')">3</button></div>' +
    '<div class="calcRow"><button onclick="calcpress(\'0\')" style="flex: 2;">0</button><button onclick="calcpress(\'.\')">.</button><button onclick="calceq()" class="eq">=</button></div>' +
    '</div>';
}
var calcVal = '';