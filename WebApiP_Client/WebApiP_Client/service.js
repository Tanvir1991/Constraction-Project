/// <reference path="F:\ConsolePractice\WebApiClient\WebApi_Client\Scripts/angular.js" />

var PlotService = angular.module('PlotService', []);

PlotService.factory('PlotApi', function ($http) {
   
    var urlBase = "http://localhost:39632/api";
    var PlotApi = {};
    PlotApi.GetPlots = function () {
        return $http.get(urlBase + '/Plots');
    };

    PlotApi.AddPlot = function (plt) {


        return $http.post(urlBase + '/Plots/', plt);
    };

    PlotApi.EditPlot = function (pltToupdate) {
        var request = $http({
            method: 'put',
            url: urlBase + '/Plots/' + pltToupdate.ID,
            data: pltToupdate
        });
        return request;
    };


    PlotApi.deletePlot = function (pltTodelete) {
        var request = $http({
            method: 'delete',
            url: urlBase + '/Plots/' + pltTodelete.ID,
           
        });
        return request;
    };


    return PlotApi;
});