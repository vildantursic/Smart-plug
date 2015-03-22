var app = angular.module("app", ['ui.router']);

app.config(function($urlRouterProvider, $stateProvider) {
    $urlRouterProvider.otherwise("/");

    $stateProvider
        .state("home", {
            url: "/",
            templateUrl: "Views/home.html",
            controller: "homeCtrl"
        })
        .state("log", {
            url: "/log",
            templateUrl: "Views/log.html",
            controller: "logCtrl"
        })
        .state("plot", {
            url: "/plot",
            templateUrl: "Views/plot.html",
            controller: "plotCtrl"
        });
});

app.controller("homeCtrl", function($scope) {

    $scope.plugs = [
        {
            id: 1,
            state: "ok",
            uptime: "1:40",
            location: "livingroom"
        },
        {
            id: 2,
            state: "off",
            uptime: "1:22",
            location: "kitchen"
        },
        {
            id: 3,
            state: "warning",
            uptime: "1:10",
            location: "kitchen"
        },
        {
            id: 4,
            state: "alert",
            uptime: "1:22",
            location: "bathroom"
        },
        {
            id: 5,
            state: "warning",
            uptime: "2:22",
            location: "livingroom"
        },
        {
            id: 6,
            state: "off",
            uptime: "1:22",
            location: "livingroom"
        },
        {
            id: 7,
            state: "alert",
            uptime: "1:22",
            location: "bedroom"
        }
    ];

    function showData(){
        $("#more").on("click", function() {
            $("#plug").style.height = "400px";
        });
    }

    $scope.plugFunc = function (){

    }

});

app.controller("logCtrl", function() {
    
});

app.controller("plotCtrl", function ($scope) {

    (function () {

        var dps = []; // dataPoints

        var chart = new CanvasJS.Chart("chartContainer", {
            title: {
                text: "Real Time Monitoring"
            },
            data: [
                {
                    type: "line",
                    dataPoints: dps
                }
            ]
        });

        var xVal = 0;
        var yVal = 100;
        var updateInterval = 160;
        var dataLength = 100; // number of dataPoints visible at any point

        var updateChart = function(count) {
            count = count || 1;
            // count is number of times loop runs to generate random dataPoints.

            for (var j = 0; j < count; j++) {
                yVal = yVal + Math.round(5 + Math.random() * (-5 - 5));
                dps.push({
                    x: xVal,
                    y: yVal
                });
                xVal++;
            };
            if (dps.length > dataLength) {
                dps.shift();
            }

            chart.render();
        };
        // generates first set of dataPoints
        updateChart(dataLength);

        // update chart after specified time.
        setInterval(function () { updateChart() }, updateInterval);
    })();

    /* SMOOTHIE */
    var chart = new SmoothieChart({
        millisPerPixel: 22,
        grid: {
            fillStyle: "#ffffff",
            strokeStyle: "rgba(119,119,119,0.66)",
            sharpLines: true,
            verticalSections: 10
        },
        labels: {
            fillStyle: "#000000",
            fontSize: 12
        },
        maxValue: 10000,
        minValue: -10000,
        timestampFormatter: SmoothieChart.timeFormatter
    }),

    canvas = document.getElementById("smoothie-chart"),
    series = new TimeSeries();

    chart.addTimeSeries(series, {
        lineWidth: 1.5,
        strokeStyle: "#0060ff",
        fillStyle: "#000000"
    });

    chart.streamTo(canvas, 2000);

});