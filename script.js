// by jazil so we are starting to write our engine
document.getElementById("startos").onclick = function(){
    document.getElementById("welc").style.display = "none";
    document.getElementById("darkdesk").style.display = "block";
}
function updateClock(){
  var d = new Date();
  var h = d.getHours().toString().padStart(2, '0');
  var m = d.getMinutes().toString().padStart(2, '0');
  var s = d.getSeconds().toString().padStart(2, '0');
  document.getElementById('clocktime').innerText = h + ':' + m + ':' + s;
}
setInterval(updateClock, 1000);
updateClock();