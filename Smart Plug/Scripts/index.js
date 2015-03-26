dozvoliAlert = true;

ip='http://80.65.171.175';

status=-1;

posible_alert=0;
alert = 0;

posrijednik="";

function ledstateGet()
{
    var led = false;
    function ledComplete()
    {
        if(led.readyState == 4)
        {
            if(led.status == 200)
            {
                document.getElementById("ledstate").innerHTML = "<div>" + led.responseText + "</div>";
            }
        }
    }
    if(window.XMLHttpRequest)
    {
        led = new XMLHttpRequest();
    }
    else if(window.ActiveXObject)
    {
        led = new ActiveXObject("Microsoft.XMLHTTP");
    }
    if(led)
    {
        led.open("GET", ip+"/ledstate?id=" + Math.random(), true);
        led.onreadystatechange = ledComplete;
        led.send(null);
    }
}










function closeControlPanel() {
    document.getElementById("controlPanel").style.visibility = "hidden";
    document.getElementById('preko').src="preko.gif";
    document.getElementById("comands").style.visibility = "hidden";
    document.getElementById("showAdvanced").style.visibility = "hidden";

}

function showAdvanced(){

    document.getElementById("comands").style.visibility = "visible";
    document.getElementById("showAdvanced").style.visibility = "hidden";
}

function hideAdvanced(){

    document.getElementById("comands").style.visibility = "hidden";
    document.getElementById("showAdvanced").style.visibility = "visible";
}

/*
function appendNewText()

{
    if(document.getElementById("myonoffswitch").checked)
        var newText = document.createTextNode("Ugaseno");

    else var newText = document.createTextNode("Upaljeno");

    var para = document.getElementById("example1");

    para.appendChild(newText);

}*/


function sendCheckStateCommand()
{
    var req = false;
    status=0;

    if(window.XMLHttpRequest)
    {
        req = new XMLHttpRequest();

    }
    else if(window.ActiveXObject)
    {
        req = new ActiveXObject("Microsoft.XMLHTTP");

    }
    if(req)
    {
        req.open("GET", ip+"/cgi-bin/sendCommandCheckState?id" + Math.random(), true);
        req.send(null);
    }

}

function sendGetVoltageCommand()
{
    var req = false;
    status=1;

    if(window.XMLHttpRequest)
    {
        req = new XMLHttpRequest();

    }
    else if(window.ActiveXObject)
    {
        req = new ActiveXObject("Microsoft.XMLHTTP");

    }
    if(req)
    {
        req.open("GET", ip+"/cgi-bin/sendCommandGetVoltage?id" + Math.random(), true);
        req.send(null);
    }

}

function sendGetCurrentCommand()
{
    var req = false;
    status=2;    

    if(window.XMLHttpRequest)
    {
        req = new XMLHttpRequest();

    }
    else if(window.ActiveXObject)
    {
        req = new ActiveXObject("Microsoft.XMLHTTP");

    }
    if(req)
    {
        req.open("GET", ip+"/cgi-bin/sendCommandGetCurrent?id" + Math.random(), true);
        req.send(null);
    }

}

function sendGetPowerCommand()
{
    var req = false;
    status=3;

    if(window.XMLHttpRequest)
    {
        req = new XMLHttpRequest();

    }
    else if(window.ActiveXObject)
    {
        req = new ActiveXObject("Microsoft.XMLHTTP");

    }
    if(req)
    {
        req.open("GET", ip+"/cgi-bin/sendCommandGetPower?id" + Math.random(), true);
        req.send(null);
    }

}


function sendEnableCirrusCommand()
{
    var req = false;
    

    if(window.XMLHttpRequest)
    {
        req = new XMLHttpRequest();

    }
    else if(window.ActiveXObject)
    {
        req = new ActiveXObject("Microsoft.XMLHTTP");

    }
    if(req)
    {
        req.open("GET", ip+"/cgi-bin/sendCommandEnableCirrus?id" + Math.random(), true);
        req.send(null);
    }

}

function dodo(){

    document.getElementById("myonoffswitch").checked=true;

}

function dido(){

    document.getElementById("myonoffswitch").checked=false;
    
}


function checkForUpdate()
{

    
    var req = false;
    
    function updateComplete(){
        if(req.readyState == 4)
        {
            if(req.status == 200)
            {
                //document.getElementById("example1").innerHTML = "<div>" + req.responseText + "</div>";
                if(dozvoliAlert)
                    alert(req.responseText);
                posrijednik=req.responseText;
                if(status==0){
                    if(req.responseText=='ONN'){
                        $("#on_off").removeClass("off");
                        $("#on_off").addClass("on");
                        posible_alert=1;
                    }
                    if(req.responseText=="OFF"){
                        $("#on_off").removeClass("on");
                        $("#on_off").addClass("off");

                }

                }

                if(status==1)
                    document.getElementById("volt").innerHTML = posrijednik;
                if(status==2){
                    document.getElementById("amper").innerHTML = posrijednik;
                    if (posible_alert==1 && posrijednik==0) 
                        alert=1;
                    }
                   
                if(status==3)
                    document.getElementById("wat").innerHTML = posrijednik;

                status=-1;

            }
        }
    }

    if(window.XMLHttpRequest)
    {
        req = new XMLHttpRequest();

    }
    else if(window.ActiveXObject)
    {
        req = new ActiveXObject("Microsoft.XMLHTTP");

    }
    if(req)
    {
        req.open("GET", ip+"/cgi-bin/checkForUpdate?id" + Math.random(), true);
        req.onreadystatechange = updateComplete;
        req.send(null);
    }

}


function sendOnOffCommand()
{
    var req = false;
    

    if(window.XMLHttpRequest)
    {
        req = new XMLHttpRequest();

    }
    else if(window.ActiveXObject)
    {
        req = new ActiveXObject("Microsoft.XMLHTTP");

    }
    if(req)
    {

        dozvoliAlert=false;
        if(document.getElementById("my-plug").checked)
            //zamijenio si komande :@
        req.open("GET", ip+"/cgi-bin/sendCommandOn?id" + Math.random(), true);
        else
            req.open("GET", ip+"/cgi-bin/sendCommandOff?id" + Math.random(), true);
        req.send(null);
        //ako bude problema ovo obrisi 
        setTimeout(getState,1000);
        setTimeout(function(){dozvoliAlert=true;},1500);
    }

}


var counter=0;

function openControlPanel(foo) {

    dozvoliAlert=false;
    document.getElementById("showAdvanced").style.visibility = "visible";
    document.getElementById("comands").style.visibility = "hidden";
    document.getElementById("controlPanel").style.visibility = "visible";
    if (foo==0) {
        document.getElementById('preko').src="preko0.gif"
    };
    if (foo==1) {
        document.getElementById('preko').src="preko1.gif"
    };
    if (foo==2) {
        document.getElementById('preko').src="preko2.gif"
    };

    sendCheckStateCommand();
    setTimeout( checkForUpdate, 700 );
    setTimeout(function(){dozvoliAlert=true;},1000);
    //checkForUpdate();
    //intervalVar=setInterval(function(){checkForUpdate()},500);
    //here receive answer and accordingly set state of ChechBox
}


function getState(){    
    sendCheckStateCommand();
    setTimeout( checkForUpdate, 700 );
}

function getStatus(){  

    posible_alert=0;  
    alert=0;
    sendCheckStateCommand();
    setTimeout(checkForUpdate, 700 );
    setTimeout(sendGetCurrentCommand, 800); 
    setTimeout(checkForUpdate, 1500); 
    if(alert==1)
        //setting alert func
    posible_alert=0;
    alert=0;
}


/*function myTimer() {
    var d = new Date();
    document.getElementById("demo").innerHTML = d.toLocaleTimeString();
    counter++;

    if(counter==7){
        clearInterval(intervalVar);
        counter=0;
    }
}*/


function refreshPVC(){

    var d = new Date();
    logLine=d.toUTCString();
    dozvoliAlert=false;


    sendGetCurrentCommand();
    setTimeout( checkForUpdate, 1000 );
    setTimeout(function(){document.getElementById("amper").innerHTML = posrijednik;
        logLine=logLine+ ' ' + posrijednik; console.log(posrijednik);},1100);


    setTimeout(sendGetVoltageCommand,1200);
    setTimeout( checkForUpdate, 2200 );
    setTimeout(function(){document.getElementById("volt").innerHTML = posrijednik;
        logLine=logLine+ ' ' + ' ' + posrijednik;console.log(posrijednik);},2300);

    setTimeout(sendGetPowerCommand, 2400);
    setTimeout( checkForUpdate, 3400 );
    setTimeout(function(){document.getElementById("wat").innerHTML = posrijednik;},3500);
    setTimeout(function(){dozvoliAlert=true;
        logLine=logLine+ ' ' + posrijednik;
        logLine = logLine.replace(/ /g,"+");console.log(posrijednik);},3600);

    //setTimeout(function(){document.getElementById("example1").innerHTML=logLine;},2000);
    setTimeout(saveToLog, 3700);

    //alert("finished refreshPvc");
}

function saveToLog()
{
    var req = false;
    

    if(window.XMLHttpRequest)
    {
        req = new XMLHttpRequest();

    }
    else if(window.ActiveXObject)
    {
        req = new ActiveXObject("Microsoft.XMLHTTP");

    }
    if(req)
    {
        req.open("GET", ip+"/dataToLog=" + logLine, true);
        req.send(null);
    }

}

function funkc1(){
document.getElementById("tabela1").style.zIndex="0";
document.getElementById("tabela2").style.zIndex="1001";
}


function funkc2(){
document.getElementById("tabela1").style.zIndex="1001";
document.getElementById("tabela2").style.zIndex="0";

}

function myFunction(){

    alert('Data has been saved to log.')

}


function logData(){

    document.getElementById("logNotfication").style.visibility = "visible";
    refreshIntervalId = setInterval(refreshPVC, 5000);
    //alert('Current, voltage and power values are being recorded to log. \n\nThis option does not allow any other paralel acctivity. \nPress OK to stop logging data and continue.');

}

function stopLogData(){

    clearInterval(refreshIntervalId);
    document.getElementById("logNotfication").style.visibility = "hidden";
    openControlPanel(0);

}



