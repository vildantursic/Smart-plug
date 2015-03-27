    vrijednost=0.0;
      // Random data
      var line1 = new TimeSeries();
      var line2 = new TimeSeries();
      var line3 = new TimeSeries();
     setInterval(function() {

        if(stack){
        if(selectValue==0){
        
        line1.append(new Date().getTime(), vrijednost);         
        line2.append(new Date().getTime(), 0);
        line3.append(new Date().getTime(), 0);
         }
     
        
        else if(selectValue==1)
        {
        line2.append(new Date().getTime(), vrijednost);         
        line1.append(new Date().getTime(), 0);
        line3.append(new Date().getTime(), 0);}
        else if(selectValue==2)
        {
        line3.append(new Date().getTime(), vrijednost);         
        line2.append(new Date().getTime(), 0);
        line1.append(new Date().getTime(), 0);}
        setTimeout( checkForUpdate, 300 );  
        }




   }, 600);

     var smoothie = new SmoothieChart({ grid: { strokeStyle: 'rgb(125, 0, 0)', fillStyle: 'rgb(60, 0, 0)', lineWidth: 1, millisPerLine: 250, verticalSections: 6 }, minValue:0});
     
     smoothie.addTimeSeries(line3, { strokeStyle: 'rgb(0, 0, 255)', lineWidth: 5 });
     smoothie.addTimeSeries(line2, { strokeStyle: 'rgb(255, 0, 0)', lineWidth: 5 });
     smoothie.addTimeSeries(line1, { strokeStyle: 'rgb(0, 255, 0)', fillStyle: 'rgba(0, 255, 0, 0)', lineWidth: 5 });

     smoothie.streamTo(document.getElementById("mycanvas"), 500);