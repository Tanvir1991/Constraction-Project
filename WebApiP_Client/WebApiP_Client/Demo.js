/// <reference path="F:\ConsolePractice\WebApiClient\WebApi_Client\Scripts/angular.js" />

var MyApp = angular.module('MyApp', ['ngRoute','PlotService']);

MyApp.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
        when('/Add', {
            templateUrl: 'add.html',
            controller: 'AddController'
        }).
        when('/Edit', {
            templateUrl: 'edit.html',
            controller: 'EditController'
        }).
        when('/Delete', {
            templateUrl: 'delete.html',
            controller: 'DeleteController'
        }).
         when('/Home', {
             templateUrl: 'home.html',
             controller: 'HomeController'
         }).
             when('/Main', {
                 templateUrl: 'Main.html',
                 controller: 'CController'
             }).
            when('/Contact Us', {
                templateUrl: 'Contact.html',
                controller: 'CController'
            }).
            when('/About', {
                templateUrl: 'About.html',
                controller: 'CController'
            }).
        otherwise({
            redirectTo: '/Main'
        });
    
    }]);




MyApp.controller("AddController", function ($scope, PlotApi) {
  
    $scope.addpltes=function()
    {
        var pltoadd = {
            //'ID':$scope.plotid,
            'Name': $scope.name,
            'Size': $scope.size,
            'Price': $scope.price,
            'Constraction_s_Date': $scope.consdate,
            'Note': $scope.note,
            'Sold': $scope.sold,
            'OwnerName': $scope.ownername,
            'OwnerPhone': $scope.ownerphone
        };
        
        PlotApi.AddPlot(pltoadd)
            .success(function (response) {
            alert("Plot Details Added");
            $scope.name = undefined;
            $scope.size = undefined;
            $scope.price = undefined;
            $scope.consdate = undefined;
            $scope.note = undefined;
            $scope.sold = undefined;
            $scope.ownername = undefined;
            $scope.ownerphone = undefined;

            }).
            error(function (response) {
                alert("Error Adding")
                //console.log(response)
        })
    }

});

//MyApp.controller("DeleteController", function ($scope) {
//    $scope.message = "In Delete View"
//});

MyApp.controller("EditController", function ($scope, PlotApi) {
  
    $scope.selectedItem = "Select Plot Name";
    $scope.isDeleteItemVisible = false;
    GetPlotees();
    function GetPlotees() {
        PlotApi.GetPlots().success(function (plts) {
            $scope.plts = plts;
        })
        .error(function (error) {
            $scope.status = 'Unable To Load Plot Data :' + error.message;
        })
    };
    $scope.dropboxitemselected = function (item) {
        $scope.isDeleteItemVisible = true;
        $scope.selectedItem = item.ID;
        $scope.name = item.Name;
        $scope.size = item.Size;
        $scope.price = item.Price;
        $scope.consdate = item.Constraction_s_Date;
        $scope.note = item.Note;
        $scope.sold = item.Sold;
        $scope.ownername = item.OwnerName;
        $scope.ownerphone = item.OwnerPhone;
        $scope.plotid = item.ID;

    };

    $scope.UpdatePlot = function () {

        var pltToupdate = {

            'ID': $scope.plotid,
            'Name': $scope.name,
            'Size': $scope.size,
            'Price': $scope.price,
            'Constraction_s_Date': $scope.consdate,
            'Note': $scope.note,
            'Sold': $scope.sold,
            'OwnerName': $scope.ownername,
            'OwnerPhone': $scope.ownerphone

        };

        PlotApi.EditPlot(pltToupdate)
        .success(function (response) {
            alert("Plot Details Updated");
            $scope.name = undefined;
            $scope.size = undefined;
            $scope.price = undefined;
            $scope.consdate = undefined;
            $scope.note = undefined;
            $scope.sold = undefined;
            $scope.ownername = undefined;
            $scope.ownerphone = undefined;
            $scope.plotid = undefined;
            $scope.selectedItem = "Selected Plot";
            $scope.isDeleteItemVisible = false;
            GetPlotees();
        }).
        error(function (response) {
            alert("Error in Adding");
        });
        
    }

});









MyApp.controller("HomeController", function ($scope, PlotApi) {
   
    GetPlotees();
    function GetPlotees() {
        PlotApi.GetPlots().success(function (plts) {
            $scope.plts = plts;
        })
        .error(function (error) {
            $scope.status = 'Unable To Load Plot Data :' + error.message;
        })
    }
});

//MyApp.controller("HomeController", ['$scope', '$PlotApi', function ($scope, PlotApi) {
//    GetPlotees();
//    function GetPlotees() {
//        PlotApi.GetPlots().success(function (plts) {
//            $scope.plts = plts;
//        })
//        .error(function (error) {
//            $scope.status = 'Unable To Load Plot Data :' + error.message;
//        })
//    }

//}]);

MyApp.controller("DeleteController", function ($scope, PlotApi) {

    $scope.selectedItem = "Select Plot Name";
    $scope.isDeleteItemVisible = false;
    GetPlotees();
    function GetPlotees() {
        PlotApi.GetPlots().success(function (plts) {
            $scope.plts = plts;
        })
        .error(function (error) {
            $scope.status = 'Unable To Load Plot Data :' + error.message;
        })
    };

    $scope.dropboxitemselected = function (item) {
        $scope.isDeleteItemVisible = true;
        $scope.selectedItem = item.ID;
        $scope.name = item.Name;
        $scope.size = item.Size;
        $scope.price = item.Price;
        $scope.consdate = item.Constraction_s_Date;
        $scope.note = item.Note;
        $scope.sold = item.Sold;
        $scope.ownername = item.OwnerName;
        $scope.ownerphone = item.OwnerPhone;
        $scope.plotid = item.ID;

    };

    $scope.Deletplote = function () {

        var pltTodelete = {

            'ID': $scope.plotid
            

        };

        PlotApi.deletePlot(pltTodelete)
        .success(function (response) {
            alert("Plot Details Has Been Deleted");
            $scope.name = undefined;
            $scope.size = undefined;
            $scope.price = undefined;
            $scope.consdate = undefined;
            $scope.note = undefined;
            $scope.sold = undefined;
            $scope.ownername = undefined;
            $scope.ownerphone = undefined;
            $scope.plotid = undefined;
            $scope.selectedItem = "Selected Plot";
            $scope.isDeleteItemVisible = false;
            GetPlotees();
        }).
        error(function (response) {
            alert("Error in Adding");
        });

    }

});