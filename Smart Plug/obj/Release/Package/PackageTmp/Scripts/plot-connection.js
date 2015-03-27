

    function checkForUpdate()
    {


        var req = false;

        function updateComplete(){
            if(req.readyState == 4)
            {
                if(req.status == 200)
                {

                vrijednost = parseFloat(req.responseText);

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
            req.open("GET", "/cgi-bin/checkForUpdate?id" + Math.random(), true);
            req.onreadystatechange = updateComplete;
            req.send(null);
        }

    }


    function sendGetVoltageCommand()
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
            req.open("GET", "/cgi-bin/sendCommandGetVoltage?id" + Math.random(), true);
            req.send(null);
        }

    }

    function sendGetCurrentCommand()
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
            req.open("GET", "/cgi-bin/sendCommandGetCurrent?id" + Math.random(), true);
            req.send(null);
        }

    }

    function sendGetPowerCommand()
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
            req.open("GET", "/cgi-bin/sendCommandGetPower?id" + Math.random(), true);
            req.send(null);
        }

    }

    function myTimer1() {
        if(selectValue==0)
        sendGetCurrentCommand();
        else if(selectValue==1)
        sendGetVoltageCommand();
        else if(selectValue==2)
        sendGetPowerCommand();
        setTimeout( checkForUpdate, 300 );
    }

    var myVar=setInterval(function(){myTimer1()},500);


    function myFunction() {
        alert(selectBox.value);
    }


    selectValue=0;


    function currentClicked(){

               selectValue=0;

          }

     function voltageClicked(){

               selectValue=1;

          }

     function powerClicked(){

               selectValue=2;

          }

     var stack=true;
     // opens the modal
    function openModal() {
        pleseWait.classList.add("active");
        stack=false;
    }

    function closeModal() {
        pleseWait.classList.remove("active");
        stack=true;
    }




    function openTemporaryModal() {

        openModal();
        setTimeout(closeModal, 15000);
      

    }


