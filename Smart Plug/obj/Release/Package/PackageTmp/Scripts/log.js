ip='http://80.65.171.175';
function readFromLog()
{
	var req = false;
	console.log("ok");
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
		req.open("GET", ip+"/dataFromLog" + Math.random(), true);
		req.onreadystatechange = readFromLogComplete;
		req.send(null);
	}

    alert('OK');
}





