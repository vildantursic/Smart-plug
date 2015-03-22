/* DROP-DOWN MENU*/
var selectBox = document.getElementById("selectBox");

vrijednost = 0.0;
// Random data
var line1 = new TimeSeries();
var line2 = new TimeSeries();
var line3 = new TimeSeries();

setInterval(function() {

    if (selectBox.value == "current") {

        line1.append(new Date().getTime(), vrijednost);
        line2.append(new Date().getTime(), 0);
        line3.append(new Date().getTime(), 0);
    } else if (selectBox.value == "voltage") {
        line2.append(new Date().getTime(), vrijednost);
        line1.append(new Date().getTime(), 0);
        line3.append(new Date().getTime(), 0);
    } else if (selectBox.value == "power") {
        line3.append(new Date().getTime(), vrijednost);
        line2.append(new Date().getTime(), 0);
        line1.append(new Date().getTime(), 0);
    }
    setTimeout(checkForUpdate, 300);

}, 600);
