/*
 * @Author: Ngo Hung Phuc
 * @Date:   2016-11-25 23:14:43
 * @Last Modified by:   Ngo Hung Phuc
 * @Last Modified time: 2016-11-26 22:02:57
 */

(function () {
    'use strict';

    angular.module('ChatBotApp')
        .controller('DetailController', DetailController);

    DetailController.$inject = ['$scope','$rootScope', '$routeParams', 'QuestionDetailService', 'localStorageService'];

    function DetailController($scope,$rootScope, $routeParams, QuestionDetailService, localStorageService) {
        var loginUser = localStorageService.cookie.get('currentUser');
        var facebookUser = localStorageService.cookie.get('facebookUser');
        var currentUser = loginUser ? loginUser : facebookUser;
        var id = $routeParams.id;
        QuestionDetailService.GetQuestionsDetail(id).then(function (result) {
            if (result.data.found === true) {
                $scope.detail = result.data.questionDetail;
                $scope.refs = result.data.questionDetail.References;
                $rootScope.listOfAnswersData = result.data.answers;
                var checkElementExist = setInterval(function () {
                    if ($(".comment").length) {
                        for (var x = 0; x < result.data.answers.length; x++) {
                            if (result.data.answers[x].Like.includes(currentUser)) {
                                var likeDom = document.getElementById('likeBtn-' + result.data.answers[x]._id);
                                if (likeDom) {
                                    clearInterval(checkElementExist);
                                    $("#likeBtn-" + result.data.answers[x]._id).addClass("active-vote");
                                }
                            }
                            if (result.data.answers[x].Dislike.includes(currentUser)) {
                                var dislikeDom = document.getElementById('dislikeBtn-' + result.data.answers[x]._id);
                                if (dislikeDom) {
                                    clearInterval(checkElementExist);
                                    $("#dislikeBtn-" + result.data.answers[x]._id).addClass("active-vote");
                                }
                            }
                        }
                    }
                }, 1000);
            }
            else $location.path('/page-not-found');
        });
    }
})();