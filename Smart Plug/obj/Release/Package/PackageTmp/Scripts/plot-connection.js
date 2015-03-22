﻿function checkForUpdate() {

    var req = false;

    function updateComplete() {
        if (req.readyState == 4) {
            if (req.status == 200) {
                //document.getElementById("example1").innerHTML = "<div>" + req.responseText + "</div>";
                vrijednost = parseFloat(req.responseText);
                /*alert(req.responseText);
				if(req.responseText=='ONN'){
					document.getElementById('myonoffswitch').checked=true;
				}
				if(req.responseText=="OFF"){
					document.getElementById('myonoffswitch').checked=false;*/
            }
        }
    }

    if (window.XMLHttpRequest) {
        req = new XMLHttpRequest();
    }
    else if (window.ActiveXObject) {
        req = new ActiveXObject("Microsoft.XMLHTTP");
    }
    if (req) {
        req.open("GET", "/cgi-bin/checkForUpdate?id" + Math.random(), true);
        req.onreadystatechange = updateComplete;
        req.send(null);
    }
}


function sendGetVoltageCommand() {
    var req = false;

    if (window.XMLHttpRequest) {
        req = new XMLHttpRequest();
    }
    else if (window.ActiveXObject) {
        req = new ActiveXObject("Microsoft.XMLHTTP");
    }
    if (req) {
        req.open("GET", "/cgi-bin/sendCommandGetVoltage?id" + Math.random(), true);
        req.send(null);
    }
}

function sendGetCurrentCommand() {
    var req = false;

    if (window.XMLHttpRequest) {
        req = new XMLHttpRequest();
    }
    else if (window.ActiveXObject) {
        req = new ActiveXObject("Microsoft.XMLHTTP");
    }
    if (req) {
        req.open("GET", "/cgi-bin/sendCommandGetCurrent?id" + Math.random(), true);
        req.send(null);
    }
}

function sendGetPowerCommand() {
    var req = false;

    if (window.XMLHttpRequest) {
        req = new XMLHttpRequest();
    }
    else if (window.ActiveXObject) {
        req = new ActiveXObject("Microsoft.XMLHTTP");
    }
    if (req) {
        req.open("GET", "/cgi-bin/sendCommandGetPower?id" + Math.random(), true);
        req.send(null);
    }
}

function myTimer1() {
    if (selectBox.value == "current")
        sendGetCurrentCommand();
    else if (selectBox.value == "voltage")
        sendGetVoltageCommand();
    else if (selectBox.value == "power")
        sendGetPowerCommand();
    setTimeout(checkForUpdate, 300);
}

var myVar = setInterval(function() { myTimer1() }, 500);

function myFunction() {
    alert(selectBox.value);
}