/*
 * @Author: hoangphucvu
 * @Date:   2016-11-18 14:10:38
 * @Last Modified by:   hoangphucvu
 * @Last Modified time: 2016-11-18 14:36:52
 */
(function() {
    'use strict';

    angular.module('ChatBotApp')
        .factory('QuestionService', QuestionService);

    QuestionService.$inject = ['$http', '$q'];

    function QuestionService($http, $q) {
        var getAllQuestionService = {};
        var deferred = $q.defer();
        getAllQuestionService.GetAllQuestions = function() {
            $http.get('/api/GetAllQuestion')
                .error(function() {
                    deferred.reject('Error when getting question');
                }).success(function(data) {
                    deferred.resolve(data);
                });
            return deferred.promise;
        };
        return getAllQuestionService;
    }
})();