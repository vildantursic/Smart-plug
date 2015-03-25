var app = angular.module("app", ['ui.router', 'ui.bootstrap']);

app.config(function($urlRouterProvider, $stateProvider) {
    $urlRouterProvider.otherwise("/");

    $stateProvider
        .state("home", {
            url: "/",
            templateUrl: "Views/home.html",
            controller: "homeCtrl"
        })
        .state("log", {
            url: "/log/:id",
            templateUrl: "Views/log.html",
            controller: "logCtrl"
        })
        .state("plot", {
            url: "/plot/:id",
            templateUrl: "Views/plot.html",
            controller: "plotCtrl"
        });
});

app.controller('navCtrl', function ($scope) {
    
});

app.controller("homeCtrl", function ($scope, $modal, $log) {

    $scope.data = {
        plugs: [
            
        ]
    }

    

    $scope.plug_test = {
        name: "name",
        ip: "198.168.1.1",
        state: "alert",
        location: "kitchen"
    }
     
    var plugRef = new Firebase('https://smartplug.firebaseio.com');

    $('#plugInput').on("click", function (e) {
        var name = $scope.plug.name;
        var ip = $scope.plug.ip;
        var state = $scope.plug.state;
        var location = $scope.plug.location;

        plugRef.push({ name: name, ip: ip, state: state, location: location });

        $('#name').val('');
        $('#ip').val('');
        $('#state').val('');
        $('#location').val('');
    });

    var plugs;

    function importing() {
        $scope.data.plugs.push(plugs);
        
    }

    plugRef.on('child_added', function (snapshot) {
        plugs = snapshot.val();
        
        importing();
    });

    $scope.removePlug = function(index) {
        $scope.data.plugs.splice(index, 1);
    }

    /* //////////////////// */
    $scope.on_off = 1;

});

app.controller("logCtrl", function ($scope, $http, $stateParams) {

    

    $scope.plug = $stateParams.id;

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