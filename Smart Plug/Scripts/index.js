dozvoliAlert = true;

ip='http://80.65.171.175';

posrijednik = "";

function ledstateGet() {
    var led = false;
    function ledComplete() {
        if (led.readyState == 4) {
            if (led.status == 200) {
                document.getElementById("ledstate").innerHTML = "<div>" + led.responseText + "</div>";
            }
        }
    }

    if (window.XMLHttpRequest) {
        led = new XMLHttpRequest();
    }
    else if (window.ActiveXObject) {
        led = new ActiveXObject("Microsoft.XMLHTTP");
    }

    if (led) {
        led.open("GET", ipAddr + "/cgi-bin/toggle_led?id" + Math.random(), true);
        console.log("ok");
        led.onreadystatechange = ledComplete;
        led.send(null);

    }
}

function closeControlPanel() {
    document.getElementById("controlPanel").style.visibility = "hidden";
    document.getElementById('preko').src = "images/preko.gif";
}

function appendNewText() {
    if (document.getElementById("myonoffswitch").checked)
        var newText = document.createTextNode("Ugaseno");

    else var newText = document.createTextNode("Upaljeno");

    var para = document.getElementById("example1");

    para.appendChild(newText);

}

function sendCheckStateCommand() {
    var req = false;

    if (window.XMLHttpRequest) {
        req = new XMLHttpRequest();
    }
    else if (window.ActiveXObject) {
        req = new ActiveXObject("Microsoft.XMLHTTP");
    }
    if (req) {
        req.open("GET", "/cgi-bin/sendCommandCheckState?id" + Math.random(), true);
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


function sendEnableCirrusCommand() {
    var req = false;

    if (window.XMLHttpRequest) {
        req = new XMLHttpRequest();
    }
    else if (window.ActiveXObject) {
        req = new ActiveXObject("Microsoft.XMLHTTP");
    }
    if (req) {
        req.open("GET", "/cgi-bin/sendCommandEnableCirrus?id" + Math.random(), true);
        req.send(null);
    }
}

function dodo() {

    document.getElementById("myonoffswitch").checked = true;

}

function dido() {
    document.getElementById("myonoffswitch").checked = false;
}


function checkForUpdate() {
    var ipAddr = document.getElementById("ipAddr").value;

    var req = false;

    console.log(ipAddr);

    function updateComplete() {
        if (req.readyState == 4) {
            if (req.status == 200) {
                document.getElementById("example1").innerHTML = "<div>" + req.responseText + "</div>";
                if (dozvoliAlert)
                    alert(req.responseText);
                posrijednik = req.responseText;
                if (req.responseText == 'ONN') {
                    document.getElementById('myonoffswitch').checked = true;
                }
                if (req.responseText == "OFF") {
                    document.getElementById('myonoffswitch').checked = false;

                }
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
        req.open("GET", ipAddr + "/cgi-bin/toggle_led?id" + Math.random(), true);
        req.onreadystatechange = updateComplete;
        req.send(null);
    }

}


function sendOnOffCommand() {
    var req = false;

    if (window.XMLHttpRequest) {
        req = new XMLHttpRequest();

    }
    else if (window.ActiveXObject) {
        req = new ActiveXObject("Microsoft.XMLHTTP");

    }
    if (req) {
        if (document.getElementById("my-plug").checked)
            //zamijenio si komande :@
            req.open("GET", ip+"/cgi-bin/sendCommandOn?id" + Math.random(), true);
        else
            req.open("GET", ip+"/cgi-bin/sendCommandOff?id" + Math.random(), true);
        req.send(null);
    }
    console.log(ip);

}


var counter = 0;

function openControlPanel(foo) {



    document.getElementById("controlPanel").style.visibility = "visible";
    if (foo == 0) {
        document.getElementById('preko').src = "images/preko0.gif"
    };
    if (foo == 1) {
        document.getElementById('preko').src = "images/preko1.gif"
    };
    if (foo == 2) {
        document.getElementById('preko').src = "images/preko2.gif"
    };

    sendCheckStateCommand();
    setTimeout(checkForUpdate, 300);

    //checkForUpdate();
    //intervalVar=setInterval(function(){checkForUpdate()},500);
    //here receive answer and accordingly set state of ChechBox
}





function myTimer() {
    var d = new Date();
    document.getElementById("demo").innerHTML = d.toLocaleTimeString();
    counter++;

    if (counter == 7) {
        clearInterval(intervalVar);
        counter = 0;
    }
}


function refreshPVC() {

    var d = new Date();
    logLine = d.toUTCString();
    dozvoliAlert = false;


    sendGetCurrentCommand();
    setTimeout(checkForUpdate, 300);
    setTimeout(function () {
        document.getElementById("amper").innerHTML = posrijednik;
        logLine = logLine + ' ' + posrijednik;
    }, 400);


    setTimeout(sendGetVoltageCommand, 400);
    setTimeout(checkForUpdate, 700);
    setTimeout(function () {
        document.getElementById("volt").innerHTML = posrijednik;
        logLine = logLine + ' ' + ' ' + posrijednik;
    }, 800);

    setTimeout(sendGetPowerCommand, 1100);
    setTimeout(checkForUpdate, 1400);
    setTimeout(function () { document.getElementById("wat").innerHTML = posrijednik; }, 1500);
    setTimeout(function () {
        dozvoliAlert = true;
        logLine = logLine + ' ' + posrijednik;
        logLine = logLine.replace(/ /g, "+");
    }, 1500);

    setTimeout(function () { document.getElementById("example1").innerHTML = logLine; }, 2000);
    setTimeout(saveToLog, 2000);

    //alert("finished refreshPvc");
}

function saveToLog() {
    var req = false;


    if (window.XMLHttpRequest) {
        req = new XMLHttpRequest();

    }
    else if (window.ActiveXObject) {
        req = new ActiveXObject("Microsoft.XMLHTTP");

    }
    if (req) {
        req.open("GET", "/dataToLog=" + logLine, true);
        req.send(null);
    }

}



