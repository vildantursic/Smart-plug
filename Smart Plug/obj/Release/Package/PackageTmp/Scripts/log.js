function readFromLog()
{
	var req = false;
	
	function readFromLogComplete(){
		if(req.readyState == 4)
		{
			if(req.status == 200)
			{
				document.getElementById("main").innerHTML =req.responseText;
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
		req.open("GET", "/dataFromLog" + Math.random(), true);
		req.onreadystatechange = readFromLogComplete;
		req.send(null);
	}

    alert('OK');
}





