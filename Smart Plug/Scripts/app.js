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

app.controller("homeCtrl", function ($scope, $http) {

    $scope.data = {
        plugs: [
            {
                name: "name",
                type: "type",
                state: "alert",
                location: "kitchen"
            }
        ]
    }

    var plugRef = new Firebase('https://smartplug.firebaseio.com');

    $scope.addPlug = function () {
        $scope.data.plugs.push({

            name: $scope.plug.name,
            type: $scope.plug.type,
            state: $scope.plug.state,
            location: $scope.plug.location
        });
    }

    $('#plugInput').on("click", function (e) {
        var name = $scope.plug.name;
        var type = $scope.plug.type;
        var state = $scope.plug.state;
        var location = $scope.plug.location;

        plugRef.push({ name: name, type: type, state: state, location: location });

        $('#name').val('');
        $('#type').val('');
        $('#state').val('');
        $('#location').val('');
    });

    plugRef.on('child_added', function (snapshot) {
        $scope.plugs = snapshot.val();
    });

    $scope.removePlug = function(index) {
        $scope.data.plugs.splice(index, 1);
    }

});

app.controller("logCtrl", function ($scope, $http, $stateParams) {
    $scope.plug = $stateParams.id;

    var req = {
        method: 'GET',
        url: '/Scripts/plugs.json'
    }

    $http.get(req).success(function (data) {
        console.log(data);
    }).error(function() {
        console.log("404");
    });
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