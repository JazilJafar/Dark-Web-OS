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
        focusWin(openwins[name]);
        return;
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
    }else if (name === 'hackterm'){
        win.style.width = '300px';
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
    win.querySelector('.closebtn').onclick = function(){
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
    }

    if(name === 'hacalc' && typeof setupCalc === 'function') setupCalc(win); 
    if(name === 'hackbrowse' && typeof setupHackbrowse === 'function') setupHackbrowse(win); 
    if(name === 'hackterm' && typeof setupHackterm === 'function') setupHackterm(win); 
}

//  we are doinf next the dragging and focusing
//  of windows so we can move around that os
  
function focusWin(win){
    zIndex++;
    win.style.zIndex = zIndex;
}
function makeDraggeble(win){
    var bar = win.querySelector('.wintop'); 
    var offX = 0, offY = 0, dragging = false;

    bar.onmousedown = function(e){
        if (e.target.classList.contains('minbtn') || 
            e.target.classList.contains('maxbtn') || 
            e.target.classList.contains('closebtn')) {
            return;
        }
        
        dragging = true;
        offX = e.clientX - win.offsetLeft;
        offY = e.clientY - win.offsetTop;
        focusWin(win);
    };
    
    document.onmousemove = function(e){
        if (!dragging) return;
        win.style.left = (e.clientX - offX) + 'px';
        win.style.top = (e.clientY - offY) + 'px';
    };
    document.onmouseup = function(){
        dragging = false;
    };
}

//  i am jazil not ai code is by jazil everything is by jazil 
//  next step is making calculator 

function getCalcHTML(){
    return '<div class="wintop"><span>hacalc</span><span class="winbar"><span class="minbtn"></span><span class="maxbtn"></span><span class="closebtn"></span></span></div>' +
    '<div class="winbody" style="padding: 10px;">' +
    '<div class="calcscreen" style="background: #111; color: #fff; padding: 10px; font-size: 24px; text-align: right; margin-bottom: 10px; border-radius: 5px; min-height: 40px;">0</div>' +
    '<div class="calcRow"><button data-val="C">C</button><button data-val="/" class="op">/</button><button data-val="*" class="op">*</button><button data-val="-" class="op">-</button></div>' +
    '<div class="calcRow"><button data-val="7">7</button><button data-val="8">8</button><button data-val="9">9</button><button data-val="+" class="op">+</button></div>' +
    '<div class="calcRow"><button data-val="4">4</button><button data-val="5">5</button><button data-val="6">6</button><button data-val="." class="op">.</button></div>' +
    '<div class="calcRow"><button data-val="1">1</button><button data-val="2">2</button><button data-val="3">3</button><button data-val="=" class="eq">=</button></div>' +
    '<div class="calcRow"><button data-val="0" style="flex: 1;">0</button></div>' +
    '</div>';
}

function setupCalc(win) {
    var screen = win.querySelector('.calcscreen');
    var calcVal = '';

    win.querySelectorAll('.calcRow button').forEach(function(btn) {
        btn.onclick = function() {
            var val = btn.getAttribute('data-val');
            
            if (val === 'C') {
                calcVal = '';
                screen.innerText = '0';
            } else if (val === '=') {
                try {
                    var result = eval(calcVal);
                    screen.innerText = result;
                    calcVal = result.toString();
                } catch (e) {
                    screen.innerText = 'Error';
                    calcVal = '';
                }
            } else {
                if (calcVal === '0' && val !== '.') {
                    calcVal = val;
                } else {
                    calcVal += val;
                }
                screen.innerText = calcVal;
            }
        };
    });
}
// i completed calculator next is our hacterminal
function getHacktermHTML(){
    return '<div class="wintop"><span>HackTerm</span><span class="winbar"><span class="minbtn"></span><span class="maxbtn"></span><span class="closebtn"></span></span></div>'+
    '<div class="winbody" style="padding: 0px;">'+
    '<div id="termlog">Type hack to get all hack stuff things<br></div>'+
    '<div id="termInputRow"><span>&gt; </span><input id="termInput"></div>'+
    '</div>';
}

function setupHackterm(win){
    var input = win.querySelector('#termInput');
    var log = win.querySelector('#termlog');
    input.addEventListener('keydown', function(e){
        if (e.key !== 'Enter') return;
        var cmd = input.value;
        input.value = ''; 
        
        log.innerHTML += '&gt; ' + cmd + '<br>';
        if (cmd === 'hack'){
            log.innerHTML += 'execute: scrap, browse, hacker value, clear<br>';
        }else if (cmd === 'scrap'){
            log.innerHTML += 'It means you are scrapping a data from website using api<br>';
        }else if (cmd === 'browse'){
            log.innerHTML += 'hacker use tor browser to browse <br>';
        }else if (cmd === 'hacker value'){
            log.innerHTML += 'hacker value is value wanted for a hacker more look at https://santi.lol/blog/hacker-value/ <br>';
        }else if (cmd === 'clear'){
            log.innerHTML =  '';
        }else {
            log.innerHTML += 'Unknown hack command<br>';
        }
        log.scrollTop = log.scrollHeight;
    });
}
// next is our faviourate hackbrowse

function getHackbrowseHTML(){
    return '<div class="wintop"><span>HackBrowse</span><span class="winbar"><span class="minbtn"></span><span class="maxbtn"></span><span class="closebtn"></span></span></div>'+
    '<div class="winbody" style="padding: 0px; overflow: hidden; display: flex; flex-direction: column; height: calc(100% - 30px);">'+
    '<img id="hackbroimg" src="https://thumbs.dreamstime.com/b/curious-ginger-cat-watching-code-laptop-screen-ginger-cat-intently-watches-laptop-screen-displaying-programming-code-384022844.jpg" alt="Hacker Cat"></img>' +
    '<h1>Hello look again sometimes after i am seriously searching to study <br> hacking</h1>'+
    '</div>';
}