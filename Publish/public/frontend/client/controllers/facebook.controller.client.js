/**
 * Created by ngohungphuc on 14/12/2016.
 */
/*
 * @Author: Ngo Hung Phuc
 * @Date:   2016-11-06 22:10:19
 * @Last Modified by:   Ngo Hung Phuc
 * @Last Modified time: 2016-11-19 22:37:18
 */
(function () {
    'use strict';

    angular.module('ChatBotApp')
        .controller('FacebookController', FacebookController);
    FacebookController.$inject = ['$scope', 'localStorageService', '$rootScope', '$location', '$facebook'];

    function FacebookController($scope, localStorageService, $rootScope, $location, $facebook) {
        $rootScope.IsFacebookLogin = false;
        $scope.facebookLogin = function () {
            $facebook.login().then(function () {
                $facebook.api("/me").then(function (response) {
                    $rootScope.facebookUser = response.name;
                    localStorageService.cookie.set('facebookUser', response.name, 7);
                    $rootScope.IsFacebookLogin = true;
                    $rootScope.HideLoginSection = true;
                    $rootScope.IsLogin = false;
                });
                $location.path('/');
            });

        };

    }
})();